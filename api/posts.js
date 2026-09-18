require('dotenv').config();
const { dashboard } = require('../lib/mockData');

/**
 * Endpoint GET /api/posts
 * En este ejemplo devuelve la lista de publicaciones recientes.
 * En producción deberías leer la tabla `posts` de tu base de datos.
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  // Reutilizamos la sección "now" como ejemplo de publicaciones.
  const posts = dashboard.now;
  res.status(200).json({ posts });
};
