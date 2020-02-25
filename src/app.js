const path = require('path'); // Usually we include path before express
const express = require('express');
const app = express();
const router = require('../routes/web');
const nunjucks = require('nunjucks');

// Setup a port for heroku
const PORT = process.env.PORT || 3000;

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

// Setup to use router
app.use('', router);


// Start server
app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});