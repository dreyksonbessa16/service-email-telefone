const UsersRepository = require('../repositories/UsersRepository');
const STATUS_CODE = require('../../constantes/status_code.json');
const VARIABLES = require('../../constantes/variables.json');

module.exports = {
    async buscaNaoVerificados(req, res) {
        var users;
        try {
            users = await UsersRepository.findNaoVerificados();
        } catch (error) {
            return res.status(error.response.code).send(error.response);
        }

        return res.status(STATUS_CODE.OK).send({ users });
    }
}