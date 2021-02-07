const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App

const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Stores notes in an array
function readNotes() {
  var noteData = fs.readFileSync(path.join(__dirname, "./db/db.json"));
  var parsedNoteData = JSON.parse(noteData);
  return parsedNoteData;
}

// Route that sends the user first to the AJAX Page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("/api/notes", (req, res) => {
  res.json(readNotes());
});
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// Generates unique id and saves/returns new note data
app.post("/api/notes", (req, res) => {
  req.body.id = Math.floor(Math.random() * 100000000);
  let newNote = req.body;

  let noteData = JSON.parse(fs.readFileSync("./db/db.json"));
    noteData.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    res.json(noteData);
});

// Delete notes
app.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);

  // Return stored notes as an array of objects
  let noteData = JSON.parse(fs.readFileSync("./db/db.json"));
  console.log(noteData);

  // Filter notes by all notes that do not match deleted note id
  const notes = noteData.filter((note) => note.id !== id);
  console.log(notes);
  // Save new array of notes
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
