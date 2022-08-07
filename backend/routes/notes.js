const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1 Fetching all notes : GET "/api/notes/fetchNotes" requires Login

router.post('/fetchNotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes);
})

//ROUTE 2 Adding notes : POST "/api/notes/addNotes" requires Login

router.get('/addNotes', fetchuser,
    [body('title', 'Title too short').isLength({ min: 3 }),
    body('description', 'Description too short').isLength({ min: 5 })],
    async (req, res) => {
        // checking if any error occurs in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


    })
module.exports = router;