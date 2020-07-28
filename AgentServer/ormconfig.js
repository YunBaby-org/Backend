import TrackingDevice from './src/entity/TrackingDeviceSchema';
import DeviceLog from './src/entity/DeviceLog';
import User from './src/entity/User';
import process from 'process';

export default {
    type:     process.env.TYPEORM_CONNECTION || "postgres",
    host:     process.env.TYPEORM_HOST       || "localhost",
    port:     process.env.TYPEORM_PORT       || 5432,
    database: process.env.TYPEORM_DATABASE   || "postgres",
    username: process.env.TYPEORM_USERNAME   || "postgres",
    password: process.env.TYPEORM_PASSWORD   || "password",
    entities: [ DeviceLog, TrackingDevice, User ],
    synchronize: false,
    migrationsRun: false,
    logging: false
}
