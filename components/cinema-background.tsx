"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function FilmStrip() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.02
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={ref} position={[0, 0, -5]}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 8, Math.sin((i / 8) * Math.PI * 2) * 8, 0]}>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#f97316" emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function LightBeams() {
  const ref = useRef<THREE.Points>(null)

  const count = 500
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 3 + 2

      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = Math.sin(angle) * radius - 10
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f97316" size={0.08} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function FloatingFrames() {
  const groupRef = useRef<THREE.Group>(null)

  const frames = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15 - 5] as [
        number,
        number,
        number,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += frames[i].speed * 0.002
        child.rotation.y += frames[i].speed * 0.003
        child.position.y += Math.sin(state.clock.elapsedTime * frames[i].speed) * 0.002
      })
    }
  })

  return (
    <group ref={groupRef}>
      {frames.map((frame, i) => (
        <mesh key={i} position={frame.position} rotation={frame.rotation} scale={frame.scale}>
          <torusGeometry args={[1.5, 0.05, 8, 4]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={i % 2 === 0 ? "#f97316" : "#eab308"}
            emissiveIntensity={0.15}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null)

  const count = 800
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 30

      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        transparent
        opacity={0.5}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function CinemaBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#030303] via-[#0d0805] to-[#030303]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#f97316" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#eab308" />

        <FilmStrip />
        <LightBeams />
        <FloatingFrames />
        <AmbientParticles />
      </Canvas>
    </div>
  )
}
