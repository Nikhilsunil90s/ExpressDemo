// const Sequelize = require('sequelize');
//const mongodb = require('mongodb');
//const getDb = require('../utils/database').getDb;

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const product = new schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }
}) // a model for a collection is created here

module.exports = mongoose.model('Product' , product);

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
// class Product{
//     constructor(title, price,desciption,id){
//         this.title = title;
//         this.price = price;
//         this.description = desciption;
//         this._id = id ? mongodb.ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if(this._id){
//             dbOp = db.collection('products').updateOne({_id: mongodb.ObjectId(this._id) } , { $set: this});
//         }
//         else{
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//           .then(result => {
//               console.log('Product Created!');
//               console.log(result);
//           })
//           .catch(err => console.log(err))
//     }

//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products').find().toArray();
//     }

//     static fetchById(pid){
//         const db = getDb();
//         return db.collection('products').find({ _id: mongodb.ObjectId(pid)}).toArray();
//     }

//     static deleteById(pid){
//         const db=getDb();
//         return db.collection('products').deleteOne({_id : mongodb.ObjectId(pid)});
//     }
// }
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
