import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

let renderer, camera, scene, sphere; // 全局变量 场景、相机、渲染器
function init() {
  // 创建场景
  scene = new THREE.Scene();
  
  // 使用 TextureLoader 加载本地地球纹理图片
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('src/assets/earth_atmos_2048.jpg'); // 替换为本地路径
  
  // 创建球体几何体并应用地球纹理
  const geometry = new THREE.SphereGeometry(1, 64, 64); // 创建球体，半径为1
  const material = new THREE.MeshBasicMaterial({ map: earthTexture }); // 将地球纹理应用到球体材质
  sphere = new THREE.Mesh(geometry, material); // 创建球体

  // 将球体添加到场景
  scene.add(sphere);
  
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3); // 将相机位置设置为(0, 0, 3)，让它位于球体前面
  camera.lookAt(0, 0, 0); // 设置相机看向球体的中心
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  // 将渲染器的画布添加到页面中
  document.body.appendChild(renderer.domElement);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  if (!renderer) return;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// 添加辅助工具
function initHelper() {
  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', function () {
    renderer.render(scene, camera);
  });

  // 添加网格地面辅助观察
  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  // 球体自转
  sphere.rotation.y += 0.01; // 每帧旋转
}

// 初始化性能统计
function initStats() {
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  
  function render() {
    stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}

init();
initHelper();
initStats();
animate();
