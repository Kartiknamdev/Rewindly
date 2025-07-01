import React from 'react'
import { Box, RoundedBox } from '@react-three/drei'

export function CassettePlayer({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main body */}
      <RoundedBox args={[2, 1, 0.5]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </RoundedBox>
      
      {/* Cassette slot */}
      <RoundedBox args={[1.5, 0.2, 0.1]} radius={0.02} position={[0, 0.2, 0.3]}>
        <meshStandardMaterial color="#222222" />
      </RoundedBox>
      
      {/* Control buttons */}
      <group position={[0, -0.2, 0.3]}>
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <Box key={i} args={[0.15, 0.15, 0.1]} position={[x, 0, 0]}>
            <meshStandardMaterial color="#444444" />
          </Box>
        ))}
      </group>
      
      {/* Display */}
      <RoundedBox args={[1, 0.3, 0.05]} radius={0.02} position={[0, 0.4, 0.25]}>
        <meshStandardMaterial color="#111111" />
      </RoundedBox>
    </group>
  )
}
