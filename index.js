const http = require('http');
const fs = require('fs/promises')
const path = require('path')
const express = require('express')
const {addNote, printNotes, deleteNote} = require('./notes.controller')

const basePath = path.join(__dirname, 'pages')

const port = 3000

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res)=> {
	res.render('index', {
		title: 'Express App',
		notes: await printNotes(),
		created: false
	})
})
app.post('/', async (req, res)=> {
  await addNote(req.body.title)
		res.render('index', {
		title: 'Express App',
		notes: await printNotes(),
		created: true
	}
)
})

app.delete("/:id", async (req, res) => {
	await deleteNote(req.params.id)
	await addNote(req.body.title)
		res.render('index', {
		title: 'Express App',
		notes: await printNotes(),
		created: false
	})
})


app.listen(port, ()=>{
	console.log(`Server has been started on port ${port}...`)
})