/**
 * Sección de contacto con formulario y métodos alternativos.
 * Incluye validación en cliente, integración con API (rate limit, CSRF),
 * y fallback a mailto si no hay backend configurado.
 */
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, GithubIcon, LinkedinIcon, Send, Loader2 } from 'lucide-react';
import { Button } from '../ui';
import { personalInfo } from '../../data/personal';
import './Contact.css';

/** URL base del API de contacto. Vacío = mismo origen (proxy en dev, mismo dominio en prod) */
const API_BASE = import.meta.env.VITE_CONTACT_API_URL ?? '';

const contactMethods = [
  {
    icon: <Mail size={28} strokeWidth={1.5} />,
    label: 'Email',
    value: personalInfo.contact.email,
    href: `mailto:${personalInfo.contact.email}`,
  },
  {
    icon: <GithubIcon size={28} strokeWidth={1.5} />,
    label: 'GitHub',
    value: `github.com/${personalInfo.contact.github}`,
    href: `https://github.com/${personalInfo.contact.github}`,
  },
  {
    icon: <LinkedinIcon size={28} strokeWidth={1.5} />,
    label: 'LinkedIn',
    value: 'Iván Roblero',
    href: `https://www.linkedin.com/in/${personalInfo.contact.linkedin}`,
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  const fetchCsrf = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/csrf`.replace(/\/+/g, '/'));
      const data = await res.json();
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
        setApiAvailable(true);
      } else setApiAvailable(false);
    } catch {
      setCsrfToken('');
      setApiAvailable(false);
    }
  }, []);

  useEffect(() => {
    fetchCsrf();
  }, [fetchCsrf]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`.replace(/\/+/g, '/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, csrfToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data.errors?.[0]?.msg || data.error || 'Error al enviar';
        throw new Error(msg);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      fetchCsrf();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar');
    }
  };

  /** Mostrar formulario solo si el API está disponible; si no, mostrar botón mailto */
  const useForm = apiAvailable === true;
  const isLoading = status === 'loading';

  return (
    <section id="contacto" className="contact" aria-labelledby="contact-heading">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 id="contact-heading" className="contact-title">
          Trabajemos Juntos
        </h2>
        <p className="contact-subtitle">
          ¿Tienes un proyecto en mente? ¿Buscas un desarrollador comprometido y apasionado?
          Estoy disponible para pasantías, empleos y proyectos freelance.
        </p>

        {useForm ? (
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-form-row">
              <label htmlFor="contact-name">Nombre</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
                placeholder="Tu nombre"
                disabled={isLoading}
                autoComplete="name"
              />
            </div>
            <div className="contact-form-row">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <div className="contact-form-row">
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={10}
                maxLength={2000}
                placeholder="Cuéntame sobre tu proyecto..."
                rows={5}
                disabled={isLoading}
              />
            </div>
            {status === 'success' && (
              <p className="contact-form-success" role="status">
                ¡Mensaje enviado correctamente! Te responderé pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="contact-form-error" role="alert">
                {errorMsg}
              </p>
            )}
            <Button
              type="submit"
              variant="primary"
              aria-label="Enviar mensaje"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="contact-btn-icon spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={20} className="contact-btn-icon" />
                  Enviar mensaje
                </>
              )}
            </Button>
          </form>
        ) : (
          <>
            {import.meta.env.DEV && apiAvailable === false && (
              <p className="contact-subtitle" style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                Ejecuta <code>npm run server</code> para usar el formulario.
              </p>
            )}
            <Button
              href={`mailto:${personalInfo.contact.email}`}
              variant="primary"
              aria-label="Enviar mensaje por email"
            >
              Envíame un mensaje →
            </Button>
          </>
        )}

        <div className="contact-methods">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              className="contact-card"
              target={method.label !== 'Email' ? '_blank' : undefined}
              rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={`Contactar por ${method.label}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)' }}
            >
              <span className="contact-icon">{method.icon}</span>
              <span className="contact-label">{method.label}</span>
              <span className="contact-value">{method.value}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
