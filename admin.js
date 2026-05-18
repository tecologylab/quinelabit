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
async function cargarConfigAdmin() {
  // Cargar config visual desde Supabase
  if (sbClient) {
    try {
      const { data } = await sbClient.from('configuracion_visual').select('*');
      if (data) {
        data.forEach(r => {
          // Mapear clave a input ID
          const mapeo = {
            'cfg_empresa': 'cfg-empresa',
            'cfg_color': 'cfg-color',
            'hero_badge': 'cfg-hero-badge',
            'hero_titulo': 'cfg-hero-titulo',
            'hero_subtitulo': 'cfg-hero-subtitulo',
            'ad_zona1': 'ad-zona1-input',
            'ad_zona2': 'ad-zona2-input',
            'ad_zona6': 'ad-zona6-input',
            'premio1_img': 'premio1-img', 'premio1_desc': 'premio1-desc',
            'premio2_img': 'premio2-img', 'premio2_desc': 'premio2-desc',
            'premio3_img': 'premio3-img', 'premio3_desc': 'premio3-desc',
          };
          const inputId = mapeo[r.clave];
          if (inputId) {
            const el = document.getElementById(inputId);
            if (el) {
              let val = r.valor || '';
              const match = val.match(/src="([^"]+)"/);
              if (match) val = match[1];
              el.value = val;
            }
          }
        });
      }
    } catch(e) {}
  }

  // Fechas de cierre
  const setFecha = (id, valor) => {
    const el = document.getElementById(id);
    if (el && valor) el.value = new Date(valor).toISOString().slice(0, 16);
  };
  setFecha('cfg-fecha-cierre', configGlobal.fecha_cierre);
  setFecha('cfg-fecha-r32', configGlobal.fecha_cierre_r32);
  setFecha('cfg-fecha-r16', configGlobal.fecha_cierre_r16);
  setFecha('cfg-fecha-qf', configGlobal.fecha_cierre_qf);
  setFecha('cfg-fecha-sf', configGlobal.fecha_cierre_sf);
  setFecha('cfg-fecha-final', configGlobal.fecha_cierre_final);

  const editEl = document.getElementById('cfg-permitir-edicion');
  if (editEl) editEl.value = configGlobal.permitir_edicion ? 'true' : 'false';

  // Empresa label
  const emp = document.getElementById('cfg-empresa')?.value;
  const empLabel = document.getElementById('empresa-label');
  if (emp && empLabel) empLabel.textContent = emp;
}

// ============================================================
// CONFIGURACION VISUAL — Guardar en Supabase
// ============================================================
async function aplicarConfig() {
  const pares = [];
  const emp = document.getElementById('cfg-empresa')?.value.trim();
  const col = document.getElementById('cfg-color')?.value.trim();
  if (emp) pares.push({ clave: 'cfg_empresa', valor: emp });
  if (col && /^#[0-9a-fA-F]{6}$/.test(col)) pares.push({ clave: 'cfg_color', valor: col });
  ['badge','titulo','subtitulo'].forEach(k => {
    const val = document.getElementById('cfg-hero-' + k)?.value.trim();
    if (val) pares.push({ clave: 'hero_' + k, valor: val });
  });
  ['1','2','6'].forEach(z => {
    const val = document.getElementById('ad-zona' + z + '-input')?.value.trim();
    if (val) {
      const html = val.startsWith('http')||val.endsWith('.jpg')||val.endsWith('.png')
        ? `<img src="${val}" style="max-width:100%;height:auto;display:block;margin:0 auto">` : val;
      pares.push({ clave: 'ad_zona' + z, valor: html });
    }
  });
  for (let i = 1; i <= 3; i++) {
    const img = document.getElementById('premio' + i + '-img')?.value.trim() || '';
    const desc = document.getElementById('premio' + i + '-desc')?.value.trim() || '';
    pares.push({ clave: 'premio' + i + '_img', valor: img });
    pares.push({ clave: 'premio' + i + '_desc', valor: desc });
  }
  if (!pares.length) { alert('No hay cambios para guardar.'); return; }
  try {
    if (sbClient) {
      const { error } = await sbClient.from('configuracion_visual')
        .upsert(pares, { onConflict: 'clave' });
      if (error) throw error;
      alert('✅ Configuración guardada en Supabase. Todos los participantes verán los cambios.');
    } else {
      pares.forEach(p => { if(p.valor) localStorage.setItem(p.clave, p.valor); else localStorage.removeItem(p.clave); });
      alert('✅ Guardado localmente (sin conexión a Supabase).');
    }
  } catch(e) { alert('Error guardando: ' + e.message); }
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
  await cargarSDK();
  await autoConectar();
  await cargarConfiguracion();
  // Verificar password desde Supabase
  await verificarPasswordAdmin();
  renderAdminParticipantes();
  cargarConfigAdmin();
}

async function verificarPasswordAdmin() {
  // Obtener password guardado en Supabase (si existe)
  if (!sbClient) return;
  try {
    const { data } = await sbClient
      .from('configuracion')
      .select('admin_password')
      .limit(1)
      .maybeSingle();
    if (data?.admin_password) {
      // Actualizar ADMIN_PASS en memoria
      window._adminPassActual = data.admin_password;
    }
  } catch(e) {}
}

function getAdminPass() {
  return window._adminPassActual || 'BIT2026ADMIN';
}

document.addEventListener('DOMContentLoaded', initAdmin);
