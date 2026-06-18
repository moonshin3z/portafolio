import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import './KonamiOverlay.css';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.5,
  duration: 1.5 + Math.random() * 2,
  size: 4 + Math.random() * 8,
}));

const KonamiOverlay = () => {
  const activated = useKonamiCode();

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="konami-particle"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
              }}
              initial={{ y: '-10vh', opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
            />
          ))}
          <motion.span
            className="konami-text"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            ✨ You found it!
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiOverlay;
