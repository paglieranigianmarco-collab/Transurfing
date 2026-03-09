"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function LiquidPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { mouse, viewport } = useThree();

    const target = useMemo(() => new THREE.Vector3(), []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Gentle base animation
            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, 0.4, 0.05);
            materialRef.current.speed = 2;
        }

        if (meshRef.current) {
            // Subtle follow mouse interaction
            target.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0);
            meshRef.current.position.lerp(target, 0.02);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.1, 0.05);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.1, 0.05);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10, 64, 64]} />
            <MeshDistortMaterial
                ref={materialRef}
                color="#111111"
                envMapIntensity={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.9}
                roughness={0.1}
                distort={0.4}
                speed={2}
            />
        </mesh>
    );
}

export default function InteractiveMirror() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#555555" />
                <Environment preset="night" />
                <LiquidPlane />
            </Canvas>
        </div>
    );
}
