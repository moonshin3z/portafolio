/**
 * Header minimalista: logo + menú hamburguesa.
 * Incluye toggle de tema claro/oscuro.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../contexts/ThemeContext';
import { useReducedMotion } from '../../contexts/ReducedMotionContext';
import './Navbar.css';

const navLinks = [
  { href: '#sobre-mi', label: 'Sobre mí', id: 'sobre-mi' },
  { href: '#proyectos', label: 'Proyectos', id: 'proyectos' },
  { href: '#educacion', label: 'Educación', id: 'educacion' },
  { href: '#habilidades', label: 'Habilidades', id: 'habilidades' },
  { href: '#contacto', label: 'Contacto', id: 'contacto' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Navegación principal"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <a href="#" className="logo" aria-label={`${personalInfo.name} - Inicio`}>
        {personalInfo.logo}
      </a>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line" aria-hidden />
          <span className="hamburger-line" aria-hidden />
          <span className="hamburger-line" aria-hidden />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-label="Menú de navegación"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <ul className="nav-menu" role="menubar">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mobile-theme-row" role="none">
                <button
                  type="button"
                  className="theme-toggle theme-toggle-mobile"
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                >
                  {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                  <span>{theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
