import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, RotateCcw, HelpCircle, Compass, RefreshCw } from 'lucide-react';

interface ThreeDViewerProps {
  modelType: 'sculpture' | 'torus_knot' | 'mobius' | 'voronoi' | 'lsystem' | 'parametric';
  autoRotate?: boolean;
  colorTheme?: string;
}

export default function ThreeDViewer({ 
  modelType, 
  autoRotate = true, 
  colorTheme = 'blue' 
}: ThreeDViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [loading, setLoading] = useState(true);
  const [dragMsg, setDragMsg] = useState('Drag to Orbit // Scroll to Zoom');

  // Keep references to manipulate inside the render loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Grab dimensions
    const width = mountRef.current.clientWidth || 300;
    const height = mountRef.current.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // 3. Renderer (with high precision and antialiasing for glass effect)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear old child
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System (Apple-style studio configuration)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 0.8); // Subtle blue fill light
    dirLight2.position.set(-5, 3, -2);
    scene.add(dirLight2);

    const keyLight = new THREE.PointLight(0xffffff, 1.5, 30);
    keyLight.position.set(0, 4, 3);
    scene.add(keyLight);

    // 5. Build Procedural Luxury Geometries based on Model Type
    const containerGroup = new THREE.Group();
    scene.add(containerGroup);
    objectRef.current = containerGroup;

    let geometry: THREE.BufferGeometry;

    // Premium physical material settings (refractive glass with chrome/titanium components)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,  // Refractive glass effect
      ior: 1.52,          // Index of refraction for crown glass
      thickness: 1.5,     // Volumetric thickness
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });

    const structureMaterial = new THREE.MeshStandardMaterial({
      color: 0x171717,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: false
    });

    if (modelType === 'sculpture') {
      // 3D Parametric sculpture: Nested complex geometries
      const outerGeo = new THREE.IcosahedronGeometry(2, 2);
      const outerMesh = new THREE.Mesh(outerGeo, glassMaterial);
      containerGroup.add(outerMesh);

      // Inner architectural frame core
      const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
      const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0x2563eb, // blue accent
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
      containerGroup.add(innerMesh);

    } else if (modelType === 'torus_knot') {
      // Luxury Torus Knot
      geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16, 2, 3);
      const torusMesh = new THREE.Mesh(geometry, glassMaterial);
      containerGroup.add(torusMesh);

      // Add a thin gold wireframe on top for that structural outline sketch feeling
      const wireframe = new THREE.WireframeGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x171717, 
        linewidth: 1, 
        transparent: true,
        opacity: 0.15 
      });
      const lineSegments = new THREE.LineSegments(wireframe, lineMaterial);
      containerGroup.add(lineSegments);

    } else if (modelType === 'mobius') {
      // Procedural Möbius Strip
      const uSegments = 80;
      const vSegments = 20;
      const positions: number[] = [];
      const indices: number[] = [];
      const uvs: number[] = [];

      for (let j = 0; j <= vSegments; j++) {
        const v = -0.4 + (j / vSegments) * 0.8; // width factor
        for (let i = 0; i <= uSegments; i++) {
          const u = (i / uSegments) * Math.PI * 2; // single turn
          
          // Mobius parametric equations
          const x = (1 + v * Math.cos(u / 2)) * Math.cos(u) * 1.5;
          const y = (1 + v * Math.cos(u / 2)) * Math.sin(u) * 1.5;
          const z = v * Math.sin(u / 2) * 1.5;

          positions.push(x, y, z);
          uvs.push(i / uSegments, j / vSegments);
        }
      }

      // Generate Indices
      for (let j = 0; j < vSegments; j++) {
        for (let i = 0; i < uSegments; i++) {
          const row1 = j * (uSegments + 1);
          const row2 = (j + 1) * (uSegments + 1);

          indices.push(row1 + i, row2 + i, row1 + i + 1);
          indices.push(row1 + i + 1, row2 + i, row2 + i + 1);
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      const mobiusMesh = new THREE.Mesh(geometry, glassMaterial);
      containerGroup.add(mobiusMesh);

      // Inner floating metallic ring
      const innerRingGeo = new THREE.TorusGeometry(1.1, 0.05, 8, 40);
      const innerRingMat = new THREE.MeshStandardMaterial({
        color: 0xeab308, // Gold
        metalness: 0.9,
        roughness: 0.1
      });
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = Math.PI / 2;
      containerGroup.add(innerRing);

    } else if (modelType === 'voronoi') {
      // Voronoi Architectural columns: interconnected node lattice
      const latticeGroup = new THREE.Group();
      const nodeCount = 18;
      const nodes: THREE.Vector3[] = [];
      
      // Generate some random spherical coordinates
      for (let i = 0; i < nodeCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.3 + Math.random() * 0.4;
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        nodes.push(new THREE.Vector3(x, y, z));
      }

      // Draw spheres (nodes)
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const goldNodeMaterial = new THREE.MeshStandardMaterial({
        color: 0x171717,
        metalness: 0.9,
        roughness: 0.2
      });

      nodes.forEach(p => {
        const sphereMesh = new THREE.Mesh(sphereGeo, goldNodeMaterial);
        sphereMesh.position.copy(p);
        latticeGroup.add(sphereMesh);
      });

      // Draw lines between nearest nodes (lattice struts)
      const cylinderMat = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        roughness: 0.1,
        transmission: 0.8,
        thickness: 0.5,
        transparent: true
      });

      for (let i = 0; i < nodes.length; i++) {
        // Connect to the 3 closest nodes
        const sorted = [...nodes].map((node, index) => ({
          node,
          dist: nodes[i].distanceTo(node),
          index
        })).filter(item => item.index !== i)
           .sort((a, b) => a.dist - b.dist);

        for (let k = 0; k < Math.min(3, sorted.length); k++) {
          const pA = nodes[i];
          const pB = sorted[k].node;
          
          // Cylinder representing vector connector
          const distance = pA.distanceTo(pB);
          const cylGeo = new THREE.CylinderGeometry(0.04, 0.04, distance, 8);
          const cylinder = new THREE.Mesh(cylGeo, cylinderMat);
          
          // Place cylinder in-between points
          cylinder.position.copy(pA).add(pB).multiplyScalar(0.5);
          
          // Rotate cylinder to point from A to B
          const direction = new THREE.Vector3().subVectors(pB, pA).normalize();
          const up = new THREE.Vector3(0, 1, 0);
          const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
          cylinder.setRotationFromQuaternion(quaternion);
          
          latticeGroup.add(cylinder);
        }
      }
      containerGroup.add(latticeGroup);
    } else {
      // Fallback parametric sphere shape
      geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const fallbackMesh = new THREE.Mesh(geometry, glassMaterial);
      containerGroup.add(fallbackMesh);
    }

    setLoading(false);

    // 6. Interaction Physics (Manual Drag Orbits with Damping)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let scaleTarget = 1.0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      // Orbit math rotation
      containerGroup.rotation.y += deltaMove.x * 0.007;
      containerGroup.rotation.x += deltaMove.y * 0.007;

      rotationVelocity = {
        x: deltaMove.y * 0.003,
        y: deltaMove.x * 0.003
      };

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch events for mobile compatibility
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsRotating(false);
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      containerGroup.rotation.y += deltaMove.x * 0.01;
      containerGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    // Zoom mousewheel event
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scaleTarget -= e.deltaY * 0.001;
      scaleTarget = Math.max(0.6, Math.min(scaleTarget, 1.8));
    };

    // Attach local listeners
    const containerDom = mountRef.current;
    containerDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerDom.addEventListener('wheel', onWheel, { passive: false });
    containerDom.addEventListener('touchstart', onTouchStart);
    containerDom.addEventListener('touchmove', onTouchMove);

    // 7. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation if state active
      if (isRotating && !isDragging) {
        containerGroup.rotation.y += 0.006;
        containerGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
      }

      // Smooth inertia on manual rotate releasing
      if (!isDragging && (Math.abs(rotationVelocity.x) > 0.0001 || Math.abs(rotationVelocity.y) > 0.0001)) {
        containerGroup.rotation.x += rotationVelocity.x;
        containerGroup.rotation.y += rotationVelocity.y;
        
        // Decay speed
        rotationVelocity.x *= 0.94;
        rotationVelocity.y *= 0.94;
      }

      // Smooth scale interpolation (Zoom)
      const currentScale = containerGroup.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, scaleTarget, 0.1);
      containerGroup.scale.set(newScale, newScale, newScale);

      // Light rotation oscillation
      dirLight1.position.x = Math.cos(clock.getElapsedTime() * 0.2) * 5;
      dirLight1.position.z = Math.sin(clock.getElapsedTime() * 0.2) * 5;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (rendererRef.current && cameraRef.current) {
          rendererRef.current.setSize(w, h);
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
        }
      }
    });
    resizeObserver.observe(containerDom);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (containerDom) {
        containerDom.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        containerDom.removeEventListener('wheel', onWheel);
        containerDom.removeEventListener('touchstart', onTouchStart);
        containerDom.removeEventListener('touchmove', onTouchMove);
      }
      renderer.dispose();
    };
  }, [modelType, isRotating]);

  const handleReset = () => {
    if (objectRef.current) {
      objectRef.current.rotation.set(0, 0, 0);
      objectRef.current.scale.set(1, 1, 1);
    }
    setIsRotating(true);
  };

  return (
    <div className="relative w-full h-full bg-radial from-white to-neutral-50/20 select-none overflow-hidden rounded-xl group border border-neutral-200/50">
      
      {/* 3D WebGL Canvas Mounting Box */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
        style={{ touchAction: 'none' }}
      />

      {/* Elegant HUD Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-30 font-mono text-[9px] text-neutral-400">
          <RefreshCw size={14} className="animate-spin mb-2 text-neutral-800" />
          <span>PARSING CGI LAYER: {modelType.toUpperCase()}</span>
        </div>
      )}

      {/* Floating Apple-style presentation controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        
        {/* Interaction state instructions */}
        <div className="bg-white/90 border border-neutral-900/5 px-2.5 py-1 rounded-full text-[8px] font-mono text-neutral-500 tracking-wider shadow-sm backdrop-blur-sm">
          {isRotating ? 'AUTO_ROTATING' : 'MANUAL_INTERACT'}
        </div>

        {/* Minimal Buttons */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <button 
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-full border transition-all shadow-sm ${
              isRotating 
                ? 'bg-neutral-950 text-white border-neutral-950' 
                : 'bg-white text-neutral-600 border-neutral-200/60 hover:border-neutral-950'
            }`}
            title={isRotating ? "Pause auto-orbit" : "Resume auto-orbit"}
          >
            <Compass size={10} className={isRotating ? 'animate-spin' : ''} style={{ animationDuration: '10s' }} />
          </button>
          
          <button 
            onClick={handleReset}
            className="p-1.5 bg-white text-neutral-600 border border-neutral-200/60 hover:border-neutral-950 rounded-full transition-all shadow-sm"
            title="Reset position & speed"
          >
            <RotateCcw size={10} />
          </button>
        </div>
      </div>

      {/* Invisible luxury glass reflection gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-10" />
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-white/20 to-transparent pointer-events-none z-10" />
    </div>
  );
}
