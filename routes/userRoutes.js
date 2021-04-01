const userRoutes = require('express').Router();
const path = require('path');
const productController = require('../controllers/productcontroller');

userRoutes.get('/' , productController.showProducts);

userRoutes.get('/cart' , productController.showCart);

userRoutes.get('/decreaseQty/:prodId',productController.decreaseQty);
userRoutes.post('/postOrder' , productController.postOrder);

userRoutes.get('/orderPage' , productController.getOrder);

userRoutes.get('/product/addToCart/:prodId' , productController.addCart);

userRoutes.get('/product/deleteFromCart/:prodId' , productController.deleteFromCart);

userRoutes.get('/product/:prodId' , productController.getDetails);

userRoutes.get('/login' , productController.login);

// // userRoutes.get('/product/:prodId' , productController.getDetails);

module.exports = userRoutes;

