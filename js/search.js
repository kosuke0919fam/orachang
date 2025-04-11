document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("query");
  if (!keyword) return;

  fetch("/orachang/search.json")
    .then(res => res.json())
    .then(posts => {
      const results = posts.filter(post =>
        post.title.includes(keyword) || post.text.includes(keyword)
      );
      const container = document.getElementById("search-results");
      container.innerHTML = "";

      if (results.length === 0) {
        container.innerHTML = "<li>一致する記事が見つかりませんでした。</li>";
        return;
      }

      results.forEach(post => {
        const li = document.createElement("li");
        li.classList.add("article-card");
        li.innerHTML = `
          <a href="${post.url}">
            <div class="thumbnail"><img src="${post.thumbnail || '/orachang/images/default-thumb.jpg'}"></div>
            <div class="content">
              <span class="category">${post.categories?.[0] || ''}</span>
              <h2 class="title">${post.title}</h2>
              <p class="excerpt">${post.text.slice(0, 50)}...</p>
            </div>
          </a>
        `;
        container.appendChild(li);
      });
    });
});
