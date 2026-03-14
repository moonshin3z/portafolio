# Guía de despliegue - Portafolio

## Opción recomendada: Vercel (frontend) + Render (backend)

### Requisitos previos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Render](https://render.com)
- Proyecto subido a GitHub

---

## 1. Desplegar el frontend en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Clic en **Add New** → **Project**.
3. Importa tu repositorio `portafolio-react`.
4. Vercel detectará Vite automáticamente. Configuración:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. En **Environment Variables**, añade (solo después de desplegar el backend):
   ```
   VITE_CONTACT_API_URL = https://tu-api.onrender.com
   ```
   (Reemplaza con la URL real de tu API en Render)
6. Clic en **Deploy**.
7. Tu portafolio estará en `https://tu-proyecto.vercel.app`.

---

## 2. Desplegar el backend en Render

1. Ve a [render.com](https://render.com) e inicia sesión con GitHub.
2. Clic en **New** → **Web Service**.
3. Conecta el mismo repositorio `portafolio-react`.
4. Configuración:
   - **Name:** `portafolio-api`
   - **Region:** Oregon (o la más cercana)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start`
5. En **Environment**, añade:
   ```
   CORS_ORIGIN = https://tu-proyecto.vercel.app
   ```
   (Reemplaza con la URL real de tu frontend en Vercel)
6. Clic en **Create Web Service**.
7. Espera el despliegue. La URL será algo como `https://portafolio-api-xxx.onrender.com`.

---

## 3. Conectar frontend y backend

1. Copia la URL del backend en Render (ej: `https://portafolio-api-xxx.onrender.com`).
2. En Vercel → tu proyecto → **Settings** → **Environment Variables**.
3. Añade o edita:
   ```
   VITE_CONTACT_API_URL = https://portafolio-api-xxx.onrender.com
   ```
4. **Redeploy** el frontend en Vercel (Deployments → ⋮ → Redeploy).

---

## Alternativa: Solo frontend (sin formulario API)

Si no quieres desplegar el backend, el portafolio funcionará igual. El formulario de contacto mostrará un botón **"Envíame un mensaje"** que abre el cliente de email (`mailto:`). No necesitas configurar nada más.

---

## Variables de entorno

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `VITE_CONTACT_API_URL` | Vercel | URL del API (ej: `https://portafolio-api.onrender.com`) |
| `CORS_ORIGIN` | Render | URL del frontend (ej: `https://tu-portafolio.vercel.app`) |
| `PORT` | Render | Lo asigna Render automáticamente |

---

## Dominio personalizado

- **Vercel:** Settings → Domains → añade tu dominio.
- **Render:** El plan gratuito incluye un subdominio `.onrender.com`.
