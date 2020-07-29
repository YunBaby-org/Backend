import http from 'http';
import bodyParser from 'body-parser'
import WebSocket from 'ws';
import {getRepository} from 'typeorm';
import map from './mapper'
import express from 'express';
import {connectSessionStorage, validateSession, disconnectSessionStorage} from './session-storage';
import logger, { express_logger, express_error_logger } from './logger'

import authentication_router from './routers/authentication'

/* TODO: Use standard model to create database entity mapping, don't create a object on the fly :p */
/* TODO: Rewrite this shit with typescript */
/* TODO: implement graceful shotdown for agent-server */

async function create_app() {
    const app = express();
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ noServer: true });
    const sessionMgr = await connectSessionStorage();

    app.use(sessionMgr);
    app.use(bodyParser.json())

    app.use(express_logger);
    app.use('/', authentication_router);

    /* Handle WebSocket upgrade process *///{{{
    server.on('upgrade', function(request, socket, head) {

        validateSession(request).then((userid) => { 
            logger.info(`User ${userid} upgrade to websocket`)

            wss.handleUpgrade(request, socket, head, function(ws) {
                wss.emit('connection', ws, request)
            });
        }).catch(() => {
            logger.warn(`failed to upgrade websocket`);
            socket.destroy();
        });

    });//}}}

    /* Establish websocket connection *///{{{
    wss.on('connection', function (ws, request) {

        const userid = request.session.userid;

        map.set(userid, ws);

        ws.on('message', async function incoming(msg) {
            let message_parsed;

            try{
                message_parsed = JSON.parse(msg);
            } catch(e) {
                logger.error("Unable to parse payload into json")
                ws.send("No");      /* this is for testing purpose, remove it in further version */
                return;
            }

            const repo = getRepository('device_log');
            await repo.save({
                deviceId: userid,
                content : message_parsed
            });
            ws.send("Ok");          /* this is for testing purpose, remove it in further versan */
        });

        ws.on('close', function() {
            map.delete(userid);
        });
    });//}}}

    /* Server on close *///{{{
    server.close = async function() {
        function exception_handler(description) {
            return (reason) => logger.error(description, { exception: reason })
        }
        logger.info(`Closing agent-server`)
        await new Promise((resolve, reject) => {
            const handler = (err) => { err ? reject(err) : resolve() }
            Object.getPrototypeOf(server).close.bind(server,handler)();
        });

        logger.info(`Closing connection to redis session storage`)
        await disconnectSessionStorage()
            .catch(exception_handler("failed to close session storage"))

    }//}}}

    app.use(express_error_logger);

    server.listen(3000, function() {
        logger.info(`Listening at ${server.address().address}:${server.address().port}`)
    });

    return server;
}

export default create_app;
