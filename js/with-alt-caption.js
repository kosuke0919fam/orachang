<script>
  document.querySelectorAll('.with-alt-caption').forEach(img => {
    const caption = document.createElement('div');
    caption.textContent = img.alt;
    caption.style.fontSize = '0.85rem';
    caption.style.color = '#666';
    caption.style.marginTop = '0.25rem';
    caption.style.fontFamily = '"Helvetica Neue", Arial, sans-serif';
    img.insertAdjacentElement('afterend', caption);
  });
</script>
