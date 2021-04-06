
// const mongodb = require('mongodb');
// const cartItem = require('../models/cart-itemModel');
// const cart = require('../models/cartModel');
const Product = require('../models/productModel');
// const User = require('../models/cartModel');
const Order = require('../models/orderModel');

const escapeRegex = require('../public/js/regex-escape.js')


exports.getAddProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..' , 'views' , 'addProduct.html'));
    //console.log('In Get Add Controller');
    res.render('layouts/addProduct', {
        'exist': false,
        'pageTitle': 'Add Products Here!',
        'prodId': '',
        'prodName': '',
        'prodDesc': '',
        'prodPrice': '',
        'isAuthenticated': req.cookies.loggedIn,
        //'isAuthenticated': req.isLoggedIn,
    })
};



exports.getDetails = (req, res, next) => {
    const pId = req.params.prodId;
    console.log(pId);
    Product.findById(pId)
        .then((results) => {
            console.log(results);
            res.render('layouts/product-detail.ejs', {
                'pageTitle': results.title,
                'prodName': results.title,
                'prodPrice': results.price,
                'prodDesc': results.description,
                'prodId': pId,
                'isAuthenticated': req.session.isLoggedIn,
            })
        })
        .catch(err => console.log(err))

};

exports.postOrder = (req, res) => {
    req.user
       .populate('cart.items.productId')
       .execPopulate()
       .then(user => {
           const prods = user.cart.items.map(item => {
               return { quantity: item.quantity , product: { ...item.productId._doc } }
           })
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: prods,
            });
            return order.save();
        })
        .then(result => {
            console.log('Order Created!')
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orderPage');
        })
        .catch(err => {
            console.log(err);
        });
//     let fetchedCart;
//     req.user
//         .getCart()
//         .then(cart => {
//             fetchedCart = cart;
//             return cart.getProducts();
//         })
//         .then(products => {
//             return req.user.createOrder()
//                 .then(order => {
//                     return order.addProducts(products.map((product) => {
//                         product.orderItem = { quantity: product.cartItem.quantity };
//                         return product;
//                     }))
//                 })
//                 .then(result => {
//                     console.log('Order Added!');
//                     return fetchedCart.setProducts(null);
//                 })
//                 .then(result => {
//                     res.redirect('/orderPage');
//                 })
//                 .catch(err => console.log(err));
//         })
}

exports.getOrder = (req, res) => {
        Order.find({ "user.userId" : req.user._id })
             .then((orders) => {
                 console.log(orders);
        res.render('layouts/order' , { pageTitle : 'orders' , example : orders , })
             })
             .catch(err => console.log(err));
    }

//     req.user.getOrders()
//         .then(orders => {
//             console.log(orders);
//             res.render('layouts/orderPage', {
//                 pageTitle: 'orders',
//                 order: orders
//             })
//         })


exports.postAddProducts = (req, res) => {

    Product.create({
        title: req.body.prodName,
        price: req.body.prodPrice,
        description: req.body.prodDescription,
        userId: req.user._id,
    })
        .then(() => {
            console.log('Product Added');
            res.redirect('/')
        })
        .catch(err => console.log(err))
    //     // const product = new Product({  //mongo work
    //     //     title: req.body.prodName,
    //     //     price: req.body.prodPrice,
    //     //     description: req.body.prodDescription
    //     // });
    //     // product.save()
    //     //        .then((result) => {
    //     //            console.log("Product Saved!");
    //     //            res.redirect('/')
    //     //        })
    //     //        .catch(err => console.log(err));
    //     // req.user //sequelize work
    //     //     .createProduct({
    //     //         title: req.body.prodName,
    //     //         price: req.body.prodPrice,
    //     //         description: req.body.prodDescription,
    //     //     })
    //     const product = new Product(req.body.prodName, req.body.prodPrice, req.body.prodDescription)
    //     product.save()
    //         .then((resp) => {
    //             //console.log(resp);
    //             res.redirect('/');
    //         })
    //         .catch(err => console.log(err))
};

exports.showProducts = (req, res) => {
    console.log(req.session);

    const isAdmin = (req.url == '/list-products') ? true : false;
//    const isLogged = req.get('cookie').split(';')[1].trim().split('=')[1] === "true";
   //console.log(req.cookies.loggedIn);
    Product.find()
        .populate('userId')
        .then((results) => {
            // console.log(results);
            res.render('layouts/shopHome', {
                'isAdmin': isAdmin,
                'pageTitle': 'ShopHome!!!!!!!!',
                'Products': results,
                'imageSRC': 'data:image/jpeg;base64,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',
                'isAuthenticated': req.session.isLoggedIn,
            })
        }).catch(err => console.log(err));




    //     Product.fetchAll()er
    //         .then(products => {
    //             //console.log(results);
    //             res.render('layouts/shopHome', {
    //                 'isAdmin': isAdmin,
    //                 'pageTitle': 'ShopHome!!!!!!!!',
    //                 'Products': products,
    //                 'imageSRC': 'data:image/jpeg;base64,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'
    //             });
    //         })
    //         .catch(err => console.log(err));
};

exports.showPagedProducts = (req,res) => {
    
    const isAdmin = (req.url == '/list-products') ? true : false;
    console.log(req.params)
    const resPerPage = 5;
    const page = req.params.page || 1; // Page 
    // regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Product.find()
            .sort({ _id: -1 })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
            .then((results)=>{
                res.render('layouts/shopHome', {
                'isAdmin': isAdmin,
                'pageTitle': 'ShopHome!!!!!!!!',
                'Products': results,
                'imageSRC': 'data:image/jpeg;base64,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',
                'isAuthenticated': req.cookies.loggedIn,
            })
        }).catch(err=>console.log(err))
}

exports.getEditProduct = (req, res) => {
    const idEdit = req.params.prodId;
    Product.findById(idEdit)
        .then(product => {
            console.log(product.title);
            return res.render('layouts/addProduct', {
                'exist': true,
                'pageTitle': 'Edit Product',
                'prodId': product._id,
                'prodName': product.title,
                'prodDesc': product.description,
                'prodPrice': product.price,
                'isAuthenticated': req.cookies.loggedIn,

            })
        })
        .catch(err => console.log(err));
}




exports.postEditProduct = (req, res) => {
    const idEdit = req.params.prodId;
    Product.findByIdAndUpdate(idEdit, {
        title: req.body.prodName,
        price: req.body.prodPrice,
        description: req.body.prodDescription,
    })
        .then(() => {
            console.log('Product Updated');
            res.redirect('/');
        })
        .catch(err => console.log(err));
    //     // console.log(req.body);
    //     Product.fetchById(idEdit)
    //            .then(product => {
    //                console.log(product);
    //                const prod = new Product(req.body.prodName , req.body.prodPrice , req.body.prodDescription , idEdit);
    //                return prod.save();
    //            })
    //            .then((result) => {
    //                 res.redirect('/');
    //            })
    //            .catch(err => console.log(err));
    //         //    .then(() => {
    //         //        new Product()
    //         //    })
    //         // // .then(product => {
    //         // //     product[0].title = req.body.prodName;
    //         // //     product[0].price = req.body.prodPrice;
    //         // //     product[0].description = req.body.prodDescription;
    //         // //     console.log(product[0]);

    //         // //     product[0].save();
    //         // //     console.log('Product Updated!')
    //         // //     res.redirect('/')
    //         // }).catch(err => console.log(err))
}

exports.deleteProduct = (req, res) => {
    const idDelete = req.params.prodId;
    Product.findByIdAndRemove(idDelete)
        .then(() => {
            console.log('Product Deleted...');
            res.redirect('/')
        })
        .catch(err => console.log(err))
}
//     Product.deleteById(idDelete)
//             .then(()=>{
//                 res.redirect('/');
//             })
//             .catch(err => console.log(err));
// }



exports.showCart = (req, res) => {

    // console.log(req.user.cart);
    req.user
       .populate('cart.items.productId')
       .execPopulate()
       .then(result => {
        //    console.log(result.cart.items[0].productId);
            let total = 0;
            for (let product of req.user.cart.items)
                 total = total + product.productId.price * product.quantity;

           res.render('layouts/cart',{
                pageTitle : 'Cart',
                products : result.cart.items,
                total : total,
                'isAuthenticated': req.session.isLoggedIn,

            })
       })
       .catch(err => console.log(err));
    // products=[]
    // if(req.user.cart)
    // //     //   products = req.user.cart.populate('items')
    // res.render('layouts/cart',{
    //     pageTitle : 'Cart',
    //     // products : products,
    // })

    // req.user
    //     .getCart()
    //     .then((cart) => {
    //         return cart.getProducts()
    //     })
    //     .then((products) => {
    //         //console.log(products);
    //         return res.render('layouts/cart', {
    //             pageTitle: 'Cart',
    //             products: products
    //         })
    //             .catch(err => console.log(err))
    //     });
}

exports.addCart = (req, res) => {
    const pId = req.params.prodId;
//     console.log('--------------------');
//     console.log(req.user);
    Product.findById(pId)
         .then(product => {
             return req.user.addToCart(product)
         })
         .then(result => {
             console.log(result);
             res.redirect('/cart');
         })
         .catch(err => console.log(err));
    // Product.findById(pId)
//             .then(product=>{
//                 console.log(product); 
//                 //req.user.cart.items
//             })
//             .catch(err=> console.log(err))
// //     let fetchedCart;
// //     req.user
// //         .getCart()
// //         .then((cart) => {
// //             fetchedCart = cart;
// //             return cart.getProducts({ where: { id: pId } })
// //         })
// //         .then((products) => {
// //             let product;
// //             //console.log('sdddddddddddddddddddddd');

// //             //console.log(products)
// //             if (products.length > 0) {
// //                 product = products[0]
// //             }
// //             let newQuantity = 1;
// //             if (product) {
// //                 newQuantity = product.cartItem.quantity + 1;
// //                 return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
// //             }
// //             return Product.findByPk(pId)
// //                 .then(product => {
// //                     return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
// //                 })
// //                 .catch(err => console.log(err));
// //         })
// //         .then(() => {
// //             console.log('check')
// //             res.redirect('/cart')
// //         })
// //         .catch(err => console.log(err))
}

exports.deleteFromCart = (req, res) => {
    const pId = req.params.prodId;
    req.user.deleteFromCart(pId)
            .then(resp => {
                console.log('Deleted');
                return res.redirect('/cart')
            })
            .catch(err => console.log(err));
//     let fetchedCart;
//     req.user
//         .getCart()
//         .then((cart) => {
//             fetchedCart = cart;
//             return cart.getProducts({ where: { id: pId } });
//         })
//         .then(product => {
//             fetchedCart.removeProduct(product);
//             return res.redirect('/cart');
//         })
//         .catch(err => {
//             console.log(err);
//         })
}

exports.decreaseQty = (req,res) => {
    const pId = req.params.prodId;

    const prodIndex = req.user.cart.items.findIndex(cp=>{
        return cp.productId.toString() === pId.toString()
    });
    if(req.user.cart.items[prodIndex].quantity ==1)
    {
        res.redirect('/product/deleteFromCart/' + pId);
    }
    else
    {
        req.user.cart.items[prodIndex].quantity -=1;
        req.user.save();
        res.redirect('/cart');
    }

    // req.user.decreaseQuantity(pId)
    //         .then(()=>{
    //             res.redirect('/cart')
    //             })
    //         .catch(err => console.log(err));
}

exports.login = (req,res) => {
    res.render('layouts/login',{
        pageTitle : 'Login',
    });
}

exports.postSearch = (req,res) => {

    const isAdmin = (req.url == '/list-products') ? true : false;

    console.log(req.body.search)   

    Product.find({title : {$regex : /^[A-Z]/i}})
    .then((results) => {
        console.log(results);
        res.render('layouts/shopHome', {
            'isAdmin': isAdmin,
            'pageTitle': 'ShopHome!!!!!!!!',
            'Products': results,
            'imageSRC': 'data:image/jpeg;base64,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',
            'isAuthenticated': req.session.isLoggedIn,
        })
    }).catch(err => console.log(err));
    
}