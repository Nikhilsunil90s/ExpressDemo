const express = require('express')
const adminRoutes = express.Router();

const path = require('path');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

// const bodyParser = require('body-parser');
const productController = require('../controllers/productcontroller');

adminRoutes.use(express.urlencoded({extended: true}));

adminRoutes.use(express.json());

adminRoutes.get('/addProduct' , productController.getAddProducts);

adminRoutes.post('/addProduct' , productController.postAddProducts);

adminRoutes.get('/list-products' , productController.showAdminProducts);

adminRoutes.get('/edit/:prodId' , productController.getEditProduct);

adminRoutes.post('/edit/:prodId' , productController.postEditProduct);

adminRoutes.get('/delete/:prodId' , productController.deleteProduct);


// module.exports = Products;
// module.exports = adminRoutes; // must come in the end!!!!

module.exports = adminRoutes;

