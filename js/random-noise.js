document.addEventListener("DOMContentLoaded", () => {
  const pageType = document.body.dataset.pageType || "unknown";
  const SIZE = 128;

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  // index: グレー系ノイズ / post: 茶系ムラノイズ
  if (pageType === "post") {
    generateAgedPaperNoise(ctx, SIZE);
  } else {
    generateGrayNoise(ctx, SIZE);
  }

  const url = canvas.toDataURL();
  Object.assign(document.body.style, {
    backgroundImage: `url(${url})`,
    backgroundRepeat: "repeat",
    backgroundSize: `${SIZE}px ${SIZE}px`,
  });
});

// グレー系ノイズ（index向け）
function generateGrayNoise(ctx, size) {
  const OPACITY = 0.2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const val = Math.floor(Math.random() * 100);
      ctx.fillStyle = `rgba(${val}, ${val}, ${val}, ${OPACITY})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// 古紙風ノイズ（post向け）
function generateAgedPaperNoise(ctx, size) {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const noise = Math.floor(Math.random() * 80);
      const alpha = 0.1 + Math.random() * 0.15; // 透明度に揺らぎ
      const r = 110 + noise * 0.6; // 焦げ茶〜黄土色系
      const g = 85 + noise * 0.4;
      const b = 60 + noise * 0.2;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
