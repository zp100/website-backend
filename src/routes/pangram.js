const express = require('express')
const fs = require('node:fs')
const path = require('node:path')

let word_list = []
let puzzle_list = []

const word_list_path = path.join(process.cwd(), 'src/routes/pangram/word_list.txt')
fs.readFile(word_list_path, 'utf8', (err, data) => {
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

    console.log('/pangrams: Word list setup complete.')
})

const router = express.Router()

router.get('/word_list', (_, res) => {
    res.send({
        word_list,
        puzzle_list,
    })
})

module.exports = router
