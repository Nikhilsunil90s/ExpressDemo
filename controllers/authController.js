exports.getLogin = (req,res,next) => {
    // console.log(req.session.isLoggedIn);
    res.render('layouts/login' , {
        pageTitle: 'Login'
    })
};


exports.postLogin = (req,res,next) => {
    // req.isLoggedIn = true;
    console.log("Hello");
    // res.setHeader('cookie' , 'loggedIn=true');
    // res.cookie('loggedIn' , true)
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}