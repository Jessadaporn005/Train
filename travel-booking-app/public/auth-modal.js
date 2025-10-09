(() => {
  const modal = document.getElementById('authModal');
  const openers = document.querySelectorAll('.auth-open');
  const closeEls = modal?.querySelectorAll('[data-close-modal]') || [];
  const tabs = modal?.querySelectorAll('.auth-tab');
  const underline = modal?.querySelector('.auth-underline');
  const switcher = modal?.querySelector('.auth-switcher');
  const loginForm = modal?.querySelector('#loginFormModal');
  const registerForm = modal?.querySelector('#registerFormModal');

  // Use same API helper style as app.js but minimal here
  const API_BASE = '/api';
  let token = null;
  function setToken(t){ token = t; localStorage.setItem('token', t||''); }
  function getHeaders(){ const h = {'Content-Type':'application/json'}; if(token){ h['Authorization']='Bearer '+token; } return h; }
  async function api(path, method='GET', body){
    const res = await fetch(API_BASE+path, { method, headers: getHeaders(), body: body?JSON.stringify(body):undefined });
    const json = await res.json().catch(()=>null);
    if(!res.ok){ throw new Error(json?.error?.message || json?.message || ('Error '+res.status)); }
    return json?.data ?? json;
  }

  function open(){ if(!modal) return; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; focusFirst(); positionUnderline(); }
  function close(){ if(!modal) return; modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  function toggle(tab){
    if(!switcher) return;
    // Animate container height to next panel height to avoid clipping/stutter
    const container = modal?.querySelector('.auth-content');
    const current = switcher.querySelector(`[data-active] .auth-form`);
    const nextPanel = modal?.querySelector(tab==='login' ? '.auth-slide-login .auth-form' : '.auth-slide-register .auth-form');
    if(container && nextPanel){
      const startH = container.offsetHeight;
      // Temporarily set to auto to measure next height
      switcher.setAttribute('data-active', tab);
      modal?.querySelector('.auth-dialog')?.setAttribute('data-mode', tab);
      // Force layout then measure
      const nextH = nextPanel.parentElement.parentElement.offsetHeight || nextPanel.offsetHeight;
      container.style.height = startH+'px';
      // async to allow transform to register
      requestAnimationFrame(()=>{
        container.style.height = nextH+'px';
        setTimeout(()=>{ container.style.height = ''; }, 360);
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

  openers.forEach(a => a.addEventListener('click', e=>{ e.preventDefault(); open(); }));
  closeEls.forEach(el => el.addEventListener('click', ()=> close()));
  modal?.addEventListener('click', e=>{ if(e.target.classList.contains('auth-modal')) close(); });
  window.addEventListener('resize', positionUnderline);

  tabs?.forEach(t => t.addEventListener('click', e=>{ e.preventDefault(); toggle(t.dataset.tab); }));

  loginForm?.addEventListener('submit', async e=>{
    e.preventDefault();
    const msg = loginForm.querySelector('[data-role="loginMsg"]'); msg.textContent='';
    const fd = new FormData(loginForm); const email = fd.get('email'); const password = fd.get('password');
    try {
      const data = await api('/auth/login','POST',{ email, password });
      setToken(data.token);
      msg.textContent='ล็อกอินสำเร็จ'; msg.className='msg ok';
      setTimeout(()=> close(), 600);
    } catch(err) { msg.textContent = err.message || 'ล็อกอินไม่สำเร็จ'; msg.className='msg error'; }
  });

  registerForm?.addEventListener('submit', async e=>{
    e.preventDefault();
    const msg = registerForm.querySelector('[data-role="registerMsg"]'); msg.textContent='';
    const fd = new FormData(registerForm);
    const payload = { username: fd.get('username'), email: fd.get('email'), password: fd.get('password'), confirmPassword: fd.get('password') };
    try {
      await api('/auth/register','POST', payload);
      msg.textContent='สมัครสำเร็จ ลองเข้าสู่ระบบ'; msg.className='msg ok';
      toggle('login');
    } catch(err) { msg.textContent = err.message || 'สมัครไม่สำเร็จ'; msg.className='msg error'; }
  });
})();