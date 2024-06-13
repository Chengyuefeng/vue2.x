import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import store from '@/store'


// 场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd)
// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000)
// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputColorSpace = THREE.SRGBColorSpace


// 使用后处理抗锯齿效果 SMAAPass / FXAAPass
const composer = new EffectComposer(renderer);
const smaaPass = new SMAAPass(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
composer.addPass(smaaPass);

camera.position.set(0, 0, 150)  // 摄像机在场景中的位置
camera.lookAt(0, 0, 0) // 摄像机朝向的目标点

//添加光照
// const light = new THREE.DirectionalLight(0xffffff, 3.5)
// light.position.set(0, 0, 100).normalize()
// scene.add(light)

// 拖拽参数
let targetRotation = 0
let targetRotationOnPointerDown = 0
let pointerX = 0
let pointerXOnPointerDown = 0
let windowHalfX = window.innerWidth / 2
let targetRotationY = 0
let targetRotationOnPointerDownY = 0
let pointerY = 0
let pointerYOnPointerDown = 0
let windowHalfY = window.innerHeight / 2

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('jsm/libs/draco/gltf/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('/3DModel/church.glb', function (gltf) {
  // 加载纹理
  scene.add(gltf.scene)  
  function animate() {
    requestAnimationFrame(animate)
    render()
  }
  animate()
  function render() {
    gltf.scene.rotation.y += (targetRotation - gltf.scene.rotation.y) * 0.08
    gltf.scene.rotation.x += (targetRotationY - gltf.scene.rotation.x) * 0.08
    renderer.clear()
    renderer.render(scene, camera)
  }
  store.commit('EChartsLoading/loadingHide')
},
() => { 
  store.commit('EChartsLoading/loadingShow')
},
function (error) {
  console.error(error)
})

document.body.addEventListener('pointerdown', onPointerDown)

function onPointerDown(event) {
  if (event.isPrimary === false) return
  pointerXOnPointerDown = event.clientX - windowHalfX
  pointerYOnPointerDown = event.clientY - windowHalfY
  targetRotationOnPointerDown = targetRotation
  targetRotationOnPointerDownY = targetRotationY
  document.body.addEventListener('pointermove', onPointerMove)
  document.body.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(event) {
  if (event.isPrimary === false) return
  pointerX = event.clientX - windowHalfX
  pointerY = event.clientY - windowHalfY
  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.03
  targetRotationY = targetRotationOnPointerDownY + (pointerY - pointerYOnPointerDown) * 0.03
}

function onPointerUp(event) {
  if (event.isPrimary === false) return
  document.body.removeEventListener('pointermove', onPointerMove)
  document.body.removeEventListener('pointerup', onPointerUp)
}

export function threeScene(mountRef) {
  renderer.setSize(mountRef.offsetWidth, mountRef.offsetHeight);
  mountRef.appendChild(renderer.domElement)
}