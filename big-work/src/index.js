import * as THREE from 'three'; 
import { createStarField } from './sprite/sprite.js'; 
import plane from './mesh/plane.js';
//import buildingsGroup from './mesh/buildings.js';
import stone from './mesh/stone.js';
//import moonGround from './mesh/moonGround.js'; // ✅ 替代 plane.js
import robot, { camera }  from "./mesh/Robot.js";

let renderer,scene;
let starField; // THREE.Points 对象


function init() {
  scene = new THREE.Scene();


  scene.add(plane);
  //scene.add(buildingsGroup);
  scene.add(robot);
  scene.add(stone);
  starField = createStarField(2000, 1000);
  scene.add(starField);
 // ✅ 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  // ✅ 新增：方向光照出 bump 和 normal 细节
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(50, 100, 50);
  scene.add(dirLight)

  /*camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );*/
  // ✅ 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);
  
  animate();
}

function animate(time = 0) {
  requestAnimationFrame(animate);

  const t = time * 0.001;

  starField.userData.update(t);
  starField.rotation.y += 0.00025;

  //  ❌ 不再相机固定位置和方向
  //camera.position.set(0, 10, 20);
  //camera.lookAt(new THREE.Vector3(0, 0, 0)); // 看向世界原点
  
  renderer.render(scene, camera);
}

window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

init();