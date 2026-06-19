import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './TextReveal.css';

interface TextRevealProps {
  text?: string;
  paragraphs?: string[];
  className?: string;
}

const TextReveal = ({ text, paragraphs, className = '' }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const allParagraphs = paragraphs || (text ? [text] : []);
  const allWords = allParagraphs.flatMap((p, pIdx) =>
    p.split(' ').map((word, wIdx) => ({ word, paragraphIndex: pIdx, key: `${pIdx}-${wIdx}` }))
  );
  const totalWords = allWords.length;

  if (prefersReducedMotion) {
    return (
      <div className={`text-reveal ${className}`}>
        {allParagraphs.map((p, i) => (
          <p key={i} className="text-reveal-paragraph">{p}</p>
        ))}
      </div>
    );
  }

  let wordIndex = 0;

  return (
    <div ref={containerRef} className={`text-reveal ${className}`}>
      {allParagraphs.map((p, pIdx) => {
        const words = p.split(' ');
        const paragraph = (
          <p key={pIdx} className="text-reveal-paragraph">
            {words.map((word) => {
              const i = wordIndex++;
              const start = i / totalWords;
              const end = start + 1 / totalWords;
              return <Word key={`${pIdx}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />;
            })}
          </p>
        );
        return paragraph;
      })}
    </div>
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
