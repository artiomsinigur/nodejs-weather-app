const path = require('path'); // Usually we include path before express
const express = require('express');
const nunjucks = require('nunjucks');
const getGeocoding = require('./utils/geocoding');
const getForecast = require('./utils/forecast');

const app = express();

// Define render view engine hbs(handlebar)
// app.set('view engine', 'hbs');

// Defined the engine of template
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// to watching many extensions write with nodemon we write: nodemon app.js -e js,html

// Get the path to public folder to send index.html file
const publicDirectoryPath = path.join(__dirname, '../public'); // if app.js was in src folder we access ../public 

// If we change the name of the folder view, we need to redefine it
// const viewPath = path.join(__dirname, '../templates'); 
// app.set('views', viewPath);

// app.use() - customize the server
    // Load all static html files, css, img, and js from public folder(index.html is by default)
app.use(express.static(publicDirectoryPath));

// Routes
// req - incoming request to the server
// res - response have a bunch of methods that allow us to customize what we want to send to requester
app.get('', (req, res) => {
    res.render('index.html', {
        title: 'List of cities',
        cities: [
            {city: 'Montréal'},
            {city: 'Toronto'},
            {city: 'Vancouver'},
        ],
    });
});

app.get('/about', (req, res) => {
    res.render('about.html');
})

// If we see this error "Cannot set headers after they are sent to the client" that means we send response two times (use return or else)
// get /products?search=games
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    getGeocoding(req.query.address, (err, {longitude, latitude, placeName} = {}) => {
        if (err) {
            // return res.render('weather.html', {error: err});
            return res.send({error: err});
        }

        getForecast(longitude, latitude, (err, forecastData) => {
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
                forecast: forecastData,
            });
        });
    });
})

app.get('/weather/country', (req, res) => {
    res.render('country.html');
})

// Setup a specify 404 page for path weather/*
app.get('/weather/*', (req, res) => {
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
app.get('*', (req, res) => {
    res.render('404.html', {
        title: '404',
        msgError: 'Houston we have a problem!',
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});