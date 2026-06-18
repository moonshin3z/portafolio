import { motion } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './Signature.css';

const Signature = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="signature"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Firma de Iván Roblero"
    >
      <div className="signature-wrapper">
        <span className="signature-text">Iván Roblero</span>
        <motion.div
          className="signature-mask"
          initial={prefersReducedMotion ? { scaleX: 0 } : { scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
};

export default Signature;
