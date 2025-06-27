const container = require('markdown-it-container');

hexo.extend.filter.register('markdown-it:renderer', function (md) {
  md.use(container, 'note', {
    render(tokens, idx) {
      const token = tokens[idx];
      return token.nesting === 1 ? '<div class="note-block">' : '</div>';
    }
  });

  md.use(container, 'thread', {
    render(tokens, idx) {
      return tokens[idx].nesting === 1 ? '<div class="thread-block">' : '</div>';
    }
  });

  // :::twitter
  md.use(container, 'twitter', {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="twitter-post">\n' : '</div>\n'
  });

  // :::dm
  md.use(container, 'dm', {
    render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="dm-bubble dm-twitter">\n' : '</div>\n'
  });

  // :::minutes
  md.use(container, 'minutes', {
    render: (tokens, idx) =>
      tokens[idx].nesting === 1
        ? '<table class="minutes-table"><tbody>\n'
        : '</tbody></table>\n'
  });

  // :::section
  md.use(container, 'section', {
    render: (tokens, idx) =>
      tokens[idx].nesting === 1 ? '<section>\n' : '</section>\n'
  });

  // 画像→<figure><figcaption>変換
  const defaultImageRender = md.renderer.rules.image;
  md.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex('src')][1];
    const alt = token.content;
    return `<figure class="image-frame">
  <img src="${src}" alt="${alt}">
  <figcaption>${alt}</figcaption>
</figure>`;
  };
});

console.log("📏 canvas init");
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".note-block").forEach(noteBlock => {
      const canvas = noteBlock.querySelector(".note-canvas");
      const textDiv = noteBlock.querySelector(".note-text");
      if (!canvas || !textDiv) return;

      canvas.width = noteBlock.offsetWidth;
      canvas.height = noteBlock.offsetHeight;

      // padding取得
      const style = getComputedStyle(noteBlock);
      const paddingTop = parseFloat(style.paddingTop) || 0;
      const paddingLeft = parseFloat(style.paddingLeft) || 0;

      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#c8b798";
      ctx.lineWidth = 1;

      // debug
      console.log('canvas:', canvas.width, canvas.height, 'padding:', paddingTop, paddingLeft);

      const paragraphs = textDiv.querySelectorAll('p');
      const blockRect = noteBlock.getBoundingClientRect();

      paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        // note-block基準にpaddingを加算
        const topY = rect.top - blockRect.top + 0.5 + paddingTop;
        const bottomY = rect.bottom - blockRect.top + 0.5 + paddingTop;

        ctx.beginPath();
        ctx.moveTo(0, topY);
        ctx.lineTo(canvas.width, topY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, bottomY);
        ctx.lineTo(canvas.width, bottomY);
        ctx.stroke();
      });
    });
  }, 150);
});
