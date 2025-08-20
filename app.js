// Navegación entre vistas (sin recargar)
const buttons = document.querySelectorAll('.menu-btn, .side-item[data-view]');
const views = document.querySelectorAll('.view');
const sideItems = document.querySelectorAll('.side-item[data-view]');

function showView(id){
  views.forEach(v => v.classList.add('hidden'));
  document.getElementById('view-' + id).classList.remove('hidden');
  sideItems.forEach(b => b.classList.toggle('active', b.dataset.view === id));
}
buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.dataset.view;
    if (v) showView(v);
  });
});

// Por defecto mostrar Búsqueda
showView('search');

// Fullscreen (expande el panel principal)
const fsBtn = document.getElementById('fullscreenBtn');
const mainview = document.getElementById('mainview');
let isFull = false;
fsBtn.addEventListener('click', ()=>{
  isFull = !isFull;
  document.querySelector('.sidebar').style.display = isFull ? 'none' : '';
  document.getElementById('chatcol').style.display = isFull ? 'none' : '';
});

// Chat básico efímero
const chatLog = document.getElementById('chatLog');
const chatText = document.getElementById('chatText');
const sendBtn = document.getElementById('sendBtn');
function pushMsg(author, text){
  const div = document.createElement('div');
  div.className = 'msg';
  div.innerHTML = `<b>${author}</b>: ${text}`;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}
sendBtn.addEventListener('click', ()=>{
  const t = chatText.value.trim();
  if(!t) return;
  pushMsg('yo', t);
  chatText.value = '';
});
chatText.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){ sendBtn.click(); }
});
document.getElementById('clearChat').addEventListener('click', ()=>{
  chatLog.innerHTML = `<div class="msg"><b>system</b>: Chat limpiado.</div>`;
});
document.getElementById('toggleChat').addEventListener('click', ()=>{
  const col = document.getElementById('chatcol');
  col.style.display = (col.style.display === 'none') ? '' : 'none';
});

// Demo “Buscar”
document.getElementById('searchBtn')?.addEventListener('click', ()=>{
  const q = document.getElementById('searchInput').value.trim();
  const type = document.getElementById('searchType').value;
  if(!q){ alert('Escribe algo para buscar'); return; }
  const tbody = document.getElementById('resultsBody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${q}_demo_result.${type==='Audio'?'mp3': type==='Video'?'mp4':'zip'}</td>
    <td>${type}</td>
    <td>${(Math.random()*50+5).toFixed(1)} MB</td>
    <td>${['Baja','Media','Alta'][Math.floor(Math.random()*3)]}</td>
    <td>${Math.floor(Math.random()*30)+1}</td>
    <td><button class="pill">Descargar</button></td>
  `;
  tbody.prepend(row);
});
