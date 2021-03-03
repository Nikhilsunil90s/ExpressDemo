const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('Products' , {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;