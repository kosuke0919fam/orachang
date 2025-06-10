requestAnimationFrame(() => {
  const SIZE = 128;         // ノイズ画像の1タイルサイズ
  const OPACITY = 0.25;     // ノイズの不透明度

  // ノイズ画像生成
  function generateNoiseUrl(size, opacity) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
    const r = Math.floor(Math.random() * 100 + 100);  // R: 100〜199
    const g = Math.floor(Math.random() * 80 + 80);    // G: 80〜159
    const b = Math.floor(Math.random() * 50 + 30);    // B: 30〜79

    data[i]     = r;     // Red
    data[i + 1] = g;     // Green
    data[i + 2] = b;     // Blue
    data[i + 3] = 100;    // Alpha (透明度)
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/webp");
  }

  // スタイルにノイズを注入
  const noiseUrl = generateNoiseUrl(SIZE, OPACITY);
  const style = document.createElement("style");
  style.textContent = `
    body::before,
    body::after {
      background-image: url(${noiseUrl});
    }
  `;
  document.head.appendChild(style);
});
