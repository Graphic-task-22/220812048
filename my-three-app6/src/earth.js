import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // 柔和光
scene.add(ambientLight);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// 加载器
const loader = new GLTFLoader();
let mixer = null;

// 加载模型
loader.load(
  'models/RobotExpressive.glb',
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // 创建动画混合器
    mixer = new THREE.AnimationMixer(model);

    // 播放所有动画
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    // 输出调试信息
    model.traverse(function (obj) {
      if (obj.isMesh) {
        console.log('模型节点:', obj);
        console.log('模型节点名字:', obj.name);
      }
    });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100).toFixed(2) + '% 已加载');
  },
  function (error) {
    console.error('模型加载失败:', error);
  }
);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.01);
  renderer.render(scene, camera);
}
animate();

// 响应窗口变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
