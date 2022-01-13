const request = require('postman-request')

const mapboxKey = 'pk.eyJ1Ijoiam95Y2VtciIsImEiOiJja3h1Z2V1YmM1c240Mm9xcTcxbG5yd2EzIn0.8az9OfqE2BReblu8UJhdlw'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxKey}&limit=1`
    request({ url:url, json:true}, (error, response) => {
        const features = response.body.features
        if (error) {
            callback(error.body, undefined)
        } else if (features === undefined || features.length === 0) {
            callback(response.body, undefined)
        } else {
            const { place_name, center: [lon, lat] } = features[0]
            callback(undefined, {
                lon,
                lat,
                place_name,
            })
        }
    })
}

module.exports = geocode
