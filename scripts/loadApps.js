fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    // 🕒 Ordenar apps por fecha (de más nueva a más vieja)
    apps.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 🧩 Crear las tarjetas en formato 2x2
    apps.forEach((app, index) => {
      const appId = index + 1;

      const card = document.createElement('a');
      card.href = `app.html?id=${appId}`;
      card.classList.add('card');
      card.setAttribute('data-aos', 'zoom-in');

      card.innerHTML = `
        <img src="assets/img/${app.image}" alt="${app.name}" />
        <h2>${app.name}</h2>
        <div class="app-info">
          <div>V${app.version}</div>
          <div>${app.date || "Sin fecha"}</div>
          <div>${app.size}</div>
        </div>
      `;

      container.appendChild(card);
    });

    // 🔍 Buscador
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll('.card');

      cards.forEach(card => {
        const name = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = name.includes(filter) ? '' : 'none';
      });
    });
  })
  .catch(err => {
    console.error("Error cargando apps.json:", err);
    const container = document.getElementById('apps-container');
    container.innerHTML = `<p style="text-align:center; color:#f66;">Error al cargar las aplicaciones 😔</p>`;
  });
