import React, { useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import { Group } from 'three';
import { ThreeElements } from '@react-three/fiber';

// 1 unit = 1 cm
const FRAME_H = 200;
const FRAME_W = 100;
const FRAME_D = 22; // 20cm pad + 2cm wiggle room
const PIPE_R = 1; // 20mm diameter = 1cm radius

const PVCPipe = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  // Midpoint
  const cx = (start[0] + end[0]) / 2;
  const cy = (start[1] + end[1]) / 2;
  const cz = (start[2] + end[2]) / 2;

  // Simple alignment for axis-aligned pipes (sufficient for this rect structure)
  let rotation: [number, number, number] = [0, 0, 0];
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > Math.abs(dz)) rotation = [0, 0, Math.PI / 2]; // X-axis
  if (Math.abs(dz) > Math.abs(dy) && Math.abs(dz) > Math.abs(dx)) rotation = [Math.PI / 2, 0, 0]; // Z-axis

  return (
    <mesh position={[cx, cy, cz]} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={[PIPE_R, PIPE_R, len, 16]} />
      <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
    </mesh>
  );
};

const Joint = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position}>
    <sphereGeometry args={[PIPE_R * 1.8, 16, 16]} />
    <meshStandardMaterial color="#cbd5e1" />
  </mesh>
);

const WetPad = () => (
  <mesh position={[0, FRAME_H / 2, 0]}>
    <boxGeometry args={[FRAME_W - 2, FRAME_H - 15, 20]} />
    <meshStandardMaterial color="#d97706" map={null} transparent opacity={0.9} roughness={0.9} />
  </mesh>
);

const WaterTank = () => (
  <group position={[0, 7.5, 0]}>
    {/* Tank Container */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[110, 15, 25]} />
      <meshPhysicalMaterial color="#94a3b8" transmission={0.6} roughness={0.2} thickness={1} transparent opacity={0.5} />
    </mesh>
    {/* Water */}
    <mesh position={[0, -2, 0]}>
      <boxGeometry args={[108, 10, 23]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
    </mesh>
  </group>
);

const Fan = ({ position }: { position: [number, number, number] }) => (
  <group position={position} rotation={[0, Math.PI, 0]}>
    {/* Casing */}
    <mesh>
      <boxGeometry args={[12, 12, 2.5]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    {/* Blades */}
    <mesh position={[0, 0, 1]}>
      <cylinderGeometry args={[5.5, 5.5, 0.5, 32]} rotation={[Math.PI / 2, 0, 0]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
    <Float speed={5} rotationIntensity={0} floatIntensity={0}>
       <mesh position={[0, 0, 4]}>
         {/* Wind indicator */}
         <coneGeometry args={[1, 3, 8]} rotation={[-Math.PI/2, 0, 0]}/>
         <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
       </mesh>
    </Float>
  </group>
);

export const HumidifierModel = () => {
  const groupRef = useRef<Group>(null);

  // Coordinates
  const x = FRAME_W / 2;
  const y = FRAME_H;
  const z = FRAME_D / 2;

  return (
    <group ref={groupRef} position={[0, -100, 0]}> {/* Center vertically */}
      
      {/* --- FRAME STRUCTURE --- */}
      
      {/* Vertical Pillars */}
      <PVCPipe start={[-x, 0, -z]} end={[-x, y, -z]} />
      <PVCPipe start={[x, 0, -z]} end={[x, y, -z]} />
      <PVCPipe start={[-x, 0, z]} end={[-x, y, z]} />
      <PVCPipe start={[x, 0, z]} end={[x, y, z]} />

      {/* Bottom Horizontal Frame */}
      <PVCPipe start={[-x, 15, -z]} end={[x, 15, -z]} />
      <PVCPipe start={[-x, 15, z]} end={[x, 15, z]} />
      <PVCPipe start={[-x, 15, -z]} end={[-x, 15, z]} />
      <PVCPipe start={[x, 15, -z]} end={[x, 15, z]} />

      {/* Top Horizontal Frame */}
      <PVCPipe start={[-x, y, -z]} end={[x, y, -z]} />
      <PVCPipe start={[-x, y, z]} end={[x, y, z]} />
      <PVCPipe start={[-x, y, -z]} end={[-x, y, z]} />
      <PVCPipe start={[x, y, -z]} end={[x, y, z]} />

      {/* Mid Reinforcement (at 100cm) */}
      <PVCPipe start={[-x, 100, -z]} end={[x, 100, -z]} /> 
      
      {/* Joints (Visual Decoration) */}
      {[
        [-x, 15, -z], [x, 15, -z], [-x, 15, z], [x, 15, z],
        [-x, y, -z], [x, y, -z], [-x, y, z], [x, y, z]
      ].map((pos, i) => <Joint key={i} position={pos as [number, number, number]} />)}

      {/* --- COMPONENTS --- */}
      
      <WaterTank />
      
      <WetPad />

      {/* Fans (Behind the pad) */}
      <Fan position={[-25, 120, -z - 5]} />
      <Fan position={[25, 120, -z - 5]} />

      {/* Drip Pipe (Top) */}
      <mesh position={[0, y - 5, 0]}>
        <cylinderGeometry args={[0.8, 0.8, FRAME_W - 4, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Pumps (Inside Tank) */}
      <mesh position={[-30, 5, 0]}>
         <boxGeometry args={[8, 8, 8]} />
         <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-40, 5, 0]}>
         <boxGeometry args={[8, 8, 8]} />
         <meshStandardMaterial color="black" />
      </mesh>

       {/* Labels */}
       <Text position={[0, y + 10, 0]} fontSize={8} color="black">
        200cm Height
      </Text>
      <Text position={[0, 10, z + 15]} fontSize={8} color="black">
        100cm Width
      </Text>

    </group>
  );
};