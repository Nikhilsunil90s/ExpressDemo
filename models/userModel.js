const sql = require('sequelize');
const sequelize = require('../utils/database');

const user = sequelize.define('users' , {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sql.STRING,
    },
    email: {
        type: sql.STRING
    }
});


module.exports = user;