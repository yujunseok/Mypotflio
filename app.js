// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    if (targetId.length > 1){
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth'});
      // navLinks.classList.remove('open'); // 기존 모바일 토글 관련 코드 제거
      
      // 사이드바가 열려 있을 때 앵커 클릭 시 닫히게 하려면 아래 코드 추가 가능:
      // const pageBody = document.getElementById('pageBody');
      // if (pageBody.classList.contains('sidebar-closed') === false) {
      //    pageBody.classList.add('sidebar-closed'); 
      // }
    }
  });
});

// === 새로운 사이드바 토글 기능 ===
const sidebarToggle = document.getElementById('sidebarToggle');
const pageBody = document.getElementById('pageBody'); // body 태그 ID

if (sidebarToggle && pageBody) {
  // 초기 상태 설정
  pageBody.classList.remove('sidebar-closed'); // 처음에는 열린 상태로 시작

  sidebarToggle.addEventListener('click', () => {
    // body 태그에 'sidebar-closed' 클래스를 토글합니다.
    pageBody.classList.toggle('sidebar-closed');

    // ARIA 속성 및 아이콘 업데이트
    const isClosed = pageBody.classList.contains('sidebar-closed');
    sidebarToggle.setAttribute('aria-expanded', !isClosed);
    sidebarToggle.textContent = isClosed ? '▶' : '◀'; // 닫혔으면 > , 열렸으면 <
  });
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
