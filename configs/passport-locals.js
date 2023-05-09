// import passport
const passport = require('passport');
// Import local-strategy
const LocalStrategy = require('passport-local').Strategy;
// import User Models
const User = require('../models/User');
// authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
    },
    async (request , email , password , done) => {
        // find the user and establish the identity
        try{
            const user = await User.findOne({email:email});
            if(!user || user.password != password){
                return done(null , false);
            }else{
                return done(null , user);
            }
        }catch(err){
            console.log('Error', err);
            return;
        }
    }
));

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user , done){
    done(null , user.id);
});


// de serializing the user from the key in the cookies
passport.deserializeUser(async (id , done) =>{
    // first find user in data if it is then
    try{
        const user = await User.findById(id);
        if(user){
            return done(null ,user);
        }else{
            return done(null ,false);
        }
    }catch(error){
        console.log('Error', error);
        return;
    }
});



// // check if user Authenticated
passport.checkAuthentication = function(request , response , next){
    // if user signed then passed user to next function
    if(request.isAuthenticated()){
        return next();
    }
    return response.redirect('/user/login-page');
}

// set user details
passport.setAuthenticatedUser =  function(request , response , next){
    if(request.isAuthenticated()){
        // send signed user details
        response.locals.user = request.user;
    }
    next();
}


// exports for accessing
module.exports = passport;
