// app.js - Lógica del cliente

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refresh-btn');
  const lastUpdatedEl = document.getElementById('last-updated');
  const statusMsg = document.getElementById('status-message');

  const showStatus = (msg, type = 'info') => {
    statusMsg.textContent = msg;
    statusMsg.className = '';
    statusMsg.classList.add(type === 'error' ? 'error' : 'info');
    statusMsg.classList.remove('hidden');
    setTimeout(() => statusMsg.classList.add('hidden'), 4000);
  };

  const fetchDashboard = async () => {
    try {
      showStatus('Cargando datos...');
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
      const data = await res.json();
      renderDashboard(data);
      showStatus('Datos actualizados');
    } catch (e) {
      console.error(e);
      showStatus(`Error al cargar datos: ${e.message}`, 'error');
    }
  };

  const renderDashboard = (data) => {
    // actualizar última actualización
    const date = new Date(data.lastUpdated);
    lastUpdatedEl.textContent = `Última actualización: ${date.toLocaleString()}`;

    // tarjetas de resumen
    document.querySelector('#card-new-posts .value').textContent = data.summary.newPosts;
    document.querySelector('#card-active-topics .value').textContent = data.summary.activeTopics;
    document.querySelector('#card-alerts .value').textContent = data.summary.alerts;
    document.querySelector('#card-official-updates .value').textContent = data.summary.officialUpdates;

    // sección Ahora
    renderList('#now-content', data.now, (item) => `
      <div class="item">
        <strong>${item.platform}</strong> – ${item.account}<br>
        ${new Date(item.date).toLocaleString()} – ${item.importance}<br>
        ${item.summary}<br>
        <a href="${item.sourceUrl}" target="_blank">Ver fuente</a>
      </div>
    `);

    // Tendencias
    renderList('#trends-content', data.trends, (item) => `
      <div class="item">
        <strong>${item.topic}</strong> – ${item.state}<br>
        Tono: ${item.tone}<br>
        Cuentas principales: ${item.mainAccounts.join(', ')}<br>
        Evidencia: ${item.evidence}
      </div>
    `);

    // Actividad gubernamental
    renderList('#gov-content', data.governmentActivity, (item) => `
      <div class="item">
        <strong>${item.institution}</strong> – ${item.type}<br>
        Resumen: ${item.summary}<br>
        Implicación: ${item.implication}
      </div>
    `);

    // Alertas
    renderList('#alerts-content', data.alertsList, (item) => `
      <div class="item">
        <strong>Prioridad ${item.priority}</strong> – ${item.category}<br>
        Evidencia: ${item.evidence}<br>
        Acción recomendada: ${item.recommendedAction}
      </div>
    `);

    // Oportunidades de contenido
    renderList('#opportunities-content', data.opportunities, (item) => `
      <div class="item">
        <strong>Propuesta:</strong> ${item.proposal}<br>
        Razón: ${item.reason}<br>
        Formato sugerido: ${item.suggestedFormat}<br>
        Nivel de riesgo: ${item.riskLevel}
      </div>
    `);
  };

  const renderList = (containerSelector, items, itemRenderer) => {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    if (!items || items.length === 0) {
      container.innerHTML = '<p>No hay datos disponibles.</p>';
      return;
    }
    items.forEach(item => {
      container.insertAdjacentHTML('beforeend', itemRenderer(item));
    });
  };

  // Manejo de filtrado (simplificado)
  const filterElements = document.querySelectorAll('#filters select');
  filterElements.forEach(el => el.addEventListener('change', fetchDashboard));

  refreshBtn.addEventListener('click', fetchDashboard);

  // carga inicial
  fetchDashboard();
});
