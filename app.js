const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));
server.use('/admin', adminRoutes);
server.use(userRoutes);

server.use(errorController.getError);

server.listen(3000);

