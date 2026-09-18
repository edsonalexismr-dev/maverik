require('dotenv').config();

/**
 * Endpoint GET /api/cron-collect
 * Se ejecuta vía Vercel cron. Recolecta datos de X, Instagram, etc.
 * Autoriza la petición mediante el header Authorization: Bearer ${CRON_SECRET}
 */
module.exports = async (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (authHeader !== expected) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  // TODO: Implementar lógica de recolección usando X_API_KEY, INSTAGRAM_ACCESS_TOKEN, etc.
  // Por ejemplo:
  //   const postsX = await fetchXPosts();
  //   const postsIG = await fetchInstagramPosts();
  //   await savePostsToDb([...postsX, ...postsIG]);

  // En este esqueleto devolvemos una respuesta simulada.
  res.status(200).json({ status: 'recolección completada (simulada)' });
};
