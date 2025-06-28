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

    const contentHeight = textDiv.scrollHeight;

    // y座標のリスト
    let yList = [];
    for (let y = 0; y <= contentHeight + 2; y += lineHeight) {
      yList.push(Math.round(y));
    }

    // 1px以内の重複を排除
    yList = yList.filter((y, idx, arr) => idx === 0 || Math.abs(y - arr[idx - 1]) > 1);

    yList.forEach(y => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    });
  });
}



// 初回
window.addEventListener("load", drawNoteLines);
// リサイズ時も
window.addEventListener("resize", () => requestAnimationFrame(drawNoteLines));
