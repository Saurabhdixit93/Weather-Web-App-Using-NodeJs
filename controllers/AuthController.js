const User = require('../models/User');


module.exports.create_account = async (req ,res) => {
    try{
        const {name , email ,password} = req.body;

        const user = await User.findOne({email});
        if(user){
            return res.render('SignUp',{
                PageTitle: 'Signup Page |  Weather App',
                message: `User Already Exists with this email: ${email}`
            });
        };
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();

        return res.render('Login',{
            PageTitle: 'Login Page |  Weather App',
            message:`User Account Created Successfully`
        });
    }catch(error){
        console.log(`Error In Signup: ${error}`)
        return res.render('SignUp',{
            PageTitle: 'Signup Page |  Weather App',
            message: `Error In Signup: ${error.message}`
        });
    }
};


module.exports.login_User = async (req ,res) => {
    res.cookie('myCustomCookie', 'session1234', { maxAge: 3600000, httpOnly: true });
    return res.render('index', {
        PageTitle: 'Home Page |  Weather App',
        message: `Login Successfully`,
        weather: null
    });
};


module.exports.sign_out = async (req ,res) => {
    try{
        req.logout((error) =>{
            if (error) {
                return res.render('index', {
                    PageTitle: 'Home Page | Weather App',
                    message: `ERROR In Logout: ${error.message}`,
                    weather: null
                });
            }
            return res.redirect('/');
        });
    }catch(error){
        return res.render('index', {
            PageTitle: 'Home Page |  Weather App',
            message: `ERROR In Logout: ${error.message}`,
            weather: null
        });
    }
};

