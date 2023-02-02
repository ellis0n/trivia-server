require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const allowedOrigins = require('./config/allowedOrigins')
const cookieParser = require('cookie-parser')
const openai = require('openai')

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/query', require('./routes/api/queries'))
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 not found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
