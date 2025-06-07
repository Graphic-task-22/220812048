// main.js
// 使用ES模块写法，需浏览器支持或本地服务器环境

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

let scene, camera, renderer, tubeMesh;
let tubePoints = [];
let i = 0; // 用于相机路径索引

init();
animate();

/**
 * 初始化场景，摄像机，渲染器，管道网格，灯光等
 */
function init() {
  // 创建场景
  scene = new THREE.Scene();

  // 创建透视相机
  camera = new THREE.PerspectiveCamera(
    75, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 近裁剪面
    5000 // 远裁剪面
  );

  // 创建WebGL渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 创建一条路径曲线（CatmullRomCurve3）用来生成管道
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60),
    new THREE.Vector3(200, 100, -100),
    new THREE.Vector3(250, -50, 0),
    new THREE.Vector3(300, 0, 200)
  ]);

  // 生成TubeGeometry管道几何体
  const geometry = new THREE.TubeGeometry(path, 1000, 5, 30, false);

  // 纹理加载器
  const loader = new THREE.TextureLoader();

  // 这里的路径改成你项目里实际的纹理路径，或者用在线图片替代
  const texture = loader.load('./src/assets/1.jpg');
  
  // 纹理重复设置，模拟管道条纹效果
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 4);
  texture.colorSpace = THREE.SRGBColorSpace; // 纹理色彩空间设置

  // 创建材质
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    aoMap: texture, // 这里用同一纹理做AO贴图演示
    side: THREE.DoubleSide
  });

  // 创建网格模型
  tubeMesh = new THREE.Mesh(geometry, material);
  scene.add(tubeMesh);

  // 环境光，保证整体明亮
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // 点光源，制造亮点和阴影
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50, 50, 100);
  scene.add(pointLight);

  // 获取路径上均匀分布的点，用作相机运动轨迹
  tubePoints = path.getSpacedPoints(1000);
}

/**
 * 动画循环：相机沿管道路径移动，渲染场景
 */
function animate() {
  requestAnimationFrame(animate);

  // 相机沿曲线路径移动
  if (i < tubePoints.length - 1) {
    camera.position.copy(tubePoints[i]);
    camera.lookAt(tubePoints[i + 1]);
    i += 1; // 速度可调
  } else {
    i = 0; // 循环动画
  }

  renderer.render(scene, camera);
}

// 监听键盘，快速移动相机位置
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowDown') {
    i += 10; // 快进
    if (i >= tubePoints.length) i = 0;
  } else if (e.code === 'ArrowUp') {
    i -= 10; // 快退
    if (i < 0) i = tubePoints.length - 1;
  }
});

// 监听窗口变化，自适应调整摄像机和渲染器尺寸
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
