const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

// static directory setup
const root = path.join(__dirname, '..', 'public')
app.use('/', express.static(root))

// handlebars setup
const viewsPath = path.join(__dirname, '..', 'template/views')
const partialsPath = path.join(__dirname, '..', 'template/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const creatorName = 'Michael Joyce'

// paths
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Get Local Weather',
        creatorName,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        creatorName,
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Topics',
        creatorName,
        topic: 'This is the help topic',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'query must include the address parameter'
        })
    }
    const address = req.query.address
    geocode(address, (error, location = {}) => {
        if (error) {
            return res.send({
                error: 'error locating address'
            })
        }
        forecast(location, (error, forecast = {}) => {
            const {lon, lat, place_name} = location
            if (error) {
                return res.send({
                    error: 'error with forecast'
                })
            }
            const {temperature, feelslike, weather_descriptions} = forecast
            res.send({
                title: `Local weather for ${address}`,
                creatorName,
                address,
                place_name,
                temperature,
                feelslike,
                conditions: weather_descriptions,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        creatorName,
        errorMessage: 'Help page not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        creatorName,
        errorMessage: 'Page not found',
    })
})

app.listen(3000, ()=> {
    console.log(`Express is running on port 3000`)
})
