const express = require('express')
const fs = require('node:fs')

let word_list = []
let puzzle_list = []
fs.readFile('./src/routes/pangram/word_list.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    word_list = data.split('\n')
    
    const valid_puzzles = new Set()
    word_list.forEach((word) => {
        const letters = new Set(word.split(''))
        if (letters.size === 7) {
            const puzzle = Array.from(letters)
            puzzle.sort()
            valid_puzzles.add(puzzle.join(''))
        }
    })
    puzzle_list = Array.from(valid_puzzles)
})

const router = express.Router()

router.get('/word_list', (_, res) => {
    res.send({
        word_list,
        puzzle_list,
    })
})

module.exports = router
