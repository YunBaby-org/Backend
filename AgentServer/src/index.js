import logger from './logger';
import {connect} from './database'
import RequestHandler from './request-handler'
import create_app from './app.js';

async function start() {
    logger.info("setup database connection");
    await connect();
    logger.info("setup rabbitmq connection");
    await RequestHandler.connect();
    logger.info("Creating application");
    await create_app();
}

start();
