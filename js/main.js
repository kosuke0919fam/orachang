function drawNoteLines() {
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const textDiv = noteBlock.querySelector(".note-text");
    if (!canvas || !textDiv) return;

    canvas.width = noteBlock.offsetWidth;
    canvas.height = noteBlock.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([1, 5]);

    textDiv.querySelectorAll("p").forEach(p => {
      const text = p.textContent;
      if (!text) return;

      const parentRect = textDiv.getBoundingClientRect();

      let lastY = null;
      let lastLineBottom = null;
      let isFirstLine = true;

      for (let i = 0; i < text.length; i++) {
        const range = document.createRange();
        range.setStart(p.firstChild, i);
        range.setEnd(p.firstChild, i + 1);
        const rects = range.getClientRects();
        if (!rects.length) continue;
        const y = Math.round(rects[0].bottom - parentRect.top);

        if (y !== lastY) {
          // ★最初の行だけ線を引かない
          if (!isFirstLine && lastLineBottom !== null) {
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.05, lastLineBottom);
            ctx.lineTo(canvas.width * 0.95, lastLineBottom);
            ctx.stroke();
          }
          isFirstLine = false;
          lastY = y;
        }
        lastLineBottom = y;
        range.detach();
      }
      // ★必ず最終行は線を描く
      if (lastLineBottom !== null) {
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.05, lastLineBottom);
        ctx.lineTo(canvas.width * 0.95, lastLineBottom);
        ctx.stroke();
      }
    });

    ctx.setLineDash([]);
  });
}

window.addEventListener("load", drawNoteLines);
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
window.addEventListener("orientationchange", drawNoteLines);
setInterval(drawNoteLines, 500);
