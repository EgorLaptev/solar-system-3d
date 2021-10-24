'use strict';

import {GUI} from 'https://threejsfundamentals.org/3rdparty/dat.gui.module.js';
import AxisGridHelper from "./AxisGridHelper.js";

const gui = new GUI();

const scene  = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 30);
camera.up.set(0, 1, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

const loader = new THREE.TextureLoader();

const sphereGeometry = new THREE.SphereGeometry(1, 25, 25);

/* point light */
const pointLight = new THREE.PointLight(0xFFFFFF, 2);
scene.add(pointLight);

/* solar system */
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);

/* sun */
const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('./assets/img/sun.jpg')
});
const sunMesh     = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);

/* earth orbit */
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 15;
solarSystem.add(earthOrbit);

/* earth */
const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('./assets/img/earth.jpg')
});
const earthMesh     = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);

/* moon */
const moonMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('./assets/img/moon.jpg')
});
const moonMesh     = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.position.x = 3;
earthOrbit.add(moonMesh);

axisGridHelper(solarSystem, 'solarSystem');
axisGridHelper(sunMesh, 'sunMesh');
axisGridHelper(earthOrbit, 'earthOrbit');
axisGridHelper(earthMesh, 'earthMesh');
axisGridHelper(moonMesh, 'moonMesh');

render();

function render() {

    solarSystem.rotateY(0.01);
    earthOrbit.rotateY(0.01);
    sunMesh.rotateY(0.01);
    earthMesh.rotateY(0.01);
    moonMesh.rotateY(0.01);
    moonMesh.scale.set(0.3, 0.3, 0.3);


    renderer.render(scene, camera);
    requestAnimationFrame(render);

}

function axisGridHelper(node, label) {
    const helper = new AxisGridHelper(node);
    gui.add(helper, 'visible').name(label);
}
