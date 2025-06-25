const container = require('markdown-it-container');

hexo.extend.filter.register('markdown-it:renderer', function (md) {
  md.use(container, 'note', {
    render: (tokens, idx) =>
      tokens[idx].nesting === 1
        ? `<div class="note-block"><canvas class="note-canvas"></canvas><div class="note-text">\n`
        : `</div></div>\n`
  });

  md.use(container, 'thread', {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="thread-block">\n' : '</div>\n'
  });

  md.use(container, 'twitter', {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="twitter-post">\n' : '</div>\n'
  });

  md.use(container, 'dm', {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="dm-bubble dm-twitter">\n' : '</div>\n'
  });

  md.use(container, 'minutes', {
    render: (tokens, idx) => tokens[idx].nesting === 1
      ? '<table class="minutes-table"><tbody>\n'
      : '</tbody></table>\n'
  });

  md.use(container, 'section', {
  render: (tokens, idx) =>
    tokens[idx].nesting === 1 ? '<section>\n' : '</section>\n'
  });
});

hexo.extend.filter.register('markdown-it:renderer', function (md) {
  // ...既存コンテナ定義...

  const defaultImageRender = md.renderer.rules.image;
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex('src')][1];
    const alt = token.content;

    return `<figure class="image-frame">
  <img src="${src}" alt="${alt}">
  <figcaption>${alt}</figcaption>
</figure>`;
  };
});
