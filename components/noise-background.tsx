'use client';

import Noise from './ui/noise-3d';

export const NoiseBackground = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        overflow: 'hidden',
      }}
    >
      <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
    </div>
  );
};

export default NoiseBackground;
