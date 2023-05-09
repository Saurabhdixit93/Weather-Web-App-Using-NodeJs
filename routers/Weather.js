const express = require('express');
const router = express.Router();
const passport = require('passport');
const WeatherController = require('../controllers/WeatherController');

router.post('/get-weather' , passport.checkAuthentication,WeatherController.getWeather)


module.exports = router;