import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const group = new THREE.Group();

loader.load(
  '/src/gltf/moon_rock_04_4k.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(100, 100, 100);
    model.position.set(30, 0, 30);
    group.add(model);

    // 创建包围盒并附加到 group.userData
    const box = new THREE.Box3().setFromObject(model);
    group.userData.boundingBox = box;
  },
  undefined,
  (error) => {
    console.error('加载 moon_rock_04_4k 模型失败', error);
  }
);

export default group;
