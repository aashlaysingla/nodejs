  // console.log('starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var note = {
    title,
    body
  };

  var notes = fetchNotes();

  var duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });

  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {

  }
};


var getAll = () => {
  return fetchNotes();
};


var getNote = (title) => {
  var notes = fetchNotes();
  var result = notes.filter((note) => {
    return note.title === title;
  });
  return result[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter( (note) => {
    return note.title !== title;
  });
  saveNotes(newNotes);
  return notes.length === newNotes.length;
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
