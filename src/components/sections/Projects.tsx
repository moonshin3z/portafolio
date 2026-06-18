import { motion } from 'framer-motion';
import { ProjectCard } from '../ui';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <section id="proyectos" className="projects" aria-labelledby="projects-heading">
      <div className="projects-header">
        <motion.span
          className="projects-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          02 / Proyectos
        </motion.span>
        <motion.h2
          id="projects-heading"
          className="projects-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Trabajo<br />seleccionado
        </motion.h2>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} reverse={index % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
