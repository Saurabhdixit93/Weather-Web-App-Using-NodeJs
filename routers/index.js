const express = require('express');
const router = express.Router();

router.get('/', (req , res) => {
    const myCustomCookie = req.cookies.myCustomCookie;
    return res.render('index', {
        PageTitle: 'Home Page |  Weather App',
        message: null,
        myCustomCookie,
        weather: null
    });
});

router.get('/contact-form' ,(req ,res) => {

    return res.render('ContactForm' ,{
        PageTitle: 'Contact Form Page |  Weather App',
        message: null,
    });
})
router.get('/About' ,(req ,res) => {

    return res.render('About' ,{
        PageTitle: 'About Us Page |  Weather App',
        message: null,
    });
})

router.use('/user' , require('./AuthRoutes'));

router.use('/form' ,require('./ContactForm'));

router.use('/new', require('./Weather'));

module.exports = router;