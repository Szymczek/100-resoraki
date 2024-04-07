import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common'; 
import {GUI} from 'dat.gui';

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})

export class CanvasBoxComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createThreeJsBox();
    }

  }

  createThreeJsBox(): void {
    // GUI 
    const gui = new GUI();    
    console.log(gui);
    // Basic Settings
    const canvas = document.getElementById('canvas-box');
    const scene = new THREE.Scene();
    const material = new THREE.MeshToonMaterial();
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, .5, 1.5), 
      material
   );

   scene.add(box);
  
   const canvasSizes = {
    width: 1000,
    height: 550,
   };
   const camera = new THREE.PerspectiveCamera(
    75,
    canvasSizes.width / canvasSizes.height,
    0.001,
    1000
   );
   camera.position.z = 5;
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

  // Scene
  const animateGeometry = () => {
    const elapsedTime = clock.getElapsedTime();
    box.rotation.x = elapsedTime;
    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(animateGeometry);
  };

  animateGeometry();
  }

  
 }

