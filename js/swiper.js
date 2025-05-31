document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('slider-wrapper');
  const mainImg = document.getElementById('main-cover');
  const slug = document.getElementById('main-slug');
  const title = document.getElementById('main-title');

  const baseArticles = [...articles];
  while (articles.length < 5) articles.push(...baseArticles);
  const loopArticles = [...articles, ...articles, ...articles];
  const centerIndex = Math.floor(loopArticles.length / 3);

  function selectImage(index) {
    const item = loopArticles[index % articles.length];
    mainImg.src = item.cover;
    slug.textContent = item.slug;
    title.textContent = item.title;
  }

  function renderSlides() {
    wrapper.innerHTML = '';
    loopArticles.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${item.cover}" alt="${item.title}">`;
      slide.addEventListener('click', () => selectImage(i % articles.length));
      wrapper.appendChild(slide);
    });
  }

  function centerTo(index) {
    const slide = wrapper.children[index];
    if (slide) {
      const offset = slide.offsetLeft - wrapper.clientWidth / 2 + slide.clientWidth / 2;
      wrapper.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }

  renderSlides();
  setTimeout(() => {
    centerTo(centerIndex);
    selectImage(centerIndex);
  }, 100);

  wrapper.addEventListener('scroll', () => {
    const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    [...wrapper.children].forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    selectImage(closest % articles.length);
  });
});
