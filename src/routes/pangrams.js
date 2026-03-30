const express = require('express')
const fs = require('node:fs')
const path = require('node:path')

const min_len = 3
let word_list = []
let puzzle_list = []

const word_list_path = path.join(process.cwd(), 'src/routes/pangrams/word_list.txt')
fs.readFile(word_list_path, 'utf8', (err, data) => {
    if (err) {
        throw new Error(err)
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
        min_len,
        word_list,
        puzzle_list,
    })
})

router.get('/define/:word', async (req, res) => {
    const word = req.params['word']
    const dictionary_url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_API_KEY}`
    const response = await fetch(dictionary_url)
    const json = await response.json()

    const valid_defs = json.filter((def) => def.meta.id.split(':')[0] === word && def.shortdef.length > 0)
    if (valid_defs.length === 0) {
        const similar_defs = json.filter((def) => def.meta.stems.includes(word) && def.shortdef.length > 0)
        valid_defs.push(...similar_defs)
    }

    const variants = valid_defs.map((def) => ({
        id: def.meta.id.split(':')[0],
        pronunciation: def.hwi.prs?.[0]?.mw,
        category: def.fl,
        defs: def.shortdef,
    }))

    res.send({ variants })
})

module.exports = router
