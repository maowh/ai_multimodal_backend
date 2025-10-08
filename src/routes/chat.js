const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { chatController } = require('../controllers');

// 发送聊天消息
router.post('/message', authenticateToken, chatController.sendMessage);

// 获取聊天历史
router.get('/history/:sessionId', authenticateToken, chatController.getChatHistory);

// 创建新聊天会话
router.post('/session', authenticateToken, chatController.createChatSession);

// 获取聊天会话列表
router.get('/sessions', authenticateToken, chatController.getChatSessions);

// 更新会话标题
router.put('/session/:sessionId', authenticateToken, chatController.updateSessionTitle);

// 删除聊天会话
router.delete('/session/:sessionId', authenticateToken, chatController.deleteChatSession);

module.exports = router;