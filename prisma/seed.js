const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('开始种子数据填充...');

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    },
  });

  // 创建测试用户
  const testPassword = await bcrypt.hash('test123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      password: testPassword,
      role: 'user'
    },
  });

  // 创建示例聊天会话
  const chatSession = await prisma.chatSession.create({
    data: {
      title: '示例聊天会话',
      userId: testUser.id,
      messages: {
        create: [
          {
            role: 'user',
            content: '你好，请介绍一下自己'
          },
          {
            role: 'assistant',
            content: '你好！我是一个AI助手，可以帮助你回答问题、生成内容、分析数据等。有什么我可以帮助你的吗？'
          }
        ]
      }
    }
  });

  // 创建示例写作任务
  const writingTask = await prisma.writingTask.create({
    data: {
      title: '示例文章',
      prompt: '写一篇关于人工智能的文章',
      content: '人工智能（AI）是计算机科学的一个分支，致力于创建能够执行通常需要人类智能的任务的系统。这些任务包括学习、推理、问题解决、感知和语言理解。近年来，随着深度学习和大数据技术的发展，人工智能取得了显著进展，在医疗、金融、交通、教育等领域得到了广泛应用。',
      status: 'completed',
      userId: testUser.id
    }
  });

  // 创建示例图像任务
  const imageTask = await prisma.imageTask.create({
    data: {
      title: '示例图像生成',
      prompt: '生成一张美丽的风景画',
      status: 'completed',
      imageUrl: 'https://example.com/sample-image.jpg',
      userId: testUser.id
    }
  });

  console.log('种子数据填充完成!');
  console.log('管理员账户: admin@example.com / admin123');
  console.log('测试用户账户: test@example.com / test123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });