import nodemailer from 'nodemailer';

function sendEmailUser(email) {
 
    var email = email;
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
        subject: 'User Registration',
        html: `<h2>User registered successfully</h2>`
 
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Error", `${error}`);
        } else {
            console.log(0);
        }
    });
}
module.exports = sendEmailUser;