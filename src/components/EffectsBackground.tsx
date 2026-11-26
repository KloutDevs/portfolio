import { useEffect, useState } from 'react';
import DotGrid from './reactbits/DotGrid';
import Particles from './reactbits/Particles';
import Noise from './reactbits/Noise';

// Layered background: a dot grid that reacts to the cursor, a few floating particles and film grain.
// Everything freezes when the user prefers reduced motion.
export default function EffectsBackground() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <DotGrid className="absolute inset-0" dotSize={3} gap={26} baseColor="#25252a" activeColor="#b7f542" proximity={160} paused={reduced} />
      <Particles
        className="absolute inset-0"
        particleCount={60}
        particleColors={['#b7f542', '#2dd4bf', '#a78bfa']}
        speed={0.06}
        opacity={0.5}
        moveParticlesOnHover={false}
        paused={reduced}
      />
      <Noise fixed opacity={0.05} />
    </div>
  );
}
