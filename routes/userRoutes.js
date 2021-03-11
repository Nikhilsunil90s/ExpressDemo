const userRoutes = require('express').Router();
const path = require('path');
const productController = require('../controllers/productcontroller');

userRoutes.get('/' , productController.showProducts);

userRoutes.get('/cart' , productController.showCart);

userRoutes.get('/product/addToCart/:prodId' , productController.addCart);

userRoutes.get('/product/:prodId' , productController.getDetails);


module.exports = userRoutes;

