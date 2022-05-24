const UsersRepository = require('../repositories/UsersRepository');
const { createMessageError, adjustPhone } = require('../../utils/utils');
const STATUS_CODE = require('../../constantes/status_code.json');
const MESSAGES = require('../../constantes/messages.json');
const VARIABLES = require('../../constantes/variables.json');
const serviceEmail = require("../services/emailService");
const telefoneService = require("../services/telefoneService");
const { generateCode } = require('../../helpers/helpers');


module.exports = {
    async sendEmail(req, res) {
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

        if (user.status_email === 'A') {
            return res.status(STATUS_CODE.OK).send({ message: 'EMAIL JÁ VERIFICADO', user});
        }

        var codigo_email;
        try {
            codigo_email = await generateCode(10);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            await serviceEmail.send(codigo_email, user.email);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            user = await UsersRepository.update(user.email, user.telefone, codigo_email, user.status_email, user.codigo_telefone, user.status_telefone, user.id);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ user });
    },
    async sendPhone(req, res) {
        var user;
        try {
            user = await UsersRepository.findOne(req.body.email.toUpperCase());
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        if (user.status_email !== 'A') {
            const error = new Error();
            createMessageError(error, STATUS_CODE.NOT_ACCEPTABLE, MESSAGES.ERRORS.MSG_ERRO_ENVIAR_SMS, { message: "Email ainda não verificado." });
            return res.status(error.response.code).send(error.response);
        }

        var codigo_telefone;
        try {
            codigo_telefone = await generateCode(5);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            await telefoneService.send(codigo_telefone, user.telefone);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            user = await UsersRepository.update(user.email, user.telefone, user.codigo_email, user.status_email, codigo_telefone, user.status_telefone, user.id);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ user });
    }
}