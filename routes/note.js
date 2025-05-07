import express from 'express';
import axios from 'axios';
import Note from '../models/Note.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const catfact = response.data.fact;

    const note = new Note({ title, content, catfact });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.get('/get', async (req, res) => {
  try {
    console.log("agam")
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const notes = await Note.find({
      $or: [
        { content: new RegExp(query, 'i') },
        { catfact: new RegExp(query, 'i') },
        { title: new RegExp(query, 'i') }
      ]
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
