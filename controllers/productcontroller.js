const Product = require('../models/productModel');
exports.getAddProducts = (req,res, next) => {
    //res.sendFile(path.join(__dirname, '..' , 'views' , 'addProduct.html'));
    //console.log('In Get Add Controller');
    res.render('layouts/addProduct' , {
        'pageTitle': 'Add Products Here!' 
    })
};


exports.postAddProducts = (req,res) => {
    //console.log(req.body);
    //res.send("<h1>Products Added!</h1>");
    const prod = new Product(req.body.prodName , req.body.prodPrice);
    prod.save();
    
    res.redirect('/');
}


exports.showProducts = (req,res) => {
    //res.sendFile('../views/shopeHome.html');
    //console.log(adminData.Products);
    //res.sendFile(path.join(__dirname, '..' , 'views' , 'shopeHome.html'));
    res.render('layouts/shopHome' , {
        'pageTitle': 'ShopHome!!!!!!!!',
        'Products': Product.fetch(),
    });
}