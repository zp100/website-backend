const cors = require('cors')
const express = require('express')
const pg = require('pg')

const app = express()
app.use(cors())

app.get('/status', async (_, res) => {
    const client = new pg.Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: (process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined),
    })
    await client.connect()

    const query_res = await client.query(`
        select "message"
        from "Status"
        limit 1
    `)
    const status = query_res.rows[0]['message']

    res.send({ status })
})

app.listen(process.env.PORT ?? 8081, () => {
    console.log('Started backend.')
})
