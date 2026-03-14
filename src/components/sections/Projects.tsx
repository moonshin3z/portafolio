import { SectionHeader, ProjectCard } from '../ui';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <section id="proyectos" className="projects section-with-bg" aria-labelledby="projects-heading">
      <div className="projects-abstract" aria-hidden />
      <div className="projects-inner">
      <SectionHeader
        id="projects-heading"
        tag="Portafolio"
        title="Proyectos Destacados"
        description="Selección de trabajos que demuestran mis habilidades técnicas y enfoque en resolver problemas reales"
      />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default Projects;
