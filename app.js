const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();

const sequelize = require('./utils/database');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cart-itemModel');

Product.belongsTo(User , {constraints: true , onDelete: 'CASCADE'});
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product , { through: CartItem})
Product.belongsToMany(CartItem , {through: CartItem })

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));

server.use((req,res,next) => {
   User.findByPk(2)
       .then((user) => {
          req.user = user;
          next();
       })
       .catch(err => console.log(err))
});

server.use('/admin', adminRoutes);
server.use(userRoutes);

server.use(errorController.getError);

sequelize.sync()
         .then((result) => {
            return User.findByPk(2)
         })
         .then((user) => {
            if(!user){
               return User.create({name: 'TestName' , email: 'TestEmail@Email.com'}); 
            }
            return user;
         })
         .then((user) => {
            console.log(user.id);
            server.listen(3000);
         })
         .catch(err => console.log(err));


