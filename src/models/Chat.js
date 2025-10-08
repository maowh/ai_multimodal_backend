const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 聊天会话模型
const ChatSession = {
  // 创建聊天会话
  create: async (sessionData) => {
    return await prisma.chatSession.create({
      data: sessionData
    });
  },

  // 根据ID查找聊天会话
  findById: async (id) => {
    return await prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: true
      }
    });
  },

  // 根据用户ID查找所有聊天会话
  findByUserId: async (userId) => {
    return await prisma.chatSession.findMany({
      where: { userId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });
  },

  // 更新聊天会话
  update: async (id, sessionData) => {
    return await prisma.chatSession.update({
      where: { id },
      data: sessionData
    });
  },

  // 删除聊天会话
  delete: async (id) => {
    return await prisma.chatSession.delete({
      where: { id }
    });
  }
};

// 聊天消息模型
const ChatMessage = {
  // 创建聊天消息
  create: async (messageData) => {
    return await prisma.chatMessage.create({
      data: messageData
    });
  },

  // 根据会话ID查找所有消息
  findBySessionId: async (sessionId) => {
    return await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: {
        createdAt: 'asc'
      }
    });
  },

  // 更新聊天消息
  update: async (id, messageData) => {
    return await prisma.chatMessage.update({
      where: { id },
      data: messageData
    });
  },

  // 删除聊天消息
  delete: async (id) => {
    return await prisma.chatMessage.delete({
      where: { id }
    });
  }
};

module.exports = { ChatSession, ChatMessage };