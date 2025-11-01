fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    apps.forEach((app, index) => {
      // Generamos un ID automáticamente
      const appId = index + 1;

      const card = `
        <div class="card" id="app-${appId}" data-aos="fade-up">
          <img src="assets/img/${app.image}" alt="${app.name}" />
          <h2>${app.name}</h2>
          <p>${app.description}</p>
          <a class="btn" href="${app.download}" target="_blank">Descargar</a>
        </div>
      `;
      container.innerHTML += card;
    });
  })
  .catch(err => console.error("Error cargando apps.json:", err));
