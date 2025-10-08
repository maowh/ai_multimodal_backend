const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 图像生成任务模型
const ImageTask = {
  // 创建图像生成任务
  create: async (taskData) => {
    return await prisma.imageTask.create({
      data: taskData
    });
  },

  // 根据ID查找图像生成任务
  findById: async (id) => {
    return await prisma.imageTask.findUnique({
      where: { id }
    });
  },

  // 根据用户ID查找所有图像生成任务
  findByUserId: async (userId) => {
    return await prisma.imageTask.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  // 更新图像生成任务
  update: async (id, taskData) => {
    return await prisma.imageTask.update({
      where: { id },
      data: taskData
    });
  },

  // 删除图像生成任务
  delete: async (id) => {
    return await prisma.imageTask.delete({
      where: { id }
    });
  }
};

module.exports = { ImageTask };