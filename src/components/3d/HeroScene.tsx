import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated module-scope math objects to ensure zero GC in animation loop
const _vec3 = new THREE.Vector3();
const _targetEuler = new THREE.Euler();
const _currentEuler = new THREE.Euler();

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL safely
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

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Initial camera position for dolly-in animation
    camera.position.set(0, 0, 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x93c5fd, 3.2); // Warm/Electric blue key
    keyLight.position.set(5, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x3b82f6, 0x050816, 1.8);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa855f7, 4.5, 20); // Ultraviolet rim
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const accentTopLight = new THREE.PointLight(0x60a5fa, 3.0, 15);
    accentTopLight.position.set(0, 5, 2);
    scene.add(accentTopLight);

    // 5. Hero Subject Group (3-12 Part Composite Procedural Model)
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Procedural canvas texture for the central holographic screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const ctx = screenCanvas.getContext('2d')!;

    // Draw stylized technical grid and glowing audio/candlestick waveforms
    ctx.fillStyle = '#060b18';
    ctx.fillRect(0, 0, 1024, 640);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 0; y < 640; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Glowing center logo monogram & visual wave
    const grad = ctx.createLinearGradient(200, 200, 824, 440);
    grad.addColorStop(0, '#60a5fa');
    grad.addColorStop(0.5, '#818cf8');
    grad.addColorStop(1, '#c084fc');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 1024; i += 8) {
      const ny = 320 + Math.sin(i * 0.02) * 50 + Math.cos(i * 0.04) * 30;
      if (i === 0) ctx.moveTo(i, ny);
      else ctx.lineTo(i, ny);
    }
    ctx.stroke();

    // Subtle center branding
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('RAHUL MIDAS', 512, 290);
    ctx.font = '16px monospace';
    ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
    ctx.fillText('OFFICIAL CREATOR REALM · 3D CINEMA', 512, 350);

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Part 1: Central Display Screen (Primary Silhouette)
    const screenGeo = new THREE.BoxGeometry(3.6, 2.2, 0.08);
    const screenMat = new THREE.MeshPhysicalMaterial({
      map: screenTexture,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: new THREE.Color(0x1d4ed8),
      emissiveMap: screenTexture,
      emissiveIntensity: 0.45,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    heroGroup.add(screenMesh);

    // Part 2: Screen Beveled Chassis Trim
    const chassisGeo = new THREE.BoxGeometry(3.72, 2.32, 0.06);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.2,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.z = -0.02;
    heroGroup.add(chassisMesh);

    // Part 3: Inner Gyroscopic Ring (Secondary Silhouette)
    const innerRingGeo = new THREE.TorusGeometry(2.5, 0.045, 24, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.3,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat1);
    heroGroup.add(innerRing);

    // Part 4: Outer Gyroscopic Ring (Accent read)
    const outerRingGeo = new THREE.TorusGeometry(3.1, 0.04, 24, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x581c87,
      emissiveIntensity: 0.3,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat2);
    heroGroup.add(outerRing);

    // Part 5: Floating Titanium Satellites (Accent details)
    const satGroup = new THREE.Group();
    heroGroup.add(satGroup);
    const satGeo = new THREE.OctahedronGeometry(0.18, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.1,
    });
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push(sat);
      satGroup.add(sat);
    }

    // Part 6: Contact Shadow Plane Grounding
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sGrad.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    sGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.3)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.6;
    scene.add(shadowMesh);

    // Part 7: Ambient Particle Dust
    const particleCount = isSoftwareGl ? 80 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10 - 2;

      const isBlue = Math.random() > 0.4;
      colorArray[i] = isBlue ? 0.38 : 0.65;
      colorArray[i + 1] = isBlue ? 0.65 : 0.34;
      colorArray[i + 2] = isBlue ? 0.98 : 0.96;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer Interaction State
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.targetX = x * 0.4;
      pointer.targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();
    let dollyProgress = 0;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth camera dolly-in on load (from 10.5 to 6.2)
      if (dollyProgress < 1) {
        dollyProgress += delta * 0.8;
        const eased = 1 - Math.pow(1 - Math.min(dollyProgress, 1), 3);
        camera.position.z = THREE.MathUtils.lerp(9.8, 6.2, eased);
      }

      // Smooth pointer interpolation
      pointer.x = THREE.MathUtils.damp(pointer.x, pointer.targetX, 4, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointer.targetY, 4, delta);

      // Hero object idle float & gyro rotations
      heroGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;
      heroGroup.rotation.y = pointer.x * 0.8 + Math.sin(elapsed * 0.4) * 0.15;
      heroGroup.rotation.x = -pointer.y * 0.6 + Math.cos(elapsed * 0.5) * 0.08;

      innerRing.rotation.x = elapsed * 0.55;
      innerRing.rotation.y = elapsed * 0.35;

      outerRing.rotation.y = -elapsed * 0.45;
      outerRing.rotation.z = elapsed * 0.25;

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const angle = elapsed * 0.8 + (idx * Math.PI) / 2;
        const radius = 2.8;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.5) * 0.6,
          Math.sin(angle) * radius
        );
        sat.rotation.x += delta * 2;
        sat.rotation.y += delta * 1.5;
      });

      // Ambient particle gentle drift
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      chassisGeo.dispose();
      chassisMat.dispose();
      innerRingGeo.dispose();
      ringMat1.dispose();
      outerRingGeo.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
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
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
