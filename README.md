# AI 多模态后端服务

这是一个基于 Node.js + Express + Prisma 的 AI 多模态后端服务，提供用户管理、AI 聊天、AI 写作和 AI 图像生成等功能。

## 功能特性

- 用户注册和登录（JWT 认证）
- AI 聊天功能（创建会话、发送消息、获取历史）
- AI 写作功能（生成文章、优化文章、生成摘要、续写文章）
- AI 图像生成功能（生成图像、图像变体、图像编辑、图像扩展）

## 技术栈

- **后端框架**: Node.js + Express
- **数据库**: MySQL (使用 Prisma ORM)
- **认证**: JWT (JSON Web Token)
- **文件上传**: Multer
- **安全**: Helmet, CORS, bcrypt
- **日志**: Morgan

## 项目结构

```
├── prisma/                  # Prisma 相关文件
│   ├── schema.prisma        # 数据库模式定义
│   └── seed.js              # 种子数据
├── src/                     # 源代码目录
│   ├── config/              # 配置文件
│   │   └── database.js      # 数据库配置
│   ├── controllers/         # 控制器
│   │   ├── userController.js
│   │   ├── chatController.js
│   │   ├── writingController.js
│   │   └── imageController.js
│   ├── middleware/          # 中间件
│   │   ├── auth.js          # JWT 认证中间件
│   │   └── errorHandler.js  # 错误处理中间件
│   ├── models/              # 数据模型
│   │   ├── User.js
│   │   ├── Chat.js
│   │   ├── Writing.js
│   │   └── Image.js
│   ├── routes/              # 路由定义
│   │   ├── users.js
│   │   ├── chat.js
│   │   ├── writing.js
│   │   └── image.js
│   ├── services/            # 业务逻辑服务
│   │   ├── userService.js
│   │   ├── chatService.js
│   │   ├── writingService.js
│   │   └── imageService.js
│   ├── app.js               # Express 应用配置
│   └── server.js            # 服务器入口
├── uploads/                 # 文件上传目录
├── .env                     # 环境变量
├── .env.example             # 环境变量示例
├── package.json             # 项目依赖和脚本
└── README.md                # 项目说明文档
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env` 并配置以下环境变量：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DATABASE_URL="mysql://username:password@localhost:3306/ai_multimodal_db"

# JWT 配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# 文件上传配置
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# AI 服务配置
OPENAI_API_KEY=your_openai_api_key
STABILITY_API_KEY=your_stability_api_key
```

### 3. 初始化数据库

```bash
npm run prisma:setup
```

这将执行以下操作：
- 创建数据库迁移
- 生成 Prisma 客户端
- 填充种子数据

### 4. 启动开发服务器

```bash
npm run dev
```

### 5. 启动生产服务器

```bash
npm start
```

## API 文档

### 用户管理

- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户信息（需要认证）
- `PUT /api/users/profile` - 更新用户信息（需要认证）

### AI 聊天

- `POST /api/chat/message` - 发送聊天消息（需要认证）
- `GET /api/chat/history/:sessionId` - 获取聊天历史（需要认证）
- `POST /api/chat/session` - 创建新聊天会话（需要认证）
- `GET /api/chat/sessions` - 获取聊天会话列表（需要认证）
- `PUT /api/chat/session/:sessionId` - 更新会话标题（需要认证）
- `DELETE /api/chat/session/:sessionId` - 删除聊天会话（需要认证）

### AI 写作

- `POST /api/writing/generate` - 生成文章（需要认证）
- `POST /api/writing/optimize` - 优化文章（需要认证）
- `POST /api/writing/summarize` - 生成文章摘要（需要认证）
- `POST /api/writing/continue` - 续写文章（需要认证）
- `GET /api/writing/tasks` - 获取用户的写作任务列表（需要认证）
- `GET /api/writing/tasks/:taskId` - 获取写作任务详情（需要认证）
- `PUT /api/writing/tasks/:taskId` - 更新写作任务（需要认证）
- `DELETE /api/writing/tasks/:taskId` - 删除写作任务（需要认证）

### AI 图像生成

- `POST /api/image/generate` - 生成图像（需要认证）
- `POST /api/image/variations` - 生成图像变体（需要认证）
- `POST /api/image/edit` - 编辑图像（需要认证）
- `POST /api/image/expand` - 扩展图像（需要认证）
- `GET /api/image/tasks` - 获取用户的图像任务列表（需要认证）
- `GET /api/image/tasks/:taskId` - 获取图像任务详情（需要认证）
- `PUT /api/image/tasks/:taskId` - 更新图像任务（需要认证）
- `DELETE /api/image/tasks/:taskId` - 删除图像任务（需要认证）

## 测试账户

系统初始化时会创建以下测试账户：

- **管理员账户**: admin@example.com / admin123
- **测试用户账户**: test@example.com / test123

## 开发工具

### Prisma Studio

使用 Prisma Studio 可视化管理数据库：

```bash
npm run prisma:studio
```

### 数据库迁移

创建新的迁移：

```bash
npm run prisma:migrate
```

### 生成 Prisma 客户端

```bash
npm run prisma:generate
```

## 许可证

ISC