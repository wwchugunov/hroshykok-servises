const { Router } = require('express');
const authController = require('../controller/authController.js');
const authMiddleweare = require('../middleware/authMiddleweare.js')

const router = Router();

router.post('/register', authController.registerUser); 
router.post('/login', authController.loginUser); 
router.post('/createobj', authMiddleweare, authController.createObject);
router.put('/edituserdata', authMiddleweare, authController.editUserData);
router.get('/userdata', authMiddleweare, authController.getUserData);
module.exports = router;
