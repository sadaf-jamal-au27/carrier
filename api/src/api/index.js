// src/api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Expression = require('../models/Expression');
const app = express();
const port = process.env.PORT || 3001
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(cors())

app.get('/expressions', async (req, res) => {
  try {
    const expressions = await Expression.find();
    res.json(expressions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/expression', async (req, res) => {
  try {
    const newData = await Expression.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/expressions/:id', async (req, res) => {
  const { id } = req.params;
  const { expression } = req.body;

  try {
    const updatedExpression = await Expression.findByIdAndUpdate(
      id,
      { expression },
      { new: true }
    );

    if (updatedExpression) {
      res.json(updatedExpression);
    } else {
      res.status(404).json({ error: 'Expression not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/expressions/:id', async (req, res) => {
  try {
    const deletedData = await Expression.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
