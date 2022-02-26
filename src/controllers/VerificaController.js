const TokenService = require('../services/TokenService');
const User = require('../models/User');
module.exports = {
    async verificaEmail(req, res) {

        const { token } = req.params;
        const tokenDecode = TokenService.decode(token);

        const usuario = await User.findAll({
            where: {
                email: tokenDecode.email,
            }
        });

        if (usuario[0]) {

            if (usuario[0].status_email === "A") {

                return res.status(202).send({
                    message: "ESTE EMAIL JÁ FOI CONFIRMADO!",
                    error: false
                });
            } else {

                if (usuario[0].codigo_email === tokenDecode.codigo_email) {

                    const result = await User.update({
                        status_email: 'A'
                    }, {
                        where: { email: usuario[0].email }
                    });

                    if (!result) {

                        return res.status(500).send({
                            message: "ERRO AO VERIFICAR EMAIL!",
                            error: true
                        });
                    } else {

                        return res.status(200).send({
                            message: "EMAIL VERIFICADO COM SUCESSO!",
                            error: false,
                            email: tokenDecode.email,
                            telefone: tokenDecode.telefone
                        });
                    }
                } else {

                    return res.status(404).send({
                        message: "CÓDIGO DO TOKEN NÃO CORRESPONDE AO CADASTRADO!",
                        error: true
                    });
                }
            }
        } else {

            return res.status(404).send({
                message: "USUÁRIO NÃO ENCONTRADO",
                error: true
            });
        }

    },
    async verificaTelefone(req, res) {

        const { codigo } = req.params;
        const { email } = req.body;

        const usuario = await User.findAll({
            where: {
                email: email,
            }
        });

        if (usuario[0]) {

            if (usuario[0].status_telefone === "A") {

                return res.status(202).send({
                    message: "ESTE EMAIL JÁ FOI CONFIRMADO!",
                    error: false
                });
            } else {

                if (usuario[0].codigo_telefone === codigo) {

                    const result = await User.update({
                        status_telefone: 'A'
                    }, {
                        where: { email: usuario[0].email }
                    });

                    if (!result) {

                        return res.status(500).send({
                            message: "ERRO AO VERIFICAR TELEFONE!",
                            error: true
                        });
                    } else {

                        return res.status(200).send({
                            message: "TELEFONE VERIFICADO COM SUCESSO!",
                            error: false
                        });
                    }
                } else {

                    return res.status(404).send({
                        message: "CÓDIGO NÃO CORRESPONDE AO CADASTRADO!",
                        error: true
                    });
                }
            }
        } else {

            return res.status(404).send({
                message: "USUÁRIO NÃO ENCONTRADO",
                error: true
            });
        }
    },
    async verificaStatus(req, res) {

        const { email } = req.body;

        const usuario = await User.findAll({
            where: {
                email: email,
                status_telefone: 'A',
                status_email: 'A'
            }
        });

        if (usuario[0]) {

            return res.status(200).send({ message: "USUÁRIO VERIFICADO!", error: false });
        } else {

            return res.status(400).send({
                message: "USUÁRIO NÃO VERIFICADO OU NÃO EXISTE!",
                error: true
            });
        }
    }
}