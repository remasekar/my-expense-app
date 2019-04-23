const express = require('express')
const { mongoose } = require('./config/database')

const cors = require('cors')

const app = express()
const port = 3006

const { routes } = require('./config/routes')

app.use(express.json())
app.use(cors())


//route matching
app.use('/', routes)

app.listen(port,function()
{
    console.log('listening port', port)
})


