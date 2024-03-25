import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import * as THREE from 'three';
import { } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})

export class CanvasBoxComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createThreeJsBox();
    }
  }
 
  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');

    const scene = new THREE.Scene();

    const material = new THREE.MeshToonMaterial();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);  
    
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5), 
      material
   );

   const torus = new THREE.Mesh(
      new THREE.TorusGeometry(5, 2, 16, 100),
      material
   );

   scene.add(torus, box);
  
   const canvasSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
   };

   const camera = new THREE.PerspectiveCamera(
    75,
    canvasSizes.width / canvasSizes.height,
    0.001,
    1000
   );
   camera.position.z = 30;
   scene.add(camera);

   if (!canvas) {
    return;
   }

   const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
   });
   renderer.setClearColor(0xe232222, 1);
   renderer.setSize(canvasSizes.width, canvasSizes.height);

   window.addEventListener('resize', () => {
    canvasSizes.width = window.innerWidth;
    canvasSizes.height = window.innerHeight;

    camera.aspect = canvasSizes.width / canvasSizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSizes.width, canvasSizes.height);
    renderer.render(scene, camera);
  });

    const clock = new THREE.Clock();

  const animateGeometry = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update animation objects
    box.rotation.x = elapsedTime;
    box.rotation.y = elapsedTime;
    box.rotation.z = elapsedTime;

    torus.rotation.x = -elapsedTime;
    torus.rotation.y = -elapsedTime;
    torus.rotation.z = -elapsedTime;

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(animateGeometry);
  };

  animateGeometry();

  }
 }

