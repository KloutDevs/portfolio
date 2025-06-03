import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './FancyButton.module.css';

const FancyButton = ({ children = 'Try it Free', className = '' }) => {
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
      const x = e.clientX - rect.left - 131;

      // Actualizar posición del glow
      glow.style.transform = `translateX(${x}px) translateZ(0px)`;

      // Calcular posición relativa del cursor (-1 a 1)
      const relativeX = ((e.clientX - rect.left) / rect.width) * 2 - 1;

      // Calcular opacidades
      const leftOpacity = Math.max(0, -relativeX);
      const rightOpacity = Math.max(0, relativeX);

      // Aplicar opacidades
      leftGradient.style.opacity = leftOpacity;
      rightGradient.style.opacity = rightOpacity;
    };

    const handleMouseLeave = () => {
      // Resetear opacidades al salir del botón
    };

    container.addEventListener('mousemove', updateGlowAndGradients);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', updateGlowAndGradients);
      container.removeEventListener('mouseleave', handleMouseLeave);
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9" className={styles.arrow}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default FancyButton;
