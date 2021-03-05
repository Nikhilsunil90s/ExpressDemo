const adminRoutes = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');
const productController = require('../controllers/productcontroller');

adminRoutes.use(bodyParser.urlencoded({extended: true}));

adminRoutes.use(bodyParser.json());

adminRoutes.get('/addProduct' , productController.getAddProducts);

adminRoutes.post('/addProduct' , productController.postAddProducts);

adminRoutes.get('/list-products' , productController.showProducts);

adminRoutes.get('/edit/:prodId' , productController.getEditProduct);

adminRoutes.post('/edit/:prodId' , productController.postEditProduct);

adminRoutes.get('/delete/:prodId' , productController.deleteProduct);


// module.exports = Products;
// module.exports = adminRoutes; // must come in the end!!!!

module.exports = adminRoutes;

