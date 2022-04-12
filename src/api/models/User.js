const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {

        super.init({
            email: DataTypes.STRING,
            codigo_email: DataTypes.STRING,
            status_email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            codigo_telefone: DataTypes.STRING,
            status_telefone: DataTypes.STRING,
            
        }, {
            sequelize
        })
    }
}

module.exports = User;