document.addEventListener("DOMContentLoaded", () => {
  const SIZE = 128;
  const OPACITY = 0.5;

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if ((x + y) % 2 === 0) continue; // 間引きで高速化
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
