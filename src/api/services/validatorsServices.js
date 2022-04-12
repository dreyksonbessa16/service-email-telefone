const validatorEmail = require('email-validator')
const MESSAGES = require('../../constantes/messages.json');
const CONTAINERS = require('../../constantes/containers.json');
const { adjustPhone } = require('../../utils/utils');

module.exports = {
    emailValidate(email, messageDetail, listDetails) {

        var error = false;
        messageDetail.field = "user.email";

        if (email === undefined) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.UNDEFINED;
        } else if (email === null) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.NULL;
        } else if (email === '') {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.VAZIO;
        } else if (!validatorEmail.validate(email)) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.INVALIDO;
        }

        if (error) {
            listDetails.push({ field: messageDetail.field, message: messageDetail.message });
        }
    },
    phoneValidate(phone, messageDetail, listDetails) {

        var error = false;
        messageDetail.field = "user.telefone";

        if (phone === undefined) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.UNDEFINED;
        } else if (phone === null) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.NULL;
        } else if (phone === "") {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.VAZIO;
        } else {
            phone = adjustPhone(phone);
            const ddd = phone.substring(3, 5);
            const number = phone.substring(5);
            if (!CONTAINERS.dddsBrasil.includes(ddd)) {
                error = true;
                messageDetail.message = MESSAGES.ERROR_DETAILS.DDD_NAO_EXISTE;
            } else if (number.length !== 9) {
                error = true;
                messageDetail.message = MESSAGES.ERROR_DETAILS.INVALIDO;
            } else if (number.substring(0, 1) !== "9") {
                error = true;
                messageDetail.message = MESSAGES.ERROR_DETAILS.NUMERO_SEM_9;
            }
        }

        if (error) {
            listDetails.push({ field: messageDetail.field, message: messageDetail.message });
        }
    },
    codigoEmailValidate(codigo_email, messageDetail, listDetails) {

        var error = false;
        messageDetail.field = "user.codigo_email";

        if (codigo_email === undefined) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.UNDEFINED;
        } else if (codigo_email === null) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.NULL;
        } else if (codigo_email === "") {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.VAZIO;
        }

        if (error) {
            listDetails.push({ field: messageDetail.field, message: messageDetail.message });
        }
    },
    codigoTelefoneValidate(codigo_telefone, messageDetail, listDetails) {

        var error = false;
        messageDetail.field = "user.codigo_telefone";

        if (codigo_telefone === undefined) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.UNDEFINED;
        } else if (codigo_telefone === null) {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.NULL;
        } else if (codigo_telefone === "") {
            error = true;
            messageDetail.message = MESSAGES.ERROR_DETAILS.VAZIO;
        }

        if (error) {
            listDetails.push({ field: messageDetail.field, message: messageDetail.message });
        }
    }
}