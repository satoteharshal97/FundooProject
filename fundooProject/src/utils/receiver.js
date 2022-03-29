var amqp = require('amqplib/callback_api');
import sendEmailUser from "./registerUser"


export const receiveToQueue = function receive() {

    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'rabbitMqMessage';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                const message = msg.content.toString();
                const userEmail = JSON.parse(message);
                const email = userEmail.email;
                console.log(email);
                sendEmailUser(email);
                console.log(`[x] Received %s , ${msg.content.toString()}`); //convert object to string            
            }
                , {
                    noAck: true
                });
        });
    });
}
