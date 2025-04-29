document.addEventListener("DOMContentLoaded", () => {
  // pagebreak.js の処理
  const content = document.querySelector('.post-content');
  if (content && content.innerHTML.includes('<!-- pagebreak -->')) {
    const segments = content.innerHTML.split('<!-- pagebreak -->');
    const container = document.createElement('div');
    const nav = document.createElement('nav');
    nav.className = 'pagebreak-nav';

    segments.forEach((segment, index) => {
      const page = document.createElement('div');
      page.className = 'pagebreak-segment';
      page.innerHTML = segment;
      if (index !== 0) page.style.display = 'none';
      container.appendChild(page);

      const link = document.createElement('button');
      link.textContent = index + 1;
      link.addEventListener('click', () => {
        container.querySelectorAll('.pagebreak-segment').forEach((el, i) => {
          el.style.display = (i === index) ? 'block' : 'none';
        });
      });
      nav.appendChild(link);
    });

    content.innerHTML = '';
    content.appendChild(container);
    content.appendChild(nav);
  }

  // search.js の処理（例: Hexo SearchDBベース）
  if (document.getElementById('search-input')) {
    const input = document.getElementById('search-input');
    const resultBox = document.getElementById('search-results');
    fetch('/search.json')
      .then(res => res.json())
      .then(data => {
        input.addEventListener('input', () => {
          const keyword = input.value.toLowerCase();
          const results = data.filter(post =>
            post.title.toLowerCase().includes(keyword) ||
            post.content.toLowerCase().includes(keyword)
          );
          resultBox.innerHTML = results.map(post => `
            <div class="search-hit">
              <a href="${post.url}">${post.title}</a>
            </div>`).join('');
        });
      });
  }
});
