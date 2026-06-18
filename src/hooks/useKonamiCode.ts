import { useEffect, useState, useRef } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonamiCode = () => {
  const [activated, setActivated] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          setActivated(true);
          indexRef.current = 0;
          setTimeout(() => setActivated(false), 4000);
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return activated;
};
