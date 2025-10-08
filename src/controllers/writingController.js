const { authenticateToken } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');
const { writingService } = require('../services');

// 生成文章
const generateArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prompt, options = {} } = req.body;
    
    // 验证请求数据
    if (!prompt) {
      return res.status(400).json({ message: '请提供文章主题或要求' });
    }
    
    // 调用服务层生成文章
    const task = await writingService.generateArticle(userId, prompt, options);
    
    res.status(201).json({
      success: true,
      message: '文章生成任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 优化文章
const optimizeArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content, options = {} } = req.body;
    
    // 验证请求数据
    if (!content) {
      return res.status(400).json({ message: '请提供需要优化的文章内容' });
    }
    
    // 调用服务层优化文章
    const task = await writingService.optimizeArticle(userId, content, options);
    
    res.status(201).json({
      success: true,
      message: '文章优化任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 生成文章摘要
const generateSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content, options = {} } = req.body;
    
    // 验证请求数据
    if (!content) {
      return res.status(400).json({ message: '请提供需要生成摘要的文章内容' });
    }
    
    // 调用服务层生成摘要
    const task = await writingService.generateSummary(userId, content, options);
    
    res.status(201).json({
      success: true,
      message: '文章摘要生成任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 续写文章
const continueArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content, options = {} } = req.body;
    
    // 验证请求数据
    if (!content) {
      return res.status(400).json({ message: '请提供需要续写的文章内容' });
    }
    
    // 调用服务层续写文章
    const task = await writingService.continueArticle(userId, content, options);
    
    res.status(201).json({
      success: true,
      message: '文章续写任务已创建',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 获取用户的写作任务列表
const getUserWritingTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 获取用户的写作任务
    const tasks = await writingService.getUserTasks(userId);
    
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// 获取写作任务详情
const getWritingTaskDetail = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    
    // 获取任务详情
    const task = await writingService.getTaskById(taskId);
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 更新写作任务
const updateWritingTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, content, status } = req.body;
    
    // 构建更新数据
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (status !== undefined) updateData.status = status;
    
    // 更新任务
    const task = await writingService.updateTask(taskId, updateData);
    
    res.json({
      success: true,
      message: '写作任务更新成功',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// 删除写作任务
const deleteWritingTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    
    // 删除任务
    await writingService.deleteTask(taskId);
    
    res.json({
      success: true,
      message: '写作任务删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateArticle,
  optimizeArticle,
  generateSummary,
  continueArticle,
  getUserWritingTasks,
  getWritingTaskDetail,
  updateWritingTask,
  deleteWritingTask
};