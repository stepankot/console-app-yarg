const yargs = require('yargs/yargs');
const {addNote, printNotes, deleteNote, updateNote} = require('./notes.controller')
const { hideBin } = require('yargs/helpers');


const yarg = hideBin(process.argv);


yargs(yarg)
  .command('add', 'Add new note', (yargs) => {
		return yargs.option('title', {
			type: 'string',
			describe: 'Название заметки',
			demandOption: true,
		})
	}, ({title}) => {
    addNote(title)
  })
  .command('remove', 'Remove note by id', (yargs) => {
		return yargs.option('id', {
			type: 'string',
			describe: 'ID заметки',
			demandOption: true,
		})
	}, ({id}) => {
    deleteNote(id)
  })
	.command('edit', 'Edit note by id', (yargs) => {
		return yargs
			.option("id", {
				type: 'string',
				describe: 'ID заметки',
				demandOption: true,
			})
			.option("title", {
				type: 'string',
				describe: 'Новый заголовок заметки',
				demandOption: true,
			})
	}, ({id, title}) => {
		const noteData = {id, title}
		updateNote(noteData)
	})
  .command('list', 'List all notes', () => {}, async () => {
    const notes = await printNotes()
		console.log(notes)
  })
  .demandCommand(1, 'Укажите команду')
  .help()
  .parse()
	
yargs(yarg).version('1.0.0')