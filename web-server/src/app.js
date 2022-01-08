const path = require('path')
const express = require('express')


const app = express()

// static directory setup
const root = path.join(__dirname, '..', 'public')
app.use('/', express.static(root))

// handlebars setup
const viewsPath = path.join(__dirname, '..', 'template')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// paths
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index Handlebars Page (Dynamic)',
        name: 'Michael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Dynamic Page',
        name: 'Michael Joyce',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Dynamic Page',
        topic: 'This is the help topic',
        name: 'Michael Joyce',
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'O Fallon, IL',
        temperature: 19,
        conditions: ['cloudy',
                'windy',],
    })
})

app.listen(3000, ()=> {
    console.log(`Express is running on port 3000`)
})
