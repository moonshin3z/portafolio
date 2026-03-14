/**
 * Servidor API para el portafolio.
 * Incluye: rate limiting, validación en servidor, protección CSRF.
 * Desplegar en Railway, Render o similar.
 */
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Almacén simple de tokens CSRF (en producción usar Redis)
const csrfTokens = new Map<string, number>();
const CSRF_TOKEN_TTL = 60 * 60 * 1000; // 1 hora

// Limpieza periódica de tokens expirados
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of csrfTokens.entries()) {
    if (now > expiry) csrfTokens.delete(token);
  }
}, 10 * 60 * 1000);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Rate limiting: 5 solicitudes por 15 minutos por IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiadas solicitudes. Intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validación del formulario de contacto
const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nombre inválido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Mensaje entre 10 y 2000 caracteres'),
  body('csrfToken').notEmpty().withMessage('Token CSRF requerido'),
];

// GET /api/csrf - Genera token CSRF
app.get('/api/csrf', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(token, Date.now() + CSRF_TOKEN_TTL);
  res.json({ csrfToken: token });
});

// POST /api/contact - Envía mensaje de contacto
app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message, csrfToken } = req.body;

  // Verificación CSRF
  const expiry = csrfTokens.get(csrfToken);
  if (!expiry || Date.now() > expiry) {
    return res.status(403).json({ error: 'Token CSRF inválido o expirado' });
  }
  csrfTokens.delete(csrfToken);

  // Aquí integrar nodemailer, Resend, etc.
  // Por ahora solo logueamos (configurar SMTP en producción)
  console.log('Contacto recibido:', { name, email, message: message.substring(0, 50) + '...' });

  if (process.env.SMTP_HOST) {
    // TODO: Implementar envío real con nodemailer
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({...});
  }

  res.status(200).json({ success: true, message: 'Mensaje recibido correctamente' });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
