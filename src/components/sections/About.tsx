/**
 * Sección Sobre mí con estilo editorial:
 * drop caps, pull quotes y separadores.
 */
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui';
import { personalInfo } from '../../data/personal';
import { experience } from '../../data/education';
import './About.css';

const About = () => {
  return (
    <section id="sobre-mi" className="about section-with-bg" aria-labelledby="about-heading">
      <div className="about-abstract" aria-hidden />
      <div className="about-inner">
        <SectionHeader
          id="about-heading"
          tag="Sobre mí"
          title="Conóceme"
          description="Mi historia, pasión y lo que me motiva a crear"
        />

        <div className="section-divider" />

        <div className="about-editorial">
          <motion.article
            className="about-article"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="about-article-title">Mi Historia</h3>
            <p className="about-article-text drop-cap">{personalInfo.about.intro}</p>
          </motion.article>

          <blockquote className="pull-quote about-pull-quote">
            "Me encanta resolver problemas y convertirlos en soluciones reales."
          </blockquote>

          <motion.article
            className="about-article"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="about-article-title">Mi Pasión</h3>
            <p className="about-article-text">{personalInfo.about.passion}</p>
          </motion.article>

          <div className="section-divider" />

          <motion.article
            className="about-article"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="about-article-title">Mi Estilo</h3>
            <p className="about-article-text">{personalInfo.about.style}</p>
          </motion.article>

          <div className="about-hobbies">
            <h3 className="about-article-title">Mis Hobbies</h3>
            <div className="hobbies-list">
              {personalInfo.about.hobbies.map((hobby) => (
                <span key={hobby} className="hobby-tag">
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="section-divider" />

          <motion.div
            className="experience-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="experience-tag">Experiencia</span>
            <h4 className="experience-title">{experience.title}</h4>
            <p className="experience-period">{experience.period}</p>
            <p className="experience-description">{experience.description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
