var amqp = require('amqplib/callback_api');
import{ receiveToQueue } from './receiver'

export const sendToQueue = function send( dataToSend ) {
    //connect to rabbitmq server
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) { //creating channel
            if (error1) {
                throw error1;
            }

            var queue = 'rabbitMqMessage';
            var msg = dataToSend;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
    receiveToQueue();
}
