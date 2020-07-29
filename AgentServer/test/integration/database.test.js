import chai from 'chai';
import faker from 'faker';
import {describe, it} from 'mocha';
import {getRepository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import {connect, disconnect} from '../../src/database';

const expect = chai.expect;

describe('Test database schema equal to local ORM setup', function () {

    let mock_uuid;
    let mock_response;

    this.beforeAll( async () => {

        await connect();

        /* Establish connection to database */
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

        const repo = getRepository("user");
        await repo.save(user);
    });

    it('should insert data into device_log', async () => {
        const log = {
            deviceId: mock_uuid,
            content: mock_response
        };
        const repo = getRepository("device_log");
        await repo.save(log)
    });

    it('should query data from device_log', async () => {
        const log = await getRepository("device_log").findOne({ where: {deviceId : mock_uuid}});

        expect(log.content).to.be.a('object');
        expect(log.content.Response).to.be.equal(mock_response.Response);
        expect(log.content.Result.Longitude).to.be.equal(mock_response.Result.Longitude);
        expect(log.content.Result.Latitude).to.be.equal(mock_response.Result.Latitude);
    });

    this.afterAll(async () => {
        await disconnect();
    })

});
