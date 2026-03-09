"use client";

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { chapters } from '@/data/chapters';
import { useAppStore } from '@/lib/store';
import { Chapter } from '@/lib/types';

function ChapterNode({ chapter, position, onClick }: { chapter: Chapter, position: [number, number, number], onClick: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;
            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial
                    color={hovered ? "#ffffff" : "#888888"}
                    emissive={hovered ? "#444444" : "#000000"}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Label for the node */}
            <Html position={[0, -0.4, 0]} center className="pointer-events-none fade-in">
                <div className={`text-xs whitespace-nowrap tracking-wider transition-opacity duration-300 font-light ${hovered ? 'text-white opacity-100' : 'text-white/40 opacity-50'}`}>
                    {chapter.chapterNumber}. {chapter.title}
                </div>
            </Html>
        </group>
    );
}

// Generate spiral coordinates for chapters based on their sequence
function generateCoordinates(count: number) {
    const coords: [number, number, number][] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < count; i++) {
        // Inner nodes (early chapters) closer to center, outer nodes further
        const radius = 2 + (i * 0.4);
        const angle = i * angleIncrement;
        const x = Math.cos(angle) * radius;
        // Vary the Y and Z slightly to make it a 3D constellation
        const y = (Math.random() - 0.5) * (radius * 0.5);
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
        coords.push([x, y, z]);
    }
    return coords;
}

export default function Constellation() {
    const setSelectedChapter = useAppStore((state) => state.setSelectedChapter);
    const setFocusMode = useAppStore((state) => state.setFocusMode);
    const { isFocusMode } = useAppStore();

    const positions = useMemo(() => generateCoordinates(chapters.length), []);

    return (
        <div className={`w-full h-screen fixed inset-0 transition-opacity duration-1000 ${isFocusMode ? 'opacity-30 pointer-events-none blur-sm' : 'opacity-100'}`}>
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group>
                    {chapters.map((chapter, index) => (
                        <ChapterNode
                            key={chapter.id}
                            chapter={chapter}
                            position={positions[index]}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                setFocusMode(true);
                            }}
                        />
                    ))}
                </group>

                {/* Constellation lines connecting them consecutively */}
                <Line
                    points={positions}
                    color="#ffffff"
                    lineWidth={1}
                    transparent
                    opacity={0.1}
                />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={30}
                    autoRotate={!isFocusMode}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
