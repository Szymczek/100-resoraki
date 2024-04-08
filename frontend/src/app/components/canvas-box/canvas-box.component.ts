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
    // // Materials
    const materialBox = new THREE.MeshToonMaterial();
    const materialPlane = new THREE.MeshToonMaterial({
      color: 0xff4444,
      side: THREE.DoubleSide,
    });
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // // Geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const planeGeometry = new THREE.PlaneGeometry(4, 4, 10, 10);
    const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // // Mesh
    const sphere = new THREE.Mesh(sphereGeometry, materialSphere);
    const box = new THREE.Mesh(boxGeometry, materialBox);
    const plane = new THREE.Mesh(planeGeometry, materialPlane);
    // // Position
    plane.position.set(0,0,0);
    box.position.set(4, 2, 0);
    sphere.position.set(4, 0, 0);
    // Mesh add
    scene.add(plane);
    scene.add(box);
    scene.add(sphere);
    scene.add(camera);
    scene.add(ambientLight);
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
