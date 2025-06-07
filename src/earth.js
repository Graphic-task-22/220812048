// src/earth.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 15

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// 创建地球材质和网格
const textureLoader = new THREE.TextureLoader()
const earthMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
  bumpMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
  bumpScale: 0.05,
  specularMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
  specular: new THREE.Color('grey'),
})
const geometry = new THREE.SphereGeometry(5, 64, 64)
const earth = new THREE.Mesh(geometry, earthMaterial)
scene.add(earth)

// 添加光源
scene.add(new THREE.AmbientLight(0x404040))
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 3, 5)
scene.add(directionalLight)

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  earth.rotation.y += 0.002
  controls.update()
  renderer.render(scene, camera)
}
animate()

// 窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
