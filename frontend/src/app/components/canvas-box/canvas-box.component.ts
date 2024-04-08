import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common';
import { GUI } from 'dat.gui';

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss',
})
export class CanvasBoxComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createThreeJsBox();
    }
  }

  createThreeJsBox(): void {
    // GUI
    const gui = new GUI();
    const worldObjects = {
      plane: {
        width: 5,
        height: 5,
        widthSegments: 15,
        heightSegments: 15,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
      }
    }
    gui.add(worldObjects.plane, 'width', 1, 12).onChange(() => {generateNewPlane()});
    gui.add(worldObjects.plane, 'height', 1, 6.5).onChange(() => {generateNewPlane()});
    gui.add(worldObjects.plane, 'widthSegments', 1, 100).onChange(() => {generateNewPlane()});
    gui.add(worldObjects.plane, 'heightSegments', 1, 100).onChange(() => {generateNewPlane()});
    gui.add(worldObjects.plane, 'positionX', -10, 10).onChange(() => {plane.position.set(worldObjects.plane.positionX, worldObjects.plane.positionY, worldObjects.plane.positionZ)});
    gui.add(worldObjects.plane, 'positionY', -10, 10).onChange(() => {plane.position.set(worldObjects.plane.positionX, worldObjects.plane.positionY, worldObjects.plane.positionZ)});
    gui.add(worldObjects.plane, 'positionZ', -10, 10).onChange(() => {plane.position.set(worldObjects.plane.positionX, worldObjects.plane.positionY, worldObjects.plane.positionZ)});
    gui.add(worldObjects.plane, 'rotationX', -10, 10).onChange(() => {plane.rotation.x = worldObjects.plane.rotationX;});
    gui.add(worldObjects.plane, 'rotationY', -10, 10).onChange(() => {plane.rotation.y = worldObjects.plane.rotationY;});
    gui.add(worldObjects.plane, 'rotationZ', -10, 10).onChange(() => {plane.rotation.z = worldObjects.plane.rotationZ;});
    // Functions
    function generateNewPlane() {
      // Clear and prepare
      plane.geometry.dispose();
      plane.geometry = new THREE.PlaneGeometry(worldObjects.plane.width, worldObjects.plane.height, worldObjects.plane.widthSegments, worldObjects.plane.heightSegments);
      // // Plane Mesh Alter
      const  arr = (plane.geometry.attributes.position as THREE.BufferAttribute).array;
      for (let i = 0; i < arr.length; i +=3){
        // Only Z values
        const z = arr[i + 2];
        arr[i + 2] = z + Math.random();
      }
    }
    // Basic Settings
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.001,
      1000
    );
    camera.position.z = 5;
    // Canvas, Render
    const canvas = document.getElementById('canvas-box');
    if (!canvas) {
      return;
    }
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    const canvasSizes = {
      width: 1000,
      height: 550,
    };
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });

    // Scene objects
    // // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    // // Materials
    const materialBox = new THREE.MeshPhongMaterial();
    const materialSphere = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const materialPlane = new THREE.MeshPhongMaterial({
      color: 0xff4444,
      side: THREE.DoubleSide,
      flatShading: true
    });
    // // Geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 15, 15);
    const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // // Mesh
    const sphere = new THREE.Mesh(sphereGeometry, materialSphere);
    const box = new THREE.Mesh(boxGeometry, materialBox);
    const plane = new THREE.Mesh(planeGeometry, materialPlane);
    // // Plane Mesh Alter
    const  arr = (plane.geometry.attributes.position as THREE.BufferAttribute).array;
    for (let i = 0; i < arr.length; i +=3){
      // Only Z values
      const z = arr[i + 2];
      arr[i + 2] = z + Math.random();
    }
    // // Position
    light.position.set(0,0,1);
    plane.position.set(0,0,0);
    box.position.set(4, 2, 0);
    sphere.position.set(4, 0, 0);
    // Mesh add
    scene.add(light);
    scene.add(plane);
    scene.add(box);
    scene.add(sphere);
    scene.add(camera);
    // scene.add(ambientLight);

    // Render
    renderer.setClearColor(0xe232222, 1);
    renderer.setPixelRatio(devicePixelRatio);

    // Scene Loop
    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();
      box.rotation.x = elapsedTime;
      sphere.rotation.x = elapsedTime;
      // Render
      renderer.render(scene, camera);
      window.requestAnimationFrame(animateGeometry);
    };
    animateGeometry();
  }
}
