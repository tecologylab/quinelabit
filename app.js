// =============================================
// QUINIELA FIFA 2026 — app.js
// Compatible con Supabase (opcional)
// Si no hay conexión, usa localStorage
// =============================================

// ---- DATOS ----
const GRUPOS = {
  'A': ['México','EEUU','Canadá','Polonia'],
  'B': ['Argentina','Chile','Bolivia','Perú'],
  'C': ['Brasil','Colombia','Uruguay','Paraguay'],
  'D': ['España','Francia','Portugal','Alemania'],
  'E': ['Inglaterra','Países Bajos','Bélgica','Croacia'],
  'F': ['Japón','Arabia Saudita','Irán','Australia'],
};

const PARTIDOS = [
  {g:'A', local:'México',         visita:'EEUU'},
  {g:'A', local:'Canadá',         visita:'Polonia'},
  {g:'B', local:'Argentina',      visita:'Chile'},
  {g:'B', local:'Bolivia',        visita:'Perú'},
  {g:'C', local:'Brasil',         visita:'Colombia'},
  {g:'C', local:'Uruguay',        visita:'Paraguay'},
  {g:'D', local:'España',         visita:'Francia'},
  {g:'D', local:'Portugal',       visita:'Alemania'},
  {g:'E', local:'Inglaterra',     visita:'Países Bajos'},
  {g:'E', local:'Bélgica',        visita:'Croacia'},
  {g:'F', local:'Japón',          visita:'Arabia Saudita'},
  {g:'F', local:'Irán',           visita:'Australia'},
];

const FAVORITOS = [
  {n:'Argentina',   f:'🇦🇷'},
  {n:'Brasil',      f:'🇧🇷'},
  {n:'Francia',     f:'🇫🇷'},
  {n:'España',      f:'🇪🇸'},
  {n:'Alemania',    f:'🇩🇪'},
  {n:'Portugal',    f:'🇵🇹'},
  {n:'Inglaterra',  f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
  {n:'México',      f:'🇲🇽'},
  {n:'Países Bajos',f:'🇳🇱'},
  {n:'Uruguay',     f:'🇺🇾'},
  {n:'Colombia',    f:'🇨🇴'},
  {n:'EEUU',        f:'🇺🇸'},
];

const FLAGS = {
  'México':'🇲🇽','EEUU':'🇺🇸','Canadá':'🇨🇦','Polonia':'🇵🇱',
  'Argentina':'🇦🇷','Chile':'🇨🇱','Bolivia':'🇧🇴','Perú':'🇵🇪',
  'Brasil':'🇧🇷','Colombia':'🇨🇴','Uruguay':'🇺🇾','Paraguay':'🇵🇾',
  'España':'🇪🇸','Francia':'🇫🇷','Portugal':'🇵🇹','Alemania':'🇩🇪',
  'Inglaterra':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Países Bajos':'🇳🇱','Bélgica':'🇧🇪','Croacia':'🇭🇷',
  'Japón':'🇯🇵','Arabia Saudita':'🇸🇦','Irán':'🇮🇷','Australia':'🇦🇺',
};

// INICIO FIFA 2026: 11 junio 2026
const FECHA_INICIO = new Date('2026-06-11');

// ---- ESTADO ----
let supabase = null;
let usuarioActual = null;
let predicciones = {};
let campeon = null;
let clasificados = {};
let participantes = [];

// ---- SUPABASE ----
async function conectarSupabase() {
  const url = document.getElementById('sb-url').value.trim();
  const key = document.getElementById('sb-key').value.trim();
  if (!url || !key) { alert('Ingresa la URL y la Publishable key de Supabase.'); return; }

  try {
    // SDK cargado en el HTML — compatible con publishable key y anon key
    const client = window.supabase || window.supabaseJs;
    if (!client) throw new Error('SDK de Supabase no disponible');
    supabase = client.createClient(url, key);
    // Test conexión
    const { error } = await supabase.from('participantes').select('id').limit(1);
    if (error) throw error;
    document.getElementById('sb-status').innerHTML =
      '<span class="connected-badge"><span class="dot"></span> Conectado a Supabase</span>';
    // Guardar credenciales en localStorage para no tener que volver a ingresarlas
    localStorage.setItem('sb_url', url);
    localStorage.setItem('sb_key', key);
    await cargarParticipantes();
  } catch(e) {
    document.getElementById('sb-status').textContent = 'Error al conectar: ' + (e.message || e);
    supabase = null;
  }
}

// ---- DÍAS AL INICIO ----
function calcDias() {
  const hoy = new Date();
  const diff = Math.ceil((FECHA_INICIO - hoy) / (1000*60*60*24));
  const val = diff > 0 ? diff : 0;
  const els = document.querySelectorAll('#dias-restantes, #stat-dias');
  els.forEach(el => { if(el) el.textContent = val; });
}

// ---- NAVEGACIÓN ----
function goSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  event.target.classList.add('active');
  if (id === 'ranking') renderRanking();
  if (id === 'admin')   renderAdmin();
}

// ---- REGISTRO ----
async function registrar() {
  const nombre  = document.getElementById('r-nombre').value.trim();
  const email   = document.getElementById('r-email').value.trim();
  const tel     = document.getElementById('r-tel').value.trim();
  const cliente = document.getElementById('r-cliente').value.trim();
  const favorito= document.getElementById('r-favorito').value;

  if (!nombre || !email) {
    mostrarAlerta('reg-alert', 'error', 'Por favor ingresa nombre y correo.');
    return;
  }

  const btn = document.getElementById('btn-registro');
  btn.innerHTML = '<span class="loading"></span> Registrando...';
  btn.disabled = true;

  const datos = { nombre, email, tel, cliente, favorito, fecha: new Date().toISOString() };

  if (supabase) {
    const { data, error } = await supabase.from('participantes').insert([datos]).select();
    if (error) {
      mostrarAlerta('reg-alert', 'error', 'Error al registrar: ' + error.message);
      btn.innerHTML = 'Registrarme en la quiniela'; btn.disabled = false; return;
    }
    usuarioActual = data[0];
  } else {
    // Modo local
    datos.id = Date.now();
    const local = JSON.parse(localStorage.getItem('participantes') || '[]');
    local.push(datos);
    localStorage.setItem('participantes', JSON.stringify(local));
    usuarioActual = datos;
  }

  participantes.push(usuarioActual);
  actualizarContadores();
  mostrarUsuario(nombre);
  mostrarAlerta('reg-alert', 'success', `¡Bienvenido ${nombre}! Ve a "Mis predicciones" para llenar tu quiniela.`);
  btn.innerHTML = 'Registrado ✓'; btn.disabled = false;
}

function mostrarUsuario(nombre) {
  const ini = nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('user-initials').textContent = ini;
  document.getElementById('user-name-header').textContent = nombre.split(' ')[0];
  document.getElementById('user-chip').classList.add('visible');
}

// ---- CARGAR PARTICIPANTES ----
async function cargarParticipantes() {
  if (supabase) {
    const { data } = await supabase.from('participantes').select('*');
    participantes = data || [];
  } else {
    participantes = JSON.parse(localStorage.getItem('participantes') || '[]');
  }
  actualizarContadores();
  renderRanking();
}

function actualizarContadores() {
  const n = participantes.length;
  const els = document.querySelectorAll('#hero-participantes, #stat-total');
  els.forEach(el => { if(el) el.textContent = n; });
}

// ---- RENDERIZAR CAMPEÓN ----
function renderCampeon() {
  const g = document.getElementById('campeon-grid');
  if (!g) return;
  g.innerHTML = FAVORITOS.map(eq => `
    <button class="camp-btn${campeon===eq.n?' sel':''}" onclick="selCampeon('${eq.n}')">
      <span class="flag-txt">${eq.f}</span>
      <span>${eq.n}</span>
    </button>`).join('');
}

function selCampeon(eq) {
  campeon = eq;
  renderCampeon();
}

// ---- RENDERIZAR PARTIDOS ----
function renderPartidos() {
  const c = document.getElementById('partidos-container');
  if (!c) return;
  let html = ''; let grupoActual = '';
  PARTIDOS.forEach((p, i) => {
    if (p.g !== grupoActual) {
      grupoActual = p.g;
      html += `<div class="grupo-label">Grupo ${p.g}</div>`;
    }
    const pred = predicciones[i] || null;
    html += `<div class="partido-row">
      <div class="equipo-local">${FLAGS[p.local]||''} ${p.local}</div>
      <div class="pred-wrap">
        <button class="pred-btn${pred==='L'?' sel-L':''}" onclick="selPred(${i},'L')" title="Gana ${p.local}">L</button>
        <button class="pred-btn${pred==='E'?' sel-E':''}" onclick="selPred(${i},'E')" title="Empate">E</button>
        <button class="pred-btn${pred==='V'?' sel-V':''}" onclick="selPred(${i},'V')" title="Gana ${p.visita}">V</button>
      </div>
      <div class="equipo-visita">${p.visita} ${FLAGS[p.visita]||''}</div>
    </div>`;
  });
  c.innerHTML = html;
  actualizarProgreso();
}

function selPred(i, v) {
  predicciones[i] = v;
  renderPartidos();
}

function actualizarProgreso() {
  const total = PARTIDOS.length;
  const done  = Object.keys(predicciones).length;
  const pct   = Math.round(done / total * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-txt').textContent = `${done} de ${total} partidos predichos`;
  document.getElementById('q-save-status').textContent =
    done === total ? '¡Lista para guardar!' : `Faltan ${total - done} partidos`;
}

// ---- GUARDAR QUINIELA ----
async function guardarQuiniela() {
  if (!usuarioActual) {
    mostrarAlerta('q-alert', 'error', 'Primero regístrate en la sección "Registro".');
    return;
  }
  const done = Object.keys(predicciones).length;
  if (done < PARTIDOS.length) {
    mostrarAlerta('q-alert', 'error', `Faltan ${PARTIDOS.length - done} partidos por predecir.`);
    return;
  }
  if (!campeon) {
    mostrarAlerta('q-alert', 'error', 'Selecciona el campeón del torneo.');
    return;
  }

  const datos = {
    participante_id: usuarioActual.id,
    predicciones: JSON.stringify(predicciones),
    campeon,
    fecha: new Date().toISOString(),
  };

  if (supabase) {
    const { error } = await supabase.from('quinielas').upsert([datos]);
    if (error) { mostrarAlerta('q-alert', 'error', 'Error: ' + error.message); return; }
  } else {
    localStorage.setItem('quiniela_' + usuarioActual.id, JSON.stringify(datos));
  }
  mostrarAlerta('q-alert', 'success', `¡Quiniela guardada! Campeón elegido: ${FLAGS[campeon]||''} ${campeon}`);
}

// ---- CLASIFICADOS ----
function renderClasificados() {
  const g = document.getElementById('clas-grid');
  if (!g) return;
  g.innerHTML = Object.keys(GRUPOS).map(gr => {
    const equipos = GRUPOS[gr];
    const sel = clasificados[gr] || [];
    return `<div class="clas-grupo">
      <div class="clas-grupo-title">Grupo ${gr}</div>
      ${equipos.map(eq => `
        <label class="clas-check">
          <input type="checkbox" onchange="togClasif('${gr}','${eq}',this)" ${sel.includes(eq)?'checked':''}>
          ${FLAGS[eq]||''} ${eq}
        </label>`).join('')}
    </div>`;
  }).join('');
}

function togClasif(gr, eq, el) {
  if (!clasificados[gr]) clasificados[gr] = [];
  if (el.checked) {
    if (clasificados[gr].length >= 2) {
      el.checked = false;
      alert('Solo puedes elegir 2 equipos por grupo.');
      return;
    }
    clasificados[gr].push(eq);
  } else {
    clasificados[gr] = clasificados[gr].filter(e => e !== eq);
  }
}

async function guardarClasificados() {
  if (!usuarioActual) {
    mostrarAlerta('clas-alert', 'error', 'Primero regístrate.');
    return;
  }
  const incompletos = Object.keys(GRUPOS).filter(g => !clasificados[g] || clasificados[g].length < 2);
  if (incompletos.length) {
    mostrarAlerta('clas-alert', 'error', 'Faltan clasificados del grupo: ' + incompletos.join(', '));
    return;
  }

  const datos = {
    participante_id: usuarioActual.id,
    clasificados: JSON.stringify(clasificados),
    fecha: new Date().toISOString(),
  };

  if (supabase) {
    const { error } = await supabase.from('clasificados').upsert([datos]);
    if (error) { mostrarAlerta('clas-alert', 'error', 'Error: ' + error.message); return; }
  } else {
    localStorage.setItem('clasificados_' + usuarioActual.id, JSON.stringify(datos));
  }
  mostrarAlerta('clas-alert', 'success', '¡Clasificados guardados correctamente!');
}

// ---- RANKING (demo con datos de ejemplo) ----
const RANKING_DEMO = [
  {nombre:'Carlos Rodríguez', pts:42, campeon:'Brasil'},
  {nombre:'María González',   pts:39, campeon:'Argentina'},
  {nombre:'Andrés Morales',   pts:37, campeon:'Francia'},
  {nombre:'Sofía Castillo',   pts:35, campeon:'España'},
  {nombre:'Pedro Jiménez',    pts:33, campeon:'Brasil'},
  {nombre:'Luisa Ramos',      pts:31, campeon:'México'},
  {nombre:'Roberto Díaz',     pts:28, campeon:'Argentina'},
];

async function renderRanking() {
  let data = RANKING_DEMO;

  if (supabase) {
    const { data: rows } = await supabase
      .from('ranking_view')
      .select('*')
      .order('pts', { ascending: false })
      .limit(50);
    if (rows && rows.length) data = rows;
  }

  const c = document.getElementById('ranking-container');
  if (!c) return;

  c.innerHTML = data.map((p, i) => {
    const ini = p.nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const medal = i < 3 ? ' medal' : '';
    const pos = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i+1);
    return `<div class="ranking-row">
      <div class="rank-pos${medal}">${pos}</div>
      <div class="rank-avatar">${ini}</div>
      <div class="rank-name">${p.nombre}</div>
      <div class="rank-camp">${FLAGS[p.campeon]||''} ${p.campeon}</div>
      <div class="rank-pts">${p.pts}<span class="pts-lbl">pts</span></div>
    </div>`;
  }).join('');

  document.getElementById('stat-total').textContent = participantes.length || data.length;
}

// ---- ADMIN ----
function renderAdmin() {
  const local = JSON.parse(localStorage.getItem('participantes') || '[]');
  const data  = participantes.length ? participantes : local;
  const c = document.getElementById('admin-table');
  if (!c) return;

  if (!data.length) {
    c.innerHTML = '<p style="color:var(--texto-muted);font-size:13px">Sin participantes registrados aún.</p>';
    return;
  }

  c.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-weight:600;font-size:11px;text-transform:uppercase">#</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-weight:600;font-size:11px;text-transform:uppercase">Nombre</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-weight:600;font-size:11px;text-transform:uppercase">Correo</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-weight:600;font-size:11px;text-transform:uppercase">Cliente</th>
      <th style="text-align:left;padding:6px 8px;color:var(--texto-muted);font-weight:600;font-size:11px;text-transform:uppercase">Favorito</th>
    </tr></thead>
    <tbody>
      ${data.map((p,i) => `<tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
        <td style="padding:8px;color:var(--texto-muted)">${i+1}</td>
        <td style="padding:8px;font-weight:500">${p.nombre}</td>
        <td style="padding:8px;color:var(--texto-muted)">${p.email}</td>
        <td style="padding:8px">${p.cliente||'—'}</td>
        <td style="padding:8px">${FLAGS[p.favorito]||''} ${p.favorito||'—'}</td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

function exportarCSV() {
  const local = JSON.parse(localStorage.getItem('participantes') || '[]');
  const data  = participantes.length ? participantes : local;
  if (!data.length) { alert('Sin datos para exportar.'); return; }

  const cols = ['nombre','email','tel','cliente','favorito','fecha'];
  const csv  = [cols.join(','),
    ...data.map(r => cols.map(c => `"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'participantes_quiniela2026.csv';
  a.click(); URL.revokeObjectURL(url);
}

// ---- CONFIG ----
function aplicarConfig() {
  const empresa = document.getElementById('cfg-empresa').value.trim();
  const color   = document.getElementById('cfg-color').value.trim();

  if (empresa) {
    document.getElementById('empresa-label').textContent = empresa;
    localStorage.setItem('cfg_empresa', empresa);
  }
  if (color && /^#[0-9a-fA-F]{6}$/.test(color)) {
    document.documentElement.style.setProperty('--verde', color);
    localStorage.setItem('cfg_color', color);
  }
  alert('¡Configuración aplicada!');
}

// ---- UTILITARIOS ----
function mostrarAlerta(id, tipo, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert ' + tipo;
  el.textContent = msg;
  setTimeout(() => { el.className = 'alert'; }, 6000);
}

// ---- INIT ----
function init() {
  calcDias();
  renderCampeon();
  renderPartidos();
  renderClasificados();
  cargarParticipantes();

  // Restaurar config guardada
  const emp = localStorage.getItem('cfg_empresa');
  const col = localStorage.getItem('cfg_color');
  if (emp) { document.getElementById('empresa-label').textContent = emp; document.getElementById('cfg-empresa').value = emp; }
  if (col) { document.documentElement.style.setProperty('--verde', col); document.getElementById('cfg-color').value = col; }

  // Restaurar credenciales de Supabase si ya fueron ingresadas antes
  const sbUrl = localStorage.getItem('sb_url');
  const sbKey = localStorage.getItem('sb_key');
  if (sbUrl && sbKey) {
    document.getElementById('sb-url').value = sbUrl;
    document.getElementById('sb-key').value = sbKey;
    conectarSupabase();
  }
}

document.addEventListener('DOMContentLoaded', init);
