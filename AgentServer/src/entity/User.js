import {EntitySchema} from 'typeorm';

export default new EntitySchema({
    name: "User",
    columns: {
        userId: {
            primary: true,
            type: "uuid",
        },
        lastname:  { type: 'text' },
        firstname: { type: 'text' },
        phone:     { type: 'text', nullable: true },
        email:     { type: 'text' },
        address:   { type: 'text', nullable: true },
        password:  { type: 'text' }
    }
});
