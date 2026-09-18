# Social Listening Dashboard

**Resumen**
Esta aplicación web muestra, en tiempo real, la actividad relevante de X, Instagram, cuentas de gobierno y fuentes oficiales. El tablero está pensado para usuarios de comunicación y relaciones públicas que necesitan identificar temas de conversación, tendencias, alertas y oportunidades de contenido.

## Tecnologías
- **Frontend:** HTML5, CSS3 y JavaScript puro (vanilla). No se usan frameworks como React.
- **Backend:** Funciones serverless de Vercel escritas en JavaScript dentro de la carpeta `/api`.
- **Base de datos:** Capa compatible con Supabase/PostgreSQL.
- **IA:** Claude API se invoca únicamente desde las funciones serverless; el navegador nunca la llama directamente.

## Estructura del proyecto
```
/
├─ index.html
├─ styles.css
├─ app.js
├─ vercel.json
├─ README.md
├─ .env.example
├─ /api
│   ├─ dashboard.js
│   ├─ posts.js
│   ├─ analyze.js
│   ├─ cron-collect.js
│   └─ cron-analyze.js
└─ /lib
    ├─ db.js
    ├─ claude.js
    ├─ validators.js
    └─ mockData.js
```

## Variables de entorno
Crea un archivo `.env` basándote en `.env.example` y define los siguientes valores:
- `ANTHROPIC_API_KEY` – clave de la API de Claude (Anthropic).
- `X_API_KEY` – credencial de la API oficial de X (Twitter).
- `INSTAGRAM_ACCESS_TOKEN` – token de acceso a Instagram (requiere permisos oficiales).
- `DATABASE_URL` – URL de conexión a la base de datos Postgres (Supabase).
- `CRON_SECRET` – token secreto usado para autorizar los jobs de cron.

> **Importante:** Nunca incluyas estos valores en el repositorio ni en el código que se envía al cliente.

## Configuración local
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/social-listening-dashboard.git
   cd social-listening-dashboard
   ```
2. **Instalar dependencias** (solo si deseas usar Supabase u otras librerías). En este ejemplo no hay dependencias obligatorias, pero si decides conectar la base de datos, instala el cliente:
   ```bash
   npm install @supabase/supabase-js
   ```
3. **Crear archivo de entorno**
   ```bash
   cp .env.example .env
   # edita .env y agrega tus valores (puedes dejarlo vacío mientras trabajas con datos simulados)
   ```
4. **Ejecutar Vercel en modo desarrollo**
   ```bash
   npm i -g vercel   # si no lo tienes instalado
   vercel dev
   ```
   Esto levanta un servidor local disponible en `http://localhost:3000`. El frontend se sirve como archivos estáticos y las funciones bajo `/api` funcionan como serverless.
5. **Probar la UI**
   - Abre el navegador y navega a `http://localhost:3000`.
   - La pantalla mostrará datos simulados definidos en `lib/mockData.js`.
   - Usa el botón **Actualizar** para volver a solicitar `/api/dashboard` sin recargar la página.
   - Cambia los filtros en la barra superior; cada cambio vuelve a cargar los datos.

## Despliegue en Vercel
1. **Crear un repositorio en GitHub** y subir el proyecto.
   ```bash
   git remote add origin https://github.com/tu-usuario/social-listening-dashboard.git
   git push -u origin main
   ```
2. **Crear un nuevo proyecto en Vercel** vinculándolo al repositorio de GitHub.
   - En la consola de Vercel haz click en *New Project* → *Import Git Repository*.
   - Selecciona el repositorio que acabas de crear.
   - Vercel detectará automáticamente que se trata de una aplicación estática con funciones Node y usará el archivo `vercel.json`.
3. **Configurar variables de entorno** en la página de *Settings > Environment Variables* del proyecto en Vercel. Añade cada variable listada en la sección anterior.
4. **Deploy automático**: Cada push a la rama `main` desencadena una nueva construcción y despliegue.

## Cron jobs y plan de Vercel
Los schedules declarados en `vercel.json` (`/api/cron-collect` y `/api/cron-analyze`) solo se ejecutan en planes que permiten **cron** (no el plan Hobby). En el plan Hobby los jobs se ejecutarán una única vez al iniciar el despliegue. Si necesitas una recolección frecuente, considera:
- Cambiar a un plan **Pro** o **Enterprise** que incluya cron.
- Configurar un scheduler externo (por ejemplo, GitHub Actions, Cloud Scheduler, Zapier) que invoque los endpoints con el `Authorization: Bearer ${CRON_SECRET}`.

## Adaptadores pendientes para X e Instagram
Los archivos `api/cron-collect.js` contienen marcadores **TODO** donde debes integrar los SDK o llamadas HTTP oficiales de X e Instagram. No se permite scraping no autorizado; asegúrate de obtener los permisos y credenciales adecuados antes de implementarlo.

## Datos simulados
Durante el desarrollo, la API devuelve datos de ejemplo definidos en `lib/mockData.js`. Cuando conectes la base de datos y la lógica de recolección, reemplaza la importación de `mockData` por consultas reales.

## Buenas prácticas de seguridad
- Todas las credenciales permanecen en el servidor; nunca se incluyen en HTML, CSS o JavaScript del cliente.
- Los endpoints cron verifican `Authorization: Bearer ${CRON_SECRET}`.
- Cada publicación tiene un ID único (`id`), garantizando que la UI no duplique contenidos.
- Se valida la estructura del JSON antes de enviarlo al cliente (ver `lib/validators.js`).

---
**¡Listo!** Con estos pasos puedes desarrollar, probar y desplegar tu propio tablero de social listening sin depender de frameworks pesados. Si necesitas ampliar la funcionalidad (por ejemplo, añadir autenticación, paginación o exportar a CSV), crea nuevas funciones en `/api` y actualiza la UI en `app.js` siguiendo la misma arquitectura.
