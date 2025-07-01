import React, { useRef, useEffect } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CassetteTape({ position, rotation, isPlaying, onClick }) {
  const groupRef = useRef()
  const reelsRef = useRef([])

  useFrame((state, delta) => {
    if (isPlaying && groupRef.current) {
      reelsRef.current.forEach(reel => {
        if (reel) {
          reel.rotation.z -= delta * 2
        }
      })
    }
  })

  return (
    <group 
      position={position} 
      rotation={rotation} 
      ref={groupRef}
      onClick={onClick}
    >
      {/* Main cassette body */}
      <RoundedBox 
        args={[1.2, 0.8, 0.2]} 
        radius={0.05} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#666666" />
      </RoundedBox>
      
      {/* Tape reels */}
      <group position={[0, 0, 0.11]}>
        {[-0.3, 0.3].map((x, i) => (
          <RoundedBox 
            key={i} 
            args={[0.4, 0.4, 0.05]} 
            radius={0.02} 
            position={[x, 0, 0]}
            ref={el => reelsRef.current[i] = el}
          >
            <meshStandardMaterial color="#333333" />
          </RoundedBox>
        ))}
      </group>
      
      {/* Label area */}
      <RoundedBox 
        args={[0.8, 0.4, 0.02]} 
        radius={0.01} 
        position={[0, 0, 0.11]}
      >
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
    </group>
  )
}
