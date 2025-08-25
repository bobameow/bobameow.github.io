(function() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    root.classList.add('dark');
  }
  button.addEventListener('click', function() {
    root.classList.toggle('dark');
    const theme = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
})();
