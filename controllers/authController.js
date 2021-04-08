const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next) => {
    // console.log(req.session.isLoggedIn);

    res.render('layouts/login' , {
        pageTitle: 'Login',
    })
};


exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.pwd;

    User.findOne({email: email})
        .then(user => {
            if(!user){
                return res.redirect('/login'); // for signup only
            }
            return bcrypt.compare(password, user.password)
                  .then(doMatch => {
                      if(doMatch){
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return res.redirect('/')
                      }
                      return res.redirect('/login');
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
                return res.redirect('/login')
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
                    return res.redirect('/login');
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