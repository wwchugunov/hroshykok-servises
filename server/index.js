const express = require('express');
const cors = require('cors');
const authRouter = require('./src/router/router.js');
const sequelize = require('./config/dbconfig.js');
const PORT = process.env.PORT ;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.use('/hroshykok', authRouter);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Соединение с базой данных установлено успешно');

    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.error('Не удалось подключиться к базе данных:', error);
  }
}

start();
