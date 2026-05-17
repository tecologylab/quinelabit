// =============================================
// ADMIN.JS — Quiniela FIFA 2026
// Business IT
// =============================================

const FOOTBALL_API_KEY = 'f82a29de770a432ebe388346a80416a5';
const FOOTBALL_API_URL = 'https://api.football-data.org/v4';
const FIFA_2026_ID = 2000; // ID del Mundial FIFA 2026 en football-data.org

let resGrupoActivo = 'A';
let resultadosOficiales = {}; // {partidoId: {l, v}}

// ============================================================
// NAVEGACION TABS
// ============================================================
function showTab(id, btn) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.anav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  if (id === 'participantes') renderAdminParticipantes();
  if (id === 'codigos') cargarCodigos();
  if (id === 'resultados') initResultadosOficiales();
  if (id === 'simulador') initSimulador();
  if (id === 'configuracion') cargarConfigAdmin();
}

// ============================================================
// PARTICIPANTES
// ============================================================
function renderAdminParticipantes() {
  const c = document.getElementById('admin-table'); if (!c) return;
  if (!participantes.length) { c.innerHTML = '<p style="color:var(--muted);font-size:13px">Sin participantes registrados.</p>'; return; }
  c.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">#</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Nombre</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Alias</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Correo</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Código</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Acciones</th>
    </tr></thead>
    <tbody>${participantes.map((p, i) => `
      <tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
        <td style="padding:7px;color:var(--muted)">${i + 1}</td>
        <td style="padding:7px;font-weight:500">${p.nombre || '—'}</td>
        <td style="padding:7px;color:var(--verde);font-weight:700">${p.alias || '—'}</td>
        <td style="padding:7px;color:var(--muted)">${p.email || '—'}</td>
        <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo || '—'}</td>
        <td style="padding:7px;display:flex;gap:8px">
          <span style="color:var(--verde);font-size:12px;font-weight:600;cursor:pointer" onclick="verPerfil('${p.id}')">Ver →</span>
          <span style="color:#c0392b;font-size:12px;font-weight:600;cursor:pointer" onclick="borrarParticipante('${p.id}')">✕ Borrar</span>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

function activarDemoAdmin() {
  activarDemo();
  renderAdminParticipantes();
}

// ============================================================
// RESULTADOS OFICIALES
// ============================================================
function initResultadosOficiales() {
  // Cargar resultados guardados en Supabase
  cargarResultadosOficialesSupabase();
  renderResGrupoTabs();
  renderResPartidos();
}

async function cargarResultadosOficialesSupabase() {
  if (!sbClient) return;
  const { data } = await sbClient.from('resultados_reales').select('*');
  if (data) {
    data.forEach(r => {
      if (r.partido_idx === 0) {
        // Goleador guardado con idx=0
        const sel = document.getElementById('res-goleador-oficial');
        if (sel && r.ganador) sel.value = r.ganador;
      } else {
        resultadosOficiales[r.partido_idx] = { l: r.goles_local, v: r.goles_visita };
      }
    });
    renderResGrupoTabs();
    renderResPartidos();
  }
}

function renderResGrupoTabs() {
  const c = document.getElementById('res-grupo-tabs'); if (!c) return;
  c.innerHTML = Object.keys(GRUPOS).map(g => {
    const done = PARTIDOS.filter(p => p.g === g && resultadosOficiales[p.id] !== undefined &&
      resultadosOficiales[p.id].l !== undefined && resultadosOficiales[p.id].v !== undefined).length;
    const total = PARTIDOS.filter(p => p.g === g).length;
    return `<button class="gtab${resGrupoActivo === g ? ' active' : ''}${done === total ? ' done' : ''}" onclick="selResGrupo('${g}')">${g}${done === total ? ' ✓' : ''}</button>`;
  }).join('');
}

function selResGrupo(g) { resGrupoActivo = g; renderResGrupoTabs(); renderResPartidos(); }

function renderResPartidos() {
  const c = document.getElementById('res-partidos-container'); if (!c) return;
  const ps = PARTIDOS.filter(p => p.g === resGrupoActivo);
  let html = ''; let fa = '';
  ps.forEach(p => {
    if (p.f !== fa) { fa = p.f; html += `<div class="flbl">${fmtFecha(p.f)} · ${p.h} ET</div>`; }
    const r = resultadosOficiales[p.id] || {};
    const lv = r.l !== undefined ? r.l : ''; const vv = r.v !== undefined ? r.v : '';
    const ok = r.l !== undefined && r.v !== undefined;
    html += `<div class="pcard${ok ? ' ok' : ''}">
      <div class="psede">${p.s}</div>
      <div class="prow">
        <div class="ecol">${flagBadge(p.l, 20)}<span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${r.l !== undefined ? ' v' : ''}" oninput="setResOficial(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${r.v !== undefined ? ' v' : ''}" oninput="setResOficial(${p.id},'v',this.value)">
        </div>
        <div class="ecol r"><span class="ename">${p.v}</span>${flagBadge(p.v, 20)}</div>
      </div>
    </div>`;
  });
  c.innerHTML = html;
}

function setResOficial(id, lado, val) {
  const num = parseInt(val, 10);
  if (!resultadosOficiales[id]) resultadosOficiales[id] = {};
  if (!isNaN(num) && num >= 0 && num <= 20) resultadosOficiales[id][lado] = num;
  else delete resultadosOficiales[id][lado];
  renderResGrupoTabs();
}

async function guardarResultadosOficiales() {
  if (!sbClient) { alertaAdmin('res-alert', 'error', 'Conecta Supabase primero.'); return; }
  const rows = [];
  // Guardar goleador oficial
  const goleadorOficial = document.getElementById('res-goleador-oficial')?.value;
  if (goleadorOficial) rows.push({ partido_idx: 0, goles_local: 0, goles_visita: 0, ganador: goleadorOficial });
  // Guardar partidos
  Object.entries(resultadosOficiales).forEach(([id, r]) => {
    if (r.l !== undefined && r.v !== undefined) {
      rows.push({ partido_idx: parseInt(id), goles_local: r.l, goles_visita: r.v });
    }
  });
  if (!rows.length) { alertaAdmin('res-alert', 'error', 'No hay resultados para guardar.'); return; }
  const { error } = await sbClient.from('resultados_reales').upsert(rows, { onConflict: 'partido_idx' });
  if (error) { alertaAdmin('res-alert', 'error', 'Error: ' + error.message); return; }
  alertaAdmin('res-alert', 'success', `${rows.length} resultados guardados en Supabase. Los puntos se actualizarán en el ranking.`);
}

// ============================================================
// API FOOTBALL-DATA.ORG
// ============================================================
async function cargarDesdeAPI() {
  alertaAdmin('res-alert', 'success', 'Consultando API...');
  try {
    // Usar un proxy via Supabase Edge Function para no exponer la key
    // Por ahora llamada directa (funciona en desarrollo)
    const res = await fetch(`${FOOTBALL_API_URL}/competitions/${FIFA_2026_ID}/matches?status=FINISHED`, {
      headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
    });
    if (!res.ok) throw new Error('Error API: ' + res.status);
    const data = await res.json();
    let count = 0;
    if (data.matches) {
      data.matches.forEach(m => {
        if (m.matchday && m.matchday <= 3) { // Solo fase de grupos
          const idLocal = buscarIdPartido(m.homeTeam.name, m.awayTeam.name);
          if (idLocal && m.score?.fullTime) {
            resultadosOficiales[idLocal] = {
              l: m.score.fullTime.home,
              v: m.score.fullTime.away
            };
            count++;
          }
        }
      });
    }
    renderResGrupoTabs(); renderResPartidos();
    alertaAdmin('res-alert', 'success', `${count} resultados cargados desde la API. Revisa y guarda en Supabase.`);
  } catch (e) {
    alertaAdmin('res-alert', 'error', 'Error al consultar API: ' + e.message + '. Verifica la API key o usa el modo manual.');
  }
}

function buscarIdPartido(homeAPI, awayAPI) {
  // Mapeo básico de nombres de API a nombres en nuestra app
  const mapeo = {
    'Mexico': ['Mexico', 'México'],
    'Germany': ['Alemania'],
    'France': ['Francia'],
    'Spain': ['Espana', 'España'],
    'Brazil': ['Brasil'],
    'Argentina': ['Argentina'],
    'England': ['Inglaterra'],
    'Portugal': ['Portugal'],
    'Netherlands': ['Paises Bajos'],
    'Belgium': ['Belgica', 'Bélgica'],
    'Uruguay': ['Uruguay'],
    'Colombia': ['Colombia'],
    'USA': ['EEUU'],
    'Canada': ['Canada'],
    'Japan': ['Japon'],
    'South Korea': ['Corea del Sur'],
    'Morocco': ['Marruecos'],
    'Senegal': ['Senegal'],
    'Ecuador': ['Ecuador'],
    'Panama': ['Panama'],
  };
  const encontrarNombre = (apiName) => {
    for (const [k, v] of Object.entries(mapeo)) {
      if (apiName.includes(k) || v.some(n => apiName.includes(n))) return v[0];
    }
    return apiName;
  };
  const localNombre = encontrarNombre(homeAPI);
  const visitaNombre = encontrarNombre(awayAPI);
  const partido = PARTIDOS.find(p =>
    (p.l === localNombre && p.v === visitaNombre) ||
    (p.l === visitaNombre && p.v === localNombre)
  );
  return partido?.id || null;
}

// ============================================================
// BACKUP COMPLETO
// ============================================================
async function exportarBackupCompleto() {
  alertaAdmin('backup-alert', 'success', 'Generando backup...');
  let quinielas = [];
  if (sbClient) {
    const { data } = await sbClient.from('quinielas').select('*');
    quinielas = data || [];
  }
  const backup = {
    fecha: new Date().toISOString(),
    version: '7.0',
    participantes: participantes,
    quinielas: quinielas.map(q => ({
      participante_id: q.participante_id,
      predicciones: parseMaybeJSON(q.predicciones, {}),
      bracket: parseMaybeJSON(q.bracket, {}),
      goleador: q.goleador,
      puntos: q.puntos,
      fecha: q.fecha
    })),
    resultados_oficiales: resultadosOficiales,
    total_participantes: participantes.length,
    total_quinielas: quinielas.length,
  };
  const json = JSON.stringify(backup, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  a.download = `backup_quiniela2026_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  alertaAdmin('backup-alert', 'success', `Backup generado: ${participantes.length} participantes, ${quinielas.length} quinielas.`);
}

// ============================================================
// CONFIGURACION ADMIN
// ============================================================
function cargarConfigAdmin() {
  // Cargar valores guardados en inputs
  const emp = localStorage.getItem('cfg_empresa');
  const col = localStorage.getItem('cfg_color');
  if (emp) { const el = document.getElementById('cfg-empresa'); if (el) el.value = emp; }
  if (col) { const el = document.getElementById('cfg-color'); if (el) el.value = col; }
  // Hero
  ['badge', 'titulo', 'subtitulo'].forEach(k => {
    const val = localStorage.getItem('hero_' + k);
    const el = document.getElementById('cfg-hero-' + k);
    if (val && el) el.value = val;
  });
  // Ads
  ['1', '2', '6'].forEach(z => {
    const val = localStorage.getItem('ad_zona' + z);
    const el = document.getElementById('ad-zona' + z + '-input');
    if (val && el) el.value = val;
  });
  // Premios
  for (let i = 1; i <= 3; i++) {
    const imgEl = document.getElementById('premio' + i + '-img');
    const descEl = document.getElementById('premio' + i + '-desc');
    if (imgEl) imgEl.value = localStorage.getItem('premio' + i + '_img') || '';
    if (descEl) descEl.value = localStorage.getItem('premio' + i + '_desc') || '';
  }
  // Fecha cierre
  if (configGlobal.fecha_cierre) {
    const el = document.getElementById('cfg-fecha-cierre');
    if (el) el.value = new Date(configGlobal.fecha_cierre).toISOString().slice(0, 16);
  }
  const editEl = document.getElementById('cfg-permitir-edicion');
  if (editEl) editEl.value = configGlobal.permitir_edicion ? 'true' : 'false';
}

// ============================================================
// SIMULADOR — Ranking visual
// ============================================================
function renderSimRanking() {
  const c = document.getElementById('sim-ranking-container'); if (!c) return;
  if (!rankingSimulado || !rankingSimulado.length) {
    c.innerHTML = '<p style="color:var(--muted);font-size:13px">Calcula los puntos para ver el ranking.</p>';
    return;
  }
  const data = rankingSimulado.filter(x => x && x.alias);
  c.innerHTML = data.map((p, i) => {
    const ini = (p.alias || p.nombre).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const pos = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
    return `<div class="rankrow">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;color:var(--muted);text-align:center">${pos}</div>
      <div class="rankavatar">${ini}</div>
      <div><div class="rankname">${p.alias || p.nombre}</div>
      ${p.desglose ? `<div style="font-size:10px;color:var(--muted)">✅${p.desglose.exactos} ⭐${p.desglose.correctos} ❌${p.desglose.fallos}</div>` : ''}
      </div>
      <div style="font-size:12px;color:var(--muted)">${p.goleador ? flagBadge(p.goleador, 14) + ' ' + p.goleador : '—'}</div>
      <div class="rankpts">${p.pts || 0}<span class="ptslbl">pts</span></div>
    </div>`;
  }).join('');
}

// Override calcularPuntosSimulados to also update admin ranking
const _calcOrig = calcularPuntosSimulados;
window.calcularPuntosSimulados = async function() {
  await _calcOrig();
  renderSimRanking();
};

// ============================================================
// UTILS ADMIN
// ============================================================
function alertaAdmin(id, tipo, msg) {
  const el = document.getElementById(id); if (!el) return;
  el.className = 'alert ' + tipo;
  el.textContent = msg;
  setTimeout(() => { el.className = 'alert'; }, 8000);
}

function fmtFecha(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('es-PA', { weekday: 'short', day: 'numeric', month: 'short' });
}

// ============================================================
// INIT ADMIN
// ============================================================
async function initAdmin() {
  // Cargar SDK y conectar Supabase (reutiliza funciones de app.js)
  await cargarSDK();
  await autoConectar();
  await cargarConfiguracion();
  renderAdminParticipantes();
  // Cargar config en inputs
  const emp = localStorage.getItem('cfg_empresa');
  if (emp) {
    const el = document.getElementById('empresa-label');
    if (el) el.textContent = emp;
  }
}

document.addEventListener('DOMContentLoaded', initAdmin);
