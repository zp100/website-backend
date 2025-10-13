const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())

app.get('/status', (_, res) => {
    res.send({
        status: 'Hello world!',
    })
})

app.listen(process.env.PORT ?? 8081, () => {
    console.log('Started backend.')
})
