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
	return notes
}

module.exports = {
	addNote,
	printNotes,
	deleteNote
}