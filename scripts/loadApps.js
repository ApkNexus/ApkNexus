fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // limpia cualquier contenido previo

    apps.forEach((app, index) => {
      const delay = index * 100; // animaciones escalonadas

      const card = document.createElement('a');
      card.href = app.link;
      card.className = 'card';
      card.setAttribute('data-aos', 'zoom-in');
      card.setAttribute('data-aos-delay', delay);
      card.innerHTML = `
        <img src="${app.imagen}" alt="${app.nombre}">
        <h2>${app.nombre}</h2>
        <span class="btn">Descargar</span>
      `;

      // animación de aparición al cargar
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease';
        card.style.opacity = '1';
      }, 200 + delay);

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error al cargar las apps:', error);
  });
