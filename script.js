document.addEventListener('DOMContentLoaded', () => {
  const tableContainer = document.getElementById('table-container');
  const searchInput = document.getElementById('search');

  fetch('index.md')
    .then(response => response.text())
    .then(text => {
      tableContainer.innerHTML = marked.parse(text);

      searchInput.addEventListener('input', () => {
        const search = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll("table tbody tr");

        rows.forEach(row => {
          const title = row.cells[0].innerText.toLowerCase();
          row.style.display = title.includes(search) ? "" : "none";
        });
      });
    });
});
