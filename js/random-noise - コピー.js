document.addEventListener("DOMContentLoaded", () => {
  const pageType = document.body.dataset.pageType || "unknown";

  // 分岐ポイント（今は何もしない）
  switch (pageType) {
    case "index":
      // 将来の処理分岐（今はスルー）
      break;
    case "post":
      // 将来の処理分岐（今はスルー）
      break;
    default:
      // fallback（未指定）
      break;
  }

  const SIZE = 128;
  const OPACITY = 0.2;

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const val = Math.floor(Math.random() * 100);
      ctx.fillStyle = `rgba(${val}, ${val}, ${val}, ${OPACITY})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const url = canvas.toDataURL();
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = `${SIZE}px ${SIZE}px`;
});
