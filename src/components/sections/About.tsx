import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { experience } from '../../data/education';
import TextReveal from '../ui/TextReveal';
import './About.css';

const About = () => {
  return (
    <section id="sobre-mi" className="about" aria-labelledby="about-heading">
      <div className="about-header">
        <motion.span
          className="about-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          01 / Sobre mí
        </motion.span>
        <motion.h2
          id="about-heading"
          className="about-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Conóceme
        </motion.h2>
      </div>

      <div className="about-grid">
        <div className="about-main">
          <TextReveal
            text={`${personalInfo.about.intro} ${personalInfo.about.passion} ${personalInfo.about.style}`}
            className="about-text--lead"
          />
        </div>

        <motion.aside
          className="about-sidebar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <blockquote className="about-quote">
            "Me encanta resolver problemas y convertirlos en soluciones reales."
          </blockquote>

          <div className="about-detail">
            <span className="about-detail-label">Hobbies</span>
            <div className="about-hobbies">
              {personalInfo.about.hobbies.map((hobby) => (
                <span key={hobby}>{hobby}</span>
              ))}
            </div>
          </div>

          {experience.map((exp) => (
            <div key={exp.title} className="about-detail">
              <span className="about-detail-label">{exp.type === 'freelance' ? 'Freelance' : 'Experiencia'}</span>
              <h4 className="about-exp-title">{exp.title}</h4>
              <p className="about-exp-period">{exp.period}</p>
              <p className="about-exp-desc">{exp.description}</p>
            </div>
          ))}
        </motion.aside>
      </div>
    </section>
  );
};

export default About;
