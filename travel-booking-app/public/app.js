// Simple frontend script using Fetch API against existing Express endpoints
const API_BASE = '/api';
let token = null;

const $ = sel => document.querySelector(sel);
const hotelForm = $('#hotelForm');
const hotelList = $('#hotelList');

function setToken(t){ token = t; }

async function api(path, {method='GET', body, headers={}}={}){
  const opts = { method, headers: {...headers} };
  if(body){ opts.body = JSON.stringify(body); opts.headers['Content-Type']='application/json'; }
  if(token) opts.headers['Authorization']='Bearer '+token;
  const res = await fetch(API_BASE+path, opts);
  let json = null;
  try { json = await res.json(); } catch {}
  if(!res.ok){
    const code = json?.error?.code;
    const baseMsg = json?.error?.message || json?.message || ('Error '+res.status);
    const friendly = mapErrorCode(code, baseMsg);
    throw new Error(friendly);
  }
  // standardized: { success, data }
  return json?.data !== undefined ? json.data : json;
}

async function loadHotels(){
  hotelList.innerHTML = '<li>Loading...</li>';
  try {
    const hotels = await api('/hotels');
    if(!Array.isArray(hotels) || !hotels.length){ hotelList.innerHTML = '<li>ยังไม่มีข้อมูลโรงแรม</li>'; return; }
    hotelList.innerHTML = hotels.map(h=>`<li><h4>${escapeHtml(h.name)}</h4><div><span class="price">฿${h.pricePerNight}</span> / คืน</div><div>${escapeHtml(h.location || h.city || '')}</div><small>ห้อง: ${h.availableRooms ?? '-'} | Rating: ${h.rating ?? 0}</small></li>`).join('');
  } catch(err){ hotelList.innerHTML='<li class="error">โหลดไม่สำเร็จ</li>'; }
}

function formToObj(form){ return Object.fromEntries(new FormData(form).entries()); }


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

function mapErrorCode(code, fallback){
  if(!code) return fallback;
  switch(code){
    case 'DUPLICATE_EMAIL': return 'อีเมลนี้ถูกใช้แล้ว กรุณาใช้เมลอื่น';
    case 'PASSWORD_MISMATCH': return 'รหัสผ่านและยืนยันไม่ตรงกัน';
    case 'INVALID_CREDENTIALS': return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
    case 'VALIDATION_ERROR': return 'ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
    default: return fallback;
  }
}

loadHotels();

// (Removed old inline auth section; modal handles auth flows)
