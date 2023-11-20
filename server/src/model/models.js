// // models.js

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../config/dbconfig.js');

// const User = sequelize.define('user', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   phone: { type: DataTypes.STRING, allowNull: false },
//   password: { type: DataTypes.STRING, allowNull: false }
// });

// module.exports = {
//   User
// };


// В файле models.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/dbconfig.js');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

const UserData = sequelize.define('userData', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  firstName: { type: DataTypes.STRING, allowNull: true },
  patronymic: { type: DataTypes.STRING,  allowNull: true },
  individualTaxNumber: { type: DataTypes.STRING ,  allowNull: true },
  registrationAddress: { type: DataTypes.STRING ,  allowNull: true },
  residenceAddress: { type: DataTypes.STRING ,  allowNull: true },
  passportPhoto1: { type: DataTypes.STRING ,  allowNull: true },
  passportPhoto2: { type: DataTypes.STRING ,  allowNull: true },
  passportPhoto4: { type: DataTypes.STRING ,  allowNull: true },
  employment: { type: DataTypes.STRING ,  allowNull: true },
  friendNumbers: { type: DataTypes.ARRAY(DataTypes.STRING),  allowNull: true  },
});

// Определение связи между моделями
User.hasOne(UserData); // Один ко многим (One-to-One)

module.exports = {
  User,
  UserData
};
