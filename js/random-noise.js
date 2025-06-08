requestAnimationFrame(() => {
  const SIZE = 128;
  const OPACITY = 0.25;

  // ノイズ画像を生成する関数
  function generateNoiseUrl(size, opacity) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 100);
      data[i] = data[i + 1] = data[i + 2] = val; // グレー値
      data[i + 3] = opacity * 255; // アルファ
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/webp");
  }

  // 背景スタイルを適用する関数
  function applyNoiseBackground(element, url, size) {
    element.style.backgroundImage = `url(${url})`;
    element.style.backgroundRepeat = "repeat";
    element.style.backgroundSize = `${size}px ${size}px`;
  }

  const noiseUrl = generateNoiseUrl(SIZE, OPACITY);

  // body に適用
  applyNoiseBackground(document.body, noiseUrl, SIZE);

  // すべての .container に適用
  document.querySelectorAll('.container').forEach(container => {
    applyNoiseBackground(container, noiseUrl, SIZE);
  });
});
