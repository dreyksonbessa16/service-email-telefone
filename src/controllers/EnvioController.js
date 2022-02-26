const User = require("../models/User");
const Util = require("../services/Util");
const serviceEmail = require("../services/EmailService");
const serviceTelefone = require("../services/PhoneService");
const serviceToken = require("../services/TokenService");

module.exports = {
    async cadastro(req, res) {

        const codigo_email = Util.geraCodigoHash(10);
        const codigo_telefone = Util.geraCodigoHash(5);
        const { email, telefone } = req.body;

        const usuario = await User.findAll({
            where: {
                email: email,
                status_telefone: 'A',
                status_email: 'A'
            }
        });

        if (usuario[0]) {

            return res.status(409).send({ message: "ESTE USUÁRIO JÁ FOI CONFIRMADO!", error: true });
        }

        const [user, created] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                email,
                codigo_email,
                status_email: 'P',
                telefone,
                codigo_telefone,
                status_telefone: 'P'

            }
        });

        if (!created) {
            await User.update({
                codigo_email, codigo_telefone
            }, {
                where: { email: user.email }
            });
        }

        const token = serviceToken.generate(user.email, user.telefone, codigo_email, codigo_telefone);

        await serviceEmail.send(token, user.email).then((res) => {

            if (!res) {

                return res.status(500).send({ message: "ERRO AO ENVIAR EMAIL", error: true });
            }
        });
        await serviceTelefone.send(codigo_telefone, '+55' + telefone).then((res) => {

            if (!res) {

                return res.status(500).send({ message: "ERRO AO ENVIAR SMS", error: true });
            }
        })

        return res.status(200).send({ message: "EMAIL E TELEFONE ENVIADO COM SUCESSO", error: false });
    }
};