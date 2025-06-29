function drawNoteLines() {
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const textDiv = noteBlock.querySelector(".note-text");
    if (!canvas || !textDiv) return;

    canvas.width = noteBlock.offsetWidth;
    canvas.height = noteBlock.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#c8b798";
    ctx.lineWidth = 1;

    textDiv.querySelectorAll("p").forEach(p => {
      const text = p.textContent;
      if (!text) return;

      const parentRect = textDiv.getBoundingClientRect();

      let lastY = null;
      let lastLineBottom = null;

      // 1文字ずつrangeを取って行末を特定
      for (let i = 0; i < text.length; i++) {
        const range = document.createRange();
        range.setStart(p.firstChild, i);
        range.setEnd(p.firstChild, i + 1);
        const rects = range.getClientRects();
        if (!rects.length) continue;
        const y = Math.round(rects[0].bottom - parentRect.top);

        // 行が変わったときだけ下線
        if (y !== lastY) {
          if (lastLineBottom !== null) {
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.05, lastLineBottom);
            ctx.lineTo(canvas.width * 0.95, lastLineBottom);
            ctx.stroke();
          }
          lastY = y;
        }
        lastLineBottom = y;
        range.detach();
      }
      // 最終行
      if (lastLineBottom !== null) {
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.05, lastLineBottom);
        ctx.lineTo(canvas.width * 0.95, lastLineBottom);
        ctx.stroke();
      }
    });
  });
}

window.addEventListener("load", drawNoteLines);
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
window.addEventListener("orientationchange", drawNoteLines);
setInterval(drawNoteLines, 800); // 念のため定期実行
