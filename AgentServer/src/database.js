import logger from './logger';
import ormconfig from '../ormconfig';
import {createConnection} from 'typeorm';

let connection = null;

async function connect(override = {}){

    if(connection != null)
        throw Error("Connection already exists");

    const config = { ...ormconfig, ...override };

    logger.info(`connecting to database ${config.type}://${config.host}:${config.port}`)
    connection = await createConnection(config);
    logger.info(`connect to database successfully`)

    return connection
}

async function disconnect(){
    logger.info(`disconnect from database`)
    await connection.close();
    connection = null;
}

export {connect, disconnect};
