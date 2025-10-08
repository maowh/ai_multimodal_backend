const { ChatSession, ChatMessage } = require('../models/Chat');

class ChatService {
  // 创建新的聊天会话
  async createSession(userId, title) {
    return await ChatSession.create({
      userId,
      title: title || '新会话'
    });
  }

  // 获取用户的所有聊天会话
  async getUserSessions(userId) {
    return await ChatSession.findByUserId(userId);
  }

  // 获取特定聊天会话的详细信息
  async getSessionById(sessionId) {
    return await ChatSession.findById(sessionId);
  }

  // 发送消息
  async sendMessage(sessionId, role, content) {
    return await ChatMessage.create({
      sessionId,
      role,
      content
    });
  }

  // 获取会话的所有消息
  async getSessionMessages(sessionId) {
    return await ChatMessage.findBySessionId(sessionId);
  }

  // 更新会话标题
  async updateSessionTitle(sessionId, title) {
    return await ChatSession.update(sessionId, { title });
  }

  // 删除聊天会话
  async deleteSession(sessionId) {
    return await ChatSession.delete(sessionId);
  }
}

module.exports = new ChatService();