import http from 'http';
import {v4 as uuid} from 'uuid';
import bodyParser from 'body-parser'
import WebSocket from 'ws';
import express from 'express';
import { createConnection } from 'typeorm';
import ormconfig from '../ormconfig';
import connectSessionStorage from './SessionStorage';

/* TODO: Use standard model to create database entity mapping, don't create a object on the fly :p */

async function create_app() {
    const app = express();
    const map = new Map();
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ noServer: true });
    const sessionMgr = await connectSessionStorage();

    app.use(sessionMgr);
    app.use(bodyParser.json())

    const connection = await createConnection(ormconfig);
    
    server.dbconnection = () => connection;

    /* Login & Logout *///{{{
    app.post('/login', async function (req, res) {

        const email  = req.body.email;
        const passwd = req.body.password;

        // Keycoded restriction, prevent someone from trying to fuck up the server
        if(typeof email != 'string' || typeof passwd != 'string' || email.length >= 100 || passwd.length >= 100){
            res.status(403);
            res.send('Rejected');
            return;
        }

        /* TODO: Optimize this query by adding index on specific columns */
        const match = await connection.getRepository('user').findOne({
            email: email,
            password: passwd
        });

        if(match){
            /* TODO: Don't use the userId as a session key like this,
            *        This might introduce security issue, generate one uuid on login instead. */
            const userid = match.userId;
            req.session.userid = userid;
            res.send({ result: 'OK', message: 'Session updated.'});
        } else {
            res.status(403);
            res.send('Rejected');
            return;
        }

    });
    app.get('/whoami', function(request, response) {
        sessionMgr(request, {}, () => {
            if(!request.session.userid){
                response.status(401);
                response.send({res:"failed"});
            }
            else
                response.send({userid: request.session.userid});
        });
    });
    app.delete('/logout', function (request, response) {

        if(typeof request.session.userid != 'string'){
            response.status(401);
            response.send("Rejected")
            return;
        }

        const ws = map.get(request.session.userid);

        request.session.destroy(() => {
            if(ws) ws.close();
            response.send({ result: 'OK', message: 'Session destroyed.'})
        });
    });//}}}

    /* Handle WebSocket upgrade process *///{{{
    server.on('upgrade', function(request, socket, head) {

        sessionMgr(request, {}, () => {
            if(!request.session.userid){
                socket.destroy();
                return;
            }

            /* Allow upgrade */
            wss.handleUpgrade(request, socket, head, function (ws) {
                wss.emit('connection', ws, request);
            });
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
                console.error("Response is not in JSON format");
                ws.send("No");      /* this is for testing purpose, remove it in further version */
                return;
            }

            const repo = connection.getRepository('device_log');
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

    let closed = false;
    server.on('close', () => {
        if(!closed)
        {
            connection.close();
            closed = true;
        }
    })

    server.listen(3000, function() {
        console.log(`Listening at ${server.address().address}:${server.address().port}`);
    });

    return server;
}

export default create_app;
