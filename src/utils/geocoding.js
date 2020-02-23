const request = require('request');

function getGeocoding(address, callback) {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJ0ZGV2IiwiYSI6ImNrNmxsbWt1ZDBkYTQzbW4wOWhhNHFma20ifQ.sXo-BYsA3ZJCIeo-iNsLYw&limit=1';

    request({url: geocodeUrl, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (res.body.message) {
            callback(res.body.message, undefined);
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            const longitude = res.body.features[0].center[0];
            const latitude = res.body.features[0].center[1];
            const placeName = res.body.features[0].place_name;
            callback(undefined, {longitude, latitude, placeName});
        }
    });
}

// getGeocoding('Montréal', (err, data) => {
//     console.log(data);
//     console.log(error(err));
// });

// or
// const data = getGeocoding(geo);
// function geo(data) {
//     return data;
// }
// console.log(data);

module.exports = getGeocoding;