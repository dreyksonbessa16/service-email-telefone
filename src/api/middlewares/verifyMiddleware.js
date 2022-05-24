const validators = require('../services/validatorsServices');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');
const JOI = require('joi');

module.exports = {
    verifyEmail(req, res, next) {

        var schema, value;

        try {
            schema = configSchemaVerifyEmail();
            value = schema.validateAsync(req.query);
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
    verifyPhone(req, res, next) {

        var schema, value;

        try {
            schema = configSchemaVerifyPhone();
            value = schema.validateAsync(req.query);
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
    verifyStatus(req, res, next) {

        var schema, value;

        try {
            schema = configSchemaVerifyStatus();
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
                .required(),
            codigo_email: JOI.string()
                .min(10)
                .max(10)
                .required()
        });
    } catch (error) {
        console.err(ex);
        throw error;
    }
}

function configSchemaVerifyPhone() {
    try {
        return JOI.object({
            email: JOI.string()
                .email()
                .required(),
            codigo_telefone: JOI.string()
                .min(5)
                .max(5)
                .required()
        });
    } catch (error) {
        console.err(ex);
        throw error;
    }
}

function configSchemaVerifyStatus() {
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