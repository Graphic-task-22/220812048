import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import stone from './stone.js';

const starGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

const loader = new GLTFLoader();
const mesh = new THREE.Group();
let mixer, actions, activeAction;
let clock = new THREE.Clock();
let isMoving = false;
let model = null;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.rotation.order = 'YXZ';

// ✅ 相机视角控制（方向固定、距离可变）
const baseCameraOffset = new THREE.Vector3(0, 10, -20).normalize();
let radius = 20;
const minRadius = 10;
const maxRadius = 50;

// ✅ 跳跃控制变量
let velocityY = 0;
const gravity = -20;
const jumpSpeed = 10;
const groundY = 0;
let isJumping = false;

// ✅ 碰撞包围盒
let robotBoundingBox = new THREE.Box3();
let stoneBoundingBox = new THREE.Box3();

// ✅ 碰撞检测
function canMove(newPosition) {
  if (!model || !stone) return true;

  robotBoundingBox.setFromCenterAndSize(
    newPosition.clone().add(new THREE.Vector3(0, 1, 0)),
    new THREE.Vector3(1, 2, 1)
  );
  stoneBoundingBox.setFromObject(stone);

  return !robotBoundingBox.intersectsBox(stoneBoundingBox);
}

// ✅ 动画淡入淡出
function fadeToAction(name, duration = 0.2) {
  if (activeAction && actions[name]) {
    const currentAction = activeAction;
    activeAction = actions[name];
    activeAction.reset().fadeIn(duration).play();
    currentAction.fadeOut(duration);
  }
}

// ✅ 相机位置更新
function updateCamera() {
  if (!model) return;

  const targetPos = model.position.clone();
  const offset = baseCameraOffset.clone().multiplyScalar(radius);

  camera.position.copy(targetPos.clone().add(offset));
  camera.lookAt(targetPos.clone().add(new THREE.Vector3(0, 5, 0)));
}

// ✅ 动画更新 + 跳跃更新
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (model) {
    // 跳跃模拟
    velocityY += gravity * delta;
    model.position.y += velocityY * delta;

    if (model.position.y <= groundY) {
      model.position.y = groundY;
      velocityY = 0;
      isJumping = false;
    }
  }

  updateCamera();
}
animate();

// ✅ 加载机器人模型
loader.load(
  './src/gltf/RobotExpressive.glb',
  function (gltf) {
    console.log('模型加载成功', gltf);

    gltf.scene.rotation.y = 0;
    gltf.scene.position.set(0, 0, 0);
    mesh.add(gltf.scene);

    model = gltf.scene;
    mesh.userData.robot = model;

    mixer = new THREE.AnimationMixer(model);
    actions = {};
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      actions[clip.name] = action;
    });

    activeAction = actions['Idle'];
    activeAction.play();

    setupKeyboardControls();
    setupStarShooter();
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% 已加载');
  },
  (error) => {
    console.error('模型加载失败', error);
  }
);

// ✅ 键盘控制（包含跳跃）
function setupKeyboardControls() {
  const moveStep = 0.2;

  function getForwardVector() {
    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(model.quaternion);
    forward.y = 0;
    return forward.normalize();
  }

  function getRightVector() {
    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(model.quaternion);
    right.y = 0;
    return right.normalize();
  }

  document.addEventListener('keydown', (event) => {
    if (!model) return;

    let moveVector = new THREE.Vector3();

    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        moveVector.add(getForwardVector().multiplyScalar(moveStep));
        break;
      case 'KeyS':
      case 'ArrowDown':
        moveVector.add(getForwardVector().multiplyScalar(-moveStep));
        break;
      case 'KeyA':
      case 'ArrowLeft':
        moveVector.add(getRightVector().multiplyScalar(moveStep));
        break;
      case 'KeyD':
      case 'ArrowRight':
        moveVector.add(getRightVector().multiplyScalar(-moveStep));
        break;
      case 'Space': // ✅ 空格键跳跃
        if (!isJumping && model.position.y <= groundY + 0.01) {
          velocityY = jumpSpeed;
          isJumping = true;
          if ('Jump' in actions) fadeToAction('Jump');
        }
        return; // 跳跃时不触发移动动画
    }

    if (moveVector.lengthSq() > 0) {
      const newPosition = model.position.clone().add(moveVector);
      if (canMove(newPosition)) {
        model.position.copy(newPosition);
        const angle = Math.atan2(moveVector.x, moveVector.z);
        model.rotation.y = angle;
        setMoving(true);
      } else {
        setMoving(false);
      }
    }
  });

  document.addEventListener('keyup', () => setMoving(false));
}

function setMoving(state) {
  if (isMoving === state) return;
  isMoving = state;
  fadeToAction(state ? 'Walking' : 'Idle');
}

// ✅ 鼠标点击发射星星
function setupStarShooter() {
  window.addEventListener('click', () => {
    if (!model) return;

    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.copy(model.position).add(new THREE.Vector3(0, 2.5, 0));
    mesh.add(star);

    const direction = new THREE.Vector3(0, 0, 1)
      .applyEuler(model.rotation)
      .normalize();

    const speed = 0.5;
    const maxDistance = 100;
    let distance = 0;

    const interval = setInterval(() => {
      star.position.addScaledVector(direction, speed);
      distance += speed;
      if (distance > maxDistance) {
        mesh.remove(star);
        clearInterval(interval);
      }
    }, 16);
  });
}

// ✅ 滚轮缩放相机距离
document.addEventListener('wheel', (event) => {
  radius += event.deltaY * 0.01;
  radius = Math.max(minRadius, Math.min(maxRadius, radius));
});

export { mesh as default, camera };
