# Portafolio - Iván Roblero

Portafolio personal de desarrollador Full Stack. Construido con React, TypeScript y Vite.

## Descripción

Sitio web de presentación profesional que incluye:

- **Hero** con introducción y CTA
- **Sobre mí** con biografía y estadísticas
- **Proyectos** destacados con tecnologías
- **Educación** y formación académica
- **Habilidades** técnicas y blandas
- **Contacto** con formulario (API) o mailto

## Requisitos

- Node.js 18+
- npm o pnpm

## Setup

```bash
# Clonar e instalar dependencias
git clone <repo-url>
cd portafolio-react
npm install

# Desarrollo (solo frontend)
npm run dev

# Desarrollo completo (frontend + API de contacto)
npm run dev:full

# Build de producción
npm run build

# Vista previa del build
npm run preview

# Análisis del bundle
npm run analyze
```

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Sirve el build localmente |
| `npm run server` | Inicia el API de contacto (Express) |
| `npm run dev:full` | Frontend + API en paralelo |
| `npm run analyze` | Genera reporte visual del bundle (ejecutar con `--mode analyze`) |
| `npm run lint` | Ejecuta ESLint |

## API de Contacto

El formulario de contacto usa un backend con:

- **Rate limiting**: 5 solicitudes por 15 min por IP
- **Validación en servidor**: nombre, email, mensaje
- **Protección CSRF**: token por solicitud

### Variables de entorno

Crear `.env` en la raíz:

```env
# Opcional: URL del API (vacío = mismo origen)
VITE_CONTACT_API_URL=

# Para el servidor (server/)
PORT=3001
CORS_ORIGIN=https://tu-dominio.com
```

### Envío de emails

El servidor actualmente registra los mensajes en consola. Para envío real, configurar SMTP (nodemailer) o integrar Resend/SendGrid en `server/index.ts`.

## SEO

Antes de desplegar, reemplaza `https://tu-dominio.com` en:

- `index.html` (canonical, og:url, Schema.org)
- `public/robots.txt` (Sitemap)
- `public/sitemap.xml` (loc)

## Despliegue

### Frontend (Vercel, Netlify, etc.)

```bash
npm run build
```

La carpeta `dist/` contiene los archivos estáticos.

### Backend (Railway, Render, Fly.io)

Desplegar la carpeta `server/` con Node.js. Asegurar que `PORT` esté configurado.

### Variables en producción

- `VITE_CONTACT_API_URL`: URL pública del API (ej. `https://api.tudominio.com`)

## PWA (opcional)

Para habilitar PWA, instala `vite-plugin-pwa` cuando soporte Vite 7+ y configúralo en `vite.config.ts`.

## Optimización de imágenes

Para WebP, añade versiones `.webp` junto a cada imagen en `public/images/`:

```
public/images/projects/wellnessappimagen.png
public/images/projects/wellnessappimagen.webp  ← opcional, se usa si existe
```

Puedes generar WebP con herramientas como [Squoosh](https://squoosh.app) o:

```bash
npx sharp-cli --input "public/images/**/*.png" --output "." --format webp
```

## Estructura del proyecto

```
portafolio-react/
├── public/           # Assets estáticos
├── server/           # API Express (contacto)
├── src/
│   ├── components/   # Componentes React
│   ├── contexts/     # Contextos (reduced motion)
│   ├── data/         # Datos estáticos
│   ├── hooks/        # Hooks personalizados
│   ├── styles/       # CSS global
│   └── types/        # Tipos TypeScript
├── index.html
├── vite.config.ts
└── package.json
```

## Licencia

Privado - Uso personal.
