# Vue-Project 三维交互小游戏项目

## 项目结构

vue-project
├── .vscode # VSCode 配置文件
├── node_modules # 项目依赖模块
├── public # 公共资源文件夹
├── src # 源代码目录
│ ├── gltf # 3D模型资源文件夹
│ │ └── RobotExpressive.glb # 机器人模型文件
│ ├── mesh # 三维模型相关脚本
│ │ ├── plane.js # 地面平面模型脚本
│ │ └── Robot.js # 机器人模型和控制脚本
│ ├── sprite # 粒子和特效相关脚本
│ │ └── sprite.js # 星空粒子系统脚本
│ ├── index.css # 全局样式
│ └── index.js # 入口脚本，初始化场景、渲染和交互
├── .gitignore # Git 忽略文件
├── index.html # 入口 HTML 文件
├── jsconfig.json # JavaScript 配置文件
├── package-lock.json # npm 锁定文件
├── package.json # 项目依赖及配置文件
├── README.md # 项目说明文件（当前文件）
├── vite.config.js # Vite 构建工具配置
└── vitest.config.js # Vitest 测试工具配置

markdown
复制
编辑

## 项目简介

这是一个基于 [Three.js](https://threejs.org/) 和 Vue 构建的简单三维交互小游戏项目。  
项目包含了：

- 3D机器人模型加载与动画控制
- 地面平面模型渲染
- 星空粒子系统特效
- 键盘控制机器人移动，鼠标点击发射子弹（星星）
- 碰撞检测与积分系统
- 动态相机跟随机器人视角

## 主要功能

- 机器人通过键盘 WSAD 控制移动，方向朝向移动方向。
- 鼠标点击发射“星星”子弹，射向机器人当前朝向。
- 子弹与目标碰撞检测，命中后目标消失并累计积分。
- 实时显示积分，帮助玩家了解游戏进度。
- 相机平滑跟随机器人，提供良好的游戏视角体验。
- 粒子和发光效果增强视觉表现。

## 运行方式

1. 克隆项目到本地：
   git clone <你的项目地址>
   cd vue-project
安装依赖：


npm install
启动开发服务器：


npm run dev
打开浏览器访问：

http://localhost:3000
开发说明
src/index.js
项目入口，负责初始化场景、渲染器、相机、灯光和主循环。

src/mesh/Robot.js
机器人模型加载、动画控制和键盘事件处理。

src/mesh/plane.js
创建地面平面模型。

src/mesh/Target.js
目标物体模型，作为射击对象。

src/sprite/sprite.js
星空粒子效果实现。

src/gltf/RobotExpressive.glb
机器人3D模型文件。

依赖库
Three.js — 3D 渲染核心库

GLTFLoader — 三维模型加载

Vite — 现代前端构建工具

代码风格
项目遵循 ES6+ 语法规范，模块化开发，结构清晰，方便维护和扩展。

备注
本项目主要演示三维交互和基础游戏机制，适合 Three.js 入门学习和扩展。

后续可添加更多复杂特效、物理引擎支持、网络多人功能等。