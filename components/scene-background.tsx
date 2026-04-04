"use client";

import { Float, MeshTransmissionMaterial, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CSSProperties, memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const sceneCamera = { position: [0, 0, 7.2] as [number, number, number], fov: 45 };
const sceneDpr: [number, number] = [1, 1.1];
const sceneGl = { antialias: true, powerPreference: "high-performance" as const };

type StarSpec = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  twinkle: number;
  blur: number;
};

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createStarSpecs(count: number, seed: number, isNearLayer: boolean): StarSpec[] {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, () => {
    const sizeBase = isNearLayer ? 2.2 : 1.5;

    return {
      x: random() * 100,
      y: random() * 100,
      size: 0.7 + random() * sizeBase,
      opacity: isNearLayer ? 0.45 + random() * 0.45 : 0.2 + random() * 0.34,
      driftX: (random() - 0.5) * (isNearLayer ? 32 : 24),
      driftY: (random() - 0.5) * (isNearLayer ? 26 : 20),
      duration: (isNearLayer ? 11 : 15) + random() * (isNearLayer ? 17 : 20),
      delay: -random() * 18,
      twinkle: 3.2 + random() * 5.8,
      blur: random() * (isNearLayer ? 0.55 : 0.85),
    };
  });
}

function RandomStarsOverlay() {
  const nearStars = useMemo(() => createStarSpecs(85, 0x4f9c2d1a, true), []);
  const farStars = useMemo(() => createStarSpecs(65, 0x71d8a63f, false), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="random-starfield random-starfield-near">
        {nearStars.map((star, index) => (
          <span
            key={`near-${index}`}
            className="random-star"
            style={
              {
                "--star-x": `${star.x}%`,
                "--star-y": `${star.y}%`,
                "--star-size": `${star.size}px`,
                "--star-opacity": String(star.opacity),
                "--star-drift-x": `${star.driftX}px`,
                "--star-drift-y": `${star.driftY}px`,
                "--star-duration": `${star.duration}s`,
                "--star-delay": `${star.delay}s`,
                "--star-twinkle": `${star.twinkle}s`,
                "--star-blur": `${star.blur}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="random-starfield random-starfield-far">
        {farStars.map((star, index) => (
          <span
            key={`far-${index}`}
            className="random-star"
            style={
              {
                "--star-x": `${star.x}%`,
                "--star-y": `${star.y}%`,
                "--star-size": `${star.size}px`,
                "--star-opacity": String(star.opacity),
                "--star-drift-x": `${star.driftX}px`,
                "--star-drift-y": `${star.driftY}px`,
                "--star-duration": `${star.duration}s`,
                "--star-delay": `${star.delay}s`,
                "--star-twinkle": `${star.twinkle}s`,
                "--star-blur": `${star.blur}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function ReactiveMesh() {
  const { size, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);
  const satelliteSecondaryRef = useRef<THREE.Mesh>(null);

  const orbitDiameterMultiplier = 3;

  const meshLayout = useMemo(() => {
    let baseScale = 0.48;
    let y = 0.15;
    let desiredOrbitRadius = 0.62 * orbitDiameterMultiplier;
    let orbitSpeed = 0.23;

    if (size.width < 420) {
      baseScale = 0.28;
      y = -0.06;
      desiredOrbitRadius = 0.3 * orbitDiameterMultiplier;
      orbitSpeed = 0.38;
    } else if (size.width < 640) {
      baseScale = 0.33;
      y = -0.02;
      desiredOrbitRadius = 0.4 * orbitDiameterMultiplier;
      orbitSpeed = 0.34;
    } else if (size.width < 1024) {
      baseScale = 0.39;
      y = 0.05;
      desiredOrbitRadius = 0.5 * orbitDiameterMultiplier;
      orbitSpeed = 0.3;
    } else if (size.width < 1440) {
      baseScale = 0.45;
      y = 0.12;
      desiredOrbitRadius = 0.56 * orbitDiameterMultiplier;
      orbitSpeed = 0.26;
    }

    const meshVisualRadius = 1.9 * baseScale;
    const orbitRadiusX = Math.max(0.12, viewport.width / 2);
    const maxOrbitRadiusZ = Math.max(0.1, viewport.width / 2 - meshVisualRadius - 0.04);
    const orbitRadius = Math.min(desiredOrbitRadius, maxOrbitRadiusZ);
    const orbitCenterX = 0;

    return {
      orbitCenterX,
      orbitCenterY: y,
      baseScale,
      orbitRadius,
      orbitRadiusX,
      orbitSpeed,
    };
  }, [orbitDiameterMultiplier, size.width, viewport.width]);

  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.set(meshLayout.orbitCenterX + meshLayout.orbitRadiusX, meshLayout.orbitCenterY, 0);
    groupRef.current.scale.setScalar(meshLayout.baseScale);
  }, [meshLayout.baseScale, meshLayout.orbitCenterX, meshLayout.orbitCenterY, meshLayout.orbitRadiusX]);

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !coreRef.current ||
      !shellRef.current ||
      !wireRef.current ||
      !glowRef.current ||
      !satelliteRef.current ||
      !satelliteSecondaryRef.current
    ) {
      return;
    }

    const targetX = Math.sin(state.clock.elapsedTime * 0.42) * 0.08;
    const targetY = Math.cos(state.clock.elapsedTime * 0.34) * 0.11;

    const orbitPhase = state.clock.elapsedTime * meshLayout.orbitSpeed;
    const orbitX = meshLayout.orbitCenterX + Math.cos(orbitPhase) * meshLayout.orbitRadiusX;
    const orbitY = meshLayout.orbitCenterY;
    const orbitZ = Math.sin(orbitPhase) * meshLayout.orbitRadius;

    const depthProgress = meshLayout.orbitRadius > 0 ? (orbitZ + meshLayout.orbitRadius) / (2 * meshLayout.orbitRadius) : 0.5;
    const depthScale = THREE.MathUtils.lerp(0.78, 1.08, depthProgress);
    const targetScale = meshLayout.baseScale * depthScale;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, orbitX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, orbitY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, orbitZ, 0.08);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX * 0.18, 0.055);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY * 0.18, 0.055);

    coreRef.current.rotation.x += delta * 0.08;
    coreRef.current.rotation.y += delta * 0.12;
    shellRef.current.rotation.x -= delta * 0.06;
    shellRef.current.rotation.z += delta * 0.08;
    wireRef.current.rotation.x -= delta * 0.05;
    wireRef.current.rotation.y -= delta * 0.08;
    glowRef.current.rotation.z += delta * 0.06;

    glowRef.current.rotation.x = THREE.MathUtils.lerp(glowRef.current.rotation.x, targetX * 0.55, 0.05);
    glowRef.current.rotation.y = THREE.MathUtils.lerp(glowRef.current.rotation.y, targetY * 0.55, 0.05);

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.15) * 0.035;
    glowRef.current.scale.setScalar(pulse);

    const orbit = state.clock.elapsedTime * 0.55;
    satelliteRef.current.position.x = Math.cos(orbit) * 1.58;
    satelliteRef.current.position.z = Math.sin(orbit) * 0.55;
    satelliteRef.current.position.y = Math.sin(orbit * 1.2) * 0.22;

    const orbitSecondary = state.clock.elapsedTime * 0.42 + Math.PI * 0.9;
    satelliteSecondaryRef.current.position.x = Math.cos(orbitSecondary) * 1.85;
    satelliteSecondaryRef.current.position.z = Math.sin(orbitSecondary) * -0.65;
    satelliteSecondaryRef.current.position.y = Math.cos(orbitSecondary * 1.1) * 0.18;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 8, 20]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.55} groundColor="#050816" color="#8edfff" />
      <pointLight position={[3, 3, 5]} intensity={20} color="#6ee7ff" />
      <pointLight position={[-4, -2, 3]} intensity={14} color="#ff4fd8" />
      <pointLight position={[0, -3, -2]} intensity={10} color="#8bffb0" />

      <Stars radius={90} depth={45} count={1900} factor={3} saturation={0} fade speed={0.85} />
      <Sparkles count={56} scale={[11, 7, 11]} size={1.55} speed={0.24} color="#d8f7ff" />

      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.5}>
        <group ref={groupRef}>
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.92, 36, 36]} />
            <MeshTransmissionMaterial
              color="#79dbff"
              emissive="#0ea5e9"
              emissiveIntensity={0.35}
              thickness={0.45}
              roughness={0.08}
              transmission={1}
              ior={1.22}
              chromaticAberration={0.045}
              anisotropy={0.08}
              distortion={0.12}
              distortionScale={0.14}
              temporalDistortion={0.05}
              clearcoat={1}
              attenuationColor="#7dd3fc"
              attenuationDistance={1.2}
            />
          </mesh>

          <mesh ref={shellRef} scale={1.18} rotation={[0.35, 0.8, 0.15]}>
            <icosahedronGeometry args={[0.94, 2]} />
            <meshPhysicalMaterial
              color="#b9f4ff"
              emissive="#38bdf8"
              emissiveIntensity={0.18}
              metalness={0.2}
              roughness={0.42}
              transparent
              opacity={0.16}
              clearcoat={1}
            />
          </mesh>

          <mesh ref={wireRef} scale={1.3} rotation={[0.45, 0.2, 0.7]}>
            <icosahedronGeometry args={[0.92, 2]} />
            <meshStandardMaterial
              color="#d2f6ff"
              emissive="#7dd3fc"
              emissiveIntensity={0.72}
              metalness={0.18}
              roughness={0.5}
              wireframe
              transparent
              opacity={0.32}
            />
          </mesh>

          <mesh ref={glowRef} rotation={[0.75, 0.2, 0.15]}>
            <torusGeometry args={[1.36, 0.024, 24, 120]} />
            <meshBasicMaterial color="#ff4fd8" transparent opacity={0.34} />
          </mesh>

          <mesh rotation={[-0.8, 0.4, 0.3]} scale={0.88}>
            <torusGeometry args={[1.7, 0.016, 24, 100]} />
            <meshBasicMaterial color="#6ee7ff" transparent opacity={0.18} />
          </mesh>

          <mesh ref={satelliteRef} position={[1.58, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#8bffb0" emissiveIntensity={1.2} />
          </mesh>

          <mesh ref={satelliteSecondaryRef} position={[-1.85, 0.1, 0]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial color="#ffd7f8" emissive="#ff4fd8" emissiveIntensity={1.1} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export const SceneBackground = memo(function SceneBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-95">
      <Canvas camera={sceneCamera} dpr={sceneDpr} gl={sceneGl}>
        <ReactiveMesh />
      </Canvas>
      <RandomStarsOverlay />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,22,0.05)_0%,rgba(5,8,22,0.42)_52%,rgba(4,4,12,0.95)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(110,231,255,0.12),transparent_28%),radial-gradient(circle_at_70%_20%,rgba(255,79,216,0.08),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(139,255,176,0.08),transparent_20%)]" />
    </div>
  );
});
