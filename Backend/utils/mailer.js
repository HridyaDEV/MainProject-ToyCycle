const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    }
})

const sendReminderEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Failed to send email", err);

        }
        else {
            console.log("Email sent", info.response);

        }
    })

}

module.exports = sendReminderEmail

