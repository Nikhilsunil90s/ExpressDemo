const userRoutes = require('express').Router();
const path = require('path');
const productController = require('../controllers/productcontroller');

userRoutes.get('/' , productController.showProducts);

module.exports = userRoutes;

