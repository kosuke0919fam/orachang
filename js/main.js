console.log("📏 canvas init");

window.addEventListener("load", () => {
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const text = noteBlock.querySelector(".note-text");

    if (!canvas || !text) {
      console.warn("canvas or text element not found");
      return;
    }

    // canvasサイズを noteBlock に合わせる
    const totalHeight = text.offsetHeight;
    canvas.width = noteBlock.clientWidth;
    canvas.height = totalHeight;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#c8b798"; // 線の色
    ctx.lineWidth = 1;

    const baseTop = text.getBoundingClientRect().top;
    const rects = text.getClientRects();

    for (const rect of rects) {
      const bottomY = rect.bottom - baseTop + 0.5; // 行の下端にオフセット調整
      ctx.beginPath();
      ctx.moveTo(0, bottomY);
      ctx.lineTo(canvas.width, bottomY);
      ctx.stroke();
    }
  });
});
