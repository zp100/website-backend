const cors = require('cors')
const express = require('express')
const home = require('./routes/home')
const pangram = require('./routes/pangram')
const youtune = require('./routes/youtune')

const app = express()
app.use(cors())
app.use('/', home)
app.use('/pangram', pangram)
app.use('/youtune', youtune)

app.listen(process.env.PORT ?? 8081, () => {
    console.log('Started backend.')
})
