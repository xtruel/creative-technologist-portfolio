import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Compass, RotateCcw, RefreshCw } from 'lucide-react';
import { GeomagPose } from '../data/geomagPoses';

interface GeomagHumanViewerProps {
  pose: GeomagPose;
  autoRotate?: boolean;
}

const MODEL_URL = '/src/assets/models/neko-mask-character.glb';

const getPreferredClipName = (pose: GeomagPose, clips: THREE.AnimationClip[]) => {
  if (clips.length === 0) return null;

  const poseKey = pose.title.toLowerCase();
  const candidates = [
    poseKey,
    poseKey.replace(/_/g, ' '),
    poseKey.split('_')[0],
    'idle',
    'turntable'
  ];

  return clips.find((clip) => {
    const clipName = clip.name.toLowerCase();
    return candidates.some((candidate) => clipName.includes(candidate));
  })?.name ?? clips[0].name;
};

export default function GeomagHumanViewer({
  pose,
  autoRotate = true
}: GeomagHumanViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isRotatingRef = useRef(autoRotate);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [clipLabel, setClipLabel] = useState('T_POSE_PREVIEW');

  useEffect(() => {
    isRotatingRef.current = autoRotate;
    setIsRotating(autoRotate);
  }, [autoRotate]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 300;
    const height = mountRef.current.clientHeight || 250;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.01, 100);
    camera.position.set(0, 0.18, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3.6, 5.4, 4.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const redRim = new THREE.DirectionalLight(0xe60012, 1.15);
    redRim.position.set(-4, 2.5, -2.5);
    scene.add(redRim);

    const coolFill = new THREE.DirectionalLight(0xdcdcdc, 0.75);
    coolFill.position.set(4, 1.8, -3);
    scene.add(coolFill);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 64),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.22;
    ground.receiveShadow = true;
    scene.add(ground);

    const containerGroup = new THREE.Group();
    scene.add(containerGroup);
    objectRef.current = containerGroup;

    let disposed = false;
    let mixer: THREE.AnimationMixer | null = null;

    const fitModelToViewport = (model: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;

      model.position.sub(center);
      model.scale.setScalar(2.75 / maxDim);

      const fittedBox = new THREE.Box3().setFromObject(model);
      const fittedSize = fittedBox.getSize(new THREE.Vector3());
      const fittedCenter = fittedBox.getCenter(new THREE.Vector3());

      model.position.y -= fittedBox.min.y + 1.24;
      model.position.x -= fittedCenter.x;
      model.position.z -= fittedCenter.z;

      camera.position.set(0, fittedSize.y * 0.08, 4.05);
      camera.lookAt(0, fittedSize.y * 0.04, 0);
      camera.updateProjectionMatrix();
    };

    const loader = new GLTFLoader();
    setLoading(true);
    setLoadError(null);
    setClipLabel('T_POSE_PREVIEW');

    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        model.name = `NekoMaskCharacter_${pose.id}`;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        fitModelToViewport(model);
        containerGroup.add(model);

        if (gltf.animations.length > 0) {
          const selectedClipName = getPreferredClipName(pose, gltf.animations);
          const selectedClip = gltf.animations.find((clip) => clip.name === selectedClipName) ?? gltf.animations[0];
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(selectedClip).reset().fadeIn(0.2).play();
          setClipLabel(selectedClip.name || 'ANIMATION');
        }

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error(error);
        setLoadError('MODEL_LOAD_FAILED');
        setLoading(false);
      }
    );

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let scaleTarget = 1.0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      isRotatingRef.current = false;
      setIsRotating(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      containerGroup.rotation.y += deltaMove.x * 0.007;
      containerGroup.rotation.x += deltaMove.y * 0.004;
      containerGroup.rotation.x = THREE.MathUtils.clamp(containerGroup.rotation.x, -0.35, 0.35);

      rotationVelocity = {
        x: deltaMove.y * 0.0015,
        y: deltaMove.x * 0.003
      };

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isRotatingRef.current = false;
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
      containerGroup.rotation.x += deltaMove.y * 0.006;
      containerGroup.rotation.x = THREE.MathUtils.clamp(containerGroup.rotation.x, -0.35, 0.35);

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scaleTarget -= e.deltaY * 0.0012;
      scaleTarget = Math.max(0.72, Math.min(scaleTarget, 1.75));
    };

    const containerDom = mountRef.current;
    containerDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerDom.addEventListener('wheel', onWheel, { passive: false });
    containerDom.addEventListener('touchstart', onTouchStart);
    containerDom.addEventListener('touchmove', onTouchMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      mixer?.update(delta);

      if (isRotatingRef.current && !isDragging) {
        containerGroup.rotation.y += 0.006;
        containerGroup.rotation.x = Math.sin(elapsed * 0.55) * 0.04;
      }

      if (!isDragging && (Math.abs(rotationVelocity.x) > 0.0001 || Math.abs(rotationVelocity.y) > 0.0001)) {
        containerGroup.rotation.x += rotationVelocity.x;
        containerGroup.rotation.y += rotationVelocity.y;
        containerGroup.rotation.x = THREE.MathUtils.clamp(containerGroup.rotation.x, -0.35, 0.35);
        rotationVelocity.x *= 0.92;
        rotationVelocity.y *= 0.94;
      }

      const newScale = THREE.MathUtils.lerp(containerGroup.scale.x, scaleTarget, 0.12);
      containerGroup.scale.setScalar(newScale);

      keyLight.position.x = Math.cos(elapsed * 0.24) * 3.5;
      keyLight.position.z = Math.sin(elapsed * 0.24) * 3.5 + 2.5;

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(containerDom);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      containerDom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      containerDom.removeEventListener('wheel', onWheel);
      containerDom.removeEventListener('touchstart', onTouchStart);
      containerDom.removeEventListener('touchmove', onTouchMove);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, [pose.id, pose.title]);

  const handleReset = () => {
    if (objectRef.current) {
      objectRef.current.rotation.set(0, 0, 0);
      objectRef.current.scale.set(1, 1, 1);
    }
    isRotatingRef.current = true;
    setIsRotating(true);
  };

  return (
    <div className="relative w-full h-full bg-radial from-white via-neutral-50 to-neutral-100/20 select-none overflow-hidden rounded-xl group border border-neutral-200/40">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />

      {(loading || loadError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-30 font-mono text-[8px] text-neutral-400">
          {loading && <RefreshCw size={12} className="animate-spin mb-1 text-neutral-800" />}
          <span>{loadError ?? 'LOADING NEKO MASK GLB...'}</span>
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <span className="bg-white/90 border border-neutral-200/40 px-2 py-0.5 rounded-full text-[7px] font-mono text-neutral-500 tracking-wider backdrop-blur-sm">
          {clipLabel}
        </span>

        <div className="flex items-center space-x-1 pointer-events-auto">
          <button
            onClick={() => {
              const nextValue = !isRotatingRef.current;
              isRotatingRef.current = nextValue;
              setIsRotating(nextValue);
            }}
            className={`p-1 rounded-full border transition-all ${
              isRotating
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200/60 hover:border-neutral-900'
            }`}
            title="Toggle rotation"
          >
            <Compass size={8.5} className={isRotating ? 'animate-spin' : ''} style={{ animationDuration: '8s' }} />
          </button>

          <button
            onClick={handleReset}
            className="p-1 bg-white text-neutral-600 border border-neutral-200/60 hover:border-neutral-900 rounded-full transition-all"
            title="Reset view"
          >
            <RotateCcw size={8.5} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-10" />
    </div>
  );
}
