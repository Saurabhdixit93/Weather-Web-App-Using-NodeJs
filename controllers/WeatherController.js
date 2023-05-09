const axios = require('axios');
const request = require('request');

module.exports.getWeather = async (req ,res) => {
    try{
        const location = req.body.location;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
        request(url, (err, response, body) => {
            if (err) {
                return res.render('index', { weather: null, message: `Error: ${err.message}`, PageTitle: 'Home Page |  Weather App', });
            } else {
                const weatherData = JSON.parse(body);
                if (weatherData.cod === '404') {
                    return res.render('index', { weather: null, message: 'Please enter a valid location.', PageTitle: 'Home Page |  Weather App', });
                } else {
                    const weather = {
                        city: weatherData.name,
                        country: weatherData.sys.country,
                        temperature: Math.round(weatherData.main.temp),
                        description: weatherData.weather[0].description,
                        icon: weatherData.weather[0].icon,
                    };
                    return res.render('index', { weather, message: 'Weather Fetched Successfully' , PageTitle: 'Home Page |  Weather App', });
                }
            }
        });
    }catch (error) {
        console.log('Error In Weather' , error);
        return res.render('index', { weather: null, message: 'Please enter a valid location.', PageTitle: 'Home Page |  Weather App', });
    }
};


// module.exports.getWeather = async (req ,res) => {
//     const location = req.body.location;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
//     try {
//         const response = await axios.get(url);
//         const weather = {
//             city: response.data.name,
//             country: response.data.sys.country,
//             temperature: response.data.main.temp,
//             description: response.data.weather[0].description,
//             icon: response.data.weather[0].icon,
//         };
//         return res.render('index', { weather, message: 'Weathe Send Successfully' , PageTitle: 'Home Page |  Weather App', });
//     } catch (error) {
//         console.log('Error In Weather' , error);
//         return res.render('index', { weather: null, message: 'Please enter a valid location.', PageTitle: 'Home Page |  Weather App', });
//     }
// };
