'use strict';

hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.layout || data.layout !== 'post') return data;

  if (data.content.includes('<!-- pagebreak -->')) {
    const pages = data.content.split('<!-- pagebreak -->');
    data.content = pages.map((content, index) => {
      return `<div class="page" id="page-${index + 1}">${content.trim()}</div>`;
    }).join('');
    data.pagebreak = true;
  } else {
    data.pagebreak = false;
  }

  return data;
});
