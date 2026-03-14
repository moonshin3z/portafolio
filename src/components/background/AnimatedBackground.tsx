/**
 * Fondo animado con gradientes que se mueven suavemente.
 * Respeta prefers-reduced-motion para accesibilidad.
 */
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-animation" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`bg-gradient bg-gradient-${index + 1}`}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0],
                  scale: [1, 1.1, 0.9, 1],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 5,
                }
          }
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
