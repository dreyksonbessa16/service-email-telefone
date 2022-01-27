const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

module.exports = {

    generate(email) {

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let codigo = '';

        for (let i = 0; i < 5; i++) {
            codigo += characters[Math.floor(Math.random() * characters.length)];
        }

        const token = jwt.sign(
            {
                email: email,
                codigo: codigo
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h",
            }
        );

        return token;
    },
    decode(token) {
        
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
    }
}