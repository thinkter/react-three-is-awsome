'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { Physics, RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'

function ControllableBox({ position }: { position: [number, number, number] }) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const keysPressed = useRef<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!rigidBodyRef.current) return

    const speed = 0.1
    const impulse = { x: 0, y: 0, z: 0 }

    // WASD and Arrow Keys
    if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
      impulse.z -= speed
    }
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
      impulse.z += speed
    }
    if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
      impulse.x -= speed
    }
    if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
      impulse.x += speed
    }

    if (impulse.x !== 0 || impulse.z !== 0) {
      rigidBodyRef.current.applyImpulse(impulse, true)
    }
  })

  return (
    <RigidBody ref={rigidBodyRef} position={position} colliders="cuboid">
      <Box args={[1, 1, 1]} castShadow>
        <meshStandardMaterial color="lime" />
      </Box>
    </RigidBody>
  )
}

function PhysicsBox({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody position={position} colliders="cuboid">
      <Box args={[1, 1, 1]} castShadow>
        <meshStandardMaterial color="orange" />
      </Box>
    </RigidBody>
  )
}

function PhysicsSphere({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody position={position} colliders="ball">
      <Sphere args={[0.5, 32, 32]} castShadow>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
    </RigidBody>
  )
}

function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <Box args={[10, 0.5, 10]} position={[0, -2, 0]} receiveShadow>
        <meshStandardMaterial color="lightblue" />
      </Box>
    </RigidBody>
  )
}

export default function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={['#252525']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <Physics gravity={[0, -9.81, 0]}>
          <Ground />
          <ControllableBox position={[0, 5, 0]} />
          <PhysicsSphere position={[2, 8, 0]} />
          <PhysicsBox position={[-1, 10, 0]} />
        </Physics>

        <OrbitControls />
      </Canvas>
    </div>
  )
}
