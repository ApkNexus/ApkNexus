fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id');

    const app = apps.find(a => a.id === appId);

    if (!app) {
      document.body.innerHTML = "<h2 style='text-align:center; color:#fff;'>App no encontrada</h2>";
      return;
    }

    const container = document.getElementById('app-details');
    container.innerHTML = `
      <div class="app-card" data-aos="fade-up">
        <img src="assets/img/${app.image}" alt="${app.name}">
        <h1>${app.name}</h1>
        <p class="description">${app.description}</p>

        <div class="app-info" data-aos="fade-up">
          <p><strong>Versión:</strong> ${app.version}</p>
          <p><strong>Peso:</strong> ${app.size}</p>
          <p><strong>Licencia:</strong> ${app.license}</p>
        </div>

        <div class="install-steps" data-aos="fade-up">
          <h3>Cómo instalar:</h3>
          <ol>
            ${app.install_steps.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>

        <div class="download-section" data-aos="zoom-in">
          <a href="${app.download}" class="btn-download" target="_blank">⬇ Descargar APK</a>
        </div>
      </div>
    `;
  })
  .catch(err => {
    console.error("Error cargando apps.json:", err);
    document.body.innerHTML = "<h2 style='text-align:center; color:#fff;'>Error cargando la información</h2>";
  });
