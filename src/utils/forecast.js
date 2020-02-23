const request = require('request');

function getForecast(longitude, latitude, callback) {
    const urlForecast = 'https://api.darksky.net/forecast/75d2b09a4815455f3e41ecddc78b67cd/' + longitude + ',' + latitude + '?units=si&lang=fr';
    
    request({url: urlForecast, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const weather = body.currently;
            const daily = body.daily.data;
            const textNode = `It is currently ${weather.temperature} degrees out. There is a ${weather.precipProbability}%. ${daily[0].summary}`;
            callback(undefined, textNode);
        }
    });
}

module.exports = getForecast;