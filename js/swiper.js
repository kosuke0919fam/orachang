document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('slider-wrapper');
  const mainImg = document.getElementById('main-cover');
  const slug = document.getElementById('main-slug');
  const title = document.getElementById('main-title');
  const pagination = document.getElementById('pagination');

  // 記事数補完（最低5枚）
  const base = [...articles];
  while (articles.length < 5) articles.push(...base);

  const loopArticles = [...articles, ...articles, ...articles];
  const centerIndex = Math.floor(loopArticles.length / 3);

  function selectImage(index) {
    const item = loopArticles[index % articles.length];
    mainImg.src = item.cover;
    slug.textContent = item.slug;
    title.textContent = item.title;
    setActiveDot(index % articles.length);
  }

  function renderSlides() {
    wrapper.innerHTML = '';
    pagination.innerHTML = '';

    loopArticles.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${item.cover}" alt="${item.title}">`;
      slide.addEventListener('click', () => selectImage(i));
      wrapper.appendChild(slide);
    });

    for (let i = 0; i < articles.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'swiper-dot';
      pagination.appendChild(dot);
    }
  }

  function centerTo(index) {
    const slide = wrapper.children[index];
    if (slide) {
      const offset = slide.offsetLeft - wrapper.clientWidth / 2 + slide.clientWidth / 2;
      wrapper.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }

  function setActiveDot(index) {
    const dots = document.querySelectorAll('.swiper-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function getClosestSlideIndex() {
    const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    [...wrapper.children].forEach((slide, i) => {
      const mid = slide.offsetLeft + slide.clientWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  renderSlides();
  setTimeout(() => {
    centerTo(centerIndex);
    selectImage(centerIndex);
  }, 100);

  wrapper.addEventListener('scroll', () => {
    const current = getClosestSlideIndex();
    selectImage(current);
    // 無限スクロール擬似ジャンプ
    const total = wrapper.scrollWidth;
    const midpoint = total / 3;
    if (wrapper.scrollLeft < midpoint / 2 || wrapper.scrollLeft > midpoint * 1.5) {
      wrapper.scrollLeft = midpoint;
    }
  });
});
