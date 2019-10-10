// console.log('starting app');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

var command = process.argv[2];
var argv = yargs.argv;

// console.log(process.argv);
// console.log(process.argv[3]);
// console.log(argv._[0]);
// console.log(argv);
// console.log(argv.title);

if(command === 'add')
{
  var note = notes.addNote(argv.title,argv.body);
  if(note) {
    console.log('note created');
    notes.logNote(note);
  } else {
    console.log('note title taken');
  }
}
else if(command === 'list')
{
    var allNotes = notes.getAll();
    allNotes.forEach((note) => {
      notes.logNote(note);
    });
}
else if(command === 'read')
{
  var note = notes.getNote(argv.title);
  // console.log(note);
  if(note) {
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
}
else if(command === 'remove')
{
  var result = notes.removeNote(argv.title);
  var message = result ? 'Note not found' : 'Note removed';
  console.log(message);
}
else
  console.log('command not recognised');
