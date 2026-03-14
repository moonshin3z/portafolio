import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const y1 = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 200]);

  const rotate1 = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -360]);
  const rotate3 = useTransform(scrollY, [0, 1000], [45, prefersReducedMotion ? 45 : 405]);

  return (
    <div className="floating-shapes" aria-hidden="true">
      <motion.div
        className="shape shape-1"
        style={{ y: y1, rotate: rotate1 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="shape shape-2"
        style={{ y: y2, rotate: rotate2 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 0.9, 1] }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="shape shape-3"
        style={{ y: y3, rotate: rotate3 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </div>
  );
};

export default FloatingShapes;
