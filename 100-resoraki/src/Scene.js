import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
  const containerRef = useRef(null);
  const vehicleRef = useRef(null);
  const speed = 0.1;
  const movement = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

  useEffect(() => {
    let scene, camera, renderer, controls;

    const init = () => {
      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdddddd);

      // Camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 5, 10);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);

      // Light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      // Load vehicle model
      const loader = new GLTFLoader();
      loader.load("/car.glb", (gltf) => {
        vehicleRef.current = gltf.scene;
        scene.add(gltf.scene);
      });

      // Event listeners
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

      // Animation loop
      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (movement.forward) {
        vehicleRef.current.translateZ(-speed);
      }
      if (movement.backward) {
        vehicleRef.current.translateZ(speed);
      }
      if (movement.left) {
        vehicleRef.current.translateX(-speed);
      }
      if (movement.right) {
        vehicleRef.current.translateX(speed);
      }

      renderer.render(scene, camera);
    };

    const onKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          movement.forward = true;
          break;
        case "ArrowDown":
          movement.backward = true;
          break;
        case "ArrowLeft":
          movement.left = true;
          break;
        case "ArrowRight":
          movement.right = true;
          break;
        default:
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.key) {
        case "ArrowUp":
          movement.forward = false;
          break;
        case "ArrowDown":
          movement.backward = false;
          break;
        case "ArrowLeft":
          movement.left = false;
          break;
        case "ArrowRight":
          movement.right = false;
          break;
        default:
          break;
      }
    };

    init();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      // Clean up Three.js objects here
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Scene;
