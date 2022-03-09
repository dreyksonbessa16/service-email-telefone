const User = require("../models/User");
const logger = require("../../logger");

module.exports = {
    async deletarUsuario(req, res) {

        let email = req.params.email;
        email = email.toUpperCase();

        const findUser = await User.findAll({
            where: {
                email: email
            }
        });

        if (findUser[0]) {
            const user = await User.destroy({
                where: {
                    email: email
                }
            });

            if (user) {

                return res.status(200).send({ message: "USUÁRIO EXCLUÍDO COM SUCESSO!" });
            } else {

                logger.error(`ExcluirController: ERRO AO EXCLUIR USUÁRIO - { email: ${email} }`);
                return res.status(500).send({ message: "ERRO AO EXCLUIR USUÁRIO!" });
            }
        } else {

            return res.status(404).send({ message: "USUÁRIO NÃO EXISTE!" });
        }
    }
}