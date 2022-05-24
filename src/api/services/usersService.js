const UsersRepository = require('../repositories/UsersRepository');
const { adjustPhone } = require('../../utils/utils');
const STATUS_CODE = require('../../constantes/status_code.json');
const VARIABLES = require('../../constantes/variables.json');
const MESSAGES = require('../../constantes/messages.json');
const { createMessageError } = require('../../utils/utils');
const { send } = require('../services/emailService');
const { generateCode } = require('../../helpers/helpers');

module.exports = {
    async signup(req, res) {
        var user;
        const { email, telefone } = req.body;

        try {
            user = await UsersRepository.findOrCreate(email.toUpperCase(), adjustPhone(telefone));
        } catch (error) {
            return res.status(500).send(error.response);
        }

        if (!user.created) {
            try {
                user = await UsersRepository.update(email.toUpperCase(), adjustPhone(telefone), VARIABLES.VAZIO, VARIABLES.PENDENTE, VARIABLES.VAZIO, VARIABLES.PENDENTE, user.user.id);
            } catch (error) {
                return res.status(error.response.code).send(error.response);
            }
        } else {
            user = user.user;
        }

        var codigo_email;
        try {
            codigo_email = await generateCode(10);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            await send(codigo_email, user.email);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        try {
            user = await UsersRepository.update(user.email, user.telefone, codigo_email, user.status_email, user.codigo_telefone, user.status_telefone, user.id);
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.CREATED).send({ user });
    },
    async search(req, res) {
        var user;
        const { email } = req.query;
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

        return res.status(STATUS_CODE.OK).send({ user });
    },
    async delete(req, res) {
        var deleted;
        const { email } = req.query;

        try {
            deleted = await UsersRepository.delete(email.toUpperCase());
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ deleted });
    }
}