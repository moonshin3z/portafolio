/**
 * Tarjeta editorial con imagen grande.
 * Imagen a ancho completo, contenido debajo.
 */
import { motion } from 'framer-motion';
import type { Project } from '../../types';
import OptimizedImage from './OptimizedImage';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  reverse?: boolean;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const typeLabels = {
    university: 'Proyecto Universitario',
    internship: 'Pasantía',
    personal: 'Proyecto Personal',
  };

  const projectUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : null;

  const imageBlock = (
    <div className="project-image-wrapper">
      <OptimizedImage
        src={project.image}
        alt={`Captura del proyecto ${project.title}`}
        className="project-image"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%231a1a1a' width='800' height='450'/%3E%3Ctext fill='%23737373' font-family='sans-serif' font-size='24' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
        }}
      />
    </div>
  );

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {projectUrl ? (
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-image-link"
          aria-label={`Ver proyecto ${project.title}`}
        >
          {imageBlock}
        </a>
      ) : (
        <div className="project-image-link">{imageBlock}</div>
      )}
      <div className="project-info">
        <div className="project-meta">
          <span className="project-type">{typeLabels[project.type]}</span>
          <span className="project-date">{project.date}</span>
        </div>
        <h3 id={`project-title-${project.id}`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver proyecto ${project.title} en vivo`}
            >
              Ver proyecto →
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código de ${project.title} en GitHub`}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
