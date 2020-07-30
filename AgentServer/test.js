import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect("amqp://localhost");
}
