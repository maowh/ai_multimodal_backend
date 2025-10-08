const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { imageController } = require('../controllers');

// 生成图像
router.post('/generate', authenticateToken, imageController.generateImage);

// 图像变体
router.post('/variations', authenticateToken, imageController.upload.single('image'), imageController.generateImageVariations);

// 图像编辑
router.post('/edit', authenticateToken, imageController.upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'mask', maxCount: 1 }
]), imageController.editImage);

// 图像扩展
router.post('/expand', authenticateToken, imageController.upload.single('image'), imageController.expandImage);

// 获取用户的图像任务列表
router.get('/tasks', authenticateToken, imageController.getUserImageTasks);

// 获取图像任务详情
router.get('/tasks/:taskId', authenticateToken, imageController.getImageTaskDetail);

// 更新图像任务
router.put('/tasks/:taskId', authenticateToken, imageController.updateImageTask);

// 删除图像任务
router.delete('/tasks/:taskId', authenticateToken, imageController.deleteImageTask);

module.exports = router;