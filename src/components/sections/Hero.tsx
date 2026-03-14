/**
 * Hero tipográfico editorial: nombre, rol y CTA.
 * Sin imagen de fondo, enfoque en tipografía.
 */
import { motion } from 'framer-motion';
import { Button } from '../ui';
import { personalInfo } from '../../data/personal';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-label">Full Stack Developer</span>
          <h1 id="hero-title" className="hero-title">
            {personalInfo.name}
          </h1>
          <p className="hero-subtitle">{personalInfo.subtitle}</p>
          <div className="hero-cta">
            <Button href="#proyectos" variant="primary" aria-label="Ver proyectos">
              Ver proyectos
            </Button>
            <Button href="#contacto" variant="secondary" aria-label="Contacto">
              Contáctame
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
