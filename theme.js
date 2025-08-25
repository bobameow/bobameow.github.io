(function() {
  const body = document.body;
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    body.classList.add('dark');
  }
  button.addEventListener('click', function() {
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
})();
