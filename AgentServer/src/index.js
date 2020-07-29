import logger from './logger';
import {connect} from './database'
import create_app from './app.js';

async function start() {
    logger.info("setup database connection");
    await connect();
    logger.info("Creating application");
    await create_app();
}

start();
