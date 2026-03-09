"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';

function LiquidPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { mouse, viewport } = useThree();
    const { submitted } = useAppStore();
    const target = useMemo(() => new THREE.Vector3(), []);
    const shatterProgress = useRef(0);

    useFrame((state, delta) => {
        if (materialRef.current) {
            if (submitted) {
                // Shatter: rapidly increase distortion
                shatterProgress.current = Math.min(shatterProgress.current + delta * 2.5, 1);
                const shatterDistort = 0.4 + shatterProgress.current * 0.8;
                const shatterSpeed = 2 + shatterProgress.current * 8;
                materialRef.current.distort = shatterDistort;
                materialRef.current.speed = shatterSpeed;
            } else {
                // Normal liquid animation driven by mouse
                const targetDistort = 0.35 + Math.abs(mouse.x) * 0.1 + Math.abs(mouse.y) * 0.1;
                materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05);
                materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, 1.5 + Math.abs(mouse.x + mouse.y) * 0.5, 0.05);
            }
        }

        if (meshRef.current) {
            if (!submitted) {
                target.set((mouse.x * viewport.width) / 2.5, (mouse.y * viewport.height) / 2.5, 0);
                meshRef.current.position.lerp(target, 0.025);
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.12, 0.05);
                meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.12, 0.05);
            } else {
                // Rotate during shatter
                meshRef.current.rotation.z += delta * shatterProgress.current * 0.3;
                meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.02));
            }
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[12, 12, 96, 96]} />
            <MeshDistortMaterial
                ref={materialRef}
                color="#0d0d0d"
                envMapIntensity={1.2}
                clearcoat={1}
                clearcoatRoughness={0.05}
                metalness={0.95}
                roughness={0.05}
                distort={0.35}
                speed={1.5}
            />
        </mesh>
    );
}

// Subtle reflective rim shards that appear during shatter
function ShardEffect() {
    const { submitted } = useAppStore();
    const shardsRef = useRef<THREE.Group>(null);
    const shards = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            angle: (i / 8) * Math.PI * 2,
            offset: 1.5 + Math.random() * 2,
            scale: 0.3 + Math.random() * 0.4,
        }));
    }, []);
    const progress = useRef(0);

    useFrame((state, delta) => {
        if (!submitted || !shardsRef.current) return;
        progress.current = Math.min(progress.current + delta * 1.5, 1);
        shardsRef.current.children.forEach((child, i) => {
            const shard = shards[i];
            const s = progress.current;
            child.position.x = Math.cos(shard.angle) * shard.offset * s * 2;
            child.position.y = Math.sin(shard.angle) * shard.offset * s * 2;
            child.position.z = s * 1.5;
            (child as THREE.Mesh).material && ((child as any).material.opacity = Math.max(0, 1 - s * 1.8));
        });
    });

    return (
        <group ref={shardsRef}>
            {shards.map((shard, i) => (
                <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, shard.angle]}>
                    <planeGeometry args={[shard.scale, shard.scale * 0.15, 1, 1]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        transparent
                        opacity={0}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function InteractiveMirror() {
    return (
        <div className="canvas-container" style={{ pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#3366ff" />
                <pointLight position={[5, 5, 0]} intensity={0.5} color="#aaaaff" />
                <Environment preset="night" />
                <LiquidPlane />
                <ShardEffect />
            </Canvas>
        </div>
    );
}
