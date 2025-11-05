fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    // Crear las tarjetas con versión, fecha y tamaño
    apps.forEach((app, index) => {
      const appId = index + 1;

      const card = document.createElement('a');
      card.href = `app.html?id=${appId}`;
      card.classList.add('card');
      card.setAttribute('data-aos', 'fade-up');

      card.innerHTML = `
        <img src="assets/img/${app.image}" alt="${app.name}" />
        <h2>${app.name}</h2>
        <div class="app-info">
          <div>V${app.version}</div>
          <div>${app.date}</div>
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
        if (name.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  })
  .catch(err => console.error("Error cargando apps.json:", err));
