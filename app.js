const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();

const sequelize = require('./utils/database');

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));
server.use('/admin', adminRoutes);
server.use(userRoutes);

server.use(errorController.getError);

sequelize.sync()
         .then((result) => {
            console.log(result);
            server.listen(3000);
         })
         .catch(err => console.log(err));


