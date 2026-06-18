import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './Marquee.css';

interface MarqueeProps {
  items: string[];
  separator?: string;
}

const Marquee = ({ items, separator = '·' }: MarqueeProps) => {
  const prefersReducedMotion = useReducedMotion();

  const content = items.map((item, i) => (
    <span key={i} className="marquee-item">
      {item}
      <span className="marquee-sep" aria-hidden>{separator}</span>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden>
      <div
        className="marquee-track"
        style={prefersReducedMotion ? { animationPlayState: 'paused' } : undefined}
      >
        {content}
        {content}
      </div>
    </div>
  );
};

export default Marquee;
