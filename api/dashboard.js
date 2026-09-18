require('dotenv').config();
const { validateDashboard } = require('../lib/validators');
const { dashboard: mockDashboard } = require('../lib/mockData');

/**
 * Endpoint GET /api/dashboard
 * Devuelve el JSON estructurado para el frontend.
 * En desarrollo utiliza datos simulados; en producción deberías consultar la BD
 * y generar los análisis mediante Claude.
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  // Copiamos los datos simulados y añadimos la marca temporal.
  const data = { ...mockDashboard };
  data.lastUpdated = new Date().toISOString();

  // Validación rápida antes de enviar al cliente.
  const validationError = validateDashboard(data);
  if (validationError) {
    res.status(500).json({ error: 'Datos inválidos', details: validationError });
    return;
  }

  res.status(200).json(data);
};
