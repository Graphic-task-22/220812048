import * as THREE from 'three';

// 创建星空粒子系统
export function createStarField(count = 20000, range = 100000) {
  const geometry = new THREE.BufferGeometry(); // 创建几何体

  // 创建属性数组：位置、颜色、大小、闪烁偏移、闪烁速度
  const positions = new Float32Array(count * 3);        // 每个粒子一个三维坐标
  const colors = new Float32Array(count * 3);           // 每个粒子一个 RGB 颜色
  const sizes = new Float32Array(count);                // 每个粒子一个大小
  const flickerOffsets = new Float32Array(count);       // 每个粒子一个闪烁相位偏移
  const flickerSpeeds = new Float32Array(count);        // 每个粒子一个闪烁速度

  // 填充粒子数据
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // 随机生成位置，在给定范围内均匀分布
    positions[i3] = THREE.MathUtils.randFloatSpread(range);
    positions[i3 + 1] = THREE.MathUtils.randFloatSpread(range);
    positions[i3 + 2] = THREE.MathUtils.randFloatSpread(range);

    // 随机颜色偏蓝白色调
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];

// ===== 空间颜色渐变（中心偏暖，远处偏蓝） =====
const distance = Math.sqrt(x * x + y * y + z * z);
const maxDistance = range * Math.sqrt(3);
const distanceFactor = 1.0 - distance / maxDistance; // 越靠近中心越亮暖

// ===== 银河带颜色加成（y=0 附近是银河） =====
const galaxyBand = Math.exp(-Math.pow(y / (range * 0.15), 2)); // 控制银河宽度

// ===== 混合颜色（基础是蓝白，银河加一些暖色） =====
let r = THREE.MathUtils.lerp(0.4, 1.0, distanceFactor); // 距离越近越亮暖
let g = THREE.MathUtils.lerp(0.5, 1.0, distanceFactor);
let b = 1.0; // 蓝色恒定

// 银河效果混合
r = r * galaxyBand + r * 0.5 * (1 - galaxyBand);
g = g * galaxyBand + g * 0.5 * (1 - galaxyBand);
b = b * galaxyBand + b * 0.6 * (1 - galaxyBand);


    colors[i3] = r;
    colors[i3 + 1] = g;
    colors[i3 + 2] = b;

    // 粒子尺寸随机，范围较小，更加自然
    sizes[i] = THREE.MathUtils.randFloat(2.0, 4.5);

    // 闪烁相位和速度（使每颗星星闪烁频率不同）
    flickerOffsets[i] = Math.random() * Math.PI * 2;
    flickerSpeeds[i] = THREE.MathUtils.randFloat(0.5, 1.5);
  }

  // 将属性添加到几何体中
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1)); // size 实际未被 PointsMaterial 使用，但可用于扩展

  // 加载星星贴图
  const texture = new THREE.TextureLoader().load('/assets/star.png');

  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 4,                         // 基础大小（会被每颗粒子的 size 控制覆盖）
    sizeAttenuation: true, // 距离衰减，使远处星星更小
    map: texture,                    // 使用纹理贴图
    transparent: true,              // 透明通道
    alphaTest: 0.2,                 // 剔除 alpha 值太小的像素
    vertexColors: true,            // 启用每个顶点颜色
    blending: THREE.AdditiveBlending, // 发光混合模式
    depthWrite: false,              // 不写入深度缓冲区，避免遮挡
  });

  // 创建点云对象
  const points = new THREE.Points(geometry, material);

  // 附加用户数据用于动态更新
  points.userData = {
    flickerOffsets,                 // 闪烁相位偏移数组
    flickerSpeeds,                 // 闪烁速度数组
    basePositions: positions.slice(), // 保存初始位置，便于叠加偏移
    count,                         // 粒子总数
    geometry,                      // 几何体引用
    // 每一帧调用此方法更新粒子位置和颜色，模拟闪烁
    update: function (time) {
      const pos = this.geometry.attributes.position.array;
      const colors = this.geometry.attributes.color.array;

      for (let i = 0; i < this.count; i++) {
        const i3 = i * 3;

        // 计算闪烁偏移（模拟轻微抖动）
        const flicker = Math.sin(time * this.flickerSpeeds[i] + this.flickerOffsets[i]) * 0.2;

        // 应用微小位置变化，制造闪动漂浮感
        pos[i3] = this.basePositions[i3] + flicker * 0.5;
        pos[i3 + 1] = this.basePositions[i3 + 1] + flicker * 0.5;
        pos[i3 + 2] = this.basePositions[i3 + 2] + flicker * 0.5;

        // 根据闪烁计算亮度变化，模拟光度变化
        const brightness = 0.2 + 1.0 * (0.5 + 0.5 * Math.sin(time * this.flickerSpeeds[i] + this.flickerOffsets[i]));
        colors[i3] = THREE.MathUtils.clamp(0.3 * brightness, 0, 1);
        colors[i3 + 1] = THREE.MathUtils.clamp(0.4 * brightness, 0, 1);
        colors[i3 + 2] = THREE.MathUtils.clamp(1.0 * brightness, 0, 1);
      }

      // 通知 Three.js 数据已更新
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.color.needsUpdate = true;
    }
  };

  return points; // 返回粒子系统对象
}
