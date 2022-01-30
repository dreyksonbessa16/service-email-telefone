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

        if (usuario[0].status_email === 'P') {

            if (usuario[0].codigo_email === tokenDecode.codigo_email) {

                const result = await User.update({
                    status_email: 'A'
                }, {
                    where: { email: usuario[0].email }
                });
                if (!result) {
                    return res.json({ message: "Erro ao Verificar Email" });
                }
            }
        }
        return res.json({
            message: "Email Verificado com Sucesso!", 
            email: tokenDecode.email, 
            telefone: tokenDecode.telefone
        });
    },
    async verificaTelefone(req, res) {
        const { codigo } = req.params;
        const { email } = req.body;

        const usuario = await User.findAll({
            where: {
                email: email,
            }
        });

        if (usuario[0].status_telefone === 'P') {

            if (usuario[0].codigo_telefone === codigo) {

                const result = await User.update({
                    status_telefone: 'A'
                }, {
                    where: { email: usuario[0].email }
                });
                if (!result) {
                    return res.json({ message: "Erro ao Verificar Telefone" });
                }
            }
        }
        return res.json({
            message: "Telefone Verificado com Sucesso!"
        });
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
            return res.json({ message: "TRUE"});
        }
        return res.json({
            message: "Verifique seu email e telefone novamente!"
        });
    }
}