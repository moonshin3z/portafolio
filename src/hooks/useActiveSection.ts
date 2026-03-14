/**
 * Hook que detecta la sección visible usando IntersectionObserver.
 * Usa rootMargin para considerar "activa" la sección cuando ocupa ~40% del viewport.
 */
import { useState, useEffect } from 'react';

const SECTION_IDS = ['sobre-mi', 'proyectos', 'educacion', 'habilidades', 'contacto'];

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id && SECTION_IDS.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
