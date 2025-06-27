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
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const textDiv = noteBlock.querySelector(".note-text");

    if (!canvas || !textDiv) return;

    // canvasサイズを.note-blockのサイズに合わせる
    canvas.width = noteBlock.clientWidth;
    canvas.height = noteBlock.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#c8b798"; // 薄いブラウン
    ctx.lineWidth = 1;

    // 各<p>の上下に線を引く
    const paragraphs = textDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      const rect = p.getBoundingClientRect();
      const containerRect = textDiv.getBoundingClientRect();

      // pの相対位置
      const topY = rect.top - containerRect.top + 0.5;
      const bottomY = rect.bottom - containerRect.top + 0.5;

      // 上線
      ctx.beginPath();
      ctx.moveTo(0, topY);
      ctx.lineTo(canvas.width, topY);
      ctx.stroke();

      // 下線
      ctx.beginPath();
      ctx.moveTo(0, bottomY);
      ctx.lineTo(canvas.width, bottomY);
      ctx.stroke();
    });
  });
});
