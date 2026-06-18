import { motion } from 'framer-motion';
import { education, achievement } from '../../data/education';
import { personalInfo } from '../../data/personal';
import { iconMap } from '../../utils/iconMap';
import './Education.css';

const timelineEvents = [
  {
    year: '2019',
    label: 'Primer curso de programación',
    detail: 'C++ a los 15 años',
  },
  {
    year: '2022',
    label: 'Bachillerato en Computación',
    detail: education[1]?.institution || '',
  },
  {
    year: '2024',
    label: 'Medalla de Oro',
    detail: achievement.title,
    highlight: true,
  },
  {
    year: '2025',
    label: 'Ciencias de la Computación',
    detail: education[0]?.institution || 'UVG',
    active: true,
  },
];

const Education = () => {
  return (
    <section id="educacion" className="education" aria-labelledby="education-heading">
      <div className="education-layout">
        <div className="education-header">
          <motion.span
            className="education-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            03 / Educación
          </motion.span>
          <motion.h2
            id="education-heading"
            className="education-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Formación
          </motion.h2>
        </div>

        {/* Stats */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat">
            <span className="stat-value">{personalInfo.stats.yearsExperience}+</span>
            <span className="stat-text">Años programando</span>
          </div>
          <div className="stat">
            <span className="stat-value">{personalInfo.stats.projectsCompleted}+</span>
            <span className="stat-text">Proyectos</span>
          </div>
          <div className="stat">
            <span className="stat-value">{personalInfo.stats.technologies}+</span>
            <span className="stat-text">Tecnologías</span>
          </div>
          <div className="stat">
            <span className="stat-value">{personalInfo.stats.englishLevel}</span>
            <span className="stat-text">Inglés</span>
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="timeline" role="list" aria-label="Línea de tiempo educativa">
          <div className="timeline-line" aria-hidden />
          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.year}
              className={`timeline-event ${event.highlight ? 'timeline-event--highlight' : ''} ${event.active ? 'timeline-event--active' : ''}`}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="timeline-year">{event.year}</span>
              <div className="timeline-dot" aria-hidden />
              <div className="timeline-content">
                <h3 className="timeline-event-label">{event.label}</h3>
                <p className="timeline-event-detail">{event.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement detail */}
        <motion.div
          className="achievement"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {(() => {
            const AchievementIcon = iconMap[achievement.icon];
            return (
              <div className="achievement-icon">
                {AchievementIcon && <AchievementIcon size={28} strokeWidth={1.5} />}
              </div>
            );
          })()}
          <div className="achievement-content">
            <span className="achievement-category">{achievement.category}</span>
            <h3>{achievement.title}</h3>
            <p className="achievement-institution">{achievement.institution}</p>
            <p className="achievement-desc">{achievement.description}</p>
            <span className="achievement-date">{achievement.date}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
