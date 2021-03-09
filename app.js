const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();

const sequelize = require('./utils/database');
const Product = require('./models/productModel');
const User = require('./models/userModel');

Product.belongsTo(User , {constraints: true , onDelete: 'CASCADE'});

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));


server.use((req,res,next) => {
   User.findByPk(1)
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
            return User.findByPk(1)
         })
         .then((user) => {
            if(!user){
               return User.create({name: 'TestName' , email: 'TestEmail@Email.com'}); 
            }
            return user;
         })
         .then((user) => {
            console.log(user);
            server.listen(3000);
         })
         .catch(err => console.log(err));


