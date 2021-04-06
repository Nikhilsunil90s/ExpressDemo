const User = require('../models/userModel');

exports.getLogin = (req,res,next) => {
    // console.log(req.session.isLoggedIn);
    res.render('layouts/login' , {
        pageTitle: 'Login'
    })
};


exports.postLogin = (req,res,next) => {
    User.findById("605edcbd42e5fa1bb8547321")
      .then((user) => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        res.redirect('/');
      })
      .catch(err => console.log(err))
    // req.isLoggedIn = true;
    // console.log("Hello");
    // res.setHeader('cookie' , 'loggedIn=true');
    // res.cookie('loggedIn' , true)
    // req.session.isLoggedIn = true;
    // res.redirect('/');
}

exports.logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}