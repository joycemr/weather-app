const path = require('path')
const express = require('express')
const hbs = require('hbs')


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
        title: 'Index Handlebars Page (Dynamic)',
        creatorName,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Dynamic Page',
        creatorName,
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Dynamic Page',
        creatorName,
        topic: 'This is the help topic',
    })
})

app.get('/weather', (req, res) => {
    res.send({
        title: 'Local Weather',
        creatorName,
        location: 'O Fallon, IL',
        temperature: 19,
        conditions: ['cloudy',
                'windy',],
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
