// const Sequelize = require('sequelize');
const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     }    
// });

// module.exports = mongoose.model('Product' , productSchema);
class Product{
    constructor(title, price,desciption){
        this.title = title;
        this.price = price;
        this.description = desciption;
    }

    save() {
        const db = getDb();
        return db.collection('products')
          .insertOne(this)
          .then(result => {
              console.log('Product Created!');
              console.log(result);
          })
          .catch(err => console.log(err))
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static fetchById(pid){
        const db = getDb();
        return db.collection('products').find({ _id: mongodb.ObjectId(pid)}).toArray();
    }
}
// const Product = sequelize.define('Products' , {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false,
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

module.exports = Product;