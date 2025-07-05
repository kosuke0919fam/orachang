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
          if (!isFirstLine && lastLineBottom !== null) {
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.025, lastLineBottom);
            ctx.lineTo(canvas.width * 0.975, lastLineBottom);
            ctx.stroke();
          }
          isFirstLine = false;
          lastY = y;
        }
        lastLineBottom = y;
        range.detach();
      }

      if (lastLineBottom !== null) {
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.025, lastLineBottom);
        ctx.lineTo(canvas.width * 0.975, lastLineBottom);
        ctx.stroke();
      }
    });

    ctx.setLineDash([]);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("article");
  if (!container) return;

  let section = null;
  let node = container.firstElementChild;

  while (node) {
    const next = node.nextElementSibling;

    // セクションが開かれていなければ、h3をトリガーに開く
    if (!section && node.tagName === "H3") {
      section = document.createElement("section");
      section.classList.add("note-section");
      container.insertBefore(section, node);
    }

    if (section) {
      // "//" なら閉じる
      if (
        node.tagName === "P" &&
        node.textContent.trim().toLowerCase() === "//"
      ) {
        container.removeChild(node);
        section = null;
      } else {
        section.appendChild(node);
      }
    }

    node = next;
  }

  drawNoteLines();
});



// イベントで再描画
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
window.addEventListener("orientationchange", drawNoteLines);
setInterval(drawNoteLines, 500);
