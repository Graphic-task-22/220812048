// 初始化场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 创建地面
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a5f0b, roughness: 0.8 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
scene.add(ground);

// 房屋主体
const houseGeometry = new THREE.BoxGeometry(8, 5, 8);
const houseMaterial = new THREE.MeshStandardMaterial({ color: 0xF5DEB3, roughness: 0.7 });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.y = 2.5;
scene.add(house);

// 屋顶
const roofGeometry = new THREE.ConeGeometry(6, 3, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000, roughness: 0.6 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 6;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// 门
const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.2);
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 1.25, 4);
scene.add(door);

// 窗户
const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEEB, metalness: 0.3, roughness: 0.2 });

const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
windowLeft.position.set(-3, 3, 4);
scene.add(windowLeft);

const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
windowRight.position.set(3, 3, 4);
scene.add(windowRight);

// 灯光
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// 相机位置
camera.position.set(10, 10, 15);
camera.lookAt(0, 3, 0);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 响应窗口大小变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
