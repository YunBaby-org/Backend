import WebSocket from 'ws';
import map from './mapper';
import {getRepository} from 'typeorm';
import RequestHandler from './request-handler';
import logger from './logger';

const wss = new WebSocket.Server({ noServer: true });

/* Establish websocket connection *///{{{
wss.on('connection', function (ws, request) {

    const userid = request.session.userid;

    map.set(userid, ws);

    RequestHandler.addQueue(userid)

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

function handleWebsocketUpgrade(request, socket, head){
    wss.handleUpgrade(request, socket, head, function(ws){
        wss.emit(`connection`, ws, request);
    });
}

export default wss;
export {handleWebsocketUpgrade}
