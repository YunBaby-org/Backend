import amqp from 'amqplib';
import map from './mapper';
import logger from './logger';
import process from 'process';

/* Request handler */
/* This module provide a listener dedicated to handle the requests from other component(MS)
 */

class ConnectionHandler {

    constructor() {
        this.connection = null;
        this.channels = new Map();
    }

    getQueueNameByUserId(userid){
        return `tracker.request.${userid}`
    }

    async addQueue(userid){
        /* TODO: handle error in this function */
        const channel = await this.connection.createChannel()
        const queue   = this.getQueueNameByUserId(userid)
        await channel.assertQueue(queue, {
            exclusive: false,
            durable:   true,
            autoDelete:true,
        });

        channel.consume(queue, (data) => {
            logger.info(`Queue (${queue}): Receive request`);
            logger.debug(`Queue (${queue}): ${data.content.toString('utf8')}`)

            const ws = map.get(userid);
            ws.send(data.content);
        });

        this.channels[userid] = channel;
    }

    async removeChannel(userid){
        if(this.channels.has(userid)){
            try {
                const channel = this.channels.get(userid);
                await channel.close();
                this.channels.delete(userid);
            } catch (e) {
                logger.error(`Unable to close channel`, e);
            }
        }
    }

    async connect(){
        const url = process.env.RABBITMQ_URL || "amqp://localhost:5672"
        this.connection = await amqp.connect(url)
    }

    async close() {
        map.clear()
        logger.info('Request handler close connection')
        await this.connection.close()
        this.connection = null;
    }

}

export default new ConnectionHandler();
