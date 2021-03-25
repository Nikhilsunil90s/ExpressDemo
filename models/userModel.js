const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    cart:{
        items: [
            { 
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true} ,
                quantity:  { type: Number, required: true }
            }
        ]
    }
});

module.exports = mongoose.model('User',user)





// const sql = require('sequelize');
// const sequelize = require('../utils/database');

// const user = sequelize.define('users' , {
//     id: {
//         type: sql.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     name: {
//         type: sql.STRING,
//     },
//     email: {
//         type: sql.STRING
//     }
// });


// module.exports = user;