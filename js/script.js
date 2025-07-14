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
  const mesesArticulos = document.querySelectorAll('article.mes');
  const resumenLista = document.getElementById('meses-lista');

  mesesArticulos.forEach(art => {
    const month = art.getAttribute('data-month');
    const [year, mes] = month.split('-');
    const nombreMes = new Date(year, mes - 1).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const imgs = art.querySelectorAll('img.gallery-item');
    const count = imgs.length;

    art.querySelector('.conteo').textContent = count;

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#mes-${month}`;
    link.textContent = `${nombreMes}: ${count} imagen${count !== 1 ? 'es' : ''}`;
    li.appendChild(link);
    resumenLista.appendChild(li);
  });
});
