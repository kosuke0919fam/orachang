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

window.addEventListener("load", () => {
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const text = noteBlock.querySelector(".note-text");

    if (!canvas || !text) return;

    const style = window.getComputedStyle(text);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop || 0);
    const paddingBottom = parseFloat(style.paddingBottom || 0);
    const totalHeight = text.offsetHeight;
    const lines = Math.floor((totalHeight - paddingTop - paddingBottom) / lineHeight);

    // canvasの幅と高さをtextに合わせる
    canvas.width = text.clientWidth;
    canvas.height = totalHeight;

    // canvasに線を描画
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#ccc"; // 線の色（カスタマイズ可）
    ctx.lineWidth = 1;

    for (let i = 0; i < lines; i++) {
      const y = paddingTop + lineHeight * (i + 1) - 0.5; // 0.5でアンチエイリアス補正
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // canvasをnote-textの背面へ
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "0";
    text.style.position = "relative";
    text.style.zIndex = "1";
  });
});

