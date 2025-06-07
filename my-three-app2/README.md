# 无限时空隧道 — Three.js 3D 可视化项目

## 项目简介
本项目基于 Three.js 创建了一个“无限时空隧道”的三维动画效果。通过使用 TubeGeometry 沿 CatmullRom 曲线生成一个带纹理的管道，摄像机沿路径前进，营造出穿越隧道的视觉体验。

---

## 功能说明
- **三维场景搭建**：创建了基本的场景（Scene）、相机（Camera）和渲染器（Renderer）。
- **路径曲线**：使用 CatmullRomCurve3 生成平滑的空间曲线作为摄像机运动轨迹。
- **管道几何体**：利用 TubeGeometry 沿路径构造隧道模型。
- **纹理映射**：给管道添加重复纹理，增强视觉细节。
- **灯光效果**：环境光和点光源相结合，营造立体感。
- **摄像机动画**：摄像机沿着曲线路径连续移动，支持循环播放。
- **响应式设计**：窗口大小改变时自动调整视口和渲染大小。
- **键盘控制**：支持按键快速调整摄像机前进速度。

---

## 项目结构

```
/threejs-tunnel
  |-- index.html
  |-- main.css
  |-- script.js
  |-- textures/
       |-- tunnel_texture.jpg
```

### 文件说明：
- **index.html**：HTML 页面，包含 Three.js 的基本设置和脚本引用。
- **main.css**：CSS 文件，用于基本的样式设计。
- **script.js**：JavaScript 主文件，实现三维场景的构建、动画处理等逻辑。
- **/textures/**：存放纹理图片文件夹，当前仅含隧道纹理图 `tunnel_texture.jpg`。

---

## 使用方法
1. 克隆或下载本项目到本地。
2. 在浏览器中打开 `index.html` 文件查看效果。
3. 可通过键盘上的箭头键（←, ↑, →, ↓）调整摄像机的前进速度。

---

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)
- [Three.js](https://threejs.org/) - WebGL 库

---

## 项目截图
![项目截图](/screenshot.png)