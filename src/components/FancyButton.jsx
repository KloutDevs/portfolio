import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './FancyButton.module.css';

const FancyButton = ({ children = 'Example button', className = '' }) => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const leftGradientRef = useRef(null);
  const rightGradientRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    const leftGradient = leftGradientRef.current;
    const rightGradient = rightGradientRef.current;

    const updateGlowAndGradients = (e) => {
      const rect = container.getBoundingClientRect();
      const { clientX } = e;

      // Calculamos la posición x relativa al centro del botón
      let x = clientX - rect.left - rect.width / 2;

      // Limitamos x para que el glow no se desplaze más allá de la mitad del botón
      const maxOffset = rect.width / 2;
      x = Math.max(Math.min(x, maxOffset), -maxOffset);

      glow.style.transform = `translateX(${x}px) translateZ(0px)`;

      // Definimos una zona extendida alrededor del botón (Mientras menor sea el factor, menor será la distancia que necesita recorrer el cursor para llegar a la opacidad 1 del gradiente)
      const extendedWidth = rect.width * 1; // Factor ajustable
      const extendedStartX = rect.left - (extendedWidth - rect.width) / 2;

      // Calculamos la posición relativa del cursor en la zona extendida
      let relativeX = (clientX - extendedStartX) / extendedWidth;

      // Limitamos relativeX entre 0 y 1
      relativeX = Math.max(0, Math.min(1, relativeX));

      // Calculamos las opacidades de los gradientes
      const leftOpacity = Math.max(0, 1 - relativeX * 2);
      const rightOpacity = Math.max(0, relativeX * 2 - 1);

      // Aplicamos las opacidades
      leftGradient.style.opacity = leftOpacity;
      rightGradient.style.opacity = rightOpacity;
    };

    window.addEventListener('mousemove', updateGlowAndGradients);

    return () => {
      window.removeEventListener('mousemove', updateGlowAndGradients);
    };
  }, []);

  return (
    /* Wrapper */
    <div ref={containerRef} className="relative inline-flex items-center z-10">
      {/* Gradiente Izquierdo */}
      <div
        ref={leftGradientRef}
        className={clsx(
          styles.borderButtonLightBlur,
          `absolute left-0 top-0 h-full w-full transform scale-x-[-1] rounded-full will-change-transform pointer-events-none`
        )}
      >
        <div className={`${styles.borderButtonLight} relative h-full w-full rounded-full`}></div>
      </div>

      {/* Gradiente Derecho */}
      <div
        ref={rightGradientRef}
        className={clsx(
          styles.borderButtonLightBlur,
          `absolute left-0 top-0 h-full w-full rounded-full will-change-transform pointer-events-none`
        )}
      >
        <div className={`${styles.borderButtonLight} relative h-full w-full rounded-full`}></div>
      </div>

      {/* Botón principal */}
      <button className={`${styles.fancyButton} ${className}`}>
        {/* Efectos de glow */}
        <div ref={glowRef} className={styles.glowContainer}>
          <div className={styles.glowCircle}></div>
          <div className={styles.glowBlur}></div>
        </div>

        {/* Contenido del botón */}
        <span className="whitespace-nowrap text-sm uppercase leading-[42px] text-black">{children}</span>
      </button>
    </div>
  );
};

export default FancyButton;
