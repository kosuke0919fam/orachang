// main.js : ノート罫線などの描画処理を統合
function drawNoteLines() {
  document.querySelectorAll('.note-block').forEach(block => {
    const canvas = block.querySelector('canvas.note-canvas');
    const text = block.querySelector('.note-text');
    if (!canvas || !text) return;

    const style = getComputedStyle(text);
    const lineHeight = parseFloat(style.lineHeight);
    const width = text.clientWidth;
    const height = text.scrollHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    const lines = Math.ceil(height / lineHeight);
    for (let i = 1; i <= lines; i++) {
      const y = i * lineHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  drawNoteLines();
  window.addEventListener('resize', () => {
    clearTimeout(window._noteResizeTimer);
    window._noteResizeTimer = setTimeout(drawNoteLines, 200);
  });
});
