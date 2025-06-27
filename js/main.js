console.log("📏 canvas init");

window.addEventListener("load", () => {
  document.querySelectorAll(".note-block").forEach(noteBlock => {
    const canvas = noteBlock.querySelector(".note-canvas");
    const text = noteBlock.querySelector(".note-text");

    if (!canvas || !text) {
      console.warn("canvas or text element not found");
      return;
    }

    // canvas サイズを noteBlock に合わせる
    const totalHeight = text.offsetHeight;
    canvas.width = noteBlock.clientWidth;
    canvas.height = totalHeight;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#c8b798";
    ctx.lineWidth = 1;

    // 基準矩形（top位置の補正用）
    const baseRect = text.getBoundingClientRect();
    const rects = text.getClientRects();

    for (const rect of rects) {
      const topY = rect.top - baseRect.top + 0.5;
      const bottomY = rect.bottom - baseRect.top + 0.5;

      // 各行の上端に線を引く
      ctx.beginPath();
      ctx.moveTo(0, topY);
      ctx.lineTo(canvas.width, topY);
      ctx.stroke();

      // 各行の下端にも線を引く（必要な場合）
      ctx.beginPath();
      ctx.moveTo(0, bottomY);
      ctx.lineTo(canvas.width, bottomY);
      ctx.stroke();
    }
  });
});
