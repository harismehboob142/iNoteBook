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

//ROUTE 3 Updating notes : PUT "/api/notes/updateNotes" requires Login
router.put('/updateNotes/:id', fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // finding the note to be updated, that if it is present in db
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }
        // check if the note user and db user are same (user who possesses the node is trying to update it)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    })
// ROUTE 4 Deleting notes : DELETE "/api/notes/deleteNotes" requires Login

router.put('/deleteNotes/:id', fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // finding the note to be updated, that if it is present in db
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }
        // check if the note user and db user are same (user who possesses the node is trying to update it)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    })



module.exports = router;