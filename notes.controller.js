const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
const log = console.log;

async function writeFileNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes))
}


async function addNote(title) {
	const notes = await getNotes()
	const note = {
		id: Date.now().toString(),
		title,
	}
	notes.push(note)
	await writeFileNotes(notes)
	log(chalk.green("Заметка добавлена!"))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
	const parseNotes = JSON.parse(notes)
	return Array.isArray(parseNotes) ? parseNotes : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}


async function deleteNote(id) {
	const notes = await getNotes();
	const note = notes.find(note => note.id === id)
	
	if (!note) return log(chalk.red("Заметки с id:", id, "не существует"))
	const newNotesArray = notes.filter(note => note.id !== id)
	await writeFileNotes(newNotesArray)
	log(chalk.green(`Заметка ${note.title} успешно удалена!`))
}

async function printNotes() {
	const notes = await getNotes()
	log(chalk.bgBlue("Here is the list of notes:"))
	console.table(notes, ['title', 'id']);
}

async function updateNote(noteData) {
  const notes = await getNotes()
  const index = notes.findIndex(note => note.id === noteData.id)
  if (index >= 0) {
    notes[index] = { ...notes[index], ...noteData }
    await saveNotes(notes)
    console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
  }
}

module.exports = {
	addNote,
	printNotes,
	deleteNote,
	updateNote
}