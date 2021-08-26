const config        = require('../config');
const nodemail      = require('nodemailer');
const sendmail      = require('sendmail')();
const smtpTransport = require('nodemailer-smtp-transport');
const signature     = require('../signature');

const transporter = nodemail.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: config.mail.office,
        pass: config.mail.access
    }
}));

const deliverEmail = (req, res, next) => {
    console.log(config);
    var data = req.body

    var messageBody = `${data.body}<p>${signature}</p>`;
    var recipients = data.recipients.join(', ');

    var mailOptions = {
        from: 'lenoxquiche@gmail.com;',
        subject: data.subject,
        html: messageBody,
    };

    if (data.isBulk) {
        mailOptions['bcc'] = recipients;
    } else {
        mailOptions['to'] = recipients;
    }

    if (data.attachment) {
        var filepath = `./public/files/pdf/${data.attachment}`;
        mailOptions['attachments'].push({path: filepath});
    }

    transporter.sendMail(mailOptions, function (error, info) {
           if (error){
               console.log('Error: ' + error);
               next(error);
           }

           console.log(`Message ${info.messageId} sent: ${info.response}`);
           req.infoMessage = info.messageId
           next();
    })
}

module.exports = {
    deliverEmail
}
