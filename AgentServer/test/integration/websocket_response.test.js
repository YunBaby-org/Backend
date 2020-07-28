import { describe, it } from 'mocha';
import ormconfig from '../../ormconfig'
import faker from 'faker';
import WebSocket from 'ws';
import process from 'process';
import chaiHttp from 'chai-http';
import chai from 'chai';
import create_app from '../../src/app';
import dotenv from 'dotenv';
// import {GenericContainer, Network, Wait} from 'testcontainers';
import {resolve} from 'path';

dotenv.config();

chai.use(chaiHttp);

const expect = chai.expect;

describe('Interaction between database and agent server', function () {

    let server, requester, cookie;
    let mock_uuid;
    let mock_response;
    let network, postgres, flyway, redis;

    this.timeout(60 * 1000);

    this.beforeAll( async () => {

        // /* Setup Postgres, flyawy and Redis */
        // network = await new Network({name: 'test'}).start();

        // postgres = await new GenericContainer("postgres")
        //     .withName("postgres")
        //     .withNetworkMode(network.getName())
        //     .withExposedPorts(5432)
        //     .withEnv('POSTGRES_PASSWORD', 'password')
        //     .start();

        // ormconfig.port = postgres.getMappedPort(5432);

        // flyway   = await new GenericContainer("flyway/flyway")
        //     .withName('flyway')
        //     .withEnv('FLYWAY_URL',`jdbc:postgresql://${"postgres"}:${5432}/postgres`)
        //     .withEnv('FLYWAY_USER','postgres')
        //     .withEnv('FLYWAY_PASSWORD','password')
        //     .withBindMount(resolve(__dirname, '../../../migrations'), '/flyway/sql')
        //     .withNetworkMode(network.getName())
        //     .withWaitStrategy(Wait.forLogMessage('+------------+'))
        //     .withCmd(['migrate'])
        //     .start();
        // await new Promise((resolve) => { setTimeout(resolve, 1000)});

        // redis    = await new GenericContainer("redis")
        //     .withName('redis')
        //     .withNetworkMode(network.getName())
        //     .withExposedPorts(6379)
        //     .start()

        // process.env['redisUrl'] = `redis://localhost:${redis.getMappedPort(6379)}`

        /* Create app and requester */
        server = await create_app();
        requester = chai.request(server).keepOpen();

        /* Create a fake user at database */
        faker.locale = 'zh_TW'
        const user = {
            lastname:   faker.name.firstName(),
            firstname:  faker.name.lastName(),
            phone:      faker.phone.phoneNumber(),
            email:      "someone@somewhere",
            password:   "p@ssw0rd"
        };
        const connection = server.dbconnection();
        await connection.getRepository('user').save(user);

        /* Get session id */
        const response = await requester.post('/login').send({
            email: user.email,
            password: user.password
        });
        expect(response.status).to.be.equal(200);
        cookie = response.headers['set-cookie'][0];
        cookie = cookie.substr(0, cookie.indexOf(';'));

        /* Generate mock data */
        const response2 = await requester.get('/whoami').set('Cookie', cookie);
        mock_uuid = response2.body.userid
        mock_response = {
            Response: "ScanGPS",
            Status: "Failed",
            Info: "Request Not Supported"
        };

    });

    it('Sending response to websocket', (done) => {
        const ws = new WebSocket(`ws://localhost:${process.env.PORT || 3000}`, [], {
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
        const connection = server.dbconnection();
        const log = await connection.getRepository("device_log").findOne({ where: {deviceId : mock_uuid}});

        expect(log).to.not.be.undefined;
        expect(log.deviceId).to.be.equal(mock_uuid);
        expect(log.content).to.be.a('object');
        expect(log.content.Response).to.be.equal(mock_response.Response);
    });

    this.afterAll(async () => {
        await server.close();
        // await postgres.stop({removeVolumes: true});
        // await flyway.stop({removeVolumes: true});
        // await redis.stop({removeVolumes: true});
        // await network.stop()
    })

});
