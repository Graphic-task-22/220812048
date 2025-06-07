/* // —— 初始化场景、相机、渲染器 ——  
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 200, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// —— 添加光照 ——  
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 1, 1);
scene.add(dirLight);

const ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

// —— 简单噪声函数替代 open-simplex-noise ——  
function simpleNoise(x, y) {
  return Math.sin(x * 0.01) * Math.cos(y * 0.01);
}

// —— 创建山脉函数 ——  
function createMountainPlane(width, height, segX, segY) {
  const geom = new THREE.PlaneGeometry(width, height, segX, segY);
  const pos = geom.attributes.position;

  const octaves = 4;
  const lacunarity = 2.0;
  const gain = 0.5;
  const baseFreq = 0.005;
  const baseAmp = 50;

  for (let i = 0; i < pos.count; i++) {
    const x0 = pos.getX(i);
    const y0 = pos.getY(i);
    let freq = baseFreq;
    let amp = baseAmp;
    let z = 0;
    for (let o = 0; o < octaves; o++) {
      z += simpleNoise(x0 * freq * 100, y0 * freq * 100) * amp;
      freq *= lacunarity;
      amp *= gain;
    }
    pos.setZ(i, z);
  }

  pos.needsUpdate = true;
  geom.computeVertexNormals();
  return geom;
}

// —— 添加山脉网格 ——  
const mountainGeom = createMountainPlane(500, 500, 200, 200);
const mountainMat = new THREE.MeshPhongMaterial({
  color: 0x8844ff,
  wireframe: true,
  side: THREE.DoubleSide,
});
const mountainMesh = new THREE.Mesh(mountainGeom, mountainMat);
mountainMesh.rotation.x = -Math.PI / 2;
scene.add(mountainMesh);

// —— 渲染循环 ——  
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// —— 窗口自适应 ——  
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
 */
// 初始化场景、相机、渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 200, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加光照
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 1, 1);
scene.add(dirLight);

const ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

// 简单噪声函数
function simpleNoise(x, y) {
  return Math.sin(x * 0.01) * Math.cos(y * 0.01);
}

// 创建山脉函数
function createMountainPlane(width, height, segX, segY) {
  const geom = new THREE.PlaneGeometry(width, height, segX, segY);
  const pos = geom.attributes.position;

  const octaves = 4;
  const lacunarity = 2.0;
  const gain = 0.5;
  const baseFreq = 0.005;
  const baseAmp = 50;

  for (let i = 0; i < pos.count; i++) {
    const x0 = pos.getX(i);
    const y0 = pos.getY(i);
    let freq = baseFreq;
    let amp = baseAmp;
    let z = 0;
    for (let o = 0; o < octaves; o++) {
      z += simpleNoise(x0 * freq * 100, y0 * freq * 100) * amp;
      freq *= lacunarity;
      amp *= gain;
    }
    pos.setZ(i, z);
  }

  pos.needsUpdate = true;
  geom.computeVertexNormals();
  return geom;
}

// 添加山脉网格
const mountainGeom = createMountainPlane(500, 500, 200, 200);
const mountainMat = new THREE.MeshPhongMaterial({
  color: 0x8844ff,
  wireframe: true,
  side: THREE.DoubleSide,
});
const mountainMesh = new THREE.Mesh(mountainGeom, mountainMat);
mountainMesh.rotation.x = -Math.PI / 2;
scene.add(mountainMesh);

// 初始化 OrbitControls，实现鼠标交互
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;      // 启用阻尼，带惯性效果
controls.dampingFactor = 0.05;      // 阻尼系数
controls.screenSpacePanning = false;
controls.minDistance = 50;           // 缩放最小距离
controls.maxDistance = 600;          // 缩放最大距离
controls.maxPolarAngle = Math.PI / 2; // 限制上下旋转角度（防止翻转）

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 窗口自适应
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
