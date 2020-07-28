import chai from 'chai';
import {Duration, TemporalUnit} from 'node-duration';
import {setTimeout} from 'core-js';
import faker from 'faker';
import {describe, it} from 'mocha';
import {resolve} from 'path';
// import {GenericContainer, Network, Wait} from 'testcontainers';
import {createConnection} from 'typeorm';
import {v4 as uuid} from 'uuid';
import ormconfig from '../../ormconfig';

const expect = chai.expect;

describe('Test database schema equal to local ORM setup', function () {

    this.timeout(60 * 1000);

    let connection;
    let mock_uuid;
    let mock_response;
    let postgres, flyway, network;

    this.beforeAll( async () => {

        // /* Create network & postgres & flyway */
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
        //     .withStartupTimeout(1000)
        //     .start();
        // await new Promise((resolve) => { setTimeout(resolve, 1000)});

        /* Establish connection to database */
        connection = await createConnection(ormconfig);
        mock_uuid = uuid()
        mock_response = {
            Response: "ScanGPS",
            Status: "Success",
            Result: {
                Longitude: 23 + Math.random(),
                Latitude: 120 + Math.random()
            }
        };
    });

    it('Should generate fake user', async () => {
        faker.locale = 'zh_TW';
        const user = {
            userId: mock_uuid,
            firstname: faker.name.lastName(),
            lastname:  faker.name.firstName(),
            phone:     faker.phone.phoneNumber(),
            email:     faker.internet.email(),
            password:  "p@ssw0rd"
        };

        const repo = connection.getRepository("user");
        await repo.save(user);
    });

    it('should insert data into device_log', async () => {
        const log = {
            deviceId: mock_uuid,
            content: mock_response
        };
        const repo = connection.getRepository("device_log");
        await repo.save(log)
    });

    it('should query data from device_log', async () => {
        const log = await connection.getRepository("device_log").findOne({ where: {deviceId : mock_uuid}});

        expect(log.content).to.be.a('object');
        expect(log.content.Response).to.be.equal(mock_response.Response);
        expect(log.content.Result.Longitude).to.be.equal(mock_response.Result.Longitude);
        expect(log.content.Result.Latitude).to.be.equal(mock_response.Result.Latitude);
    });

    this.afterAll(async () => {

        if(connection) await connection.close();

        const time = new Duration(1, TemporalUnit.SECONDS);
        // await postgres.stop({timeout : time, removeVolumes: true});
        // await flyway.stop({timeout : time, removeVolumes: true});
        // await network.stop({timeout: time});
    })

});
