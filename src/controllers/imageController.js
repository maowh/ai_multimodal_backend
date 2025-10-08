const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');
const { imageService } = require('../services');
const multer = require('multer');
const path = require('path');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制文件大小为5MB
  },
  fileFilter: function (req, file, cb) {
    // 只接受图片文件
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

// 生成图像
const generateImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prompt, options = {} } = req.body;
    
    // 验证请求数据
    if (!prompt) {
      return res.status(400).json({ message: '请提供图像描述' });
    }
    
    // 调用服务层生成图像
    const task = await imageService.generateImage(userId, prompt, options);
    
    res.status(201).json({
      success: true,
      message: '图像生成任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 生成图像变体
const generateImageVariations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { count = 3 } = req.body;
    
    // 验证请求数据
    if (!req.file) {
      return res.status(400).json({ message: '请提供需要生成变体的图像' });
    }
    
    const imagePath = req.file.path;
    
    // 调用服务层生成图像变体
    const task = await imageService.generateImageVariations(userId, imagePath, { count });
    
    res.status(201).json({
      success: true,
      message: '图像变体生成任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 编辑图像
const editImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prompt, options = {} } = req.body;
    
    // 验证请求数据
    if (!req.files || !req.files.image || !req.files.mask) {
      return res.status(400).json({ message: '请提供原始图像和蒙版图像' });
    }
    
    if (!prompt) {
      return res.status(400).json({ message: '请提供编辑描述' });
    }
    
    const imagePath = req.files.image[0].path;
    const maskPath = req.files.mask[0].path;
    
    // 调用服务层编辑图像
    const task = await imageService.editImage(userId, imagePath, maskPath, prompt, options);
    
    res.status(201).json({
      success: true,
      message: '图像编辑任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 扩展图像
const expandImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { options = {} } = req.body;
    
    // 验证请求数据
    if (!req.file) {
      return res.status(400).json({ message: '请提供需要扩展的图像' });
    }
    
    const imagePath = req.file.path;
    
    // 调用服务层扩展图像
    const task = await imageService.expandImage(userId, imagePath, options);
    
    res.status(201).json({
      success: true,
      message: '图像扩展任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户的图像任务列表
const getUserImageTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 获取用户的图像任务
    const tasks = await imageService.getUserTasks(userId);
    
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// 获取图像任务详情
const getImageTaskDetail = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    
    // 获取任务详情
    const task = await imageService.getTaskById(taskId);
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 更新图像任务
const updateImageTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, status } = req.body;
    
    // 构建更新数据
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) updateData.status = status;
    
    // 更新任务
    const task = await imageService.updateTask(taskId, updateData);
    
    res.json({
      success: true,
      message: '图像任务更新成功',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 删除图像任务
const deleteImageTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    
    // 删除任务
    await imageService.deleteTask(taskId);
    
    res.json({
      success: true,
      message: '图像任务删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateImage,
  generateImageVariations,
  editImage,
  expandImage,
  getUserImageTasks,
  getImageTaskDetail,
  updateImageTask,
  deleteImageTask,
  upload
};