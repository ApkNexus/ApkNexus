fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    // Obtenemos el ID de la app desde la URL
    const params = new URLSearchParams(window.location.search);
    const appId = parseInt(params.get('id'));

    // Buscamos la app según su posición en el JSON
    const app = apps[appId - 1];

    if (!app) {
      document.body.innerHTML = "<h2 style='text-align:center; color:#fff;'>App no encontrada</h2>";
      return;
    }

    // Cargamos los datos en la página
    const container = document.getElementById('app-details');
    container.innerHTML = `
      <div class="app-header" data-aos="fade-down">
        <img src="assets/img/${app.image}" alt="${app.name}" class="app-image"/>
        <h1>${app.name}</h1>
        <p>${app.description}</p>
      </div>

      <div class="app-info" data-aos="fade-up">
        <p><strong>Versión:</strong> ${app.version}</p>
        <p><strong>Tamaño:</strong> ${app.size}</p>
        <p><strong>Licencia:</strong> ${app.license}</p>
      </div>

      <div class="install-steps" data-aos="fade-up">
        <h3>Cómo instalar:</h3>
        <ol>
          ${app.install_steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>

      <div class="download-section" data-aos="zoom-in">
        <a href="${app.download}" class="btn-download" target="_blank">Descargar APK</a>
      </div>
    `;
  })
  .catch(err => {
    console.error("Error cargando app.json:", err);
    document.body.innerHTML = "<h2 style='text-align:center; color:#fff;'>Error cargando la información</h2>";
  });
