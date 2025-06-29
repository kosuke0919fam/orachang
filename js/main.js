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

    // 1行ごとに「下線を“文字の下＋余白”」で引く
    // たとえばfontSizeの90%位置 or lineHeightの90%位置など
    for (let y = lineHeight * 0.75; y <= canvas.height; y += lineHeight + 0.5) {
      const yDraw = y + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, yDraw);
      ctx.lineTo(canvas.width, yDraw);
      ctx.stroke();
    }
  });
}


window.addEventListener("load", drawNoteLines);
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
window.addEventListener("orientationchange", drawNoteLines);


// ←この下でOK
setInterval(drawNoteLines, 1000);
