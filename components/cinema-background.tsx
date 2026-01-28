'use client';
import LightRays from './LightRays';

export const CinemaBackground = () => {
  return (
    <div style={{ width: '100%', height: 'full', position: 'fixed' }}>
      <LightRays
        raysOrigin='top-center'
        raysColor='#ffffff'
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className='custom-rays'
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
};
