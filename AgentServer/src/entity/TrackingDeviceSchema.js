import {EntitySchema} from 'typeorm';

export default new EntitySchema({
    name: "TrackingDevice",
    columns: {
        deviceId: {
            primary: true,
            type: "uuid",
            default: () => "gen_random_uuid()"
        },
        owner: {
            type: "uuid"
        }
    }
});
