const track = document.getElementById('slider-track');
const pagination = document.getElementById('pagination');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// 補完して5記事以上に
while (articles.length < 5) {
  articles.push(...articles.slice(0, 5 - articles.length));
}

// DOM構築
articles.forEach((article, i) => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `
    <img src="${article.cover}" alt="${article.title}">
    <div class="overlay">
      <div class="slug">${article.slug}</div>
      <div class="title">${article.title}</div>
    </div>`;
  track.appendChild(slide);

  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => moveTo(i));
  pagination.appendChild(dot);
});

// スライド幅と移動
function updateSlider() {
  const slides = document.querySelectorAll('.slide');
  const width = slides[0].offsetWidth + 32; // margin含む
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentIndex)
  );
}

function moveTo(index) {
  currentIndex = (index + articles.length) % articles.length;
  updateSlider();
}

function moveNext() {
  moveTo(currentIndex + 1);
}

function movePrev() {
  moveTo(currentIndex - 1);
}

updateSlider();

// ドラッグ対応
track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
  isDragging = false;
});

track.addEventListener('mouseup', () => {
  isDragging = false;
});

track.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - startX;
  if (x > 50) {
    movePrev();
    isDragging = false;
  } else if (x < -50) {
    moveNext();
    isDragging = false;
  }
});

// タッチ対応
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;
  if (deltaX > 50) movePrev();
  else if (deltaX < -50) moveNext();
});
