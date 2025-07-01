import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { CassettePlayer } from './CassettePlayer'
import { CassetteTape } from './CassetteTape'
import { CSSCassettePlayer } from './CSSCassettePlayer'
import { CSSCassetteTapeFixed as CSSCassetteTape } from './CSSCassetteTapeFixed'

function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('3D Scene Error:', error);
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
}

export function Scene({ 
  mode = 'css', 
  playerColor = '#333', 
  cassetteColor = '#222',
  currentTrack,
  onCassettePlay
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const cassetteData = JSON.parse(e.dataTransfer.getData('text/plain'));
      onCassetteDrop?.(cassetteData);
    } catch (error) {
      console.error('Error handling cassette drop:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  try {
    if (mode === 'css') {
      return (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <motion.div className="relative">
              <CSSCassettePlayer color={playerColor} accentColor={cassetteColor} />
              {currentTrack && (
                <motion.div
                  initial={{ y: -200 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <CSSCassetteTape
                    layoutId={`cassette-${currentTrack.id}`}
                    label={currentTrack.title}
                    artist={currentTrack.artist}
                    isPlaying={true}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      );
    }

    // For 3D mode, wrap in error boundary and use Suspense
    return (
      <div 
        className="fixed inset-0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <div className="text-white text-xl">Loading 3D Scene...</div>
          </div>
        }>
          <ErrorBoundary fallback={
            <div className="flex h-full w-full items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <p className="text-xl mb-4">3D Mode Unavailable</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            </div>
          }>
            <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
              <color attach="background" args={['#1a1a1a']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <spotLight position={[-10, 10, -5]} intensity={0.8} />
              <CassettePlayer position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]} />
              <CassetteTape position={[2, 0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
              <OrbitControls 
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minDistance={3}
                maxDistance={6}
              />
            </Canvas>
          </ErrorBoundary>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Scene rendering error:', error);
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
        <p>Unable to load scene. Please try refreshing the page.</p>
      </div>
    );
  }
}
