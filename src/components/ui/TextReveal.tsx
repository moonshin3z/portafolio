import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './TextReveal.css';

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal = ({ text, className = '' }: TextRevealProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.3'],
  });

  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <p className={`text-reveal ${className}`}>{text}</p>;
  }

  return (
    <p ref={containerRef} className={`text-reveal ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
};

const Word = ({ word, range, progress }: { word: string; range: [number, number]; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span className="text-reveal-word" style={{ opacity }}>
      {word}{' '}
    </motion.span>
  );
};

export default TextReveal;
