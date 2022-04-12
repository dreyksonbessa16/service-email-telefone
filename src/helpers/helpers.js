const MESSAGES = require('../constantes/messages.json');
const STATUS_CODE = require('../constantes/status_code.json');
const { createMessageError } = require('../utils/utils');

module.exports = {
    async generateCode(qCharacteres) {
        const characters = '0123456789';
        let codigo = '';
        try {
            for (let i = 0; i < qCharacteres; i++) {
                codigo += characters[Math.floor(Math.random() * characters.length)];
            }
            return codigo;
        } catch (error) {
            createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_CREATE_RAMDOM, { message: error.message });
            throw error;
        }
    }
}