"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null)

  const particlesCount = 3000
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      const radius = Math.random() * 18
      const spinAngle = radius * 0.4
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = new THREE.Color()
      const innerColor = new THREE.Color("#7c3aed")
      const outerColor = new THREE.Color("#0891b2")
      mixedColor.lerpColors(innerColor, outerColor, radius / 18)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions.positions} colors={positions.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

function StarField() {
  const ref = useRef<THREE.Points>(null)

  const starsCount = 1500
  const positions = useMemo(() => {
    const positions = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 60
      positions[i3 + 1] = (Math.random() - 0.5) * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 60
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#030308] via-[#0a0a12] to-[#030308]">
      <Canvas camera={{ position: [0, 5, 12], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#7c3aed" />

        <StarField />
        <GalaxyParticles />
      </Canvas>
    </div>
  )
}
