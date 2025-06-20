// src/mesh/house.js
import * as THREE from 'three';

export function createLunarBase() {
  const base = new THREE.Group();

  // 圆顶结构
  const domeGeo = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshPhongMaterial({ color: 0x999999, flatShading: true });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 2.5;
  base.add(dome);

  // 圆柱底座
  const baseGeo = new THREE.CylinderGeometry(5, 5, 1, 32);
  const baseMesh = new THREE.Mesh(baseGeo, domeMat);
  baseMesh.position.y = 0.5;
  base.add(baseMesh);

  // 门
  const doorGeo = new THREE.BoxGeometry(2, 3, 0.1);
  const doorMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, 1.5, 5.01);
  base.add(door);

  // 支撑腿
  const legGeo = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
  const legMat = new THREE.MeshPhongMaterial({ color: 0x555555 });
  const offsets = [
    [3, -1, 3],
    [-3, -1, 3],
    [-3, -1, -3],
    [3, -1, -3],
  ];
  for (let [x, y, z] of offsets) {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, y, z);
    base.add(leg);
  }

  // 房子整体位置（地面上）
  base.position.set(20, 0, 20);

  return base;
}
