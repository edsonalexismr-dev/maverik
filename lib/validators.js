/**
 * Validación básica del payload devuelto por /api/dashboard.
 * No es un esquema JSON completo, solo asegura que las claves principales existan.
 * Devuelve `null` si la validación pasa o una cadena describiendo el problema.
 */
function validateDashboard(data) {
  if (!data || typeof data !== 'object') return 'Respuesta no es un objeto';

  const requiredTop = [
    'summary',
    'now',
    'trends',
    'governmentActivity',
    'alertsList',
    'opportunities',
    'lastUpdated'
  ];

  for (const key of requiredTop) {
    if (!(key in data)) return `Falta la clave ${key}`;
  }

  // Validaciones simples de tipo
  if (typeof data.summary !== 'object') return 'summary debe ser un objeto';
  if (!Array.isArray(data.now)) return 'now debe ser un arreglo';
  if (!Array.isArray(data.trends)) return 'trends debe ser un arreglo';
  if (!Array.isArray(data.governmentActivity)) return 'governmentActivity debe ser un arreglo';
  if (!Array.isArray(data.alertsList)) return 'alertsList debe ser un arreglo';
  if (!Array.isArray(data.opportunities)) return 'opportunities debe ser un arreglo';

  // Puedes agregar validaciones más específicas según tu modelo de datos.
  return null;
}

module.exports = { validateDashboard };
