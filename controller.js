const express = require('express');

const server = express();

const adminData = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');

server.set('view engine' , "ejs");
server.set('views' , 'views');

server.use(express.static('public'));
server.use('/admin', adminData.adminRoutes);
server.use(userRoutes);

server.use((req,res) => {
    res.send("<h1 style = 'text-align:center;color:red'>Page Not Found!</h1>")
});

server.listen(3000);

