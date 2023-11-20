const { Router } = require('express');
const router = new Router();
const authRouter = require('./authRouter');

// Используем роутер для регистрации и отправки OTP-пароля
router.use('/auth', authRouter);

module.exports = router;
