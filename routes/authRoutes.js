const authRoutes = require('express').Router();
const authController = require('../controllers/authController');


authRoutes.get('/login' , authController.getLogin);

authRoutes.post('/login' , authController.postLogin);

authRoutes.get('/logout' , authController.logout);

authRoutes.post('/signup' , authController.postSignup);

authRoutes.get('/forgotPassword' , authController.forgotPassword);



module.exports = authRoutes;
