// source/js/scroll-top.js
window.addEventListener('load', () => {
  if (window.location.href.match(/page\/\d+/) || window.location.hash.includes('#page')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});



document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash.includes('#page')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});