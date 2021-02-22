const userRoutes = require('express').Router();
const path = require('path');
const adminData = require('./adminRoutes');

userRoutes.get('/' , (req,res) => {
    //res.sendFile('../views/shopeHome.html');
    console.log(adminData.Products);
    //res.sendFile(path.join(__dirname, '..' , 'views' , 'shopeHome.html'));
    res.render('layouts/shopHome' , {
        'pageTitle': 'ShopHome!!!!!!!!',
        'Products': adminData.Products,
    });
});

//userRoutes.get();


module.exports = userRoutes;

