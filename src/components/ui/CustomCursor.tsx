import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './CustomCursor.css';

const CustomCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [tabindex]');
      setHovering(!!isInteractive);
    };

    let raf: number;
    const animateTrail = () => {
      if (trailRef.current) {
        const rect = trailRef.current.getBoundingClientRect();
        const currentX = rect.left + rect.width / 2;
        const currentY = rect.top + rect.height / 2;
        const dx = cursorRef.current.x - currentX;
        const dy = cursorRef.current.y - currentY;
        trailRef.current.style.transform = `translate(${currentX + dx * 0.15}px, ${currentY + dy * 0.15}px)`;
      }
      raf = requestAnimationFrame(animateTrail);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', checkHover);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    raf = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        ref={dotRef}
        className={`cursor-dot ${hovering ? 'cursor-dot--hover' : ''}`}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      />
      <div
        ref={trailRef}
        className={`cursor-trail ${hovering ? 'cursor-trail--hover' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden
      />
    </>
  );
};

export default CustomCursor;
