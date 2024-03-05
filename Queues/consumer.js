const { Worker } = require("bullmq");
const ejs = require("ejs");
const path = require("path")
const nodemailer = require('nodemailer');
require("dotenv").config()
const emailWorker = new Worker('email-queue', async (job) => {
    const emailData = job.data;
    console.log(emailData)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }

    })
    const { email, subject, template, data } = emailData;
    const templatePath = path.join(__dirname, "./mailTemplates", template);
    const html = await ejs.renderFile(templatePath, data);
    const mailOptions = {
        from: process.env.SMTP_HOST,
        to: email,
        subject,
        html
    }
    try {
        await transporter.sendMail(mailOptions)
        console.log("checking")
    } catch (error) {
        console.log(error)
    }
}, {
    connection: {
        port: 6379,
        host: 'host.docker.internal'
    }
})

module.exports = emailWorker