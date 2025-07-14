window.addEventListener('DOMContentLoaded', () => {
  const resumenAnios = document.getElementById('resumen-anios');
  const mesesArticulos = document.querySelectorAll('article.mes');

  const estructura = {};

  mesesArticulos.forEach(art => {
    const month = art.getAttribute('data-month');
    const [year, mes] = month.split('-');
    const count = art.querySelectorAll('.gallery-item, .gallery-video').length;

    if (!estructura[year]) estructura[year] = {};
    estructura[year][mes] = { count, id: `mes-${year}-${mes}` };

    art.querySelector('.conteo').textContent = count;
  });

  Object.keys(estructura).sort((a, b) => b - a).forEach(year => {
    const liYear = document.createElement('li');
    const btnYear = document.createElement('button');
    btnYear.textContent = year;
    btnYear.classList.add('year-toggle');

    const ulMeses = document.createElement('ul');
    ulMeses.classList.add('meses-submenu');

    Object.keys(estructura[year]).sort((a, b) => b - a).forEach(mesNum => {
      const nombreMes = new Date(year, mesNum - 1).toLocaleString('es-ES', { month: 'long' });
      const idMes = estructura[year][mesNum].id;
      const count = estructura[year][mesNum].count;

      const liMes = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${idMes}`;
      link.textContent = `${nombreMes}: ${count} item${count !== 1 ? 's' : ''}`;
      liMes.appendChild(link);
      ulMeses.appendChild(liMes);
    });

    btnYear.addEventListener('click', () => {
      ulMeses.style.display = ulMeses.style.display === 'none' ? 'block' : 'none';
    });

    liYear.appendChild(btnYear);
    liYear.appendChild(ulMeses);
    resumenAnios.appendChild(liYear);
  });

  // Si imagen falla, usar imagen de respaldo
  document.querySelectorAll('.gallery-item').forEach(img => {
    img.onerror = () => {
      img.src = 'images/placeholder.jpg';
    };
  });
});
