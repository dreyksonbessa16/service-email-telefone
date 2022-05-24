const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');
const JOI = require('joi');

module.exports = {
    sendEmail(req, res, next) {

        var schema, value;

        try {
            schema = configSchemaVerifyEmail();
            value = schema.validateAsync(req.body);
        } catch (error) {
            createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_ERRO_VALIDACAO_ENTRADA, '');
            return res.status(error.response.code).send(error.response);
        }

        value.then((_data) => {
            next();
        }, (error) => {
            createMessageError(error, STATUS_CODE.UNPROCESSABLE_ENTITY, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, error.details);
            return res.status(error.response.code).send(error.response);
        });
    },
}

function configSchemaVerifyEmail() {
    try {
        return JOI.object({
            email: JOI.string()
                .email()
                .required()
        });
    } catch (error) {
        console.err(ex);
        throw error;
    }
}