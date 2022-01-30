const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const Util = require("./Util");

module.exports = {

    generate(email, telefone, codigo_email, codigo_telefone) {

        const token = jwt.sign(
            {
                email,
                telefone,
                codigo_email,
                codigo_telefone
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
        return decode;
    }
}