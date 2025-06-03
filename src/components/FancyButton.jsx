import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './FancyButton.module.css';

const FancyButton = ({ children = 'Try it Free', className = '' }) => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    const updateGlowPosition = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - 131;
      console.log(e);
      console.log(rect);
      console.log('e.clientX: ' + e.clientX);
      console.log('rect.left: ' + rect.left);
      console.log(x);
      glow.style.transform = `translateX(${x}px) translateZ(0px)`;
    };

    container.addEventListener('mousemove', updateGlowPosition);

    return () => {
      container.removeEventListener('mousemove', updateGlowPosition);
    };
  }, []);

  return (
    /* Wrapper */
    <div ref={containerRef} className="relative inline-flex items-center z-10">
      {/* Gradiente Izquierdo */}
      <div
        className={clsx(
          styles.borderButtonLightBlur,
          `absolute left-0 top-0 h-full w-full transform scale-x-[-1] rounded-full will-change-transform`
        )}
      >
        <div className={clsx(
          styles.borderButtonLight,
          `relative h-full w-full rounded-full`
        )}></div>
      </div>

      {/* Gradiente Derecho */}
      <div
        className={clsx(
          styles.borderButtonLightBlur,
          `absolute left-0 top-0 h-full w-full rounded-full will-change-transform`
        )}
      >
        <div className={styles.borderButtonLight}></div>
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
