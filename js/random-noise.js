requestAnimationFrame(() => {
  const SIZE = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  // ⚪ 軽量グレー系ノイズ生成
  const OPACITY = 0.25;
  const imageData = ctx.createImageData(SIZE, SIZE);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const val = Math.floor(Math.random() * 100);
    data[i] = val;     // R
    data[i + 1] = val; // G
    data[i + 2] = val; // B
    data[i + 3] = OPACITY * 255; // A
  }
  ctx.putImageData(imageData, 0, 0);

  const url = canvas.toDataURL("image/webp");
  document.body.style.setProperty("background-image", `url(${url})`, "important");
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = `${SIZE}px ${SIZE}px`;
});
