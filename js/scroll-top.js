window.addEventListener('DOMContentLoaded', () => {
  // ユーザーが明示的にページ番号へ遷移した場合のみスクロール
  const path = window.location.pathname;
  const isPaged = /\/page\/\d+\/?$/.test(path);

  if (isPaged) {
    window.scrollTo({ top: 0, behavior: 'auto' }); // instant scroll
  }
});
