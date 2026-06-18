import { motion } from 'framer-motion';
import { SkillCard } from '../ui';
import { technicalSkills, softSkillsData } from '../../data/skills';
import './Skills.css';

const Skills = () => {
  const allSkills = [...technicalSkills, softSkillsData];

  return (
    <section id="habilidades" className="skills" aria-labelledby="skills-heading">
      <div className="skills-layout">
        <div className="skills-header">
          <motion.span
            className="skills-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            04 / Habilidades
          </motion.span>
          <motion.h2
            id="skills-heading"
            className="skills-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tecnologías<br />& herramientas
          </motion.h2>
        </div>

        <div className="skills-grid">
          {allSkills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
