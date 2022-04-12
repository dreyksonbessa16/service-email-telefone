const User = require('../models/User');
const VARIABLES = require('../../constantes/variables.json');
const MESSAGES = require('../../constantes/messages.json');
const STATUS_CODE = require('../../constantes/status_code.json');
const { createMessageError } = require('../../utils/utils');
const { Op } = require("sequelize");

exports.findOrCreate = async (email, telefone) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                email,
                codigo_email: VARIABLES.VAZIO,
                status_email: VARIABLES.PENDENTE,
                telefone,
                codigo_telefone: VARIABLES.VAZIO,
                status_telefone: VARIABLES.PENDENTE
            }
        });
        return { user, created };
    } catch (error) {
        createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_MODEL, { message: error.message });
        throw error;
    }
}

exports.findNaoVerificados = async () => {
    try {
        return await User.findAll({
            where: {
                [Op.or]: [
                    { status_email: VARIABLES.PENDENTE },
                    { status_telefone: VARIABLES.PENDENTE }
                ]
            }
        });
    } catch (error) {
        createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_MODEL, { message: error.message });
        throw error;
    }
}

exports.update = async (email, telefone, codigo_email, status_email, codigo_telefone, status_telefone, id) => {
    try {
        await User.update({
            email,
            codigo_email,
            status_email,
            telefone,
            codigo_telefone,
            status_telefone
        }, {
            where: {
                id
            }
        });
        return this.findOne(email);
    } catch (error) {
        createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_MODEL, { message: error.message });
        throw error;
    }
}

exports.findOne = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_MODEL, { message: error.message });
        throw error;
    }
}

exports.delete = async (email) => {
    try {
        const deleted = await User.destroy({
            where: {
                email
            }
        });
        return deleted;
    } catch (error) {
        createMessageError(error, STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERRORS.MSG_MODEL, { message: error.message });
        throw error;
    }
}