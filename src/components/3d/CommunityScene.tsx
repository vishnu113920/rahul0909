import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const CommunityScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Studio Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const blueLight = new THREE.PointLight(0x3b82f6, 4.0, 15);
    blueLight.position.set(-3, 3, 2);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 4.5, 15);
    violetLight.position.set(3, -2, 2);
    scene.add(violetLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    // Main 3D Holographic Communication Sphere Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Inner core: Glowing plasma sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // 2. Middle Wireframe Geodesic Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sphereGroup.add(wireMesh);

    // 3. Outer Crystal Facets
    const outerGeo = new THREE.DodecahedronGeometry(1.85, 0);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.5,
      transmission: isSoftwareGl ? 0 : 0.85,
      ior: 1.5,
      wireframe: false,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    sphereGroup.add(outerMesh);

    // 4. Orbital Communication Rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 90);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    sphereGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.02, 16, 90);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    sphereGroup.add(ring2);

    // 5. Converging Network Nodes (Particles traveling inward)
    const particleCount = isSoftwareGl ? 60 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVels = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spawn at random sphere shell radius 3 to 6
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.5 + Math.random() * 3.5;

      particlePos[idx] = rad * Math.sin(phi) * Math.cos(theta);
      particlePos[idx + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePos[idx + 2] = rad * Math.cos(phi);

      // Inward velocity vector
      particleVels[idx] = -particlePos[idx] * 0.008;
      particleVels[idx + 1] = -particlePos[idx + 1] * 0.008;
      particleVels[idx + 2] = -particlePos[idx + 2] * 0.008;

      const isCyan = Math.random() > 0.5;
      particleColors[idx] = isCyan ? 0.38 : 0.75;
      particleColors[idx + 1] = isCyan ? 0.65 : 0.35;
      particleColors[idx + 2] = isCyan ? 0.98 : 0.98;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.targetX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.5;
      pointer.targetY = (-((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.4;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      pointer.x = THREE.MathUtils.damp(pointer.x, pointer.targetX, 4, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointer.targetY, 4, delta);

      sphereGroup.rotation.y = elapsed * 0.25 + pointer.x;
      sphereGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15 - pointer.y;

      wireMesh.rotation.y = -elapsed * 0.35;
      wireMesh.rotation.z = elapsed * 0.2;

      outerMesh.rotation.x = elapsed * 0.15;
      outerMesh.rotation.y = elapsed * 0.1;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.z = -elapsed * 0.35;

      // Pulse core scale
      const pulse = 1 + Math.sin(elapsed * 3) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Animate converging particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += particleVels[idx];
        positions[idx + 1] += particleVels[idx + 1];
        positions[idx + 2] += particleVels[idx + 2];

        // Check if particle reached center core
        const distSq =
          positions[idx] * positions[idx] +
          positions[idx + 1] * positions[idx + 1] +
          positions[idx + 2] * positions[idx + 2];

        if (distSq < 1.44) {
          // Reset to outer boundary
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          const rad = 5.0 + Math.random() * 1.5;
          positions[idx] = rad * Math.sin(phi) * Math.cos(theta);
          positions[idx + 1] = rad * Math.sin(phi) * Math.sin(theta);
          positions[idx + 2] = rad * Math.cos(phi);
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};
