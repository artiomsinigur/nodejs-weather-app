const express = require('express');
const router = express.Router();
const getGeocoding = require('../src/utils/geocoding');
const getForecast = require('../src/utils/forecast');

// Routes
// req - incoming request to the server
// res - response have a bunch of methods that allow us to customize what we want to send to requester
router.get('', (req, res) => {
    res.render('index.html');
});

router.get('/about', (req, res) => {
    res.render('about.html');
})

// If we see this error "Cannot set headers after they are sent to the client" that means we send response two times (use return or else)
// get /products?search=games
router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    getGeocoding(req.query.address, (err, {latitude, longitude, placeName} = {}) => {
        if (err) {
            // return res.render('weather.html', {error: err});
            return res.send({error: err});
        }

        getForecast(latitude, longitude, (err, {currently, daily, today}) => {
            if (err) {
                // return res.render('weather.html', {error: err});
                return res.send({error: err});
            }

            // res.render('weather.html', {
            //     location: placeName,
            //     forecast: forecastData,
            // });

            // When the parameter is an Array or Object, Express responds with the JSON:
            res.send({
                location: placeName,
                // forecast: forecastData,
                currently, 
                daily, 
                today,
            });
        });
    });
})

router.get('/weather/country', (req, res) => {
    res.render('country.html', {
        title: 'List of cities',
        cities: [
            {city: 'Toronto'},
            {city: 'Montréal'},
            {city: 'Vancouver'},
            {city: 'Calgary'},
            {city: 'Edmonton'},
            {city: 'Ottawa'},
        ],
    });
})

// Setup a specify 404 page for path weather/*
router.get('/weather/*', (req, res) => {
    res.render('404.html', {
        title: '404',
        msgError: "Weather it's in holiday", 
    });
})


// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term',
//         });
//     }

//     console.log(req.query);
//     res.send({
//         products: [],
//     });
// });


// Setup a generic 404 page. 
// Call this route lastly
// * match anythings else that that is not set in router
router.get('*', (req, res) => {
    res.render('404.html', {
        title: '404',
        msgError: 'Houston we have a problem!',
    });
});

module.exports = router;