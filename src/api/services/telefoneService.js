require('dotenv').config();
const client = require('twilio')(process.env.ACCOUNT_SID_TWILIO_DEV, process.env.AUTH_TOKEN_TWILIO_DEV);
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');

module.exports = {
    async send(codigo, numberSend) {
        try {
            await client.messages.create({
                body: "Bem vindo a FENAPFF. O seu código de verificação é: " + codigo,
                from: process.env.PHONE_NUMBER_DEV,
                to: numberSend
            });
        } catch (error) {
            createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_ERRO_ENVIAR_SMS, { message: error.message });
            throw error;
        }
    }
}