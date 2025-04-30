document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.post-content');
  if (!content) return;

  const rawPages = content.innerHTML.split('<!-- pagebreak -->');
  if (rawPages.length <= 1) return;

  // ハッシュからページ番号を取得（例: #page=2）
  const getPageFromHash = () => {
    const match = window.location.hash.match(/page=(\d+)/);
    const pageNum = match ? parseInt(match[1], 10) : 1;
    return Math.min(Math.max(pageNum, 1), rawPages.length);
  };

  // 表示切替処理
  const renderPage = (page) => {
    content.innerHTML = rawPages[page - 1];
    const nav = document.createElement('nav');
    nav.className = 'page-nav';

    for (let i = 1; i <= rawPages.length; i++) {
      const btn = document.createElement('a');
      btn.textContent = i;
      btn.href = `#page=${i}`;
      btn.className = 'page-number' + (i === page ? ' current' : '');
      nav.appendChild(btn);
    }

    content.appendChild(nav);
  };

  // 初期描画＆ハッシュ変更対応
  const init = () => renderPage(getPageFromHash());
  window.addEventListener('hashchange', init);
  init();
});
