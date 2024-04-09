import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three-addons';
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
        width: 4,
        height: 4,
        widthSegments: 15,
        heightSegments: 15,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
      },
    };
    gui.add(worldObjects.plane, 'width', 1, 12).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'height', 1, 6.5).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'widthSegments', 1, 100).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'heightSegments', 1, 100).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'positionX', -10, 10).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'positionY', -10, 10).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'positionZ', -10, 10).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'rotationX', -10, 10).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'rotationY', -10, 10).onChange(generateNewPlane);
    gui.add(worldObjects.plane, 'rotationZ', -10, 10).onChange(generateNewPlane);

    // Functions
    function generateNewPlane() {
      // Clear and prepare
      plane.geometry.dispose();
      plane.geometry = new THREE.PlaneGeometry(
        worldObjects.plane.width,
        worldObjects.plane.height,
        worldObjects.plane.widthSegments,
        worldObjects.plane.heightSegments
      );
      worldObjects.plane.positionX,
      worldObjects.plane.positionY,
      worldObjects.plane.positionZ,
      plane.rotation.x = worldObjects.plane.rotationX;
      plane.rotation.y = worldObjects.plane.rotationY;
      plane.rotation.z = worldObjects.plane.rotationZ;

      // // Plane Mesh Alter
      generateTerrain();
      generateColor();

    }
    function generateTerrain(){
      const arr = (plane.geometry.attributes.position as THREE.BufferAttribute)
      .array;
    for (let i = 0; i < arr.length; i += 3) {
      // // Only face Z values
      const z = arr[i + 2];
      arr[i + 2] = z + Math.random();
    }
    }

    function generateColor(){
      const colors: number[] = [];
      for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
        colors.push(1, 0, 0);
      }
      plane.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      ); // RGB
    }
    // Basic Settings
    const raycaster = new THREE.Raycaster();
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();

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

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.001,
      1000
    );
    new OrbitControls(camera, canvas);
    camera.position.z = 5;

    // Scene objects

    // // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const backLight = new THREE.DirectionalLight(0xffffff, 1);

    // // Materials
    const materialBox = new THREE.MeshPhongMaterial();
    const materialSphere = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const materialPlane = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      vertexColors: true,
    });

    // // Geometry
    // const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const planeGeometry = new THREE.PlaneGeometry(4, 4, 15, 15);
    // const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    // // Mesh
    // const sphere = new THREE.Mesh(sphereGeometry, materialSphere);
    // const box = new THREE.Mesh(boxGeometry, materialBox);
    const plane = new THREE.Mesh(planeGeometry, materialPlane);

    // Plane Change
    generateTerrain();
    generateColor();

    // // Position
    light.position.set(0, 0, 1);
    backLight.position.set(0,0,-1);
    plane.position.set(0, 0, 0);
    // box.position.set(4, 2, 0);
    // sphere.position.set(4, 0, 0);

    // Mesh add
    scene.add(plane);
    scene.add(light);
    scene.add(backLight);
    // scene.add(box);
    // scene.add(sphere);
    scene.add(camera);

    // Render
    renderer.setClearColor(0xe232222, 1);
    renderer.setPixelRatio(devicePixelRatio);

    // Events
    const mouse = new THREE.Vector2(0, 0);

    // Scene-Loop
    const animateGeometry = () => {
      window.requestAnimationFrame(animateGeometry);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(plane);
      console.log(intersects)
      if (intersects.length > 1){
        console.log(intersects)
      }
      renderer.render(scene, camera);
      // // Event
      // const elapsedTime = clock.getElapsedTime();
      // box.rotation.x = elapsedTime;
      // sphere.rotation.x = elapsedTime;
    };
    animateGeometry();
    addEventListener('mousemove', (event) => {
      (mouse.x = (event.clientX / innerWidth) * 2 - 1),
      (mouse.y = -(event.clientY / innerHeight) * 2 + 1);
    });
  }
}
