import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const MyThreeComponent = ({ containerWidth, containerHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      containerWidth / containerHeight, // Use container dimensions
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(containerWidth, containerHeight);
    scene.background = new THREE.Color("#00000000");
    // Create a sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: "#009aff",
      side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    // Add a directional light with shadows
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 2, 2);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 5;
    scene.add(light);

    // Enable shadows for the sphere
    sphere.castShadow = false; // Evitar que la esfera proyecte sombras
    sphere.receiveShadow = false; // Evitar que la esfera reciba sombras

    // Mouse coordinates
    const mouse = new THREE.Vector2();

    // Handle mouse move event
    const handleMouseMove = (event) => {
      // Calculate normalized mouse coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update sphere position based on mouse position
      sphere.position.x = mouse.x * 1.5;
      sphere.position.y = mouse.y * 1.5;

      // Animate sphere's scale to create a pulsating effect
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      sphere.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerWidth, containerHeight]); // Re-run effect when container dimensions change

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MyThreeComponent;
