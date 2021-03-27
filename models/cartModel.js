const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema();

module.exports = mongoose.model('Cart',cart);









// // const sql = require('sequelize');
// // const sequelize = require('../utils/database');


// // const cart = sequelize.define('cart' , {
// //     id: {
// //         type: sql.INTEGER,
// //         allowNull: false,
// //         autoIncrement: true,
// //         primaryKey: true,
// //     }
// // });


// module.exports = cart;


