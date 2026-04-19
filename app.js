// =============================================
// QUINIELA FIFA 2026 - app.js v2.0
// Con marcador exacto y calendario oficial
// =============================================

const SB_URL = "https://zriyqyeoiommrnyvwjto.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXlxeWVvaW9tbXJueXZ3anRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzQ1ODMsImV4cCI6MjA5MjE1MDU4M30.fylrPptB3VpnkXw2qMxh2PgLPBpt5OvIjoPgOzTTjog";
const FECHA_INICIO = new Date('2026-06-11');

const GRUPOS = {
  'A':['Mexico','Sudafrica','Corea del Sur','Chequia'],
  'B':['Canada','Bosnia-Herzegovina','Qatar','Suiza'],
  'C':['Brasil','Marruecos','Haiti','Escocia'],
  'D':['EEUU','Paraguay','Australia','Turkiye'],
  'E':['Alemania','Curazao','Costa de Marfil','Ecuador'],
  'F':['Paises Bajos','Japon','Suecia','Tunez'],
  'G':['Belgica','Egipto','Iran','Nueva Zelanda'],
  'H':['Espana','Cabo Verde','Arabia Saudita','Uruguay'],
  'I':['Francia','Senegal','Iraq','Noruega'],
  'J':['Argentina','Argelia','Austria','Jordania'],
  'K':['Portugal','DR Congo','Uzbekistan','Colombia'],
  'L':['Inglaterra','Croacia','Ghana','Panama'],
};

const FLAGS = {
  'Mexico':'MX','Sudafrica':'ZA','Corea del Sur':'KR','Chequia':'CZ',
  'Canada':'CA','Bosnia-Herzegovina':'BA','Qatar':'QA','Suiza':'CH',
  'Brasil':'BR','Marruecos':'MA','Haiti':'HT','Escocia':'GB-SCT',
  'EEUU':'US','Paraguay':'PY','Australia':'AU','Turkiye':'TR',
  'Alemania':'DE','Curazao':'CW','Costa de Marfil':'CI','Ecuador':'EC',
  'Paises Bajos':'NL','Japon':'JP','Suecia':'SE','Tunez':'TN',
  'Belgica':'BE','Egipto':'EG','Iran':'IR','Nueva Zelanda':'NZ',
  'Espana':'ES','Cabo Verde':'CV','Arabia Saudita':'SA','Uruguay':'UY',
  'Francia':'FR','Senegal':'SN','Iraq':'IQ','Noruega':'NO',
  'Argentina':'AR','Argelia':'DZ','Austria':'AT','Jordania':'JO',
  'Portugal':'PT','DR Congo':'CD','Uzbekistan':'UZ','Colombia':'CO',
  'Inglaterra':'GB-ENG','Croacia':'HR','Ghana':'GH','Panama':'PA',
};

function flag(pais) {
  const code = FLAGS[pais];
  if (!code) return '';
  if (code.includes('-')) {
    const map = {'GB-SCT':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','GB-ENG':'🏴󠁧󠁢󠁥󠁮󠁧󠁿'};
    return map[code] || '';
  }
  return code.split('').map(c => String.fromCodePoint(c.charCodeAt(0)+127397)).join('');
}

const PARTIDOS = [
  {id:1,  g:'A', l:'Mexico',           v:'Sudafrica',         f:'2026-06-11', h:'15:00 ET', s:'Azteca, Cdmx'},
  {id:2,  g:'A', l:'Corea del Sur',    v:'Chequia',           f:'2026-06-11', h:'22:00 ET', s:'Akron, Zapopan'},
  {id:3,  g:'B', l:'Canada',           v:'Bosnia-Herzegovina',f:'2026-06-12', h:'15:00 ET', s:'BMO Field, Toronto'},
  {id:4,  g:'D', l:'EEUU',             v:'Paraguay',          f:'2026-06-12', h:'21:00 ET', s:'SoFi, Inglewood'},
  {id:5,  g:'D', l:'Australia',        v:'Turkiye',           f:'2026-06-13', h:'00:00 ET', s:'BC Place, Vancouver'},
  {id:6,  g:'B', l:'Qatar',            v:'Suiza',             f:'2026-06-13', h:'15:00 ET', s:"Levi's, Santa Clara"},
  {id:7,  g:'C', l:'Brasil',           v:'Marruecos',         f:'2026-06-13', h:'18:00 ET', s:'MetLife, Nueva Jersey'},
  {id:8,  g:'C', l:'Haiti',            v:'Escocia',           f:'2026-06-13', h:'21:00 ET', s:'Gillette, Foxborough'},
  {id:9,  g:'E', l:'Alemania',         v:'Curazao',           f:'2026-06-14', h:'13:00 ET', s:'NRG, Houston'},
  {id:10, g:'F', l:'Paises Bajos',     v:'Japon',             f:'2026-06-14', h:'16:00 ET', s:'AT&T, Arlington'},
  {id:11, g:'E', l:'Costa de Marfil',  v:'Ecuador',           f:'2026-06-14', h:'19:00 ET', s:'Lincoln Financial, Philadelphia'},
  {id:12, g:'F', l:'Suecia',           v:'Tunez',             f:'2026-06-14', h:'22:00 ET', s:'BBVA, Monterrey'},
  {id:13, g:'H', l:'Espana',           v:'Cabo Verde',        f:'2026-06-15', h:'12:00 ET', s:'Mercedes-Benz, Atlanta'},
  {id:14, g:'G', l:'Belgica',          v:'Egipto',            f:'2026-06-15', h:'15:00 ET', s:'Lumen Field, Seattle'},
  {id:15, g:'H', l:'Arabia Saudita',   v:'Uruguay',           f:'2026-06-15', h:'18:00 ET', s:'Hard Rock, Miami'},
  {id:16, g:'G', l:'Iran',             v:'Nueva Zelanda',     f:'2026-06-15', h:'21:00 ET', s:'SoFi, Inglewood'},
  {id:17, g:'I', l:'Francia',          v:'Senegal',           f:'2026-06-16', h:'15:00 ET', s:'MetLife, Nueva Jersey'},
  {id:18, g:'I', l:'Iraq',             v:'Noruega',           f:'2026-06-16', h:'18:00 ET', s:'Gillette, Foxborough'},
  {id:19, g:'J', l:'Argentina',        v:'Argelia',           f:'2026-06-16', h:'21:00 ET', s:'Arrowhead, Kansas City'},
  {id:20, g:'J', l:'Austria',          v:'Jordania',          f:'2026-06-17', h:'00:00 ET', s:"Levi's, Santa Clara"},
  {id:21, g:'K', l:'Portugal',         v:'DR Congo',          f:'2026-06-17', h:'13:00 ET', s:'NRG, Houston'},
  {id:22, g:'L', l:'Inglaterra',       v:'Croacia',           f:'2026-06-17', h:'16:00 ET', s:'AT&T, Arlington'},
  {id:23, g:'L', l:'Ghana',            v:'Panama',            f:'2026-06-17', h:'19:00 ET', s:'BMO Field, Toronto'},
  {id:24, g:'K', l:'Uzbekistan',       v:'Colombia',          f:'2026-06-17', h:'22:00 ET', s:'Azteca, Cdmx'},
  {id:25, g:'A', l:'Chequia',          v:'Sudafrica',         f:'2026-06-18', h:'12:00 ET', s:'Mercedes-Benz, Atlanta'},
  {id:26, g:'B', l:'Suiza',            v:'Bosnia-Herzegovina',f:'2026-06-18', h:'15:00 ET', s:'SoFi, Inglewood'},
  {id:27, g:'B', l:'Canada',           v:'Qatar',             f:'2026-06-18', h:'18:00 ET', s:'BC Place, Vancouver'},
  {id:28, g:'A', l:'Mexico',           v:'Corea del Sur',     f:'2026-06-18', h:'21:00 ET', s:'Akron, Zapopan'},
  {id:29, g:'D', l:'Turkiye',          v:'Paraguay',          f:'2026-06-19', h:'00:00 ET', s:"Levi's, Santa Clara"},
  {id:30, g:'D', l:'EEUU',             v:'Australia',         f:'2026-06-19', h:'15:00 ET', s:'Lumen Field, Seattle'},
  {id:31, g:'C', l:'Escocia',          v:'Marruecos',         f:'2026-06-19', h:'18:00 ET', s:'Gillette, Foxborough'},
  {id:32, g:'C', l:'Brasil',           v:'Haiti',             f:'2026-06-19', h:'21:00 ET', s:'Lincoln Financial, Philadelphia'},
  {id:33, g:'F', l:'Tunez',            v:'Japon',             f:'2026-06-20', h:'00:00 ET', s:'BBVA, Monterrey'},
  {id:34, g:'F', l:'Paises Bajos',     v:'Suecia',            f:'2026-06-20', h:'13:00 ET', s:'NRG, Houston'},
  {id:35, g:'E', l:'Alemania',         v:'Costa de Marfil',   f:'2026-06-20', h:'16:00 ET', s:'BMO Field, Toronto'},
  {id:36, g:'E', l:'Ecuador',          v:'Curazao',           f:'2026-06-20', h:'20:00 ET', s:'Arrowhead, Kansas City'},
  {id:37, g:'H', l:'Espana',           v:'Arabia Saudita',    f:'2026-06-21', h:'12:00 ET', s:'Mercedes-Benz, Atlanta'},
  {id:38, g:'G', l:'Belgica',          v:'Iran',              f:'2026-06-21', h:'15:00 ET', s:'SoFi, Inglewood'},
  {id:39, g:'H', l:'Uruguay',          v:'Cabo Verde',        f:'2026-06-21', h:'18:00 ET', s:'Hard Rock, Miami'},
  {id:40, g:'G', l:'Nueva Zelanda',    v:'Egipto',            f:'2026-06-21', h:'21:00 ET', s:'BC Place, Vancouver'},
  {id:41, g:'J', l:'Argentina',        v:'Austria',           f:'2026-06-22', h:'13:00 ET', s:'AT&T, Arlington'},
  {id:42, g:'I', l:'Francia',          v:'Iraq',              f:'2026-06-22', h:'17:00 ET', s:'Lincoln Financial, Philadelphia'},
  {id:43, g:'I', l:'Noruega',          v:'Senegal',           f:'2026-06-22', h:'20:00 ET', s:'MetLife, Nueva Jersey'},
  {id:44, g:'J', l:'Jordania',         v:'Argelia',           f:'2026-06-22', h:'23:00 ET', s:"Levi's, Santa Clara"},
  {id:45, g:'K', l:'Portugal',         v:'Uzbekistan',        f:'2026-06-23', h:'13:00 ET', s:'NRG, Houston'},
  {id:46, g:'L', l:'Inglaterra',       v:'Ghana',             f:'2026-06-23', h:'16:00 ET', s:'Gillette, Foxborough'},
  {id:47, g:'L', l:'Panama',           v:'Croacia',           f:'2026-06-23', h:'19:00 ET', s:'BMO Field, Toronto'},
  {id:48, g:'K', l:'Colombia',         v:'DR Congo',          f:'2026-06-23', h:'22:00 ET', s:'Akron, Zapopan'},
  {id:49, g:'B', l:'Suiza',            v:'Canada',            f:'2026-06-24', h:'15:00 ET', s:'BC Place, Vancouver'},
  {id:50, g:'B', l:'Bosnia-Herzegovina',v:'Qatar',            f:'2026-06-24', h:'15:00 ET', s:'Lumen Field, Seattle'},
  {id:51, g:'C', l:'Escocia',          v:'Brasil',            f:'2026-06-24', h:'18:00 ET', s:'Hard Rock, Miami'},
  {id:52, g:'C', l:'Marruecos',        v:'Haiti',             f:'2026-06-24', h:'18:00 ET', s:'Mercedes-Benz, Atlanta'},
  {id:53, g:'A', l:'Chequia',          v:'Mexico',            f:'2026-06-24', h:'21:00 ET', s:'Azteca, Cdmx'},
  {id:54, g:'A', l:'Sudafrica',        v:'Corea del Sur',     f:'2026-06-24', h:'21:00 ET', s:'BBVA, Monterrey'},
  {id:55, g:'E', l:'Curazao',          v:'Costa de Marfil',   f:'2026-06-25', h:'16:00 ET', s:'Lincoln Financial, Philadelphia'},
  {id:56, g:'E', l:'Ecuador',          v:'Alemania',          f:'2026-06-25', h:'16:00 ET', s:'MetLife, Nueva Jersey'},
  {id:57, g:'F', l:'Japon',            v:'Suecia',            f:'2026-06-25', h:'19:00 ET', s:'AT&T, Arlington'},
  {id:58, g:'F', l:'Tunez',            v:'Paises Bajos',      f:'2026-06-25', h:'19:00 ET', s:'Arrowhead, Kansas City'},
  {id:59, g:'D', l:'Turkiye',          v:'EEUU',              f:'2026-06-25', h:'22:00 ET', s:'SoFi, Inglewood'},
  {id:60, g:'D', l:'Paraguay',         v:'Australia',         f:'2026-06-25', h:'22:00 ET', s:"Levi's, Santa Clara"},
  {id:61, g:'I', l:'Noruega',          v:'Francia',           f:'2026-06-26', h:'15:00 ET', s:'Gillette, Foxborough'},
  {id:62, g:'I', l:'Senegal',          v:'Iraq',              f:'2026-06-26', h:'15:00 ET', s:'BMO Field, Toronto'},
  {id:63, g:'H', l:'Cabo Verde',       v:'Arabia Saudita',    f:'2026-06-26', h:'20:00 ET', s:'NRG, Houston'},
  {id:64, g:'H', l:'Uruguay',          v:'Espana',            f:'2026-06-26', h:'20:00 ET', s:'Akron, Zapopan'},
  {id:65, g:'G', l:'Egipto',           v:'Iran',              f:'2026-06-26', h:'23:00 ET', s:'Lumen Field, Seattle'},
  {id:66, g:'G', l:'Nueva Zelanda',    v:'Belgica',           f:'2026-06-26', h:'23:00 ET', s:'BC Place, Vancouver'},
  {id:67, g:'L', l:'Panama',           v:'Inglaterra',        f:'2026-06-27', h:'17:00 ET', s:'MetLife, Nueva Jersey'},
  {id:68, g:'L', l:'Croacia',          v:'Ghana',             f:'2026-06-27', h:'17:00 ET', s:'Lincoln Financial, Philadelphia'},
  {id:69, g:'K', l:'Colombia',         v:'Portugal',          f:'2026-06-27', h:'19:30 ET', s:'Hard Rock, Miami'},
  {id:70, g:'K', l:'DR Congo',         v:'Uzbekistan',        f:'2026-06-27', h:'19:30 ET', s:'Mercedes-Benz, Atlanta'},
  {id:71, g:'J', l:'Argelia',          v:'Austria',           f:'2026-06-27', h:'22:00 ET', s:'Arrowhead, Kansas City'},
  {id:72, g:'J', l:'Jordania',         v:'Argentina',         f:'2026-06-27', h:'22:00 ET', s:'AT&T, Arlington'},
];

const FAVORITOS_CAMP = [
  {n:'Argentina',f:'AR'},{n:'Brasil',f:'BR'},{n:'Francia',f:'FR'},
  {n:'Espana',f:'ES'},{n:'Alemania',f:'DE'},{n:'Portugal',f:'PT'},
  {n:'Inglaterra',f:'GB-ENG'},{n:'Paises Bajos',f:'NL'},{n:'Uruguay',f:'UY'},
  {n:'Colombia',f:'CO'},{n:'Mexico',f:'MX'},{n:'EEUU',f:'US'},
  {n:'Belgica',f:'BE'},{n:'Croacia',f:'HR'},{n:'Marruecos',f:'MA'},{n:'Japon',f:'JP'},
];

// ESTADO
let sbClient = null;
let usuarioActual = null;
let predicciones = {};
let campeon = null;
let clasificados = {};
let participantes = [];
let grupoActivo = 'A';

// SDK
async function cargarSDK() {
  return new Promise((resolve) => {
    if (window._sbSDK) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = () => { window._sbSDK = window.supabase || window.supabaseJs; resolve(); };
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
}

async function autoConectar() {
  try {
    const sdk = window._sbSDK;
    if (!sdk || !sdk.createClient) throw new Error('SDK no disponible');
    sbClient = sdk.createClient(SB_URL, SB_KEY);
    const { error } = await sbClient.from('participantes').select('id').limit(1);
    if (error) throw error;
    await cargarParticipantes();
  } catch(e) {
    sbClient = null;
    cargarParticipantes();
  }
}

// UTILIDADES
function calcDias() {
  const diff = Math.ceil((FECHA_INICIO - new Date()) / 86400000);
  const val = diff > 0 ? diff : 0;
  document.querySelectorAll('#dias-restantes,#stat-dias').forEach(el => { if(el) el.textContent = val; });
}

function fmtFecha(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('es-PA', {weekday:'short',day:'numeric',month:'short'});
}

function mostrarAlerta(id, tipo, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert ' + tipo;
  el.textContent = msg;
  setTimeout(() => { el.className = 'alert'; }, 6000);
}

// NAVEGACIÓN
function goSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  event.target.classList.add('active');
  if (id === 'ranking') renderRanking();
  if (id === 'admin') renderAdmin();
}

// REGISTRO
async function registrar() {
  const nombre = document.getElementById('r-nombre').value.trim();
  const email  = document.getElementById('r-email').value.trim();
  const tel    = document.getElementById('r-tel').value.trim();
  const cliente= document.getElementById('r-cliente').value.trim();
  const favorito= document.getElementById('r-favorito').value;

  if (!nombre || !email) { mostrarAlerta('reg-alert','error','Por favor ingresa nombre y correo.'); return; }

  const btn = document.getElementById('btn-registro');
  btn.innerHTML = '<span class="loading"></span> Registrando...';
  btn.disabled = true;

  const datos = { nombre, email, tel, cliente, favorito, fecha: new Date().toISOString() };

  if (sbClient) {
    const { data, error } = await sbClient.from('participantes').insert([datos]).select();
    if (error) { mostrarAlerta('reg-alert','error','Error: ' + error.message); btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return; }
    usuarioActual = data[0];
  } else {
    datos.id = Date.now();
    const loc = JSON.parse(localStorage.getItem('participantes')||'[]');
    loc.push(datos); localStorage.setItem('participantes', JSON.stringify(loc));
    usuarioActual = datos;
  }

  participantes.push(usuarioActual);
  actualizarContadores();
  const ini = nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('user-initials').textContent = ini;
  document.getElementById('user-name-header').textContent = nombre.split(' ')[0];
  document.getElementById('user-chip').classList.add('visible');
  mostrarAlerta('reg-alert','success',`Bienvenido ${nombre}! Ve a predicciones.`);
  btn.innerHTML='Registrado ✓'; btn.disabled=false;
}

async function cargarParticipantes() {
  if (sbClient) {
    const { data } = await sbClient.from('participantes').select('*');
    participantes = data || [];
  } else {
    participantes = JSON.parse(localStorage.getItem('participantes')||'[]');
  }
  actualizarContadores();
}

function actualizarContadores() {
  const n = participantes.length;
  document.querySelectorAll('#hero-participantes,#stat-total').forEach(el => { if(el) el.textContent = n; });
}

// CAMPEÓN
function renderCampeon() {
  const g = document.getElementById('campeon-grid');
  if (!g) return;
  g.innerHTML = FAVORITOS_CAMP.map(eq => {
    const f = eq.f.includes('-') ? ({'GB-ENG':'🏴󠁧󠁢󠁥󠁮󠁧󠁿'}[eq.f]||'') : eq.f.split('').map(c=>String.fromCodePoint(c.charCodeAt(0)+127397)).join('');
    return `<button class="camp-btn${campeon===eq.n?' sel':''}" onclick="selCampeon('${eq.n}')">
      <span class="flag-txt">${f}</span><span>${eq.n}</span>
    </button>`;
  }).join('');
}

function selCampeon(eq) { campeon = eq; renderCampeon(); }

// PARTIDOS
function renderGrupoTabs() {
  const tabs = document.getElementById('grupo-tabs');
  if (!tabs) return;
  tabs.innerHTML = Object.keys(GRUPOS).map(g => {
    const done = PARTIDOS.filter(p => p.g===g && predicciones[p.id] && predicciones[p.id].l!==undefined && predicciones[p.id].v!==undefined).length;
    const total = PARTIDOS.filter(p => p.g===g).length;
    const completo = done === total;
    return `<button class="grupo-tab${grupoActivo===g?' active':''} ${completo?'completo':''}" onclick="selGrupo('${g}')">
      Grupo ${g}${completo?' ✓':''}
    </button>`;
  }).join('');
}

function selGrupo(g) {
  grupoActivo = g;
  renderGrupoTabs();
  renderPartidosGrupo();
}

function renderPartidosGrupo() {
  const c = document.getElementById('partidos-container');
  if (!c) return;
  const partidos = PARTIDOS.filter(p => p.g === grupoActivo);
  const equipos = GRUPOS[grupoActivo];

  let html = `<div class="grupo-equipos">
    ${equipos.map(eq => `<span class="equipo-badge">${flag(eq)} ${eq}</span>`).join('')}
  </div>`;

  let fechaActual = '';
  partidos.forEach(p => {
    if (p.f !== fechaActual) {
      fechaActual = p.f;
      html += `<div class="fecha-label">${fmtFecha(p.f)}</div>`;
    }
    const pred = predicciones[p.id] || {};
    const lv = pred.l !== undefined ? pred.l : '';
    const vv = pred.v !== undefined ? pred.v : '';
    const predicho = pred.l !== undefined && pred.v !== undefined;

    html += `<div class="partido-card${predicho?' predicho':''}">
      <div class="partido-sede">${p.h} · ${p.s}</div>
      <div class="partido-row-score">
        <div class="equipo-col">
          <span class="ef">${flag(p.l)}</span>
          <span class="en">${p.l}</span>
        </div>
        <div class="score-inputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?"
            class="score-input${pred.l!==undefined?' con-valor':''}"
            oninput="setPred(${p.id},'l',this.value)">
          <span class="score-sep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?"
            class="score-input${pred.v!==undefined?' con-valor':''}"
            oninput="setPred(${p.id},'v',this.value)">
        </div>
        <div class="equipo-col right">
          <span class="en">${p.v}</span>
          <span class="ef">${flag(p.v)}</span>
        </div>
      </div>
    </div>`;
  });

  c.innerHTML = html;
  actualizarProgreso();
}

function setPred(id, lado, val) {
  const num = parseInt(val);
  if (!predicciones[id]) predicciones[id] = {};
  if (!isNaN(num) && num >= 0) predicciones[id][lado] = num;
  else delete predicciones[id][lado];
  actualizarProgreso();
  renderGrupoTabs();
}

function actualizarProgreso() {
  const total = PARTIDOS.length;
  const done = PARTIDOS.filter(p => { const pr=predicciones[p.id]; return pr&&pr.l!==undefined&&pr.v!==undefined; }).length;
  const pct = Math.round(done/total*100);
  const fill = document.getElementById('prog-fill');
  const txt = document.getElementById('prog-txt');
  const status = document.getElementById('q-save-status');
  if(fill) fill.style.width = pct+'%';
  if(txt) txt.textContent = `${done} de ${total} partidos predichos`;
  if(status) status.textContent = done===total ? '¡Lista para guardar!' : `Faltan ${total-done} partidos`;
}

async function guardarQuiniela() {
  if (!usuarioActual) { mostrarAlerta('q-alert','error','Primero regístrate.'); return; }
  const done = PARTIDOS.filter(p => { const pr=predicciones[p.id]; return pr&&pr.l!==undefined&&pr.v!==undefined; }).length;
  if (done < PARTIDOS.length) { mostrarAlerta('q-alert','error',`Faltan ${PARTIDOS.length-done} partidos.`); return; }
  if (!campeon) { mostrarAlerta('q-alert','error','Selecciona el campeón.'); return; }

  const datos = { participante_id: usuarioActual.id, predicciones: JSON.stringify(predicciones), campeon, fecha: new Date().toISOString() };

  if (sbClient) {
    const { error } = await sbClient.from('quinielas').upsert([datos]);
    if (error) { mostrarAlerta('q-alert','error','Error: '+error.message); return; }
  } else {
    localStorage.setItem('quiniela_'+usuarioActual.id, JSON.stringify(datos));
  }
  mostrarAlerta('q-alert','success',`Quiniela guardada! Campeon: ${campeon}`);
}

// CLASIFICADOS
function renderClasificados() {
  const g = document.getElementById('clas-grid');
  if (!g) return;
  g.innerHTML = Object.keys(GRUPOS).map(gr => {
    const equipos = GRUPOS[gr];
    const sel = clasificados[gr] || [];
    return `<div class="clas-grupo">
      <div class="clas-grupo-title">Grupo ${gr} <span class="clas-count ${sel.length===2?'ok':''}">${sel.length}/2</span></div>
      ${equipos.map(eq => `<label class="clas-check${sel.includes(eq)?' sel':''}">
        <input type="checkbox" onchange="togClasif('${gr}','${eq}',this)" ${sel.includes(eq)?'checked':''}>
        ${flag(eq)} ${eq}
      </label>`).join('')}
    </div>`;
  }).join('');
}

function togClasif(gr, eq, el) {
  if (!clasificados[gr]) clasificados[gr] = [];
  if (el.checked) {
    if (clasificados[gr].length >= 2) { el.checked=false; alert('Solo 2 equipos por grupo.'); return; }
    clasificados[gr].push(eq);
  } else {
    clasificados[gr] = clasificados[gr].filter(e=>e!==eq);
  }
  renderClasificados();
}

async function guardarClasificados() {
  if (!usuarioActual) { mostrarAlerta('clas-alert','error','Primero regístrate.'); return; }
  const inc = Object.keys(GRUPOS).filter(g => !clasificados[g]||clasificados[g].length<2);
  if (inc.length) { mostrarAlerta('clas-alert','error','Faltan grupos: '+inc.join(', ')); return; }
  const datos = { participante_id: usuarioActual.id, clasificados: JSON.stringify(clasificados), fecha: new Date().toISOString() };
  if (sbClient) {
    const { error } = await sbClient.from('clasificados').upsert([datos]);
    if (error) { mostrarAlerta('clas-alert','error','Error: '+error.message); return; }
  } else {
    localStorage.setItem('clasificados_'+usuarioActual.id, JSON.stringify(datos));
  }
  mostrarAlerta('clas-alert','success','Clasificados guardados!');
}

// RANKING
const DEMO_RANK = [
  {nombre:'Carlos Rodriguez',pts:87,campeon:'Brasil'},
  {nombre:'Maria Gonzalez',pts:74,campeon:'Argentina'},
  {nombre:'Andres Morales',pts:68,campeon:'Francia'},
  {nombre:'Sofia Castillo',pts:61,campeon:'Espana'},
  {nombre:'Pedro Jimenez',pts:55,campeon:'Brasil'},
];

async function renderRanking() {
  let data = DEMO_RANK;
  if (sbClient) {
    const { data: rows } = await sbClient.from('ranking_view').select('*').order('pts',{ascending:false}).limit(100);
    if (rows&&rows.length) data = rows;
  }
  const c = document.getElementById('ranking-container');
  if (!c) return;
  c.innerHTML = data.map((p,i) => {
    const ini = p.nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const pos = i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1);
    return `<div class="ranking-row">
      <div class="rank-pos${i<3?' medal':''}">${pos}</div>
      <div class="rank-avatar">${ini}</div>
      <div class="rank-name">${p.nombre}</div>
      <div class="rank-camp">${p.campeon}</div>
      <div class="rank-pts">${p.pts}<span class="pts-lbl">pts</span></div>
    </div>`;
  }).join('');
  document.getElementById('stat-total').textContent = participantes.length || data.length;
}

// ADMIN
function renderAdmin() {
  const loc = JSON.parse(localStorage.getItem('participantes')||'[]');
  const data = participantes.length ? participantes : loc;
  const c = document.getElementById('admin-table');
  if (!c) return;
  if (!data.length) { c.innerHTML='<p style="color:var(--texto-muted);font-size:13px">Sin participantes aun.</p>'; return; }
  c.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-size:11px">#</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-size:11px">Nombre</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-size:11px">Correo</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-size:11px">Cliente</th>
    </tr></thead>
    <tbody>${data.map((p,i)=>`<tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
      <td style="padding:8px;color:var(--texto-muted)">${i+1}</td>
      <td style="padding:8px;font-weight:500">${p.nombre}</td>
      <td style="padding:8px;color:var(--texto-muted)">${p.email}</td>
      <td style="padding:8px">${p.cliente||'—'}</td>
    </tr>`).join('')}</tbody>
  </table>`;
}

function exportarCSV() {
  const loc = JSON.parse(localStorage.getItem('participantes')||'[]');
  const data = participantes.length ? participantes : loc;
  if (!data.length) { alert('Sin datos.'); return; }
  const cols = ['nombre','email','tel','cliente','favorito','fecha'];
  const csv = [cols.join(','),...data.map(r=>cols.map(c=>`"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  a.download='participantes_quiniela2026.csv'; a.click();
}

function aplicarConfig() {
  const emp = document.getElementById('cfg-empresa').value.trim();
  const col = document.getElementById('cfg-color').value.trim();
  if (emp) { document.getElementById('empresa-label').textContent=emp; localStorage.setItem('cfg_empresa',emp); }
  if (col&&/^#[0-9a-fA-F]{6}$/.test(col)) { document.documentElement.style.setProperty('--verde',col); localStorage.setItem('cfg_color',col); }
  alert('Configuracion aplicada!');
}

// INIT
async function init() {
  calcDias();
  renderCampeon();
  renderGrupoTabs();
  renderPartidosGrupo();
  renderClasificados();
  const emp=localStorage.getItem('cfg_empresa');
  const col=localStorage.getItem('cfg_color');
  if(emp){document.getElementById('empresa-label').textContent=emp;}
  if(col){document.documentElement.style.setProperty('--verde',col);}
  await cargarSDK();
  await autoConectar();
  renderRanking();
}

document.addEventListener('DOMContentLoaded', init);
