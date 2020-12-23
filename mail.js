const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY || 'REPLACE WITH API KEY', // TODO: Replace with your mailgun API KEY
        domain: process.env.DOMAIN || 'REPLACE WITH DOMAIN OF MAIL GUN' // TODO: Replace with your mailgun DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (name, email, subject, exampleFormControlSelect1, text, cb) => {
    const mailOptions = {
        from: email, // TODO replace this with your own email
        to: 'umbertine@mia-international.de', // TODO: the receiver email has to be authorized for the free tier
        subject,
        name,
        exampleFormControlSelect1,
        text
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;