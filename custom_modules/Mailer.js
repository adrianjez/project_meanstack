/**
 * Created by adrianjez on 13.06.2017.
 */
var nodemailer = require('nodemailer');

let selfSignedConfig = {
    host: 't.pl', port: 465,
    secure: true, // użwa TLS
    auth: {
        user: 'web20@t.pl', pass: 'stud234'
    },
    tls: {
        rejectUnauthorized: false
    }
};

let transporter = nodemailer.createTransport(selfSignedConfig);

let mailOptions = {
    from: 'adrian98985@gmail.com',
    to: '',
    // subject: 'Aktywuj konto!',
};

var Mailer = {
    selfSignedConfig: selfSignedConfig,
    transporter: transporter,
    mailOptions: mailOptions
};

module.exports = Mailer;