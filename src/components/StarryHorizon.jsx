// src/components/StarryHorizon.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarParticles from './StarParticles';

const StarryHorizon = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 3, // Aumentamos un poco la duración
        delay: Math.random() * 2,
        brightness: Math.random() > 0.5 ? '1px' : '2px',
        // Agregamos rangos de movimiento aleatorios para cada estrella
        xRange: Math.random() * 10 - 5, // Movimiento entre -5 y 5
        yRange: Math.random() * 10 - 5,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">

      {/* Círculo grande para crear la curva del horizonte con pseudo-elementos ::before y ::after */}
      <div
        className="relative mt-8 h-full w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40
          after:absolute after:-left-1/2 after:top-[70%] after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900"
      >
        {/* Estrellas animadas */}
        <div
          id="sparkles"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        >
         <StarParticles client:only="react" />
        </div>
      </div>
    </div>
  );
};

export default StarryHorizon;
