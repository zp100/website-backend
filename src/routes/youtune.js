const express = require('express')

const router = express.Router()

router.get('/tracks', (_, res) => {
    res.send({
        tracks: [
            'Still Alive',
            'Bad Piggies',
        ],
    })
})

module.exports = router
