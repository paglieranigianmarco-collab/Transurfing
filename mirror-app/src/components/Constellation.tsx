"use client";

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { chapters } from '@/data/chapters';
import { useAppStore } from '@/lib/store';
import { Chapter, ChapterTier } from '@/lib/types';

// ── Tier configuration ──────────────────────────────────────────────
const TIER_CONFIG: Record<ChapterTier, {
    radius: number;
    color: string;
    emissive: string;
    glowColor: string;
    tilt: number;
    rotationY: number;
    label: string;
}> = {
    beginner: {
        radius: 4,
        color: '#4B9FFF',
        emissive: '#1a4fff',
        glowColor: 'rgba(75, 159, 255, 0.6)',
        tilt: 0.22,
        rotationY: 0,
        label: 'Beginner',
    },
    practitioner: {
        radius: 6.8,
        color: '#D0D0D0',
        emissive: '#888888',
        glowColor: 'rgba(200, 200, 200, 0.5)',
        tilt: -0.18,
        rotationY: 0.6,
        label: 'Practitioner',
    },
    master: {
        radius: 9.5,
        color: '#D4AF37',
        emissive: '#8b6914',
        glowColor: 'rgba(212, 175, 55, 0.6)',
        tilt: 0.12,
        rotationY: -0.4,
        label: 'Master',
    },
};

// ── Group chapters by tier ───────────────────────────────────────────
function groupByTier(chapters: Chapter[]) {
    return {
        beginner: chapters.filter((c) => c.tier === 'beginner'),
        practitioner: chapters.filter((c) => c.tier === 'practitioner'),
        master: chapters.filter((c) => c.tier === 'master'),
    };
}

// ── Position on a ring ───────────────────────────────────────────────
function positionOnRing(index: number, total: number, radius: number): [number, number, number] {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}

// ── Chapter Node ─────────────────────────────────────────────────────
function ChapterNode({
    chapter,
    position,
    tierColor,
    tierEmissive,
    tierGlow,
    onClick,
    isSelected,
    isVisited,
}: {
    chapter: Chapter;
    position: [number, number, number];
    tierColor: string;
    tierEmissive: string;
    tierGlow: string;
    onClick: () => void;
    isSelected: boolean;
    isVisited: boolean;
}) {
    const nodeColor = isVisited ? '#D4AF37' : tierColor;
    const nodeEmissive = isVisited ? '#8b6914' : tierEmissive;
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.008;
            meshRef.current.rotation.x += 0.004;
            const targetScale = isSelected ? 1.8 : hovered ? 1.5 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        }
        if (glowRef.current) {
            const pulseIntensity = 0.08 + Math.sin(t * 1.5 + chapter.chapterNumber) * 0.04;
            const glowScale = isSelected ? 2.5 : hovered ? 2.0 : 1 + Math.sin(t + chapter.chapterNumber * 0.7) * 0.15;
            glowRef.current.scale.setScalar(glowScale);
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isSelected ? 0.2 : hovered ? 0.15 : pulseIntensity;
        }
    });

    return (
        <group position={position}>
            {/* Outer glow halo */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshBasicMaterial
                    color={tierColor}
                    transparent
                    opacity={0.08}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Core node */}
            <mesh
                ref={meshRef}
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial
                    color={hovered || isSelected ? '#ffffff' : nodeColor}
                    emissive={nodeEmissive}
                    emissiveIntensity={isSelected ? 3 : hovered ? 2 : isVisited ? 1.4 : 0.8}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>

            {/* Label */}
            <Html position={[0, -0.38, 0]} center className="pointer-events-none select-none">
                <div
                    className={`whitespace-nowrap transition-all duration-300 ${hovered || isSelected ? 'opacity-100' : 'opacity-40'}`}
                    style={{
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: hovered || isSelected ? tierColor : '#999',
                        textShadow: (hovered || isSelected) ? `0 0 12px ${tierColor}` : 'none',
                        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                    }}
                >
                    {chapter.chapterNumber}. {chapter.zenTitle}
                </div>
            </Html>
        </group>
    );
}

// ── Orbit Ring Visual ────────────────────────────────────────────────
function OrbitRing({ radius, color, animated }: { radius: number; color: string; animated?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || !animated) return;
        const opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    });

    return (
        <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.012, 6, 120]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.12}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// ── Camera Controller (flying) ───────────────────────────────────────
function CameraController({ orbitControlsRef }: { orbitControlsRef: React.RefObject<any> }) {
    const { isFocusMode, flyTarget, setFlyTarget } = useAppStore();
    const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 16));
    const currentFlyTarget = useRef<THREE.Vector3 | null>(null);
    const isFlying = useRef(false);
    const homePos = useRef(new THREE.Vector3(0, 2, 16));

    useEffect(() => {
        if (!isFocusMode) {
            // Return home when focus mode closes
            currentFlyTarget.current = homePos.current.clone();
            isFlying.current = true;
        }
    }, [isFocusMode]);

    useEffect(() => {
        if (flyTarget) {
            // Fly to a position near the node (pull back slightly)
            const [x, y, z] = flyTarget;
            const len = Math.sqrt(x * x + y * y + z * z);
            const dir = new THREE.Vector3(x, y, z).normalize();
            const camPos = dir.multiplyScalar(len * 0.55 + 4);
            camPos.y += 0.5;
            currentFlyTarget.current = camPos;
            isFlying.current = true;
            setFlyTarget(null);
        }
    }, [flyTarget, setFlyTarget]);

    useFrame((state, delta) => {
        if (!isFlying.current || !currentFlyTarget.current) return;

        const dist = state.camera.position.distanceTo(currentFlyTarget.current);
        if (dist < 0.05) {
            isFlying.current = false;
            return;
        }

        state.camera.position.lerp(currentFlyTarget.current, delta * 2.5);
        state.camera.lookAt(0, 0, 0);

        if (orbitControlsRef.current) {
            orbitControlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
            orbitControlsRef.current.update();
        }
    });

    return null;
}

// ── Mouse Parallax Starfield modifier ───────────────────────────────
function StarParallax() {
    const { mouse } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouse.x * 0.08,
            delta * 1.2
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -mouse.y * 0.05,
            delta * 1.2
        );
    });

    return (
        <group ref={groupRef}>
            <Stars radius={120} depth={60} count={7000} factor={4} saturation={0} fade speed={0.6} />
        </group>
    );
}

// ── Main scene ───────────────────────────────────────────────────────
function Scene() {
    const { setSelectedChapter, setFocusMode, isFocusMode, orbitFilter, setFlyTarget, selectedChapter, visitedChapterIds } = useAppStore();
    const grouped = useMemo(() => groupByTier(chapters), []);
    const orbitControlsRef = useRef<any>(null);

    const handleNodeClick = (chapter: Chapter, worldPos: THREE.Vector3) => {
        setSelectedChapter(chapter);
        setFlyTarget([worldPos.x, worldPos.y, worldPos.z]);
        setTimeout(() => setFocusMode(true), 800); // slight delay for camera to start flying
    };

    return (
        <>
            <StarParallax />
            <ambientLight intensity={0.15} />
            <pointLight position={[0, 0, 0]} intensity={1.5} color="#1a2fff" distance={15} />
            <pointLight position={[10, 5, -10]} intensity={0.8} color="#D4AF37" distance={20} />
            <pointLight position={[-10, -5, 10]} intensity={0.6} color="#4B9FFF" distance={20} />

            {/* The three orbital rings and their nodes */}
            {(Object.entries(TIER_CONFIG) as [ChapterTier, typeof TIER_CONFIG[ChapterTier]][]).map(([tier, cfg]) => {
                const tierChapters = grouped[tier];
                const visible = orbitFilter === 'all' || orbitFilter === tier;
                if (!visible) return null;

                return (
                    <group key={tier} rotation={[cfg.tilt, cfg.rotationY, 0]}>
                        <OrbitRing radius={cfg.radius} color={cfg.color} animated />

                        {tierChapters.map((chapter, i) => {
                            const localPos = positionOnRing(i, tierChapters.length, cfg.radius);
                            const isSelected = selectedChapter?.id === chapter.id;

                            return (
                                <ChapterNode
                                    key={chapter.id}
                                    chapter={chapter}
                                    position={localPos}
                                    tierColor={cfg.color}
                                    tierEmissive={cfg.emissive}
                                    tierGlow={cfg.glowColor}
                                    isSelected={isSelected}
                                    isVisited={visitedChapterIds.has(chapter.id)}
                                    onClick={() => {
                                        // Compute approximate world position for camera fly
                                        const worldVec = new THREE.Vector3(...localPos)
                                            .applyEuler(new THREE.Euler(cfg.tilt, cfg.rotationY, 0));
                                        handleNodeClick(chapter, worldVec);
                                    }}
                                />
                            );
                        })}
                    </group>
                );
            })}

            <CameraController orbitControlsRef={orbitControlsRef} />

            <OrbitControls
                ref={orbitControlsRef}
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={22}
                autoRotate={!isFocusMode}
                autoRotateSpeed={0.35}
                enableDamping
                dampingFactor={0.06}
            />
        </>
    );
}

// ── Export ───────────────────────────────────────────────────────────
export default function Constellation() {
    const { isFocusMode } = useAppStore();

    return (
        <div
            className={`w-full h-screen fixed inset-0 transition-all duration-1000 ${
                isFocusMode ? 'opacity-25 pointer-events-none blur-sm scale-105' : 'opacity-100'
            }`}
        >
            <Canvas camera={{ position: [0, 2, 16], fov: 58 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
