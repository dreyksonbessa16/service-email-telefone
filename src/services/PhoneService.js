require('dotenv').config();
const client = require('twilio')(process.env.ACCOUNT_SID_TWILIO, process.env.AUTH_TOKEN_TWILIO);
const logger = require("../../logger");

module.exports = {
    async send(codigo, numberSend) {

        return await client.messages.create({
            body: "Bem vindo a FENAPFF. O seu código de verificação é: " + codigo,
            from: process.env.PHONE_NUMBER,
            to: numberSend
        }).then(message => {
            
            logger.info(`PhoneService: SMS ENVIADO COM SUCESSO - { telefone: ${numberSend}, codigo: ${codigo}}`);
            return true;
        }).catch((err) => {
            
            logger.error(`PhoneService: ERRO AO ENVIAR SMS - ${err}`);
            return false;
        })
    }
}