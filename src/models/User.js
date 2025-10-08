const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 用户模型
const User = {
  // 创建用户
  create: async (userData) => {
    return await prisma.user.create({
      data: userData
    });
  },

  // 根据ID查找用户
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  // 根据邮箱查找用户
  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  // 更新用户信息
  update: async (id, userData) => {
    return await prisma.user.update({
      where: { id },
      data: userData
    });
  },

  // 删除用户
  delete: async (id) => {
    return await prisma.user.delete({
      where: { id }
    });
  }
};

module.exports = { User };