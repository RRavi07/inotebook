const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // Import middleware to fetch user details
const Notes = require('../models/Notes'); // Import Notes model
const { body, validationResult } = require('express-validator'); // Import express-validator for input validation

// Route-1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // Fetch all notes belonging to the authenticated user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes); // Send the notes as a JSON response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred"); // Send an error response if something goes wrong
    }
});

// Route-2: Add a new note using post
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }), // Validate title length
    body('description', 'Enter a valid description').isLength({ min: 5 }) // Validate description length
], async (req, res) => {
    try {
        const { title, description, tag } = req.body; // Extract title, description, and tag from request body

        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Send validation errors as JSON response
        }

        // Create a new note instance with user ID from middleware
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id, // Assign the user ID to the note
        });

        const savedNote = await note.save(); // Save the new note to the database

        res.json(savedNote); // Send the saved note as a JSON response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred"); // Send an error response if something goes wrong
    }
});

// Route-3: Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a newNote object to hold the updated values
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        try {
            // Find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Note not found") }

            // Check if the authenticated user is the owner of the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed to update this note");
            }

            // Update the note with the new values
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );

            res.json(note); // Send the updated note as a JSON response
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred"); // Send an error response if something goes wrong
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred"); // Send an error response if something goes wrong
    }
});


// Route-4 delete note 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find  NOTE TO BE DELETED
        const note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("note not found") }

        //check autthentication
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to delete this note");
        }

        // Delete the note from the database
        await Notes.findByIdAndDelete(req.params.id);

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred"); // Send an error response if something goes wrong
    }
});


module.exports = router; // Export the router for use in the main application
