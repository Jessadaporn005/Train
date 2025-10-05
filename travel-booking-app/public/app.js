// Simple frontend script using Fetch API against existing Express endpoints
const API_BASE = '/api';
let token = null;

const $ = sel => document.querySelector(sel);
const registerForm = $('#registerForm');
const loginForm = $('#loginForm');
const hotelForm = $('#hotelForm');
const sessionBox = $('#sessionBox');
const tokenPreview = $('#tokenPreview');
const hotelList = $('#hotelList');
const logoutBtn = $('#logoutBtn');

function setToken(t){
  token = t; if(t){ sessionBox.classList.remove('hidden'); tokenPreview.textContent = t.slice(0,70)+'...'; } else { sessionBox.classList.add('hidden'); tokenPreview.textContent=''; }
}

async function api(path, {method='GET', body, headers={}}={}){
  const opts = { method, headers: {...headers} };
  if(body){ opts.body = JSON.stringify(body); opts.headers['Content-Type']='application/json'; }
  if(token) opts.headers['Authorization']='Bearer '+token;
  const res = await fetch(API_BASE+path, opts);
  if(!res.ok){ let msg='Error '+res.status; try{ msg = (await res.json()).message || msg; }catch{} throw new Error(msg); }
  try { return await res.json(); } catch { return null; }
}

async function loadHotels(){
  hotelList.innerHTML = '<li>Loading...</li>';
  try {
    const data = await api('/hotels');
    if(!Array.isArray(data) || !data.length){ hotelList.innerHTML = '<li>ยังไม่มีข้อมูลโรงแรม</li>'; return; }
    hotelList.innerHTML = data.map(h=>`<li><h4>${escapeHtml(h.name)}</h4><div><span class="price">฿${h.pricePerNight}</span> / คืน</div><div>${escapeHtml(h.location || h.city || '')}</div><small>ห้อง: ${h.availableRooms ?? '-'} | Rating: ${h.rating ?? 0}</small></li>`).join('');
  } catch(err){ hotelList.innerHTML='<li class="error">โหลดไม่สำเร็จ</li>'; }
}

function formToObj(form){ return Object.fromEntries(new FormData(form).entries()); }

registerForm?.addEventListener('submit', async e=>{
  e.preventDefault();
  const msg = registerForm.querySelector('[data-role="registerMsg"]'); msg.textContent='';
  const v = formToObj(registerForm);
  const payload = { username: v.username, email: v.email, password: v.password, confirmPassword: v.password };
  try { await api('/auth/register', {method:'POST', body: payload}); msg.textContent='สมัครสำเร็จ ลองล็อกอิน'; msg.className='msg ok'; }
  catch(err){ msg.textContent=err.message; msg.className='msg error'; }
});

loginForm?.addEventListener('submit', async e=>{
  e.preventDefault();
  const msg = loginForm.querySelector('[data-role="loginMsg"]'); msg.textContent='';
  const v = formToObj(loginForm);
  try { const data = await api('/auth/login', {method:'POST', body: { email:v.email, password:v.password }}); setToken(data.token || data.accessToken); msg.textContent='ล็อกอินสำเร็จ'; msg.className='msg ok'; }
  catch(err){ msg.textContent=err.message; msg.className='msg error'; }
});

logoutBtn?.addEventListener('click', ()=>{ setToken(null); });

hotelForm?.addEventListener('submit', async e=>{
  e.preventDefault();
  if(!token){ alert('กรุณาล็อกอินก่อน'); return; }
  const v = formToObj(hotelForm);
  const payload = {
    name: v.name,
    location: v.location,
    description: v.description,
    pricePerNight: Number(v.pricePerNight),
    amenities: [],
    rating: 0,
    availableRooms: Number(v.availableRooms || 0)
  };
  try { await api('/hotels',{method:'POST', body: payload}); hotelForm.reset(); loadHotels(); }
  catch(err){ alert('เพิ่มไม่สำเร็จ: '+err.message); }
});

function escapeHtml(str){ return String(str||'').replace(/[&<>"]/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[s])); }

loadHotels();
