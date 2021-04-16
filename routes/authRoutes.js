const authRoutes = require('express').Router();
const authController = require('../controllers/authController');


authRoutes.get('/login' , authController.getLogin);

authRoutes.post('/login' , authController.postLogin);

authRoutes.get('/logout' , authController.logout);

authRoutes.post('/signup' , authController.postSignup);

authRoutes.get('/forgotPassword' , authController.getForgotPassword);

authRoutes.post('/forgotPassword' , authController.postForgotPassword);

authRoutes.get('/resetPassword/:token' , authController.getresetPassword);

authRoutes.post('/resetPassword' , authController.postresetPassword);





module.exports = authRoutes;
