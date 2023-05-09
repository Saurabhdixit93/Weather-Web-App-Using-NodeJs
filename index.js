const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser'); // importing cookie-parser
dotenv.config();
const PORT = 4300 || process.env.PORT;
const app = express();
const expresslayouts = require('express-ejs-layouts');// Layouts setups
const session = require('express-session');
const MongoStore = require('connect-mongo');// permanent store cookie in storemongo using connect-mongo
app.use(express.urlencoded({ extended: true }));// url endcoding
app.use(cookieParser());// using cookie
app.use(expresslayouts);//layouts change
app.set('layout extractStyles' , true);//extract styles from sub pages
app.set('layout extractScripts' , true);//extract scripts from sub pages
app.use(express.static('public')); //static files uses
//set view engine
app.set('view engine','ejs');
app.set('views','views');
const axios = require('axios');
app.use('/uploads',express.static(__dirname + '/public/uploads')); // uploding files
const passport = require('passport');
const customLocal = require('./configs/passport-locals');

// database connectionsetup production mode
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/WEATHER_APP');
        console.log(`MongoDB connected  successfull : ${conn.connection.host}`);
    }catch(err){
        console.log(`Error In Connecting MongoDB: ${err}`);
        process.exit(1);
    };
};

app.use(session({
    name:'WeatherWebApp',
    secret:'thisissecret',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    // mongostore connection where to store the session cookies
    store: MongoStore.create(  // Mongo store is used to store session cookie in the DATABASE
        { 
            mongoUrl : process.env.MONGO_URL,
            autoRemove: 'disabled'//I dont want to remove session cookies automatically
        }, function(err){
        if(err){console.log('Error while trying to establish the connection and store session cookie:', err); return;}
        console.log('connect-mongo setup okay'); return;
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routers')); //Using Express Router For routing all access

// for production mode
connectDB(). then(() => {
    app.listen(PORT, () =>{
        console.log(`Server Successfull Connected With the Port:${PORT}`);
    });
});
