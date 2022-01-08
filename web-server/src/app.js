const path = require('path')
const express = require('express')


const root = path.join(__dirname, '..', 'public')

const app = express()

app.use('/', express.static(root))
app.use('/about', express.static(path.join(root, 'about.html')))
app.use('/help', express.static(path.join(root, 'help.html')))

app.get('/Weather', (req, res) => {
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
