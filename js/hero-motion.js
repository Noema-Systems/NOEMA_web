(() => {
  const hero = document.querySelector('.hero');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let visible = true;
  function update() {
    hero.classList.toggle('motion-enabled', !paused);
    hero.classList.toggle('motion-paused', paused || !visible || document.hidden);
  }
  reduced.addEventListener('change', () => { paused = reduced.matches; update(); });
  document.addEventListener('visibilitychange', update);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(hero);
  update();
})();
