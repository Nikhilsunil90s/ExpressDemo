// // const mysql = require('mysql2');

// // const Pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     database: 'nodedb',
// //     password: 'webcom123'
// // });

// // module.exports = Pool.promise(); // Promise

// const Sequelize = require('sequelize');

// const se = new Sequelize('sequeldb' , 'root' , 'webcom123' , {
//     dialect: 'mysql',
//     host: 'localhost'
// });
//8ou1lvQwMWDWtegF

// module.exports = se;
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
const getDb = () => {
    if (_db){
        return _db;
    }
    throw "DB Not Created Yet!";
}

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://demo:demo1234@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority')
           .then(clientObj => {
               console.log(clientObj);
               console.log('Connected!');
               _db = clientObj.db(); // get current database
               callback();
           })
           .catch((err) => {
               console.log(err)
               throw err;
            })
}

//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
