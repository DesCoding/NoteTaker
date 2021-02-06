const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
function readNotes() {
    var noteData = fs.readFileSync(path.join(__dirname, './db/db.json'));
    var parsedNoteData = JSON.parse(noteData);
        return parsedNoteData;
}

// Basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => {
    res.json(readNotes())
})
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


// Routes to post user input to page
app.post("/api/notes", (req, res) => {
    req.body.id = Math.floor(Math.random() * 100000000);
    let newNote = req.body;
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
