import { lazy, Suspense, useEffect } from 'react';
import { Navbar, Footer } from './components/layout';
import KonamiOverlay from './components/ui/KonamiOverlay';
import CustomCursor from './components/ui/CustomCursor';
import Marquee from './components/ui/Marquee';
import ScrollBlob from './components/ui/ScrollBlob';
import './styles/globals.css';

const marqueeItems = [
  'React', 'TypeScript', 'Spring Boot', 'Python', 'Docker',
  'C#', '.NET', 'MySQL', 'Node.js', 'Git',
  'Open to work', 'Based in Guatemala',
];

// Code splitting: Hero crítico, resto lazy-loaded
const Hero = lazy(() => import('./components/sections/Hero').then((m) => ({ default: m.default })));
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.default })));
const Projects = lazy(() => import('./components/sections/Projects').then((m) => ({ default: m.default })));
const Education = lazy(() => import('./components/sections/Education').then((m) => ({ default: m.default })));
const Skills = lazy(() => import('./components/sections/Skills').then((m) => ({ default: m.default })));
const Contact = lazy(() => import('./components/sections/Contact').then((m) => ({ default: m.default })));

const SectionFallback = () => <div className="section-skeleton" aria-hidden />;

function App() {
  useEffect(() => {
    console.log(
      '%c¡Hola, dev curioso! 👀\n%cSi estás leyendo esto, probablemente nos llevemos bien.\n→ github.com/moonshin3z',
      'color: #a855f7; font-size: 16px; font-weight: bold;',
      'color: #b4b0c4; font-size: 12px;'
    );
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <div className="app-bg" aria-hidden />
      <ScrollBlob />
      <CustomCursor />
      <KonamiOverlay />
      <Navbar />
      <main id="main-content" role="main">
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
        <Marquee items={marqueeItems} />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
