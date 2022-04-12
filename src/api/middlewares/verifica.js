const validators = require('../services/validatorsServices');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');

module.exports = {
    inputVerificaStatus(req, res, next) {
        const error = new Error();
        const {
            email
        } = req.body;

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
    inputVerificaEmail(req, res, next) {
        const error = new Error();
        const {
            email,
            codigo_email
        } = req.query;

        const listDetails = [];
        const messageDetail = {
            field: '',
            message: ''
        }

        validators.emailValidate(email, messageDetail, listDetails);
        validators.codigoEmailValidate(codigo_email, messageDetail, listDetails);

        if (listDetails[0]) {
            createMessageError(error, STATUS_CODE.BAD_REQUEST, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, listDetails);
            return res.status(error.response.code).send(error.response);
        }
        next();
    },
    inputVerificaTelefone(req, res, next) {
        const error = new Error();
        const {
            email,
            codigo_telefone
        } = req.query;

        const listDetails = [];
        const messageDetail = {
            field: '',
            message: ''
        }

        validators.emailValidate(email, messageDetail, listDetails);
        validators.codigoTelefoneValidate(codigo_telefone, messageDetail, listDetails);

        if (listDetails[0]) {
            createMessageError(error, STATUS_CODE.BAD_REQUEST, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, listDetails);
            return res.status(error.response.code).send(error.response);
        }
        next();
    }
}