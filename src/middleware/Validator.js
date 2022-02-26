const validatorEmail = require("email-validator");
const TokenService = require("../services/TokenService");

exports.validatorFieldsInput = (req, res, next) => {

    let errorMessage = "";
    let error = false;
    const { email, telefone } = req.body;

    if (email === "") {

        errorMessage = "EMAIL NÃO PODE SER VAZIO!"
        error = true;
    }

    if (!validatorEmail.validate(email)) {

        errorMessage = "EMAIL NÃO É VÁLIDO!"
        error = true;
    }

    if (telefone === "") {

        errorMessage = "TELEFONE NÃO PODE SER VAZIO!"
        error = true;
    }

    if (error) {

        return res.status(400).send({ message: 'PARÂMETROS INVALIDOS', field: errorMessage });
    }

    next();
}

exports.validatorFieldsDelete = (req, res, next) => {

    let errorMessage = "";
    let error = false;
    const email = req.params.email;

    if (!validatorEmail.validate(email)) {

        errorMessage = "EMAIL NÃO É VÁLIDO!"
        error = true;
    }

    if (error) {

        return res.status(400).send({ message: 'PARÂMETROS INVALIDOS', field: errorMessage });
    }
    next();
}
exports.validatorFieldsVerifyEmail = (req, res, next) => {

    let errorMessage = "";
    let error = false;
    const token = req.params.token;
    const tokenDecode = TokenService.decode(token);


    if (tokenDecode === 0) {

        errorMessage = "ERRO AO DECODIFICAR TOKEN!";
        error = true;
    }

    if (error) {

        return res.status(400).send({ message: 'PARÂMETROS INVALIDOS', field: errorMessage });
    }

    next();
}

exports.validatorFieldsVerifyTelefone = (req, res, next) => {

    let errorMessage = "";
    let error = false;
    const email = req.body.email;


    if (!validatorEmail.validate(email)) {

        errorMessage = "EMAIL NÃO É VÁLIDO!"
        error = true;
    }

    if (error) {

        return res.status(400).send({ message: 'PARÂMETROS INVALIDOS', field: errorMessage });
    }

    next();
}