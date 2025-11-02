// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    if (targetId.length > 1){
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth'});
      navLinks.classList.remove('open');
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle){
  navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
}

// Contact form fake submit (no backend)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message){
      statusEl.textContent = '모든 필드를 입력해주세요.';
      statusEl.className = 'status err';
      return;
    }
    if (!isEmail(email)){
      statusEl.textContent = '이메일 형식이 올바르지 않습니다.';
      statusEl.className = 'status err';
      return;
    }

    statusEl.textContent = '🎉 감사합니다! 메시지를 잘 받았습니다.';
    statusEl.className = 'status ok';
    form.reset();
    setTimeout(()=> statusEl.textContent = '', 4000);
  });
}
