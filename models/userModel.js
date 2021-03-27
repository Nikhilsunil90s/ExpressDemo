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

user.methods.addToCart = function(product) {
    const cartProdIndex = this.cart.items.findIndex(cp => {
        return product._id.toString() === cp.productId.toString()
    });
    let updatedCartItems = [...this.cart.items];
    let newQuantity = 1;
    if(cartProdIndex >= 0){
        newQuantity = this.cart.items[cartProdIndex].quantity + 1;
        updatedCartItems[cartProdIndex].quantity = newQuantity;
    }
    else{
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    }
    this.cart = updatedCart;

    return this.save()
}


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