document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('slider-wrapper');
  const mainImg = document.getElementById('main-cover');
  const slug = document.getElementById('main-slug');
  const title = document.getElementById('main-title');
  const pagination = document.getElementById('pagination');

  let currentIndex = 0;
  let slideWidth = 120; // スライド1枚分の横幅（100px + 余白）

  function selectImage(index) {
    currentIndex = index;
    const article = articles[currentIndex];
    mainImg.src = article.cover;
    slug.textContent = article.slug;
    title.textContent = article.title;
    renderSlides();
  }

  function renderSlides() {
    wrapper.innerHTML = '';
    pagination.innerHTML = '';

    const sliderItems = [];
    const originalCount = articles.length;
    const needed = Math.max(5, originalCount);

    for (let i = 0; i < needed; i++) {
      sliderItems.push(articles[i % originalCount]);
    }

    sliderItems.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${item.cover}" alt="${item.title}">`;
      slide.addEventListener('click', () => selectImage(i % originalCount));
      wrapper.appendChild(slide);

      if (i < originalCount) {
        const dot = document.createElement('span');
        dot.className = 'swiper-dot' + (i === currentIndex ? ' active' : '');
        pagination.appendChild(dot);
      }
    });
  }

  function next() {
    currentIndex = (currentIndex + 1) % articles.length;
    wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
    selectImage(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    wrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    selectImage(currentIndex);
  }

  document.getElementById('next-button').addEventListener('click', next);
  document.getElementById('prev-button').addEventListener('click', prev);

  // スワイプ操作で横スクロール
  let startX = 0;
  wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  wrapper.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    if (delta > 50) {
      prev();
    } else if (delta < -50) {
      next();
    }
  });

  if (articles.length > 0) {
    selectImage(0);
  }
});
