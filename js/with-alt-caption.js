document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.with-alt-caption').forEach(img => {
    if (!img.alt) return;

    const caption = document.createElement('div');
    caption.textContent = img.alt;
    caption.classList.add('image-caption'); // ← クラスを付与するだけ

    img.insertAdjacentElement('afterend', caption);
  });
});
