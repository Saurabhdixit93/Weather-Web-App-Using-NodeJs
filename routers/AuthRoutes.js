const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');

router.get('/login-page' , (req ,res)  => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('Login' ,{
        PageTitle: 'Login Page |  Weather App',
        message:null
    });
});
router.get('/signup-page' , (req ,res)  => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('SignUp' ,{
        PageTitle: 'Signup Page |  Weather App',
        message: null
    });
});


router.post('/create-account' ,authController.create_account);

router.post('/sign-in' ,passport.authenticate('local',{
    failureRedirect:'/user/login-page',
    successFlash: true,
    successRedirect: '/'
},
),authController.login_User);

router.get('/sign-out',  authController.sign_out);


module.exports = router;