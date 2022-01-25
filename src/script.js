import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";

import gsap from "gsap";

/**
 * Debug
 */
// const gui = new dat.GUI({ closed: true });

const parameters = {
  materialColor: "#ffeded",
};

// gui.addColor(parameters, "materialColor").onChange(() => {
//   material.color.set(parameters.materialColor);
//   particlesMaterial.color.set(parameters.materialColor);
// });

// gui.addColor(parametersGalaxy, "inSideColor").onFinishChange(generateGalaxy);
// gui.addColor(parametersGalaxy, "outSideColor").onFinishChange(generateGalaxy);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//Texture
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

const particleTexture = textureLoader.load("/textures/particles/1.png");

// magFilter change the link between different colors
// // gradientTexture.magFilter = THREE.NearestFilter;
//Material

const objectsDistance = 5;

// MeshToonMaterial   needs lights to see it or else is dark black
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), material);

const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);

const mesh3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);

const mesh4 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

const meshS1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), material);
const meshS2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), material);
const meshS3 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), material);
const meshS4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), material);
const meshS5 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), material);
const meshS6 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), material);
const meshS7 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), material);
const meshS8 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), material);
const meshS9 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), material);
const meshS10 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), material);

mesh1.position.y = -objectsDistance * 0;

mesh2.position.y = -objectsDistance * 1;

mesh3.position.y = -objectsDistance * 2;

mesh4.position.y = -objectsDistance * 3.1;

meshS1.position.y = -objectsDistance * 0.3;
meshS2.position.y = -objectsDistance * 0.5;
meshS3.position.y = -objectsDistance * 1.3;
meshS4.position.y = -objectsDistance * 1.5;
meshS5.position.y = -objectsDistance * 2.3;
meshS6.position.y = -objectsDistance * 2.2;
meshS7.position.y = -objectsDistance * 2.3;
meshS8.position.y = -objectsDistance * 2.6;
meshS9.position.y = -objectsDistance * 2.8;
meshS10.position.y = -objectsDistance * 2.5;

meshS1.position.x = -2.5;
meshS2.position.x = 2.5;
meshS3.position.x = -2.5;
meshS4.position.x = 2.5;
meshS5.position.x = -2.5;
meshS6.position.x = 2.5;
meshS7.position.x = -2.5;
meshS8.position.x = 0.5;
meshS9.position.x = 0.2;
meshS10.position.x = -0.5;

meshS1.rotation.x = 6;
meshS2.rotation.x = -6;
meshS3.rotation.x = 3;
meshS4.rotation.x = 10;
meshS5.rotation.x = -5;
meshS6.rotation.x = -7;
meshS7.rotation.x = 5;
meshS8.rotation.x = 3;
meshS9.rotation.x = 5;
meshS10.rotation.x = -10;

scene.add(
  mesh1,
  mesh2,
  mesh3,
  mesh4,
  meshS1,
  meshS2,
  meshS3,
  meshS4,
  meshS5,
  meshS6,
  meshS7,
  meshS8,
  meshS9,
  meshS10
);

const sectionMeshes = [
  mesh1,
  mesh2,
  mesh3,
  mesh4,
  meshS1,
  meshS2,
  meshS3,
  meshS4,
  meshS5,
  meshS6,
  meshS7,
  meshS8,
  meshS9,
  meshS10,
];

/**
 * Particles
 */

//Geometry
const ParticlesCount = 2000;
const positions = new Float32Array(ParticlesCount * 3);

for (let i = 0; i < ParticlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 -
    Math.random() * objectsDistance * sectionMeshes.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

//Material
const particlesMaterial = new THREE.PointsMaterial({
  sizeAttenuation: true,
  size: 0.1,
  alphaMap: particleTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Galaxy
 */
const parametersGalaxy = {
  count: 300000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 2,
  randomness: 0.2,
  randomnessPower: 4,
  inSideColor: "#9b6db0",
  outSideColor: "#ffeded",
};

let Galaxygeometry = null;
let Galaxymaterial = null;
let points = null;

const generateGalaxy = () => {
  //Update old galaxy
  if (points !== null) {
    Galaxygeometry.dispose();
    Galaxymaterial.dispose();
    scene.remove(points);
  }
  //Geometry
  Galaxygeometry = new THREE.BufferGeometry();
  const Galaxyposition = new Float32Array(parametersGalaxy.count * 3);
  const Galaxycolors = new Float32Array(parametersGalaxy.count * 3);

  const colorInside = new THREE.Color(parametersGalaxy.inSideColor);
  const colorOutside = new THREE.Color(parametersGalaxy.outSideColor);

  for (let i = 0; i < parametersGalaxy.count; i++) {
    const i3 = i * 3;

    //Position
    const radius = Math.random() * parametersGalaxy.radius;
    const branchAngle =
      ((i % parametersGalaxy.branches) / parametersGalaxy.branches) *
      Math.PI *
      2;

    const spinAngele = radius * parametersGalaxy.spin;

    const randomX =
      Math.pow(Math.random(), parametersGalaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parametersGalaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parametersGalaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    Galaxyposition[i3] = Math.cos(branchAngle + spinAngele) * radius + randomX;
    Galaxyposition[i3 + 1] = randomY - objectsDistance * 3.3;
    Galaxyposition[i3 + 2] =
      Math.sin(branchAngle + spinAngele) * radius + randomZ;

    //Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parametersGalaxy.radius);

    Galaxycolors[i3] = mixedColor.r;
    Galaxycolors[i3 + 1] = mixedColor.g;
    Galaxycolors[i3 + 2] = mixedColor.b;
  }

  Galaxygeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(Galaxyposition, 3)
  );
  Galaxygeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(Galaxycolors, 3)
  );

  //Material
  Galaxymaterial = new THREE.PointsMaterial({
    size: parametersGalaxy.size,
    sizeAttenuation: true,
    depthWrite: false,
    vertexColors: true,
  });

  //Points
  points = new THREE.Points(Galaxygeometry, Galaxymaterial);

  scene.add(points);
};

generateGalaxy();

/**
 * Light
 */

const directionalLight = new THREE.DirectionalLight("#ffeded", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera Group
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 8;

cameraGroup.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Scroll
 */

let scrollY = window.scrollY;

let curremtSection = 0;
let fullRotation = Math.PI * 0.005;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != curremtSection) {
    curremtSection = newSection;

    gsap.to(cameraGroup.rotation, {
      duration: 2,
      ease: "power2.inOut",
      y: fullRotation,
    });

    gsap.to(sectionMeshes[curremtSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=1.5",
      z: "+=1.5",
    });
  } else {
  }
});

/**
 * Cursor
 */

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", event => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  //Animate Parallax
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  mesh3.position.x = cursor.x * 5;
  mesh3.position.y = -cursor.y * 5 + -objectsDistance * 2;
  mesh3.rotation.z = cursor.x * 5;

  mesh2.position.x = cursor.x * 2;
  mesh2.position.y = -cursor.y * 2 + -objectsDistance * 1;
  mesh2.rotation.z = cursor.x * 2;

  meshS1.position.x = cursor.x * 0.5 + -objectsDistance * 0.5;
  meshS1.position.y = -(cursor.y * 0.1 + objectsDistance * 0.5);
  meshS1.rotation.z = cursor.x * 0.5;
  meshS8.position.x = cursor.x * 1;
  meshS8.position.y = -(cursor.y * 0.1 + objectsDistance * 2.6);
  meshS8.rotation.z = cursor.x * 0.5;
  meshS9.position.x = cursor.x * -2;
  meshS9.position.y = -(cursor.y * 0.1 + objectsDistance * 2.8);
  meshS9.rotation.z = cursor.x * 0.5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;

  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  //Animate Spin
  cameraGroup.rotation.y += fullRotation * 5 * deltaTime;

  //Animate

  //Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Bootstrap - popovers
 */

let popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
