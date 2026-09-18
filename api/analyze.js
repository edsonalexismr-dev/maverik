require('dotenv').config();
const { callClaude } = require('../lib/claude');

/**
 * Endpoint POST /api/analyze
 * Recibe un texto y devuelve el análisis generado por Claude.
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  // Vercel parsea el cuerpo JSON automáticamente si el encabezado es application/json.
  const { text } = req.body || {};
  if (!text) {
    res.status(400).json({ error: 'Falta el campo text en el cuerpo' });
    return;
  }

  try {
    const result = await callClaude(`Analiza el siguiente texto y genera un resumen en español:\n\n${text}`);
    res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al invocar Claude' });
  }
};
