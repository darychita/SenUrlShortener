const nodemailer = require('nodemailer');

const config = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIN_PASS
    }
};

const tranporter = nodemailer.createTransport(config);

// something different will be placed here
const defaultEmail = {
    from: `Sen <${process.env.MAIL_USER}>`,
    text: 'text'
};

const sendMail = async (mail) => {
    mail = Object.assign({}, defaultEmail, mail);
    const responce = await tranporter.sendMail(mail);
};

module.exports = sendMail;
