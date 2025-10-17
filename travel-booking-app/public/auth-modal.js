(() => {
  const modal = document.getElementById('authModal');
  const openers = document.querySelectorAll('.auth-open');
  const closeEls = modal?.querySelectorAll('[data-close-modal]') || [];
  const tabs = modal?.querySelectorAll('.auth-tab');
  const underline = modal?.querySelector('.auth-underline');
  const switcher = modal?.querySelector('.auth-switcher');
  const loginForm = modal?.querySelector('#loginFormModal');
  const registerForm = modal?.querySelector('#registerFormModal');
  const ripple = modal?.querySelector('.switch-ripple');
  let closing = false;

  // Use same API helper style as app.js but minimal here
  const API_BASE = '/api';
  let token = localStorage.getItem('token') || null;
  function setToken(t){ token = t; localStorage.setItem('token', t||''); }
  function getHeaders(){ const h = {'Content-Type':'application/json'}; if(token){ h['Authorization']='Bearer '+token; } return h; }
  async function api(path, method='GET', body){
    const res = await fetch(API_BASE+path, { method, headers: getHeaders(), body: body?JSON.stringify(body):undefined });
    const json = await res.json().catch(()=>null);
    if(!res.ok){ throw new Error(json?.error?.message || json?.message || ('Error '+res.status)); }
    return json?.data ?? json;
  }

  function open(){ if(!modal) return; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; focusFirst(); positionUnderline(); closing=false; }
  function close(){ if(!modal) return; if(closing) return; closing=true; modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; setTimeout(()=> closing=false, 200); }
  function toggle(tab){
    if(!switcher) return;
    // Animate container height to next panel height to avoid clipping/stutter
    const container = modal?.querySelector('.auth-content');
    const nextPanel = modal?.querySelector(tab==='login' ? '.auth-slide-login .auth-form' : '.auth-slide-register .auth-form');
    if(container && nextPanel){
      // set explicit start height
      container.style.height = container.offsetHeight + 'px';
      // switch target states first
      switcher.setAttribute('data-active', tab);
      modal?.querySelector('.auth-dialog')?.setAttribute('data-mode', tab);
      // measure next height after layout
      requestAnimationFrame(()=>{
        const measured = nextPanel.closest('.auth-slide').offsetHeight || nextPanel.offsetHeight;
        container.style.height = measured + 'px';
        // cleanup inline height after transition ends
        setTimeout(()=>{ container.style.height = ''; }, 380);
      });
    } else {
      switcher.setAttribute('data-active', tab);
      modal?.querySelector('.auth-dialog')?.setAttribute('data-mode', tab);
    }
    tabs?.forEach(t=>{ const on = t.dataset.tab===tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', on?'true':'false'); });
    positionUnderline();
    focusFirst();
  }
  function focusFirst(){
    const active = switcher?.getAttribute('data-active')||'login';
    const input = modal?.querySelector(active==='login' ? '#loginFormModal input' : '#registerFormModal input');
    input?.focus({preventScroll:true});
  }
  function positionUnderline(){
    const activeTab = modal?.querySelector('.auth-tab.active'); if(!activeTab || !underline) return;
    const r = activeTab.getBoundingClientRect(); const pr = activeTab.parentElement.getBoundingClientRect();
    underline.style.width = r.width+'px'; underline.style.transform = `translateX(${r.left-pr.left}px)`;
  }

  openers.forEach(a => a.addEventListener('click', e=>{ e.preventDefault();
    // ripple origin where user clicks opener
    if(ripple){
      const rect = modal.querySelector('.auth-content').getBoundingClientRect();
      const rx = ((e.clientX - rect.left)/rect.width)*100;
      const ry = ((e.clientY - rect.top)/rect.height)*100;
      ripple.style.setProperty('--rx', rx+'%');
      ripple.style.setProperty('--ry', ry+'%');
      ripple.classList.remove('active'); void ripple.offsetWidth; ripple.classList.add('active');
    }
    open();
  }));
  // global open event (from header-auth)
  document.addEventListener('auth:open', ()=> open());
  closeEls.forEach(el => el.addEventListener('click', ()=> close()));
  modal?.addEventListener('click', e=>{ if(e.target.classList.contains('auth-modal')) close(); });
  document.addEventListener('keydown', e=>{ if(modal?.getAttribute('aria-hidden')==='false' && e.key==='Escape') close(); });
  window.addEventListener('resize', positionUnderline);

  tabs?.forEach(t => t.addEventListener('click', e=>{ e.preventDefault(); toggle(t.dataset.tab); }));

  // password toggles
  function attachPwToggle(form){
    const pwField = form?.querySelector('input[type="password"]');
    if(!pwField || form.querySelector('.pw-toggle')) return;
    const wrap = pwField.closest('.field');
    wrap?.classList.add('pw');
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pw-toggle'; btn.textContent = 'แสดง';
    btn.addEventListener('click', ()=>{
      const isPw = pwField.type === 'password'; pwField.type = isPw ? 'text' : 'password';
      btn.textContent = isPw ? 'ซ่อน' : 'แสดง'; pwField.focus();
    });
    wrap?.appendChild(btn);
  }
  attachPwToggle(loginForm); attachPwToggle(registerForm);

  loginForm?.addEventListener('submit', async e=>{
    e.preventDefault();
    const msg = loginForm.querySelector('[data-role="loginMsg"]'); msg.textContent=''; msg.className='msg';
    const btn = loginForm.querySelector('button'); btn.disabled = true; btn.textContent = 'กำลังเข้าสู่ระบบ...';
    const fd = new FormData(loginForm); const email = fd.get('email'); const password = fd.get('password');
    try {
      const data = await api('/auth/login','POST',{ email, password });
      setToken(data.token);
      msg.textContent='ล็อกอินสำเร็จ'; msg.className='msg ok';
      document.dispatchEvent(new CustomEvent('auth:login'));
      setTimeout(()=> close(), 350);
    } catch(err) { msg.textContent = err.message || 'ล็อกอินไม่สำเร็จ'; msg.className='msg error'; }
    finally { btn.disabled=false; btn.textContent='เข้าสู่ระบบ'; }
  });

  registerForm?.addEventListener('submit', async e=>{
    e.preventDefault();
    const msg = registerForm.querySelector('[data-role="registerMsg"]'); msg.textContent=''; msg.className='msg';
    const btn = registerForm.querySelector('button'); btn.disabled = true; btn.textContent = 'กำลังสมัคร...';
  const fd = new FormData(registerForm);
  const password = fd.get('password');
  const confirmPassword = fd.get('confirmPassword');
  if(password !== confirmPassword){ msg.textContent='รหัสผ่านและยืนยันไม่ตรงกัน'; msg.className='msg error'; btn.disabled=false; btn.textContent='สมัครสมาชิก'; return; }
  const payload = { username: fd.get('username'), email: fd.get('email'), password, confirmPassword };
    try {
      await api('/auth/register','POST', payload);
      msg.textContent='สมัครสำเร็จ ลองเข้าสู่ระบบ'; msg.className='msg ok';
      toggle('login');
    } catch(err) { msg.textContent = err.message || 'สมัครไม่สำเร็จ'; msg.className='msg error'; }
    finally { btn.disabled=false; btn.textContent='สมัครสมาชิก'; }
  });
  // Improve Enter navigation
  modal?.addEventListener('keydown', e=>{
    if(e.key==='Enter'){
      const active = switcher?.getAttribute('data-active')||'login';
      const form = modal?.querySelector(active==='login' ? '#loginFormModal' : '#registerFormModal');
      if(form){
        const invalid = form.querySelector(':invalid');
        if(invalid){ e.preventDefault(); (invalid).focus(); }
      }
    }
  });
})();