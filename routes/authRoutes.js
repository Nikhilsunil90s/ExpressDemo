const authRoutes = require('express').Router();
const authController = require('../controllers/authController');
const { check , body } = require('express-validator/check')


authRoutes.get('/login' , authController.getLogin);

authRoutes.post('/login' , authController.postLogin);

authRoutes.get('/logout' , authController.logout);

authRoutes.post('/signup' ,
                [
                    check("emailInput").isEmail().withMessage("Please Enter A Valid Email!").custom((value , {req}) => {
                    if(value === 'testnew@email.com'){
                        throw Error("This Email Is Forbidden!");
                    }
                    return true;
                } ).normalizeEmail({all_lowercase: true}) , 
                body('pwdInput' , "Please keep your password greater than 5 characters.").isLength({min: 5 , max: 15}).isAlphanumeric().trim(),
                body('confirmPwd').custom((value , { req }) => {
                    if(value !== req.body.pwdInput){
                        throw Error("Passwords Must Confirm Each Other!");
                    }
                    return true;
                })
            ] ,
                authController.postSignup
                );

authRoutes.get('/forgotPassword' , authController.getForgotPassword);

authRoutes.post('/forgotPassword' , authController.postForgotPassword);

authRoutes.get('/resetPassword/:token' , authController.getresetPassword);

authRoutes.post('/resetPassword' , authController.postresetPassword);





module.exports = authRoutes;
