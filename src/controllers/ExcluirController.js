const User = require("../models/User");
const logger = require("../../logger");

module.exports = {
    async deletarUsuario(req, res) {

        const findUser = await User.findAll({
            where: {
                email: req.params.email
            }
        });

        if (findUser[0]) {
            const user = await User.destroy({
                where: {
                    email: req.params.email
                }
            });

            if (user) {

                return res.status(200).send({ message: "USUÁRIO EXCLUÍDO COM SUCESSO!", error: false });
            } else {

                logger.error(`ExcluirController: ERRO AO EXCLUIR USUÁRIO - { email: ${req.params.email} }`);
                return res.status(500).send({ message: "ERRO AO EXCLUIR USUÁRIO!", error: true })
            }
        } else {

            return res.status(404).send({ message: "USUÁRIO NÃO EXISTE!", error: true })
        }


    }
}