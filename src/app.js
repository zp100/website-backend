const cors = require('cors')
const express = require('express')
const home = require('./routes/home')
const pangrams = require('./routes/pangrams')
const youtune = require('./routes/youtune')

const app = express()
app.use(cors())
app.use('/', home)
app.use('/pangrams', pangrams)
app.use('/youtune', youtune)

const port = process.env.PORT ?? 8081
app.listen(port, () => {
    console.log(`Started backend on port ${port}.`)
})
