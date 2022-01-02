const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


geocode('Ofallon IL', (error, location) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`${location.name} is located at ${location.lat} lat / ${location.lon} lon.`)
        forecast(location.lon, location.lat, (error, forecast) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Temperature: ${forecast.temperature}, Feels like: ${forecast.feelslike}, Conditions: ${forecast.description}`)
            }
        })
    }
})

