const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  // 用户注册
  async register(userData) {
    const { email, password, username } = userData;
    
    // 检查用户是否已存在
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('用户已存在');
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户
    const user = await User.create({
      email,
      password: hashedPassword,
      username
    });
    
    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 用户登录
  async login(email, password) {
    // 查找用户
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('用户不存在');
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('密码错误');
    }
    
    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    // 返回用户信息和 token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }

  // 根据ID获取用户信息
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    
    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 更新用户信息
  async updateUser(id, updateData) {
    // 如果包含密码，则加密
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    // 更新用户
    const user = await User.update(id, updateData);
    if (!user) {
      throw new Error('用户不存在');
    }
    
    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 删除用户
  async deleteUser(id) {
    const user = await User.delete(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  }
}

module.exports = new UserService();