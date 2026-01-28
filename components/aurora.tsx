'use client';
import Aurora from './background-3d';

export const AuroraBackground = () => {
  return (
    <Aurora
      colorStops={['#7cff67', '#B19EEF', '#5227FF']}
      blend={0.5}
      amplitude={1.0}
      speed={1}
    />
  );
};

export default AuroraBackground;
