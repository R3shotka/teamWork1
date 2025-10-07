const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Підключення до MongoDB Atlas
const mongoURI = 'mongodb+srv://mancity_user:mancity_user1@manchestercitydb.oxk6m5e.mongodb.net/ManchesterCityDB?retryWrites=true&w=majority&appName=ManchesterCityDB';

mongoose.connect(mongoURI)
  .then(() => console.log('Підключено до MongoDB Atlas'))
  .catch(err => console.error('Помилка підключення:', err)); 

// Модель для коментарів
const Comment = mongoose.model('Comment', {
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

// Middleware
app.use(cors());
app.use(express.json());

// API для коментарів
app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.send(comments);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер працює на http://localhost:${PORT}`));