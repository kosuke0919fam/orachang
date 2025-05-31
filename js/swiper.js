document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('slider-wrapper');
  const mainImg = document.getElementById('main-cover');
  const slug = document.getElementById('main-slug');
  const title = document.getElementById('main-title');
  const pagination = document.getElementById('pagination');

  let currentIndex = 0;

  function renderSlides() {
    wrapper.innerHTML = '';
    pagination.innerHTML = '';

    articles.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${item.cover}" alt="${item.title}">`;
      slide.addEventListener('click', () => selectImage(i));
      wrapper.appendChild(slide);

      const dot = document.createElement('span');
      dot.className = 'swiper-dot' + (i === currentIndex ? ' active' : '');
      pagination.appendChild(dot);
    });
  }

  function selectImage(index) {
    currentIndex = index;
    const article = articles[currentIndex];
    mainImg.src = article.cover;
    slug.textContent = article.slug;
    title.textContent = article.title;
    renderSlides();
  }

  function next() {
    currentIndex = (currentIndex + 1) % articles.length;
    selectImage(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    selectImage(currentIndex);
  }

  document.getElementById('next-button').addEventListener('click', next);
  document.getElementById('prev-button').addEventListener('click', prev);

  let startX = 0;
  wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  wrapper.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    if (delta > 50) prev();
    else if (delta < -50) next();
  });

  // 初期表示（最新記事）
  if (articles.length > 0) {
    selectImage(0);
  }
});
