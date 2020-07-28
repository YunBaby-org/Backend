import {EntitySchema} from 'typeorm';

export default new EntitySchema({
    name: "DeviceLog",
    columns: {
        deviceId: {
            primary: true,
            type: "uuid",
        },
        time: {
            type: "timestamp",
            default: () => "now()"
        },
        content: {
            type: "jsonb"
        }
    }
});
