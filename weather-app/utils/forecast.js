const request = require('postman-request')

const weatherstackKey = '98863939977cef28f4bf91af7c418864'

const forecast = (location, callback) => {
    const { lat, lon } = location
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${lat},${lon}&units=f`
    request({uri: weatherUrl, json: true}, (error, response) => {
        const { body } = response
        if (error) {
            callback ('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(`Error for weather info: ${body.error}`, undefined)
        } else if (body.current === undefined) {
            callback('No forecast returned for this location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}


module.exports = forecast

