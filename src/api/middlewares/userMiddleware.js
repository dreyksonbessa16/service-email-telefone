const validators = require('../services/validatorsServices');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');
const JOI = require('joi');

module.exports = {
    inputSignup(req, res, next) {

        var schema, value;

        try {
            schema = configSchemaInputSignup();
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
    inputSearch(req, res, next) {
        const error = new Error();
        const {
            email
        } = req.query;

        const listDetails = [];
        const messageDetail = {
            field: '',
            message: ''
        }

        validators.emailValidate(email, messageDetail, listDetails);

        if (listDetails[0]) {
            createMessageError(error, STATUS_CODE.BAD_REQUEST, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, listDetails);
            return res.status(error.response.code).send(error.response);
        }
        next();
    },
    inputDelete(req, res, next) {
        const error = new Error();
        const {
            email
        } = req.query;

        const listDetails = [];
        const messageDetail = {
            field: '',
            message: ''
        }

        validators.emailValidate(email, messageDetail, listDetails);

        if (listDetails[0]) {
            createMessageError(error, STATUS_CODE.BAD_REQUEST, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, listDetails);
            return res.status(error.response.code).send(error.response);
        }
        next();
    }
}

function configSchemaInputSignup() {
    try {
        return JOI.object({
            email: JOI.string()
                .email()
                .required(),
            telefone: JOI.string()
                .required()
        });
    } catch (error) {
        console.err(ex);
        throw error;
    }
}