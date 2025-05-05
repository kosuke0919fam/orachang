if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (location.href.includes('#page')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
