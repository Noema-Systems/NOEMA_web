/* DATASET SIZE CALCULATOR — log scale 10 GB to 100 TB */
(function(){
  const slider = document.getElementById('dataset-slider');
  if(!slider) return;

  const MIN_GB = 10;
  const MAX_GB = 100 * 1024;

  const LOW_RATIO = 2.3;
  const HIGH_RATIO = 8.6;

  function sliderToGB(val) {
    const logMin = Math.log10(MIN_GB);
    const logMax = Math.log10(MAX_GB);
    return Math.pow(10, logMin + (val / 100) * (logMax - logMin));
  }

  function formatSize(gb) {
    if (gb >= 1024) {
      const tb = gb / 1024;
      return tb >= 10 ? tb.toFixed(0) + ' TB' : tb.toFixed(1) + ' TB';
    }
    return gb >= 10 ? gb.toFixed(0) + ' GB' : gb.toFixed(1) + ' GB';
  }

  function update() {
    const gb = sliderToGB(parseFloat(slider.value));

    const compressedHigh = gb / LOW_RATIO;   // larger compressed output
    const compressedLow  = gb / HIGH_RATIO;  // smaller compressed output

    const savedLowPct  = ((1 - 1 / LOW_RATIO) * 100).toFixed(0);
    const savedHighPct = ((1 - 1 / HIGH_RATIO) * 100).toFixed(0);

    const srcFmt = formatSize(gb);
    const cmpFmt = `${formatSize(compressedHigh)}-${formatSize(compressedLow)}`;

    document.getElementById('pipe-source').textContent = srcFmt;
    document.getElementById('pipe-intake').textContent = srcFmt;
    document.getElementById('pipe-compressed').textContent = cmpFmt;
    document.getElementById('pipe-saved').textContent = `${savedLowPct}-${savedHighPct}% saved`;
    document.getElementById('pipe-reconstruct').textContent = srcFmt;
    document.getElementById('dataset-display').textContent = srcFmt;
  }

  slider.addEventListener('input', update);
  update();
})();

/* SCROLL REVEAL */
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 60);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* FORM */
const form = document.getElementById('accessForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    try {
      const response = await fetch('https://formspree.io/f/myklvjqy', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      } else {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        alert('Something went wrong. Please email info@noemasystems.com directly.');
      }
    } catch (error) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      alert('Network error. Please email info@noemasystems.com directly.');
    }
  });
}
