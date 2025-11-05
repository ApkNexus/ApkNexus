fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    // Crear las tarjetas
    apps.forEach((app, index) => {
      const appId = index + 1;

      const card = document.createElement('a');
      card.href = `app.html?id=${appId}`;
      card.classList.add('card');
      card.setAttribute('data-aos', 'fade-up');

      card.innerHTML = `
        <img src="assets/img/${app.image}" alt="${app.name}" />
        <h2>${app.name}</h2>
        <p>${app.description}</p>
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
        const desc = card.querySelector('p').textContent.toLowerCase();

        if (name.includes(filter) || desc.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  })
  .catch(err => console.error("Error cargando apps.json:", err));
