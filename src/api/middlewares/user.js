const validators = require('../services/validatorsServices');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');

module.exports = {
    inputSignup(req, res, next) {
        const error = new Error();
        const {
            email, telefone
        } = req.body;

        const listDetails = [];
        const messageDetail = {
            field: '',
            message: ''
        }

        validators.emailValidate(email, messageDetail, listDetails);
        validators.phoneValidate(telefone, messageDetail, listDetails);

        if (listDetails[0]) {
            createMessageError(error, STATUS_CODE.BAD_REQUEST, MESSAGES.ERRORS.MSG_PARAMETROS_INVALIDOS, listDetails);
            return res.status(error.response.code).send(error.response);
        }
        next();
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