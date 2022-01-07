const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const search_location = process.argv.slice(2)[0]

if (search_location === undefined) {
    return console.log('Please enter a search location')
}

geocode(search_location, (error, location = {}) => {
    if (error) {
        return console.log(error)
    }
    forecast(location, (error, forecast = {}) => {
        const {lon, lat, place_name} = location
        if (error) {
            return console.log(error)
        }
        const {temperature, feelslike, weather_descriptions} = forecast
        console.log(`${place_name} is located at ${lat} lat / ${lon} lon.`)
        console.log(`Temperature: ${temperature}, Feels like: ${feelslike}, Conditions: ${weather_descriptions}`)
    })
})

