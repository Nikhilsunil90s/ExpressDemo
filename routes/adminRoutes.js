const express = require('express')
const adminRoutes = express.Router();

const path = require('path');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null , 'uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});

const myFilter = (re,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
        cb(null, true)
    }
    else{
        cb(new Error("File Is Not An Image!"));
    }
}

const upload = multer({storage: fileStorage , fileFilter: myFilter});

// const bodyParser = require('body-parser');
const productController = require('../controllers/productcontroller');

adminRoutes.use(express.urlencoded({extended: true}));

adminRoutes.use(express.json());

adminRoutes.get('/addProduct' , productController.getAddProducts);

adminRoutes.post('/addProduct' , upload.single('prodFile') , productController.postAddProducts);

adminRoutes.get('/list-products' , productController.showAdminProducts);

adminRoutes.get('/edit/:prodId' , productController.getEditProduct);

adminRoutes.post('/edit/:prodId' , productController.postEditProduct);

adminRoutes.get('/delete/:prodId' , productController.deleteProduct);


// module.exports = Products;
// module.exports = adminRoutes; // must come in the end!!!!

module.exports = adminRoutes;

