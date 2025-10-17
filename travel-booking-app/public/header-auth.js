(() => {
  const mount = document.getElementById('authMount');
  if(!mount) return;
  const API_BASE = '/api';
  let token = localStorage.getItem('token') || null;

  function h(tag, attrs={}, children=[]) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=>{
      if(k==='class') el.className = v; else if(k==='text') el.textContent = v; else el.setAttribute(k,v);
    });
    children.forEach(c=> el.appendChild(typeof c==='string'?document.createTextNode(c):c));
    return el;
  }

  async function me(){
    if(!token) return null;
    try {
      const res = await fetch(API_BASE+'/auth/me', { headers: { 'Authorization':'Bearer '+token } });
      if(!res.ok) return null; const j = await res.json(); return j?.data || j;
    } catch { return null; }
  }

  function avatar(name){
    const letter = (name||'U').toString().trim()[0]?.toUpperCase() || 'U';
    return h('span',{class:'avatar', title:name||'ผู้ใช้'},[document.createTextNode(letter)]);
  }

  function renderLoggedOut(){
    mount.innerHTML = '';
    const link = h('a', { href:'#', class:'auth-open' }, ['เข้าสู่ระบบ']);
    link.addEventListener('click', e=>{ e.preventDefault(); document.dispatchEvent(new CustomEvent('auth:open')); });
    mount.appendChild(link);
  }

  function renderLoggedIn(user){
    mount.innerHTML = '';
    const wrap = h('span',{});
    wrap.appendChild(avatar(user.username||user.email));
    wrap.appendChild(h('span',{class:'hello'},['สวัสดี, '+(user.username||user.email)]));
    const logoutBtn = h('button',{type:'button'},['ออกจากระบบ']);
    logoutBtn.addEventListener('click', async ()=>{
      try {
        await fetch(API_BASE+'/auth/logout',{ method:'POST', headers:{ 'Authorization':'Bearer '+token } });
      } catch {}
      localStorage.removeItem('token'); token=null; renderLoggedOut(); toast('ออกจากระบบแล้ว', true);
      document.dispatchEvent(new CustomEvent('auth:logout'));
    });
    wrap.appendChild(logoutBtn);
    mount.appendChild(wrap);
  }

  function toast(msg, ok){
    const t = h('div',{class:'toast '+(ok?'ok':'err')},[msg]);
    document.body.appendChild(t);
    requestAnimationFrame(()=> t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=> t.remove(), 250); }, 1600);
  }

  async function init(){
    token = localStorage.getItem('token') || null;
    const user = await me();
    if(user) renderLoggedIn(user); else renderLoggedOut();
  }

  // respond to modal success
  document.addEventListener('auth:login', async ()=>{ token = localStorage.getItem('token') || null; await init(); });

  init();
})();
