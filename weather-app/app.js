const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const search_location = process.argv.slice(2)[0]

if (search_location === undefined) {
    return console.log('Please enter a search location')
}

geocode(search_location, (error, location) => {
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

