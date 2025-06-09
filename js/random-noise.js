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
      const val = Math.floor(Math.random() * 100); // グレー値
      data[i] = data[i + 1] = data[i + 2] = val;
      data[i + 3] = opacity * 255; // アルファ
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
