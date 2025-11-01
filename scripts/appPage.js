fetch('../data/apps.json')
  .then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id
