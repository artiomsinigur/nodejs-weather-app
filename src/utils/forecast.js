const request = require('request');

function getForecast(latitude, longitude, callback) {
    const urlForecast = 'https://api.darksky.net/forecast/75d2b09a4815455f3e41ecddc78b67cd/' + latitude + ',' + longitude + '?units=si&exclude=minutely,hourly,flags,offset&lang=en';
    
    request({url: urlForecast, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const weather = body.currently;
            const daily = body.daily.data;
            // const textNode = `It is currently ${weather.temperature} degrees out. There is a ${weather.precipProbability}%. 
            // <li>Le sommaire: ${daily[0].summary}</li>
            // <li>Temperature min: ${daily[0].temperatureMin}</li>
            // <li>Temperature max: ${daily[0].temperatureMax}</li>`;
            callback(undefined, {
                currently: {
                    temperature: weather.temperature,
                    precipProbability: weather.precipProbability,
                    summary: weather.summary,
                },
                today: {
                    time: daily[0].time,
                    summary: daily[0].summary,
                    icon: daily[0].icon,
                    temperature: daily[0].temperatureMax,
                    temperatureMin: daily[0].temperatureMin,
                    temperatureMax: daily[0].temperatureMax,
                },
                daily: [
                    {
                        time: daily[1].time,
                        summary: daily[1].summary,
                        icon: daily[1].icon,
                        temperature: daily[1].temperatureMax,
                    },
                    {
                        time: daily[2].time,
                        summary: daily[2].summary,
                        icon: daily[2].icon,
                        temperature: daily[2].temperatureMax,
                    },
                    {
                        time: daily[3].time,
                        summary: daily[3].summary,
                        icon: daily[3].icon,
                        temperature: daily[3].temperatureMax,
                    },
                    {
                        time: daily[4].time,
                        summary: daily[4].summary,
                        icon: daily[4].icon,
                        temperature: daily[4].temperatureMax,
                    },
                    {
                        time: daily[5].time,
                        summary: daily[5].summary,
                        icon: daily[5].icon,
                        temperature: daily[5].temperatureMax,
                    },
                    {
                        time: daily[6].time,
                        summary: daily[6].summary,
                        icon: daily[6].icon,
                        temperature: daily[6].temperatureMax,
                    },
                    {
                        time: daily[7].time,
                        summary: daily[7].summary,
                        icon: daily[7].icon,
                        temperature: daily[7].temperatureMax,
                    },
                ],
            });
        }
    });
}

// getForecast('45.56434', '-73.60240', (err, data) => {
//     console.log(data);
// });
module.exports = getForecast;