const User = require("../models/User");
const Util = require("../services/Util");
const serviceEmail = require("../services/EmailService");
const serviceTelefone = require("../services/PhoneService");
const logger = require("../../logger");

module.exports = {

    async envioEmail(req, res) {

        const codigo_email = Util.geraCodigoHash(10);
        const { telefone } = req.body;
        let email = req.body.email;
        email = email.toUpperCase();

        const [user, created] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                email,
                codigo_email,
                status_email: 'P',
                telefone,
                codigo_telefone: '',
                status_telefone: ''

            }
        });

        logger.info(`EnvioController: USUÁRIO CRIADO OU LOCALIZADO - { email: ${email}, telefone: ${telefone} }`);


        if (!created) {

            const userUpdate = await User.update({
                codigo_email,
                status_email: 'P',
                codigo_telefone: '',
                status_telefone: ''
            }, {
                where: { email }
            });


            if (!userUpdate[0]) {

                logger.error(`EnvioController: ERRO AO ATUALIZAR USUÁRIO - { email: ${email}, telefone: ${telefone} }`);
                return res.status(500).send({ message: "ERRO AO ATUALIZAR USUÁRIO!" });
            }
        }

        await serviceEmail.send(codigo_email, email).then((data) => {

            if (!data) {

                return res.status(500).send({ message: "ERRO AO ENVIAR EMAIL!" });
            }
        });

        return res.status(200).send({ message: "EMAIL ENVIADO COM SUCESSO! VERIFIQUE SUA CAIXA DE ENTRADA E SPAN!" });
    },

    async envioTelefone(req, res) {

        let email = req.body.email;
        email = email.toUpperCase();
        const codigo_telefone = Util.geraCodigoHash(5);

        const user = await User.findAll({
            where: {
                email
            }
        });

        logger.info(`EnvioController: USUÁRIO LOCALIZADO - { email: ${email} }`);

        if (user[0].status_email === "P") {

            return res.status(400).send({ message: "SEU EMAIL AINDA NÃO FOI VERIFICADO!" });
        }

        await serviceTelefone.send(codigo_telefone, '+55' + user[0].telefone).then((data) => {

            if (!data) {

                return res.status(500).send({ message: "ERRO AO ENVIAR SMS", error: true });
            }
        });

        const userUpdate = await User.update({
            codigo_telefone,
            status_telefone: 'P'
        }, {
            where: { email }
        });

        if (!userUpdate[0]) {

            logger.error(`EnvioController: ERRO AO ATUALIZAR USUÁRIO - { email: ${email} }`);
            return res.status(500)({ message: "ERRO AO ATUALIZAR USUÁRIO!" });
        }

        return res.status(200).send({ message: "SMS ENVIADO COM SUCESSO" });
    }
};