const {sequelize, Sequelize} = require('sequelize')
require('dotenv').config()


module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        logging: console.log
    }
    )
    
    // db.authenticate()
    //   .then(() => console.log('Подключение к базе данных установлено успешно'))
    //   .catch((error) => console.error('Ошибка подключения к базе данных:', error));

// PORT=5000
// DB_NAME=hroshykok
// DB_USER=postgres
// DB_PASSWORD=1945
// DB_HOST=localhost
// BD_PORT=5432
// SECRET_KEY=kldsfjarfvhs23142345jfsdjgdj

// const { sequelize, Sequelize } = require('sequelize');
// require('dotenv').config();

// const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     logging: console.log, // Включите логирование в консоль
//   }
// );

// db.authenticate()
//   .then(() => console.log('Подключение к базе данных установлено успешно'))
//   .catch((error) => console.error('Ошибка подключения к базе данных:', error));
