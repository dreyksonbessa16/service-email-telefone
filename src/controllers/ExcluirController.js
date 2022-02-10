const User = require("../models/User");

module.exports = {
    async deletarUsuario(req, res){

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
                
                return res.json({ message: "Usuário excluido com Sucesso!"})
            } else {
                
                return res.json({ message: "Erro ao excluir usuário!"})
            }
        } else {

            return res.json({ message: "Usuário não existe!"})
        }


    }
}