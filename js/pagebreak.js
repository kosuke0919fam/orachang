document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.post-content');
  if (!content) return;

  const pages = content.innerHTML.split('<!-- pagebreak -->');
  if (pages.length <= 1) return;

  let currentPage = 0;

  function renderPage(pageIndex) {
    content.innerHTML = pages[pageIndex];
    updatePagination();
  }

  function updatePagination() {
    const pagination = document.createElement('div');
    pagination.className = 'pagebreak-pagination';

    for (let i = 0; i < pages.length; i++) {
      const link = document.createElement('button');
      link.textContent = i + 1;
      link.disabled = (i === currentPage);
      link.addEventListener('click', () => {
        currentPage = i;
        renderPage(currentPage);
      });
      pagination.appendChild(link);
    }

    const oldPagination = document.querySelector('.pagebreak-pagination');
    if (oldPagination) oldPagination.remove();

    content.parentNode.insertBefore(pagination, content.nextSibling);
  }

  renderPage(currentPage);
});
