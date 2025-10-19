const express = require('express')
const { pool } = require('../database')

const router = express.Router()

router.get('/status', async (_, res) => {
    const client = await pool.connect()

    const query_res = await client.query(`
        select "message"
        from "Status"
        limit 1
    `)
    const status = query_res.rows[0]['message']

    res.send({ status })
})

module.exports = router
