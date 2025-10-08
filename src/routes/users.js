const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { userController } = require('../controllers');

// 用户注册
router.post('/register', userController.register);

// 用户登录
router.post('/login', userController.login);

// 获取用户信息
router.get('/profile', authenticateToken, userController.getProfile);

// 更新用户信息
router.put('/profile', authenticateToken, userController.updateProfile);

module.exports = router;