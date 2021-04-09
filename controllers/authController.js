const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next) => {
    // console.log(req.session.isLoggedIn);

    let msg = req.flash('error');
    msg = msg[0] ? msg[0] : null;
    res.render('layouts/login' , {
        pageTitle: 'Login',
        errorMessage: msg
    })
};


exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.pwd;

    User.findOne({email: email})
        .then(user => {
            if(!user){
                req.flash('error' , 'Invalid Email!');
                return res.redirect('/auth/login'); // for signup only
            }
            return bcrypt.compare(password, user.password)
                  .then(doMatch => {
                      if(doMatch){
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return res.redirect('/')
                      }
                      return res.redirect('/auth/login');
                  })
                  .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    // req.isLoggedIn = true;
    // console.log("Hello");
    // res.setHeader('cookie' , 'loggedIn=true');
    // res.cookie('loggedIn' , true)
    // req.session.isLoggedIn = true;
    // res.redirect('/');
}

exports.postSignup = (req,res) => {
    const name = req.body.nameInput;
    const email = req.body.emailInput;
    const password = req.body.pwdInput;
    User.findOne({email: email})
        .then(user => {
            if(user){
                return res.redirect('/auth/login')
            }
            return bcrypt.hash(password,12)
                  .then(hashedPassword => {
                    const mainuser = User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        cart: {
                            items: [],
                        }
                    });
                    mainuser.save();
                    return res.redirect('/auth/login');
                  })
                  .catch(err => console.log(err));
            
        })
        .catch(err => console.log(err));
}


exports.logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

exports.forgotPassword = (req,res) =>{
    res.render('/layouts/forgotPassword',{
        'pageTitle' : "Forgot Password"
    })
}