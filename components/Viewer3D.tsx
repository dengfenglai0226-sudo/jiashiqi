import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import { HumidifierModel } from './HumidifierModel';

const Viewer3D: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-50 relative">
      <Canvas shadows camera={{ position: [250, 200, 250], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <HumidifierModel />
          </Stage>
          <Grid 
            renderOrder={-1} 
            position={[0, -100, 0]} 
            infiniteGrid 
            cellSize={20} 
            sectionSize={100} 
            fadeDistance={500}
            sectionColor="#94a3b8"
            cellColor="#cbd5e1"
          />
        </Suspense>
        <OrbitControls autoRotate={false} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-md backdrop-blur-sm pointer-events-none">
        <h3 className="font-bold text-slate-800">3D Interactive View</h3>
        <p className="text-xs text-slate-600">Left Click: Rotate | Right Click: Pan | Scroll: Zoom</p>
      </div>
    </div>
  );
};

export default Viewer3D;
