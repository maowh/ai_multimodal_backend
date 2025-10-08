const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static('uploads'));

// 路由
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: 'AI 多模态后端 API 服务已启动' });
});

// 错误处理中间件
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

// 404 处理
app.use((req, res) => {
  res.status(404).json({ message: '路由不存在' });
});

module.exports = app;