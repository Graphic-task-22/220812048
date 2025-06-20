# big-work 三维交互小游戏项目

## 1. 项目概述

这是一个基于 [Three.js](https://threejs.org/) 和 Vite 搭建的三维交互小游戏项目。  
**主题**：机器人在星空地表中自由行动、发射子弹，击中目标获得积分。  
**用途**：展示 Three.js 的模型加载、动画控制、相机跟随、粒子系统与交互效果。  
**目标用户**：对三维可视化、Web 3D 开发或 Three.js 感兴趣的初学者与开发者。

---

## 项目结构

```
big-work 
├── .vscode                 # VSCode 配置文件
├── node_modules            # 项目依赖模块
├── public                  # 公共资源文件夹
├── src                     # 源代码目录
│   ├── gltf                # 3D模型资源文件夹
│   │   └── RobotExpressive.glb  # 机器人模型文件
│   ├── mesh                # 三维模型相关脚本
│   │   ├── plane.js        # 地面平面模型脚本
│   │   ├── Robot.js        # 机器人模型和控制脚本
│   │   └── house.js        # 房屋模型（机器人住所）
│   ├── sprite              # 粒子和特效相关脚本
│   │   └── sprite.js       # 星空粒子系统脚本
│   ├── index.css           # 全局样式
│   └── index.js            # 入口脚本，初始化场景、渲染和交互
├── .gitignore              # Git 忽略文件
├── index.html              # 入口 HTML 文件
├── jsconfig.json           # JavaScript 配置文件
├── package-lock.json       # npm 锁定文件
├── package.json            # 项目依赖及配置文件
├── README.md               # 项目说明文件（当前文件）
├── vite.config.js          # Vite 构建工具配置
└── vitest.config.js        # Vitest 测试工具配置
```

---

## 项目简介

这是一个基于 [Three.js](https://threejs.org/) 和 Vite 构建的简单三维交互小游戏项目。  
项目包含了：

- 3D机器人模型加载与动画控制  
- 地面平面模型渲染  
- 星空粒子系统特效  
- 房屋建筑模型（机器人月球基地）  
- 键盘控制机器人移动，鼠标点击发射子弹（星星）  
- 碰撞检测与积分系统  
- 动态相机跟随机器人视角  

---

## 主要功能

- 机器人通过键盘 WSAD 控制移动，方向朝向移动方向  
- 鼠标点击发射“星星”子弹，射向机器人当前朝向  
- 子弹与目标碰撞检测，命中后目标消失并累计积分  
- 实时显示积分，帮助玩家了解游戏进度  
- 相机平滑跟随机器人，提供良好的游戏视角体验  
- 粒子和发光效果增强视觉表现  
- 房屋模型作为游戏背景的一部分（可扩展为任务起点或恢复点）

---

## 运行方式

1. 克隆项目到本地：
   ```bash
   git clone <你的项目地址>
   cd big-work
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 打开浏览器访问：
   ```
   http://localhost:3000
   ```

---

## 开发说明

- `src/index.js`  
  项目入口，负责初始化场景、渲染器、相机、灯光和主循环。

- `src/mesh/Robot.js`  
  机器人模型加载、动画控制和键盘事件处理。

- `src/mesh/plane.js`  
  创建月球地表的地面模型。

- `src/mesh/house.js`  
  构建机器人在月球上的居住房屋（圆顶基地结构）。

- `src/mesh/Target.js`  
  目标物体模型，作为射击对象。

- `src/sprite/sprite.js`  
  星空粒子效果实现。

- `src/gltf/RobotExpressive.glb`  
  机器人3D模型文件。

---

## 依赖库

- `three.js` — 3D 渲染核心库  
- `GLTFLoader` — 三维模型加载器  
- `Vite` — 现代前端构建工具  

---

## 代码风格

- 遵循 ES6+ 语法规范，模块化开发  
- 结构清晰，方便维护和扩展  

---

## 备注与后续优化

本项目演示三维交互与基础游戏机制，适合 Three.js 入门学习。  
可扩展内容包括：

- 增加任务系统与传送门  
- 加入敌人 AI 或 NPC 模型  
- 引入物理引擎（如 cannon-es）进行真实碰撞  
- 支持网络多人联机功能  
