document.addEventListener('DOMContentLoaded', () => {
  const tableContainer = document.getElementById('table-container');
  const searchInput = document.getElementById('search');

  fetch('index.md')
    .then(response => response.text())
    .then(text => {
      tableContainer.innerHTML = marked.parse(text);

      // Når markdown er konverteret til tabel, forbered rækkerne
      const rows = document.querySelectorAll("table tbody tr");

      // Tilføj data-title attributter til hurtigere søgning
      rows.forEach(row => {
        const titleCell = row.cells[0];
        if (titleCell) {
          row.dataset.title = titleCell.innerText.toLowerCase();
        }
      });

      // Debounce søgning
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const search = searchInput.value.trim().toLowerCase();

          rows.forEach(row => {
            const title = row.dataset.title;
            row.style.display = title.includes(search) ? '' : 'none';
          });
        }, 150); // 150ms delay
      });
    });
});
