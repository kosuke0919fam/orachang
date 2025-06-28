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

    // 1. lineHeight間隔で線
    for (let y = 0; y <= canvas.height; y += lineHeight) {
      const yDraw = Math.round(y) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, yDraw);
      ctx.lineTo(canvas.width, yDraw);
      ctx.stroke();
    }
    // 2. 必ずcanvas.heightにも線（すでに引いていなければ）
    if ((canvas.height % lineHeight) !== 0) {
      const yDraw = canvas.height + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, yDraw);
      ctx.lineTo(canvas.width, yDraw);
      ctx.stroke();
    }
  });
}


// 初回
window.addEventListener("load", drawNoteLines);
// リサイズ時も
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
