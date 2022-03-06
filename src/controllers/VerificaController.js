const User = require('../models/User');
const logger = require("../../logger");

module.exports = {
    async verificaEmail(req, res) {

        const { codigo } = req.params;
        const { email } = req.body;

        const user = await User.findAll({
            where: {
                email
            }
        });

        if (!user[0]) {

            logger.error(`VerificaController: USUÁRIO NÃO ENCONTRADO - { email: ${email} }`);
            return res.status(404).send({ message: "USUÁRIO NÃO ENCONTRADO" });
        }

        logger.info(`EnvioController: USUÁRIO LOCALIZADO - { email: ${email} }`);

        if (user[0].codigo_email === codigo) {

            const userUpdate = await User.update({
                status_email: 'A'
            }, {
                where: {
                    email: email
                }
            });

            if (!userUpdate[0]) {

                logger.error(`VerificaController: ERRO AO VERIFICAR EMAIL - { email: ${email} }`);
                return res.status(500)({ message: "ERRO AO VERIFICAR EMAIL!" });
            }
        } else {
            
            logger.error(`VerificaController: CÓDIGO NÃO CORRESPONDE AO CÓDIGO CADASTRADO - { email: ${email} }`);
            return res.status(422).send({ message: "CÓDIGO INVÁLIDO!" });
        }
        
        logger.info(`VerificaController: EMAIL VERIFICADO COM SUCESSO - { email: ${email} }`);
        return res.status(200).send({ message: "EMAIL VERIFICADO COM SUCESSO!" });
    },
    async verificaTelefone(req, res) {

        const { codigo } = req.params;
        const { email } = req.body;

        const user = await User.findAll({
            where: {
                email
            }
        });

        if (!user[0]) {

            logger.error(`VerificaController: USUÁRIO NÃO ENCONTRADO - { email: ${email} }`);
            return res.status(404).send({ message: "USUÁRIO NÃO ENCONTRADO" });
        }

        logger.info(`EnvioController: USUÁRIO LOCALIZADO - { email: ${email} }`);

        if (user[0].codigo_telefone === codigo) {

            const userUpdate = await User.update({
                status_telefone: 'A'
            }, {
                where: {
                    email: email
                }
            });

            if (!userUpdate[0]) {

                logger.error(`VerificaController: ERRO AO VERIFICAR SMS - { email: ${email} }`);
                return res.status(500)({ message: "ERRO AO VERIFICAR SMS!" });
            }
        } else {

            logger.error(`VerificaController: CÓDIGO NÃO CORRESPONDE AO CÓDIGO CADASTRADO - { email: ${email} }`);
            return res.status(422).send({ message: "CÓDIGO INVÁLIDO!" });
        }
        
        logger.error(`VerificaController: SMS VERIFICADO COM SUCESSO - { email: ${email} }`);
        return res.status(200).send({ message: "SMS VERIFICADO COM SUCESSO!" });
    },
    async verificaStatusEmail(req, res) {

        const { email } = req.body;

        const user = await User.findAll({
            where: {
                email
            }
        });

        if (!user[0]) {

            logger.error(`VerificaController: USUÁRIO NÃO ENCONTRADO - { email: ${email} }`);
            return res.status(404).send({ message: "USUÁRIO NÃO ENCONTRADO" });
        }

        logger.info(`EnvioController: USUÁRIO LOCALIZADO - { email: ${email} }`);

        if (user[0].status_email !== "A") {
            
            logger.error(`VerficaController: EMAIL NÃO VERIFICADO - { email: ${email} }`);
            return res.status(422).send({ message: "EMAIL NÃO VERIFICADO! POR FAVOR, VERIFIQUE SUA CAIXA DE ENTRADA OU SPAN!" });
        }
        
        logger.info(`VerficaController: EMAIL JÁ VERIFICADO - { email: ${email} }`);
        return res.status(200).send({ message: "EMAIL JÁ VERIFICADO!" });
    },

    async verificaStatusTelefone(req, res) {

        const { email } = req.body;

        const user = await User.findAll({
            where: {
                email
            }
        });

        if (!user[0]) {

            logger.error(`VerificaController: USUÁRIO NÃO ENCONTRADO - { email: ${email} }`);
            return res.status(404).send({ message: "USUÁRIO NÃO ENCONTRADO" });
        }

        logger.info(`EnvioController: USUÁRIO LOCALIZADO - { email: ${email} }`);

        if (user[0].status_telefone !== "A") {
            
            logger.error(`VerficaController: TELEFONE NÃO VERIFICADO - { email: ${email} }`);
            return res.status(422).send({ message: "TELEFONE NÃO VERIFICADO!" });
        }
        
        logger.info(`VerficaController: TELEFONE JÁ VERIFICADO - { email: ${email} }`);
        return res.status(200).send({ message: "TELEFONE JÁ VERIFICADO!" });
    }
}