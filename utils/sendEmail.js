
const nodemailer = require('nodemailer');
/**
 * 
 * @param {String} email 
 * @param {String} subject 
 * @param {String} message 
 */
async function sendEmail(email, subject, message, html){
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.HOST_EMAIL,
            to: email,
            subject: subject,
            title: "You're about to reset your password, click the link below",
            text: message,
            html: html,
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err){
                console.log(err)
            }else {
                console.log('Email sent ' + info.response);
            }
        })

    }catch(err){ 
        console.log('Fail to send email');
    }
}
module.exports = sendEmail;