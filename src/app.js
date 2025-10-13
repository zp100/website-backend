const cors = require('cors')
const express = require('express')
const pg = require('pg')

const app = express()
app.use(cors())

const pool = new pg.Pool({
    connectionString: process.env['DATABASE_URL'],
    ssl: {
        rejectUnauthorized: false,
    },
})

app.get('/status', async (_, res) => {
    const client = await pool.connect();
    try {
        const query_res = await client.query(`
            select message
            from Status
            limit 1
        `)
        const status = query_res.rows[0]['message']
        res.send({ status })
    } catch (e) {
        console.error(e)
        res.send({
            status: 'Database error :(',
        })
    } finally {
        client.release()
    }
})

app.listen(process.env.PORT ?? 8081, () => {
    console.log('Started backend.')
})
