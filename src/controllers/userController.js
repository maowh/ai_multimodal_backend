const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');
const { userService } = require('../services');

// 用户注册
const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    
    // 验证请求数据
    if (!email || !password || !username) {
      return res.status(400).json({ message: '请提供所有必需的字段' });
    }
    
    // 调用服务层处理注册逻辑
    const user = await userService.register({ email, password, username });
    
    res.status(201).json({
      success: true,
      message: '用户注册成功',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // 验证请求数据
    if (!email || !password) {
      return res.status(400).json({ message: '请提供邮箱和密码' });
    }
    
    // 调用服务层处理登录逻辑
    const result = await userService.login(email, password);
    
    res.json({
      success: true,
      message: '登录成功',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户信息
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 调用服务层获取用户信息
    const user = await userService.getUserById(userId);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// 更新用户信息
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { username, email, password } = req.body;
    
    // 构建更新数据
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    
    // 调用服务层更新用户信息
    const user = await userService.updateUser(userId, updateData);
    
    res.json({
      success: true,
      message: '用户信息更新成功',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};