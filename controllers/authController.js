const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iiceynr@gmail.com',
        pass: 'webcomynr'
    }
});



exports.getLogin = (req,res,next) => {
    // console.log(req.session.isLoggedIn);

    let msg = req.flash('error');
    msg = msg[0] ? msg[0] : null;
    console.log(msg);
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        req.flash("error" , errors.array()[0].msg);
        return res.redirect('/auth/login');
    }
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
                    const mailOptions = {
                        from: 'iiceynr@gmail.com',
                        to: email,
                        subject: 'Test Email via NodeMailer!',
                        html: `<h1 style = "text-align:center; color: red;">Welcome To NodeShop!</h1>`,
                      };
                    transporter.sendMail(mailOptions , (err , info) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(info);
                        }
                    });
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

exports.getForgotPassword = (req,res) =>{
    const erors = req.flash('error');
    let message = '';
    if(erors.length > 0){
        message = erors[0];
    }
    res.render('layouts/forgotPassword',{
        'pageTitle' : "Forgot Password",
        'errorMessage': message,
    })
}

exports.postForgotPassword = (req,res) =>{    
    const email = req.body.resetEmail;
    crypto.randomBytes(32 , (err , buffer) => {
        if(err){
            console.log(err);
        }
        const token = buffer.toString('hex');
        User.findOne({email: email})
            .then(user => {
                if(!user){
                    req.flash('error' , 'No User with entered Email!');
                    return res.redirect('/auth/forgotPassword');
                }
                user.resetToken = token;
                console.log(new Date() * 3600000);
                user.resetTokenExpiration = new Date() * 3600000; // for 1 hour
                return user.save();
            })
            .then(result => {
                const mailOptions = {
                    from: 'iiceynr@gmail.com',
                    to: email,
                    subject: 'Reset Passowrd Link!',
                    html: `<h1 style = "text-align:center; color: red;">Welcome To NodeShop!</h1>
                            <pre><a href='http://localhost:3000/auth/resetPassword/${token}'> Click Here </a> To Reset Your Password!</pre>`,
                  };
            
                transporter.sendMail(mailOptions)
                            .then(info => {
                               console.log(info);     
                            })
                            .catch(err=>{
                                console.log(err);
                            });
            })
            .catch(err => console.log(err))
    })
    
}

exports.getresetPassword = (req,res) =>{
    const token = req.params.token;
    // console.log(req.user);
    User.findOne({resetToken : token , resetTokenExpiration: { $gt: Date.now() }})
        .then(user => {
            // 5826805882300800000 , 5826805882308000000
            console.log(user);
            return res.render('layouts/resetPassword' , {
                pageTitle: 'New Password Reset!',
                passwordToken: token,
                userId: user._id,
            })
        })
        .catch(err => {
            console.log(err);
        })
    // res.redirect('/auth/login');
}

exports.postresetPassword = (req,res,next) => {
    const pwdToken = req.body.passwordToken;
    const newpassword = req.body.newPassword;
    const userId = req.body.userId;
    let resetUser;
    User.findOne({resetToken: pwdToken , resetTokenExpiration : {$gt: Date.now() }, _id: userId})
        .then(user => {
            if(!user){
                //do something , redirect
            }
            resetUser = user;
            return bcrypt.hash(newpassword , 12)
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = null;
            resetUser.resetTokenExpiration = null;
            return resetUser.save()
        })
        .then(result => {
            console.log('Password Updated!');
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log(err);
        })
}