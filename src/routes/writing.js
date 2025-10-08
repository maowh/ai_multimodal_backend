const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { writingController } = require('../controllers');

// 生成文章
router.post('/generate', authenticateToken, writingController.generateArticle);

// 优化文章
router.post('/optimize', authenticateToken, writingController.optimizeArticle);

// 文章摘要
router.post('/summarize', authenticateToken, writingController.generateSummary);

// 文章续写
router.post('/continue', authenticateToken, writingController.continueArticle);

// 获取用户的写作任务列表
router.get('/tasks', authenticateToken, writingController.getUserWritingTasks);

// 获取写作任务详情
router.get('/tasks/:taskId', authenticateToken, writingController.getWritingTaskDetail);

// 更新写作任务
router.put('/tasks/:taskId', authenticateToken, writingController.updateWritingTask);

// 删除写作任务
router.delete('/tasks/:taskId', authenticateToken, writingController.deleteWritingTask);

module.exports = router;