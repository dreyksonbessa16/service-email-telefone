const Sequelize = require("sequelize");
const dbconfib = require("../configs/database");

const User = require("../api/models/User");

const connection = new Sequelize(dbconfib);

User.init(connection);

/*Teste de conexao*/
// try {
//     connection.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = connection;