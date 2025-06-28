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

    const style = getComputedStyle(textDiv);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    const contentHeight = textDiv.scrollHeight - paddingTop - paddingBottom;

    // 線を引く横幅（canvasの90%）
    const margin = canvas.width * 0.05; // 左右5%ずつ
    const startX = margin;
    const endX = canvas.width - margin;

    for (
      let y = 0;
      y <= contentHeight + 1;
      y += lineHeight
    ) {
      const yDraw = Math.round(y + paddingTop) + 0.5;
      ctx.beginPath();
      ctx.moveTo(startX, yDraw);
      ctx.lineTo(endX, yDraw);
      ctx.stroke();
    }
  });
}

window.addEventListener("load", drawNoteLines);
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
