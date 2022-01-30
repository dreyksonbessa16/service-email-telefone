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

        serviceEmail.send(token, user.email);
        serviceTelefone.send(codigo_telefone, '+55' + telefone);

        return res.json({ message: 'TRUE' });
    }
};