(function () {
  const container = document.getElementById('slider-container');
  const pagination = document.getElementById('pagination');

  if (!articles || articles.length === 0) return;

  // 3つ未満なら複製してループ対応
  while (articles.length < 5) {
    articles.push(...articles.slice(0, 5 - articles.length));
  }

  let currentIndex = 0;

  function createSlides() {
    container.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (i === currentIndex) slide.classList.add('active');

      const img = document.createElement('img');
      img.src = articles[i].cover;

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.textContent = `${articles[i].slug} - ${articles[i].title}`;

      slide.appendChild(img);
      slide.appendChild(overlay);
      container.appendChild(slide);
    }
  }

  function createDots() {
    pagination.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      pagination.appendChild(dot);
    }
  }

  function updateSlider() {
    const total = articles.length;
    const slides = container.querySelectorAll('.slide');

    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === currentIndex) {
        slide.classList.add('active');
      }
    });

    const dots = pagination.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    scrollToCenter();
  }

  function scrollToCenter() {
    const slides = container.querySelectorAll('.slide');
    if (!slides[currentIndex]) return;

    const active = slides[currentIndex];
    const offsetLeft = active.offsetLeft + active.offsetWidth / 2 - container.offsetWidth / 2;
    container.scrollTo({ left: offsetLeft, behavior: 'smooth' });
  }

  function handleSwipe() {
    let startX = 0;
    let isDragging = false;

    container.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.clientX;
    });

    container.addEventListener('mousemove', e => {
      if (!isDragging) return;
    });

    container.addEventListener('mouseup', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 50) {
        currentIndex += dx < 0 ? 1 : -1;
        currentIndex = (currentIndex + articles.length) % articles.length;
        updateSlider();
      }
      isDragging = false;
    });

    container.addEventListener('touchstart', e => {
      isDragging = true;
      startX = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', e => {
      if (!isDragging) return;
    });

    container.addEventListener('touchend', e => {
      if (!isDragging) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        currentIndex += dx < 0 ? 1 : -1;
        currentIndex = (currentIndex + articles.length) % articles.length;
        updateSlider();
      }
      isDragging = false;
    });
  }

  createSlides();
  createDots();
  scrollToCenter();
  handleSwipe();
})();
