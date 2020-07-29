import { describe, it } from 'mocha';
import faker from 'faker';
import WebSocket from 'ws';
import chaiHttp from 'chai-http';
import chai from 'chai';
import {getRepository} from 'typeorm'
import {connect, disconnect} from '../../src/database';
import create_app from '../../src/app';
import dotenv from 'dotenv';


dotenv.config();

chai.use(chaiHttp);

const expect = chai.expect;

describe('Interaction between database and agent server', function () {

    let server, requester, cookie;
    let mock_uuid;
    let mock_response;

    this.beforeAll( async () => {

        /* Create app and requester */
        await connect();
        server = await create_app();
        requester = chai.request.agent(server);

        /* Create a fake user at database */
        faker.locale = 'zh_TW'
        const user = {
            lastname:   faker.name.firstName(),
            firstname:  faker.name.lastName(),
            phone:      faker.phone.phoneNumber(),
            email:      "someone@somewhere",
            password:   "p@ssw0rd"
        };
        await getRepository('user').save(user);

        /* Get session id */
        const response = await requester.post('/login').send({
            email: user.email,
            password: user.password
        });
        expect(response.status).to.be.equal(200);
        cookie = response.headers['set-cookie'][0];
        cookie = cookie.substr(0, cookie.indexOf(';'));

        /* Generate mock data */
        const response2 = await requester.get('/whoami');
        mock_uuid = response2.body.userid
        mock_response = {
            Response: "ScanGPS",
            Status: "Failed",
            Info: "Request Not Supported"
        };
    });

    it('Sending response to websocket', (done) => {
        const ws = new WebSocket(`ws://0.0.0.0:${server.address().port}`, [], {
            headers: { Cookie: cookie }
        });
        ws.on('open',() => {
            ws.send(JSON.stringify(mock_response));
        });
        ws.on('message', (msg) => {
            expect(msg).to.be.equal('Ok');
            ws.close();
            done();
        })
    });

    it('Ensure response was in the database', async () => {
        const log = await getRepository("device_log").findOne({ where: {deviceId : mock_uuid}});

        expect(log).to.not.be.undefined;
        expect(log.deviceId).to.be.equal(mock_uuid);
        expect(log.content).to.be.a('object');
        expect(log.content.Response).to.be.equal(mock_response.Response);
    });

    this.afterAll(async () => {
        await server.close();
        await disconnect();
    })

});
