require('dotenv').config();
const client = require('twilio')(process.env.ACCOUNT_SID_TWILIO, process.env.AUTH_TOKEN_TWILIO);

module.exports = {
    async send(codigo, numberSend) {

        await client.messages.create({
            body: "Bem vindo a PFF. O seu código de verificação é: " + codigo,
            from: process.env.PHONE_NUMBER,
            to: numberSend
        }).then(message => {
            console.log(message.sid);
            return message.sid;
        });
    }
}