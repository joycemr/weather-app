const request = require('postman-request')

const weatherstackKey = '98863939977cef28f4bf91af7c418864'

const forecast = (lon, lat, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${lat},${lon}&units=f`
    request({uri: weatherUrl, json: true}, (error, response) => {
        const current = response.body.current
        if (error) {
            callback ('Unable to connect to weather service.', undefined)
        } else if (response.body.error) {
            callback(`Error for weather info: ${response.body.error}`, undefined)
        } else if (current === undefined) {
            callback('No forecast returned for this location', undefined)
        } else {
            callback(undefined, {
                temperature: current.temperature,
                feelslike: current.feelslike,
                description: current.weather_descriptions,
            })
        }
    })
}


module.exports = forecast

