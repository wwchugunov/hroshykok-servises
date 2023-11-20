const bcrypt = require('bcrypt');
const { User, UserData } = require('../model/models.js');
const jwt = require('jsonwebtoken')

const generateJwt = (id, phone) => {
  return jwt.sign(
    { id, phone },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class AuthController {
  async registerUser(req, res) {
    try {
      const { phone, password } = req.body;
      if (!phone || !password) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }

      // Проверка, существует ли пользователь с указанным номером телефона
      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser) {
        return res.status(409).json({ message: 'Пользователь с указанным номером телефона уже существует' });
      }

      // Создание пользователя
      const hashPassword = await bcrypt.hash(password, 5);
      const createdUser = await User.create({ phone, password: hashPassword });

      // Создание данных пользователя
      const userData = await UserData.create({
        userId: createdUser.id,
        lastName: '',
        firstName: null,
        patronymic: null,
        individualTaxNumber: null,
        registrationAddress: null,
        residenceAddress: null,
        passportPhoto1: null,
        passportPhoto2: null,
        passportPhoto4:null,
        employment: null,
        friendNumbers: null,

      });

      // Генерация токена и отправка ответа
      const token = generateJwt(createdUser.id, createdUser.phone);
      return res.json({ token, user: { ...createdUser.toJSON(), userData } });
    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      res.status(500).json({ error: 'Произошла ошибка при регистрации пользователя' });
    }
  }

  async loginUser(req, res) {
    try {
      const { phone, password } = req.body;
      if (!phone || !password) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }

      // Проверка, существует ли пользователь с указанным номером телефона
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res.status(401).json({ message: 'Пользователь с указанным номером телефона не найден' });
      }

      // Проверка совпадения введенного пароля с хэшированным паролем в базе данных
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверный пароль' });
      }

      // Генерация токена и отправка ответа с данными пользователя
      const token = generateJwt(user.id, user.phone);
      // return res.json({ token, user: { ...UserData.toJSON(), userData } });
      return res.json({ token, user,  });
    } catch (error) {
      console.error('Ошибка при авторизации пользователя:', error);
      res.status(500).json({ error: 'Произошла ошибка при авторизации пользователя' });
    }
  }

  // Роут для получения данных пользователя
// Ваш запрос в контроллере
async  getUserData(req, res) {
  try {
    const user = req.user; // или как вы получаете пользователя
    const userData = await UserData.findOne({ where: { userId: user.id } });

    if (!userData) {
      return res.status(404).json({ message: 'Данные пользователя не найдены' });
    }

    return res.json({ user: { ...user, userData } });
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных пользователя' });
  }
}


  // Роут для редактирования данных пользователя
  async editUserData(req, res) {
    try {
      // Получаем и редактируем данные пользователя из запроса
      const user = req.user; // Предполагается, что вы используете middleware для аутентификации
      // ... ваш код редактирования ...

      return res.json({ user });
    } catch (error) {
      console.error('Ошибка при редактировании данных пользователя:', error);
      res.status(500).json({ error: 'Произошла ошибка при редактировании данных пользователя' });
    }
  }


  async createObject(req, res) {
    try {
      // Извлекаем идентификатор пользователя из токена
      const userId = req.user.id;

      // Получаем произвольные данные из запроса
      const {
        lastName,
        firstName,
        patronymic,
        individualTaxNumber,
        registrationAddress,
        residenceAddress,
        passportPhoto1,
        passportPhoto2,
        passportPhoto4,
        employment,
        friendNumbers,
      } = req.body;

      // Проверяем, существует ли объект данных для данного пользователя
      let userObject = await UserData.findOne({ where: { userId } });

      if (!userObject) {
        // Если объект данных не существует, создаем новый
        userObject = await UserData.create({
          userId,
          lastName,
          firstName,
          patronymic,
          individualTaxNumber,
          registrationAddress,
          residenceAddress,
          passportPhoto1,
          passportPhoto2,
          passportPhoto4,
          employment,
          friendNumbers,
        });

        return res.status(201).json({ message: 'Объект создан успешно', data: userObject });
      } else {
        // Если объект данных существует, выполняем операцию редактирования
        await UserData.update(
          {
            lastName,
            firstName,
            patronymic,
            individualTaxNumber,
            registrationAddress,
            residenceAddress,
            passportPhoto1,
            passportPhoto2,
            passportPhoto4,
            employment,
            friendNumbers,
          },
          { where: { userId } }
        );

        return res.status(200).json({ message: 'Объект обновлен успешно', data: userObject });
      }
    } catch (error) {
      console.error('Ошибка при создании/редактировании объекта:', error);
      res.status(500).json({ error: 'Произошла ошибка при создании/редактировании объекта' });
    }
  }
  }










  

module.exports = new AuthController();
