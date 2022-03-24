import nodemailer from 'nodemailer';

function sendEmail(email, token) {
 
    var email = email;
    var token = token;
 
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER , // Your email id
            pass: process.env.USER_PASSWORD ,// Your password
        }
    });
 
    var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'User Token link ',
        html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="${process.env.APP_HOST}:${process.env.PASSWORD_RESET_PORT}/${token}">click here</a></h1>`
 
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Error", `${error}`);
        } else {
            console.log(0);
        }
    });
}
module.exports = sendEmail;