import { lazy, Suspense } from 'react';
import { Navbar, Footer } from './components/layout';
import './styles/globals.css';

// Code splitting: Hero crítico, resto lazy-loaded
const Hero = lazy(() => import('./components/sections/Hero').then((m) => ({ default: m.default })));
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.default })));
const Projects = lazy(() => import('./components/sections/Projects').then((m) => ({ default: m.default })));
const Education = lazy(() => import('./components/sections/Education').then((m) => ({ default: m.default })));
const Skills = lazy(() => import('./components/sections/Skills').then((m) => ({ default: m.default })));
const Contact = lazy(() => import('./components/sections/Contact').then((m) => ({ default: m.default })));

const SectionFallback = () => <div className="section-skeleton" aria-hidden />;

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <div className="app-bg" aria-hidden />
      <Navbar />
      <main id="main-content" role="main">
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
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
