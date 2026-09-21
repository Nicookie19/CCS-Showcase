const items = [
  ['1', 'CebLabify', 'Research', 'research'], ['2', 'Space Apps Davao', 'Community', 'community'], ['3', 'Web3: The future of the internet', 'Learning', 'learning'], ['4', 'Web3 seminar session', 'Learning', 'learning'], ['5', 'Ilead CS internationalization program', 'Learning', 'learning'], ['6', 'LEAD CS 2025', 'Community', 'community'], ['7', 'Research recognition', 'Research', 'research'], ['8', 'Research recognition', 'Research', 'research'], ['9', 'Research recognition', 'Research', 'research'], ['10', 'Research recognition', 'Research', 'research'], ['11', 'Research recognition', 'Research', 'research'], ['12', 'Research recognition', 'Research', 'research'], ['13', 'Tesda skills', 'Learning', 'learning'], ['14', 'Research conference', 'Research', 'research'], ['15', 'Research recognition', 'Research', 'research'], ['16', 'Research recognition', 'Research', 'research'], ['17', 'Blockchain seminar', 'Learning', 'learning'], ['18', 'Blockchain seminar', 'Learning', 'learning'], ['19', 'Research recognition', 'Research', 'research'], ['20', 'Research recognition', 'Research', 'research'], ['21', 'Kadaywan digital mural', 'Learning', 'learning'], ['22', 'Research recognition', 'Research', 'research'], ['23', 'Research recognition', 'Research', 'research'], ['24', 'Tesda World skills', 'Community', 'community']
];

const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let visibleItems = items;
let currentIndex = 0;

function renderGallery(filter = 'all') {
  visibleItems = filter === 'all' ? items : items.filter(([, , , category]) => category === filter);
  gallery.innerHTML = visibleItems.map(([number, title, type], index) => `
    <button class="gallery-card" type="button" data-index="${index}" aria-label="Open ${title}, image ${number}">
      <img src="assets/${number}.jpg" alt="${title}">
      <span class="gallery-info"><strong>${title}</strong><small>${type} / ${number.padStart(2, '0')}</small></span>
    </button>`).join('');
  gallery.querySelectorAll('.gallery-card').forEach((card) => card.addEventListener('click', () => openLightbox(Number(card.dataset.index))));
}

function openLightbox(index) {
  currentIndex = index;
  const [number, title, type] = visibleItems[currentIndex];
  lightboxImage.src = `assets/${number}.jpg`;
  lightboxImage.alt = title;
  lightboxCaption.textContent = `${title} / ${type} / ${number.padStart(2, '0')}`;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function moveLightbox(direction) {
  currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}

document.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('#lightbox-prev').addEventListener('click', () => moveLightbox(-1));
document.querySelector('#lightbox-next').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderGallery();