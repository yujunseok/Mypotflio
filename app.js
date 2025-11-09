// ==============================
// Smooth scroll for in-page links
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    if (targetId.length > 1){
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth'});
      
      // 앵커 클릭 시 사이드바가 열려 있으면 닫기
      const pageBody = document.getElementById('pageBody');
      const sidebarToggle = document.getElementById('sidebarToggle');
      if (pageBody && sidebarToggle && !pageBody.classList.contains('sidebar-closed')) {
        pageBody.classList.add('sidebar-closed'); 
        sidebarToggle.textContent = '▶';
        sidebarToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ==============================
// 사이드바 토글
// ==============================
const sidebarToggle = document.getElementById('sidebarToggle');
const pageBody = document.getElementById('pageBody'); // <body id="pageBody">

if (sidebarToggle && pageBody) {
  pageBody.classList.remove('sidebar-closed'); 
  sidebarToggle.textContent = '◀'; // 초기 아이콘

  sidebarToggle.addEventListener('click', () => {
    pageBody.classList.toggle('sidebar-closed');
    const isClosed = pageBody.classList.contains('sidebar-closed');
    sidebarToggle.setAttribute('aria-expanded', String(!isClosed));
    sidebarToggle.textContent = isClosed ? '▶' : '◀';
  });
}

// ==============================
// Contact form (도메인 선택 + 모달 경고)
// ==============================
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

const emailInput = document.getElementById('email');
const emailDomainSel = document.getElementById('emailDomain');

// 모달 요소
const modal = document.getElementById('modal');
const modalMsg = document.getElementById('modalMsg');
const modalOk  = document.getElementById('modalOk');

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function showModal(msg){
  if (!modal) return;
  if (modalMsg) modalMsg.textContent = msg || '안내';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(){
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
if (modalOk){
  modalOk.addEventListener('click', closeModal);
}

// ---- 이메일 도메인 선택 시 @뒤 자동 완성 ----
if (emailInput && emailDomainSel){
  emailDomainSel.addEventListener('change', () => {
    const sel = emailDomainSel.value;
    const raw = (emailInput.value || '').trim();
    const local = raw.split('@')[0] || raw; // '@' 앞부분

    if (!sel) return;                 // "도메인 선택"이면 아무것도 안 함
    if (sel === '_custom'){           // 직접 입력 모드
      emailInput.value = local ? `${local}@` : '@';
      emailInput.focus();
      return;
    }
    // 도메인 선택 → 자동 완성
    emailInput.value = local ? `${local}@${sel}` : `@${sel}`;
    emailInput.focus();
  });
}

// ---- 폼 제출 ----
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = (document.getElementById('name')?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    // 하나라도 비어있으면: 전체 초기화 + 모달
    if (!name || !email || !message){
      form.reset();
      if (emailDomainSel) emailDomainSel.value = ''; // 도메인 셀렉트도 초기화
      showModal('모든 항목을 입력해주세요.');
      statusEl.textContent = '';
      statusEl.className = 'status';
      return;
    }

    // 이메일 형식 검증 실패: 전체 초기화 + 모달
    if (!isEmail(email)){
      form.reset();
      if (emailDomainSel) emailDomainSel.value = '';
      showModal('이메일을 제대로 입력해주세요.');
      statusEl.textContent = '';
      statusEl.className = 'status';
      return;
    }

    // 정상 제출(가짜)
    statusEl.textContent = '🎉 감사합니다! 메시지를 잘 받았습니다.';
    statusEl.className = 'status ok';
    form.reset();
    if (emailDomainSel) emailDomainSel.value = '';
    setTimeout(()=> statusEl.textContent = '', 4000);
  });
}

