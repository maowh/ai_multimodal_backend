const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');
const { chatService } = require('../services');

// 发送聊天消息
const sendMessage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId, content } = req.body;
    
    // 验证请求数据
    if (!content) {
      return res.status(400).json({ message: '请提供消息内容' });
    }
    
    // 如果没有提供会话ID，创建新会话
    let session = sessionId;
    if (!session) {
      const newSession = await chatService.createSession(userId, '新会话');
      session = newSession.id;
    }
    
    // 保存用户消息
    await chatService.sendMessage(session, 'user', content);
    
    // TODO: 调用 AI 服务获取回复
    // 这里应该调用相应的 AI 服务 API
    
    // 模拟 AI 响应
    const aiResponse = `这是对 "${content}" 的回复。`;
    
    // 保存 AI 回复
    await chatService.sendMessage(session, 'assistant', aiResponse);
    
    res.json({
      success: true,
      message: '消息发送成功',
      data: {
        sessionId,
        userMessage: content,
        assistantMessage: aiResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取聊天历史
const getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;
    
    // 验证请求数据
    if (!sessionId) {
      return res.status(400).json({ message: '请提供会话ID' });
    }
    
    // 获取会话消息
    const messages = await chatService.getSessionMessages(sessionId);
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// 创建新聊天会话
const createChatSession = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    
    // 创建新会话
    const session = await chatService.createSession(userId, title);
    
    res.status(201).json({
      success: true,
      message: '聊天会话创建成功',
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// 获取聊天会话列表
const getChatSessions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 获取用户的所有会话
    const sessions = await chatService.getUserSessions(userId);
    
    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

// 更新会话标题
const updateSessionTitle = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { title } = req.body;
    
    // 验证请求数据
    if (!title) {
      return res.status(400).json({ message: '请提供会话标题' });
    }
    
    // 更新会话标题
    const session = await chatService.updateSessionTitle(sessionId, title);
    
    res.json({
      success: true,
      message: '会话标题更新成功',
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// 删除聊天会话
const deleteChatSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    // 删除会话
    await chatService.deleteSession(sessionId);
    
    res.json({
      success: true,
      message: '聊天会话删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  createChatSession,
  getChatSessions,
  updateSessionTitle,
  deleteChatSession
};