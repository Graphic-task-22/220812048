import * as THREE from 'three';
import { makeNoise2D } from 'open-simplex-noise';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// —— 场景、相机、渲染器 ——  
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 1000);
camera.position.set(0, 200, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// —— 光源 ——  
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 1, 1);
scene.add(dirLight);

const ambLight = new THREE.AmbientLight(0x404040);
scene.add(ambLight);

// —— 噪声函数 ——  
const noise2D = makeNoise2D(Math.random() * 0xffff);

// —— 分形山脉生成函数 ——  
function createMountainPlane(width, height, segX, segY) {
  // 用无后缀的 PlaneGeometry
  const geom = new THREE.PlaneGeometry(width, height, segX, segY);
  const pos  = geom.attributes.position;

  const octaves    = 4;
  const lacunarity = 2.0;
  const gain       = 0.5;
  const baseFreq   = 0.005;
  const baseAmp    = 50;

  for (let i = 0; i < pos.count; i++) {
    const x0 = pos.getX(i);
    const y0 = pos.getY(i);
    let freq = baseFreq;
    let amp  = baseAmp;
    let z    = 0;
    for (let o = 0; o < octaves; o++) {
      z += noise2D(x0 * freq, y0 * freq) * amp;
      freq *= lacunarity;
      amp  *= gain;
    }
    pos.setZ(i, z);
  }

  pos.needsUpdate = true;
  geom.computeVertexNormals();
  return geom;
}

// —— 创建并添加山脉网格 ——  
const mountainGeom = createMountainPlane(500, 500, 200, 200);
const mountainMat  = new THREE.MeshPhongMaterial({
  color:     0xff0000,
  wireframe: true,
  side:      THREE.DoubleSide,
});
const mountainMesh = new THREE.Mesh(mountainGeom, mountainMat);
mountainMesh.rotateX(-Math.PI / 2);
scene.add(mountainMesh);

// —— 渲染循环 ——  
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

