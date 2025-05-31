document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("slider-track");
  const slides = Array.from(track.children);
  let current = 0;

  const update = () => {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[current].classList.add("active");

    const slideWidth = slides[current].offsetWidth + 40;
    const offset = (track.offsetWidth / 2) - (slideWidth / 2) - (slideWidth * current);
    track.style.transform = `translateX(${offset}px)`;
  };

  const prev = () => {
    current = (current - 1 + slides.length) % slides.length;
    update();
  };

  const next = () => {
    current = (current + 1) % slides.length;
    update();
  };

  document.querySelector(".nav.prev").addEventListener("click", prev);
  document.querySelector(".nav.next").addEventListener("click", next);

  // Pointer Events: ドラッグ or スワイプに追従
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    deltaX = e.clientX - startX;
    track.style.transform = `translateX(calc(-${current * 100}% + ${deltaX}px))`;
  });

  track.addEventListener("pointerup", () => {
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? prev() : next();
    }
    track.style.transition = "transform 0.3s ease";
    update();
    isDragging = false;
    deltaX = 0;
  });

  track.addEventListener("pointerleave", () => {
    if (isDragging) {
      track.style.transition = "transform 0.3s ease";
      update();
      isDragging = false;
      deltaX = 0;
    }
  });

  update();
});
