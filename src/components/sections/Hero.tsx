import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import CodeMotif from '../ui/CodeMotif';
import './Hero.css';

const heroCode = `const dev = {
  name: "Iván",
  passion: "building",
  status: "curious",
};`;

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [firstName, lastName] = personalInfo.name.split(' ');

  return (
    <section className="hero" aria-labelledby="hero-title">
      <CodeMotif code={heroCode} position="right" />
      <div className="hero-container">
        <motion.p
          className="hero-greeting"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello — I'm a
        </motion.p>

        <motion.p
          className="hero-role"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Full Stack Developer
        </motion.p>

        <h1 id="hero-title" className="hero-title">
          <motion.span
            className="hero-name-line"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {firstName}
          </motion.span>
          <motion.span
            className="hero-name-line hero-name-last"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {lastName}
            <span className="hero-dot">.</span>
          </motion.span>
        </h1>

        <motion.div
          className="hero-bottom"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="hero-subtitle">{personalInfo.subtitle}</p>
          <div className="hero-cta">
            <a href="#proyectos" className="hero-link">
              Ver proyectos
              <span className="hero-link-arrow">→</span>
            </a>
            <a href="#contacto" className="hero-link hero-link--muted">
              Contacto
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden
      >
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
