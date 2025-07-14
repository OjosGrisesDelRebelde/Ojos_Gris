const items = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImage = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

items.forEach(item => {
  item.addEventListener('click', () => {
    lbImage.src = item.src;
    lbImage.alt = item.alt;
    lightbox.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.add('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
  const resumenContenedor = document.getElementById('resumen-agrupado');
  const articulos = document.querySelectorAll('article.mes');

  const resumenPorAnio = {};

  articulos.forEach(art => {
    const mes = art.getAttribute('data-month');
    const [anio, mesNum] = mes.split('-');
    const nombreMes = new Date(anio, mesNum - 1).toLocaleString('es-ES', { month: 'long' });

    const conteoImgs = art.querySelectorAll('img.gallery-item').length;
    art.querySelector('.conteo').textContent = conteoImgs;

    if (!resumenPorAnio[anio]) resumenPorAnio[anio] = [];

    const link = `<a href="#mes-${anio}-${mesNum}">${nombreMes}: ${conteoImgs} imagen${conteoImgs !== 1 ? 'es' : ''}</a>`;
    resumenPorAnio[anio].push(link);
  });

  for (const anio in resumenPorAnio) {
    const div = document.createElement('div');
    div.classList.add('resumen-anio');

    const titulo = document.createElement('h3');
    titulo.textContent = anio;
    div.appendChild(titulo);

    const ul = document.createElement('ul');
    resumenPorAnio[anio].forEach(linea => {
      const li = document.createElement('li');
      li.innerHTML = linea;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    resumenContenedor.appendChild(div);
  }
});
