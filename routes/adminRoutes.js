const adminRoutes = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');

const Products = [];

adminRoutes.use(bodyParser.urlencoded({extended: true}));

adminRoutes.use(bodyParser.json());

adminRoutes.get('/addProduct' , (req,res)=> {
    //res.sendFile(path.join(__dirname, '..' , 'views' , 'addProduct.html'));
    res.render('layouts/addProduct' , {
        'pageTitle': 'Add Products Here!' 
    })
});

adminRoutes.post('/addProduct' , (req,res) => {
    //console.log(req.body);
    Products.push(req.body);
    //res.send("<h1>Products Added!</h1>");
    res.redirect('/');
});


// module.exports = Products;
// module.exports = adminRoutes; // must come in the end!!!!

exports.Products = Products;
exports.adminRoutes = adminRoutes;

