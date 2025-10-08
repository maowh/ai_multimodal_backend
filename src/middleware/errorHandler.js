const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // 默认错误
  let error = {
    message: err.message || '服务器内部错误',
    status: err.status || 500
  };

  // 处理特定类型的错误
  if (err.name === 'ValidationError') {
    error.message = '数据验证失败';
    error.status = 400;
  }

  if (err.name === 'UnauthorizedError') {
    error.message = '未授权访问';
    error.status = 401;
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    error.message = '文件大小超过限制';
    error.status = 413;
  }

  res.status(error.status).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };