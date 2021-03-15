const sql = require('sequelize');
const sequelize = require('../utils/database');


const orderItem = sequelize.define('orderItem' , {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: sql.INTEGER,
});


module.exports = orderItem;