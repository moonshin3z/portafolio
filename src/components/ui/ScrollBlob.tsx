import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './ScrollBlob.css';

const ScrollBlob = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const rawX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['-10vw', '50vw', '-5vw', '55vw', '10vw']);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], ['-10vh', '30vh', '70vh']);

  const trailX = useSpring(rawX, { stiffness: 30, damping: 20 });
  const trailY = useSpring(rawY, { stiffness: 30, damping: 20 });

  const trail2X = useSpring(rawX, { stiffness: 15, damping: 18 });
  const trail2Y = useSpring(rawY, { stiffness: 15, damping: 18 });

  const trail3X = useSpring(rawX, { stiffness: 8, damping: 15 });
  const trail3Y = useSpring(rawY, { stiffness: 8, damping: 15 });

  if (prefersReducedMotion) return null;

  return (
    <div className="scroll-blob-container" aria-hidden>
      <motion.div className="scroll-blob-trail trail-3" style={{ x: trail3X, y: trail3Y }} />
      <motion.div className="scroll-blob-trail trail-2" style={{ x: trail2X, y: trail2Y }} />
      <motion.div className="scroll-blob-trail trail-1" style={{ x: trailX, y: trailY }} />
      <motion.div className="scroll-blob" style={{ x: rawX, y: rawY }} />
    </div>
  );
};

export default ScrollBlob;
