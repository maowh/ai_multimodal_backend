const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 写作任务模型
const WritingTask = {
  // 创建写作任务
  create: async (taskData) => {
    return await prisma.writingTask.create({
      data: taskData
    });
  },

  // 根据ID查找写作任务
  findById: async (id) => {
    return await prisma.writingTask.findUnique({
      where: { id }
    });
  },

  // 根据用户ID查找所有写作任务
  findByUserId: async (userId) => {
    return await prisma.writingTask.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  // 更新写作任务
  update: async (id, taskData) => {
    return await prisma.writingTask.update({
      where: { id },
      data: taskData
    });
  },

  // 删除写作任务
  delete: async (id) => {
    return await prisma.writingTask.delete({
      where: { id }
    });
  }
};

module.exports = { WritingTask };