require('dotenv').config();

/**
 * Llama a la API de Claude (Anthropic) y devuelve la respuesta de completado.
 * Utiliza la variable de entorno ANTHROPIC_API_KEY.
 */
async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY no está configurada');
  }

  const response = await fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      temperature: 0,
      prompt: `${prompt}\n\nAssistant:`
    })
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Error de la API de Claude: ${response.status} ${txt}`);
  }

  const result = await response.json();
  // La respuesta incluye la propiedad `completion` con el texto generado.
  return result.completion;
}

module.exports = { callClaude };
