import amqp from 'amqplib';
import chai, {expect} from 'chai';
import logger from '../../src/logger'
import create_app from './../../src/app';
import {disconnectSessionStorage} from '../../src/session-storage';
import { connect, disconnect } from './../../src/database';
import RequestHandler from './../../src/request-handler';
import WebSocket from 'ws';

import { describe, it } from 'mocha';
import faker from 'faker';

import { getRepository } from 'typeorm'
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

/* 
 * 1. Tracker establish connection to AS
 * 2. MS send request to rabbitmq
 * 3. expect Tracker get the request
 * 4. Tracker send response
 * 5. expect the response was in DB
 */

describe("Send request from rabbitmq", function () {

    let server, http, cookie, mock_uuid, mock_request, mock_response;
    
    this.beforeAll(async () => {
        /* database */
        await connect();
        /* request-handler */
        await RequestHandler.connect();
        /* app */
        server = await create_app();
        /* http */
        http = chai.request.agent(server);

        /* Generate fake user for database */
        faker.locale = 'zh_TW'
        const user = {
            lastname:   faker.name.firstName(),
            firstname:  faker.name.lastName(),
            phone:      faker.phone.phoneNumber(),
            email:      "aja" + faker.internet.email(),
            password:   "p@ssw0rd"
        };
        await getRepository('user').save(user);

        /* Get session id */
        const response = await http.post('/login').send({
            email: user.email,
            password: user.password
        });
        expect(response.status).to.be.equal(200);
        cookie = response.headers['set-cookie'][0];
        cookie = cookie.substr(0, cookie.indexOf(';'));

        /* Generate mock data */
        const response2 = await http.get('/whoami');
        mock_uuid = response2.body.userid
        mock_request = { Request: "ScanGPS", }
        mock_response = { Response: "ScanGPS", Status: "Failed", Info: "Request Not Supported" };
    })

    it('should send request via rabbitmq and ensure the response was in database', async () => {
        /* Tracker establish connection to AS */
        const ws = new WebSocket(`ws://0.0.0.0:${server.address().port}`, [], { headers: { Cookie: cookie } });
        ws.on('message', (message) => {
            try{ 
                /* on Request */
                const request = JSON.parse(message.toString('utf8'));
                expect(request).to.have.property('Request');
                expect(request.Request).to.be.equal('ScanGPS');
                /* on Response */
                ws.send(JSON.stringify(mock_response));
            } catch(e) {
                logger.warn(e);
            }
        })
        /* MS(mock) send request to RabbitMQ */
        const connection = await amqp.connect();
        const channel    = await connection.createChannel();
        const data       = Buffer.from(JSON.stringify(mock_request), 'utf8');
        await channel.assertQueue(RequestHandler.getQueueNameByUserId(mock_uuid), {
            exclusive: false,
            durable:   true,
            autoDelete:true,
        })
        channel.sendToQueue(RequestHandler.getQueueNameByUserId(mock_uuid), data);
        /* Expect ws get the message and response */
        await new Promise(res => setTimeout(res, 1000));
        /* Fetch data from db */
        const log = await getRepository('device_log').findOne({ deviceId: mock_uuid })
        /* Expect the value correct */
        expect(log).to.not.be.undefined;
        expect(log.content).to.deep.equal(mock_response);

        ws.close()
        await connection.close()
    });

    this.afterAll(async () => {
        await disconnect();
        await RequestHandler.close();
        await server.close();
    })

});
