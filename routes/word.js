const router = require('express').Router();
const { request } = require('express');
let Word = require('../models/WordModel.js');


// Get one random word from DB
router.route('/').get((req, res) => {
    Word.find((err, words) => {
        if (err) {
            console.log(err);
        }
        else {
            idx = Math.floor(Math.random() * words.length);
            res.json(words[idx]);
        }
    })
});


// Upload one new word to DB
router.route('/new').post((req, res) => {
    console.log("Entering /new API");
    const word = req.body.word;
    const newWord = new Word({word});
    newWord.save()
        .then(() => res.json('Word Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Check if a string is in the DB
router.route('/match').post((req, res) => {
    console.log("TEST");
    console.log(req);
    Word.findOne({word: req.body.word}, (err, word) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(word);
        }
    })
});


// Erase whole DB
router.route('/erase').delete((req, res) => {
    console.log('Entering API');
    Word.deleteMany({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    });
});


// Export
module.exports = router;