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
    const fontSize = parseFloat(style.fontSize);

    // Uタグの下線風に「各行のベースライン＋数px下」で線を引く
    // だいたい「y = (lineHeight - fontSize) / 2 + fontSize * 1.05」あたりが“下線”になる
    const underlineOffset = (lineHeight - fontSize) / 2 + fontSize * 1;

    for (let y = 0; y < canvas.height; y += lineHeight) {
      const yDraw = y + underlineOffset;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.05, yDraw);
      ctx.lineTo(canvas.width * 0.95, yDraw);
      ctx.stroke();
    }
  });
}

window.addEventListener("load", drawNoteLines);
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
window.addEventListener("orientationchange", drawNoteLines);
setInterval(drawNoteLines, 1000);
