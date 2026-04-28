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
      const response = await fetch(form.action, {
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