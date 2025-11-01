fetch('data/apps.json')
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('apps-container');

    apps.forEach((app, index) => {
      const appId = index + 1;

      const card = `
        <a href="app.html?id=${appId}" class="card" data-aos="fade-up">
          <img src="images/${app.image}" alt="${app.name}" />
          <h2>${app.name}</h2>
          <p>${app.description}</p>
        </a>
      `;
      container.innerHTML += card;
    });
  })
  .catch(err => console.error("Error cargando apps.json:", err));
