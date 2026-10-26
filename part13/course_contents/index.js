// app.get('/api/notes', async (req, res) => {
//   const notes = await Note.findAll();
//   console.log(notes.map(n=>n.toJSON()))
//   console.log(JSON.stringify(notes))
//   console.log(JSON.stringify(notes, null, 2))
//   res.json(notes);
// });

// app.get('/api/notes/:id', async (req, res) => {
//   const note = await Note.findByPk(req.params.id);
//   if (note) {
//     // console.log(note);
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

// app.post('/api/notes', async (req, res) => {
//   try {
//     const note = await Note.create({...req.body, date: new Date()});
//     res.json(note);
//   } catch (error) {
//     return res.status(400).json({error});
//   }
// });

// app.put('/api/notes/:id', async (req, res) => {
//   const note = await Note.findByPk(req.params.id);
//   if (note) {
//     note.important = req.body.important;
//     await note.save();
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

const express = require('express');
const app = express();

const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');

const notesRouter = require('./controllers/notes.js');

app.use(express.json());

app.use('/api/notes', notesRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
