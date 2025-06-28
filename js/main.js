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
    ctx.lineWidth = 2;

    const style = getComputedStyle(textDiv);
    const lineHeight = parseFloat(style.lineHeight);

    // 行数を算出
    const contentHeight = textDiv.scrollHeight;
    const lines = Math.round(contentHeight / lineHeight);

    // 1行目の上端だけ特別に線
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    // 2行目以降は「行の下端」にだけ線
    for (let i = 1; i <= lines; i++) {
      const y = Math.round(i * lineHeight);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  });
}


// 初回
window.addEventListener("load", drawNoteLines);
// リサイズ時も
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
