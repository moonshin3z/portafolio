import { motion } from 'framer-motion';
import './CodeMotif.css';

interface CodeMotifProps {
  code: string;
  position?: 'left' | 'right';
}

const CodeMotif = ({ code, position = 'right' }: CodeMotifProps) => {
  return (
    <motion.div
      className={`code-motif code-motif--${position}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-hidden
    >
      <pre>{code}</pre>
    </motion.div>
  );
};

export default CodeMotif;
