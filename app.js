const express = require('express');
const errorController = require('./controllers/errorcontroller');
const server = express();
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const csrfProtection = csrf();

server.use(express.urlencoded({extended: true}));

server.use(express.json());

const Mongo_Uri = 'mongodb+srv://root:root1234@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority'

const MongoDbStore = require('connect-mongodb-session')(session);
const store = new MongoDbStore({
   uri: Mongo_Uri,
   collection: 'sessions',
});

const cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(session(
   {
      secret: "My Secret",
      resave: false,
      saveUninitialized: true,
      store: store,
   }
)
);
server.use(csrfProtection);

server.use(flash());


const User = require('./models/userModel');

server.use((req,res,next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   res.locals.csrfToken = req.csrfToken();
   next();
})

const adminRoutes = require('./routes/adminRoutes'); //adminRoutes and Products
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


server.set('view engine', "ejs");
server.set('views', 'views');

server.use(express.static('public'));


server.use((req, res, next) => {
   if(!req.session.user){
      return next();
   }
   User.findById(req.session.user._id)
      .then((user) => {
         // console.log(user);
         req.user = user;
         next();
      })
      .catch(err => console.log(err))
});




server.use('/auth', authRoutes);
server.use('/admin', adminRoutes);
server.use(userRoutes);

server.use(errorController.getError);

mongoose.connect('mongodb+srv://root:root1234@cluster0.kwluf.mongodb.net/Shop?retryWrites=true&w=majority')
   .then((result) => {
      console.log('Connected!')
      server.listen(3000);
   })
   .catch(err => console.log(err));




