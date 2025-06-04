import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const StarParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

 return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 120,
        background: {
          color: 'transparent'
        },
        particles: {
          number: {
            value: 400,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 1,
            random: {
              enable: true,
              minimumValue: 0.6
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: {
              enable: true,
              minimumValue: 1
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.1,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "destroy"
            },
            attract: {
              enable: false,
            }
          },
          links: {
            enable: false
          }
        },
        detectRetina: true
      }}
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0
      }}
    />
  );
};

export default StarParticles;
