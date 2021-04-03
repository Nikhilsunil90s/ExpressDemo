const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();
const mongoose = require('mongoose');
const session = require('express-session');

const Mongo_Uri = 'mongodb+srv://root:root1234@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority'
// const mongoConnect = require('./utils/database').mongoConnect;
// const getDb = require('./utils/database').getDb;
const MongoDbStore = require('connect-mongodb-session')(session);
const store = new MongoDbStore({
   uri: Mongo_Uri,
   collection: 'sessions',
});

const cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(session({ secret: "My Secret" , resave: false, saveUninitialized: true, store: store }));
// const Product = require('./models/productModel');
const User = require('./models/userModel');
// const Cart = require('./models/cartModel');
// const CartItem = require('./models/cart-itemModel');
// const order = require('./models/orderModel');
// const orderItem = require('./models/order-itemModel');


// Product.belongsTo(User , {constraints: true , onDelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product , { through: CartItem});
// Product.belongsToMany(Cart , {through: CartItem });
// order.belongsTo(User);
// User.hasMany(order);
// order.hasMany(Product);
// Product.belongsToMany(order , {through: orderItem});

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

//const user = require('./models/userModel');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));


server.use((req,res,next) => {
   User.findById("605edcbd42e5fa1bb8547321")
       .then((user) => {
          console.log(user);
          req.user = user;
          next();
       })
       .catch(err => console.log(err))
});

server.use('/auth' , authRoutes);
server.use('/admin', adminRoutes);
server.use(userRoutes);

server.use(errorController.getError);

mongoose.connect('mongodb+srv://root:root1234@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority')
        .then((result) => {
           console.log('Connected!')
            User.findOne()
                .then(user => {
                   if(!user) {
                     const user = new User({
                        name: 'Try',
                        email: 'Try@email.com',
                        cart: {
                           items: []
                        }
                     });
                     user.save();
                   }
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            server.listen(3000);
        })
        .catch(err => console.log(err));


// mongoConnect((client) => {
//    console.log(getDb());
//    server.listen(3000);
// });

// mongoose.connect('mongodb+srv://specialUser:specialuser123@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority')
//         .then(result => {
//                server.listen(3000)
//         })
//         .catch(err => console.log(err));
// sequelize.sync({force: true})
//          .then((result) => {
//             return User.findByPk(1)
//          })
//          .then((user) => {
//             if(!user){
//                return User.create({name: 'TestName' , email: 'TestEmail@Email.com'}); 
//             }
//             return user;
//          })
//          .then((user) => {
//             console.log(user.id);
//             return user.createCart()
//          })
//          .then((data) => {
//             server.listen(3000);
//          })
//          .catch(err => console.log(err));


