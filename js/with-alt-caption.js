document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.with-alt-caption').forEach(img => {
    if (!img.alt) return;

    const caption = document.createElement('div');
    caption.textContent = img.alt;
    caption.style.fontSize = '0.85rem';
    caption.style.color = '#666';
    caption.style.marginTop = '0.25rem';
    caption.style.fontFamily = '"Helvetica Neue", Arial, sans-serif';
    caption.style.textAlign = 'center';

    img.insertAdjacentElement('afterend', caption);
  });
});
