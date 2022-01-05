const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


geocode('Ofallon IL', (error, location) => {
    if (error) {
        return console.log(error)
    }
    forecast(location.lon, location.lat, (error, forecast) => {
        if (error) {
            return console.log(error)
        }
        console.log(`${location.name} is located at ${location.lat} lat / ${location.lon} lon.`)
        console.log(`Temperature: ${forecast.temperature}, Feels like: ${forecast.feelslike}, Conditions: ${forecast.description}`)
    })
})

