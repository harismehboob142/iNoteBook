const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1 Fetching all notes : GET "/api/notes/fetchNotes" requires Login

router.get('/fetchNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })  //will check for data in Notes (db) according to the user.id. if found return notes.
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: "Error in fetchNotes Route" })

    }

})

//ROUTE 2 Adding notes : POST "/api/notes/addNotes" requires Login

router.post('/addNotes', fetchuser,
    [body('title', 'Title too short').isLength({ min: 3 }),
    body('description', 'Description too short').isLength({ min: 5 })],
    async (req, res) => {

        const { title, description, tag } = req.body;
        // checking if any error occurs in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({ title, description, tag, user: req.user.id }) //note is local and Notes is for new object of schema. to store the data according to schema in database
        const savedNote = await note.save();
        res.json(savedNote);

    })
module.exports = router;