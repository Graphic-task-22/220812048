# my-three-app6

这是一个使用 [Three.js](https://threejs.org/) 构建的 3D 模型加载与动画演示项目，使用 `GLTFLoader` 加载 `.glb` 模型文件，并展示动画效果。

## 📁 项目结构

my-three-app6/
├── index.html # 页面入口文件
├── main.js # Three.js 逻辑，模型加载与动画控制
├── models/
│ └── RobotExpressive.glb # 示例动画模型文件
├── README.md # 项目说明文件


## 🚀 快速开始

### 1. 克隆项目



git clone https://github.com/yourname/my-three-app6.git
cd my-three-app6
### 2. 安装依赖（如果使用 Vite）

npm install
### 3. 运行项目（使用 Vite）

npx vite
浏览器打开地址：http://localhost:5173

📦 你也可以直接用浏览器打开 index.html 文件（适用于简单 demo）
注意：如使用模块化导入，请使用本地服务器或 Vite，否则浏览器不支持 import。

### 🔧 使用技术
Three.js

GLTFLoader 加载 .glb 模型

AnimationMixer 播放模型动画

Vite（可选，开发更流畅）

### 🧱 模型说明
默认模型来自 Three.js 官方：

RobotExpressive.glb

支持多个动画（行走、跳舞等）

位于 models/ 文件夹内