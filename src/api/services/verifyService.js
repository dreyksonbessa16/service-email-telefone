const UsersRepository = require('../repositories/UsersRepository');
const { createMessageError, adjustPhone } = require('../../utils/utils');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const VARIABLES = require('../../constantes/variables.json');
const serviceEmail = require("../services/emailService");
const telefoneService = require("../services/telefoneService");
const { generateCode } = require('../../helpers/helpers');


module.exports = {
    async verifyStatus(req, res) {
        var user;
        const { email } = req.body;

        try {
            user = await UsersRepository.findOne(email.toUpperCase());
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        if (!user) {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_FOUND, MESSAGES.ERRORS.MSG_NAO_ENCONTRADO, { message: "Usuário não existe" });
            return res.status(error.response.code).send(error.response);
        }

        if (user.status_email !== 'A') {
            return res.status(STATUS_CODE.NOT_ACCEPTABLE).send({ email: false});
        }

        if (user.status_telefone !== 'A') {
            return res.status(STATUS_CODE.NOT_ACCEPTABLE).send({ email: true, telefone: false});
        }

        return res.status(STATUS_CODE.OK).send({ email: true, telefone: true });
    },
    async verifyEmail(req, res) {
        var user;
        const {
            email,
            codigo_email
        } = req.query;

        try {
            user = await UsersRepository.findOne(email.toUpperCase());
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        if (!user) {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_FOUND, MESSAGES.ERRORS.MSG_NAO_ENCONTRADO, { message: "Usuário não existe" });
            return res.status(error.response.code).send(error.response);
        }

        if (user.codigo_email !== codigo_email) {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_ACCEPTABLE, MESSAGES.ERRORS.MSG_ERRO_VERIFICAR_EMAIL, { message: "Codigo não confere." });
            return res.status(error.response.code).send(error.response);
        }

        try {
            user = await UsersRepository.update(user.email, user.telefone, user.codigo_email, VARIABLES.ATIVO, user.codigo_telefone, user.status_telefone, user.id);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ user });
    },
    async verificaTelefone(req, res) {
        var user;
        const {
            email,
            codigo_telefone
        } = req.query;

        try {
            user = await UsersRepository.findOne(email.toUpperCase());
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        if (!user) {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_FOUND, MESSAGES.ERRORS.MSG_NAO_ENCONTRADO, { message: "Usuário não existe" });
            return res.status(error.response.code).send(error.response);
        }

        if (user.codigo_telefone !== codigo_telefone) {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_ACCEPTABLE, MESSAGES.ERRORS.MSG_ERRO_VERIFICAR_EMAIL, { message: "Codigo não confere." });
            return res.status(error.response.code).send(error.response);
        }

        try {
            user = await UsersRepository.update(user.email, user.telefone, user.codigo_email, user.status_email, user.codigo_telefone, VARIABLES.ATIVO, user.id);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ user });
    }
}