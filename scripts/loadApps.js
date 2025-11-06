fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    // 🗓️ Función para convertir fechas en español a formato válido
    const meses = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    function parseFecha(fecha) {
      if (!fecha) return new Date(0);
      const partes = fecha.trim().toLowerCase().split(' ');
      if (partes.length < 3) return new Date(0);
      const dia = parseInt(partes[0]);
      const mes = meses[partes[1]] ?? 0;
      const año = parseInt(partes[2]);
      return new Date(año, mes, dia);
    }

    // 🕒 Ordenar apps por fecha (de más nueva a más vieja)
    apps.sort((a, b) => parseFecha(b.date) - parseFecha(a.date));

    // 🏷️ Encabezado de "Últimas actualizaciones"
    const title = document.createElement('h2');
    title.textContent = '📅 Últimas actualizaciones';
    title.style.textAlign = 'center';
    title.style.color = '#00ffaa';
    title.style.marginTop = '20px';
    title.style.marginBottom = '10px';
    title.style.textShadow = '0 0 10px #00ffaa';
    title.setAttribute('data-aos', 'fade-up');
    container.parentNode.insertBefore(title, container);

    // 🧩 Crear las tarjetas (2x2)
    apps.forEach((app, index) => {
      const appId = index + 1;

      const card = document.createElement('a');
      card.href = `app.html?id=${appId}`;
      card.classList.add('card');
      card.setAttribute('data-aos', 'zoom-in');

      // Mostrar versión exactamente como está en el JSON
      const versionText = app.version || 'Sin versión';

      card.innerHTML = `
        <img src="assets/img/${app.image}" alt="${app.name}" />
        <h2>${app.name}</h2>
        <div class="app-info">
          <div>${versionText}</div>
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
