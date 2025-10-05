// Home page dynamic demo (in-memory friendly)
const popularDestEl = document.getElementById('popularDest');
const quickSearchForm = document.getElementById('quickSearchForm');
const quickResult = document.getElementById('quickResult');

// Mock highlight data (could fetch from /api/attractions later)
const mockPopular = [
  { id: 'bkk', name: 'กรุงเทพฯ', tagline: 'เมืองที่ไม่เคยหลับ', score: 98 },
  { id: 'cnx', name: 'เชียงใหม่', tagline: 'ภูเขา วัฒนธรรม คาเฟ่', score: 93 },
  { id: 'phk', name: 'ภูเก็ต', tagline: 'ทะเล น้ำใส ชายหาด', score: 90 },
  { id: 'krb', name: 'กระบี่', tagline: 'หมู่เกาะและผาหินปูน', score: 88 },
  { id: 'uds', name: 'อุดรธานี', tagline: 'ธรรมชาติ & วิถีชุมชน', score: 84 }
];

function renderPopular(){
  popularDestEl.innerHTML = mockPopular.map(d=>`
    <div class="card-dest">
      <div class="badge">${d.score}</div>
      <div class="tagline">${d.tagline}</div>
      <h3>${d.name}</h3>
      <button data-id="${d.id}" class="mini-btn">ดูที่พัก</button>
    </div>
  `).join('');
}

document.addEventListener('click', e=>{
  if(e.target.matches('.mini-btn')){
    const id = e.target.getAttribute('data-id');
    quickResult.textContent = 'กำลังค้นหาที่พักในพื้นที่: '+id+' ... (demo)';
    setTimeout(()=>{ quickResult.textContent = 'ยังไม่มีข้อมูลจริง (ต่อ DB ภายหลัง)'; }, 600);
  }
});

quickSearchForm?.addEventListener('submit', e=>{
  e.preventDefault();
  const fd = new FormData(quickSearchForm);
  const q = fd.get('q');
  const type = fd.get('type');
  if(!q){ quickResult.textContent='กรุณาใส่คำค้นหา'; return; }
  quickResult.textContent = `ค้นหา ${type} : "${q}" ... (demo)`;
  // ภายหลังจะ fetch(`/api/${type}s?q=${encodeURIComponent(q)}`)
  setTimeout(()=>{ quickResult.textContent = 'ผลลัพธ์จริงจะแสดงหลังเชื่อมฐานข้อมูล'; }, 800);
});

renderPopular();

// Dynamic hero background loader (can be replaced with real curated images)
// Unsplash sample URLs (royalty-free, attribute optional but recommended)
// NOTE: Replace ?auto=format&w=1920&q=75 with optimized CDN params as needed.
const heroImages = [
  // Bangkok skyline night
  'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1920&q=70',
  // Tropical beach Thailand
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70',
  // Chiang Mai mountains mist
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=70'
];

const heroEl = document.getElementById('hero');
if (heroEl) {
  const pick = heroImages[Math.floor(Math.random()*heroImages.length)];
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    heroEl.style.backgroundImage = `linear-gradient(180deg,rgba(8,18,32,.7),rgba(8,18,32,.85)),url('${pick}')`;
    heroEl.dataset.loaded = 'true';
  };
  img.src = pick;
  // Optional timeout fallback
  setTimeout(()=>{ if(!heroEl.dataset.loaded) heroEl.dataset.loaded='true'; }, 4000);
}
