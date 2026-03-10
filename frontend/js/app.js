const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const statusBox = document.getElementById('status');
const resultsBox = document.getElementById('results');

function renderResults(items) {
  if (!items.length) {
    resultsBox.innerHTML = '<div class="card">Nessun risultato trovato.</div>';
    return;
  }

  resultsBox.innerHTML = items.map(item => `
    <article class="card">
      <h3>${item.brand} ${item.model}</h3>
      <div>Negozio: <strong>${item.shop}</strong></div>
      <div>Misura: ${item.size}</div>
      <div>Stagione: ${item.season}</div>
      <div>Disponibilità: ${item.stock}</div>
      <div class="price">€ ${Number(item.price).toFixed(2)}</div>
      <a class="btn" href="${item.url}" target="_blank" rel="noopener noreferrer">Vai al prodotto</a>
    </article>
  `).join('');
}

async function doSearch(query) {
  const apiBase = window.APP_CONFIG?.API_URL;

  if (!apiBase || apiBase.includes('INSERISCI-QUI')) {
    statusBox.textContent = 'Inserisci prima l\'URL reale della tua API Render nel file assets/js/config.js';
    resultsBox.innerHTML = '';
    return;
  }

  statusBox.textContent = `Ricerca in corso per: ${query}`;
  resultsBox.innerHTML = '';

  try {
    const response = await fetch(`${apiBase}/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Errore durante la ricerca');
    }

    statusBox.textContent = `Trovati ${data.count} risultati per: ${data.query}`;
    renderResults(data.results || []);
  } catch (error) {
    statusBox.textContent = `Errore: ${error.message}`;
    resultsBox.innerHTML = '';
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  doSearch(input.value.trim());
});
