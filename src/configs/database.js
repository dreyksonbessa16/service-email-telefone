require('dotenv').config();
module.exports = {
    dialect: process.env.DIALECT_DATABASE,
    host: process.env.HOST_DATABASE,
    username: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE,
    define: {
        timestamps: true,
        underscored: true
    },
    logging: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // },

};