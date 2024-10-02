const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // для использования переменных из .env

const app = express();
const PORT = process.env.PORT || 3000;

// Модель статьи
const Article = mongoose.model('Article', new mongoose.Schema({
  title: String,
  content: String
}));

// Подключение к MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешно подключено к MongoDB Atlas'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.send('Привет, мир! Сервер работает и подключен к MongoDB.');
});

// Маршрут для создания новой статьи
app.get('/add-article', async (req, res) => {
  try {
    const article = new Article({ title: 'Тестовая статья', content: 'Это содержимое тестовой статьи.' });
    await article.save();
    res.send('Статья успешно добавлена в базу данных!');
  } catch (error) {
    res.status(500).send('Произошла ошибка при добавлении статьи.');
  }
});

// Маршрут для получения всех статей
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles); // Вернуть данные в формате JSON
  } catch (error) {
    res.status(500).send('Произошла ошибка при получении статей.');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log('Сервер запущен на порту ${PORT}');
});
