const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const search_location = process.argv.slice(2)[0]

if (search_location === undefined) {
    return console.log('Please enter a search location')
}

geocode(search_location, (error, {lon, lat, name}) => {
    if (error) {
        return console.log(error)
    }
    forecast(lon, lat, (error, {temperature, feelslike, description}) => {
        if (error) {
            return console.log(error)
        }
        console.log(`${name} is located at ${lat} lat / ${lon} lon.`)
        console.log(`Temperature: ${temperature}, Feels like: ${feelslike}, Conditions: ${description}`)
    })
})

