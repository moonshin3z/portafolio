import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'WellnessApp',
    description:
      'Aplicación integral para el seguimiento del bienestar emocional de estudiantes universitarios. Sistema completo con autenticación OAuth, encuestas dinámicas y análisis personalizado de datos.',
    tags: ['Spring Boot', 'React', 'MySQL', 'Docker', 'OAuth 2.0'],
    image: '/images/projects/wellnessappimagen.png',
    liveUrl: 'https://wellnessapp -demo.vercel.app',
    githubUrl: 'https://github.com/moonshin3z/wellnessapp',
    date: '2025 - 2026',
    type: 'university',
  },
  {
    id: 2,
    title: 'Sistema Hospital La Paz',
    description:
      'Sistema de escritorio robusto para la gestión y control de equipos de cómputo del área de sistemas. Optimiza el seguimiento de activos tecnológicos y cronogramas de mantenimiento preventivo.',
    tags: ['C#', '.NET Framework', 'Windows Forms', 'SQL Server'],
    image: '/images/projects/la_paz_grupo_hospitalario-removebg-preview.png',
    date: '2024',
    type: 'internship',
  },
  {
    id: 4,
    title: 'Sofia — AI para Clínicas',
    description:
      'Agente de inteligencia artificial que automatiza la atención de clínicas médicas. Contesta llamadas telefónicas con voz natural, responde mensajes de WhatsApp y agenda citas directamente en el calendario. En producción 2 meses en su primer cliente: ~80 citas agendadas al mes de forma autónoma, ~63 llamadas atendidas por semana y cero llamadas perdidas desde el lanzamiento.',
    tags: ['Python', 'Claude API', 'ElevenLabs', 'WhatsApp API', 'Cal.com'],
    image: '/images/projects/sofia.png',
    date: '2025 - 2026',
    type: 'personal',
  },
  {
    id: 3,
    title: 'Murphi',
    description:
      'Asistente inteligente para estudiantes foráneos que combina gestión de finanzas personales y productividad. Utiliza IA para predecir gastos, optimizar hábitos de estudio y ofrecer insights personalizados sobre tu rendimiento.',
    tags: ['React', 'Node.js', 'OpenAI API', 'Chart.js', 'MongoDB'],
    image: '/images/projects/murphi.png',
    githubUrl: 'https://github.com/moonshin3z/murphi',
    date: '2025',
    type: 'personal',
  },
];
