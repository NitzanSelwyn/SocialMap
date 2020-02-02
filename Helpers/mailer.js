const sgMail = require('@sendgrid/mail')
const sendGridAPI = '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'
sgMail.setApiKey(sendGridAPI)

const sendWelcomEmail = (email, userName) => {
    sgMail.send({
        to: email,
        from: 'help@socailmap.com',
        subject: 'Hello :)',
        text: `Hello ${userName}`
    })
}

module.exports = {
    SendWelcomEmail: sendWelcomEmail
}