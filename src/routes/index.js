const express = require('express');
const router = express.Router();

// 用户管理路由
router.use('/users', require('./users'));

// AI 聊天路由
router.use('/chat', require('./chat'));

// AI 写作路由
router.use('/writing', require('./writing'));

// AI 图像生成路由
router.use('/image', require('./image'));

module.exports = router;