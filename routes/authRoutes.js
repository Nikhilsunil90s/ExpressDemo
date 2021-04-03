const authRoutes = require('express').Router();
const authController = require('../controllers/authController');


authRoutes.get('/login' , authController.getLogin);

authRoutes.post('/login' , authController.postLogin);

authRoutes.get('/logout' , authController.logout);


module.exports = authRoutes;
