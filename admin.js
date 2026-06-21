// =============================================
// ADMIN.JS — Quiniela FIFA 2026
// Business IT
// =============================================

// La API key de football-data.org ya NO vive en el frontend.
// Se consume vía la Edge Function 'football-proxy' (key como secreto del servidor).

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
  if (id === 'ranking') renderAdminRanking();
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
      <tr style="border-bottom:1px solid rgba(0,0,0,0.05);${p.oculto?'opacity:.55':''}">
        <td style="padding:7px;color:var(--muted)">${i + 1}</td>
        <td style="padding:7px;font-weight:500">${p.nombre || '—'}${p.oculto?' <span style="font-size:9px;background:#eee;color:#777;padding:1px 6px;border-radius:8px;font-weight:700">PRUEBA</span>':''}</td>
        <td style="padding:7px;color:var(--verde);font-weight:700">${p.alias || '—'}</td>
        <td style="padding:7px;color:var(--muted)">${p.email || '—'}</td>
        <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo || '—'}</td>
        <td style="padding:7px;display:flex;gap:8px;flex-wrap:wrap">
          <span style="color:var(--verde);font-size:12px;font-weight:600;cursor:pointer" onclick="verPerfil('${p.id}')">Ver →</span>
          <span style="color:${p.oculto?'#1a8c48':'#7a5500'};font-size:12px;font-weight:600;cursor:pointer" onclick="toggleOcultoParticipante('${p.id}',${p.oculto?true:false})">${p.oculto?'👁 Mostrar':'🚫 Ocultar'}</span>
          <span style="color:#c0392b;font-size:12px;font-weight:600;cursor:pointer" onclick="borrarParticipante('${p.id}')">✕ Borrar</span>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

// Oculta/muestra un participante del ranking público (para usuarios de prueba)
async function toggleOcultoParticipante(id, actual) {
  if (!sbClient) { alert('Conecta Supabase primero.'); return; }
  const { data, error } = await sbClient.from('participantes').update({ oculto: !actual }).eq('id', id).select();
  if (error) { alert('Error: ' + error.message); return; }
  if (!data || !data.length) { alert('No se pudo actualizar. Falta el campo `oculto` o la política UPDATE en `participantes` (corre sql/ocultar_participante.sql).'); return; }
  const p = participantes.find(x => String(x.id) === String(id));
  if (p) p.oculto = !actual;
  renderAdminParticipantes();
}

// ============================================================
// RANKING (admin) — con nombre, alias y correo de cada jugador
// ============================================================
let _adminRanking = [];
async function renderAdminRanking() {
  const c = document.getElementById('admin-ranking-table'); if (!c) return;
  if (!sbClient) { c.innerHTML = '<p style="color:var(--muted);font-size:13px">Conecta Supabase para ver el ranking.</p>'; return; }
  c.innerHTML = '<p style="color:var(--muted);font-size:13px">Calculando puntos…</p>';
  const resultados = await cargarResultadosReales();              // de app.js
  const { data: qs } = await sbClient.from('quinielas').select('*');
  const qmap = {}; (qs || []).forEach(q => { qmap[String(q.participante_id)] = q; });
  _adminRanking = participantes.map(p => {
    const q = qmap[String(p.id)];
    let pts = 0, exactos = 0, correctos = 0, fallos = 0, gol = p.favorito || null, done = 0;
    if (q) {
      const preds = parseMaybeJSON(q.predicciones, {});
      const brac = parseMaybeJSON(q.bracket, {});
      gol = q.goleador || null;
      const r = calcPuntosConDesglose(preds, brac, gol, resultados);
      pts = r.total; exactos = r.exactos; correctos = r.correctos; fallos = r.fallos;
      done = PARTIDOS.filter(x => { const pr = preds[x.id]; return pr && pr.l !== undefined && pr.v !== undefined; }).length;
    }
    return { id: p.id, nombre: p.nombre || '', alias: p.alias || '', email: p.email || '', codigo: p.codigo || '', oculto: !!p.oculto, gol, pts, done, exactos, correctos, fallos };
  }).sort((a, b) => b.pts - a.pts);
  if (!_adminRanking.length) { c.innerHTML = '<p style="color:var(--muted);font-size:13px">Sin participantes registrados.</p>'; return; }
  c.innerHTML = `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:640px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      ${['#', 'Nombre', 'Alias', 'Correo', 'País goleador', 'Pred.', 'Puntos'].map(h => `<th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">${h}</th>`).join('')}
    </tr></thead><tbody>
    ${_adminRanking.map((r, i) => `
      <tr style="border-bottom:1px solid rgba(0,0,0,0.05);${r.oculto ? 'opacity:.55' : ''}">
        <td style="padding:7px;font-weight:700;color:${i < 3 ? 'var(--oro)' : 'var(--muted)'}">${i + 1}</td>
        <td style="padding:7px;font-weight:500">${r.nombre || '—'}${r.oculto ? ' <span style="font-size:9px;background:#eee;color:#777;padding:1px 6px;border-radius:8px;font-weight:700">PRUEBA</span>' : ''}</td>
        <td style="padding:7px;color:var(--verde);font-weight:700">${r.alias || '—'}</td>
        <td style="padding:7px;color:var(--muted)">${r.email || '—'}</td>
        <td style="padding:7px">${r.gol ? flagBadge(r.gol, 14) + ' ' + r.gol : '—'}</td>
        <td style="padding:7px;color:var(--muted)">${r.done}/${PARTIDOS.length}</td>
        <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:var(--verde)">${r.pts}</td>
      </tr>`).join('')}
    </tbody></table></div>`;
}

function exportarRankingCSV() {
  if (!_adminRanking.length) { alert('Abre el ranking primero (botón Actualizar).'); return; }
  const cols = ['Pos', 'Nombre', 'Alias', 'Correo', 'Codigo', 'Pais goleador', 'Predichos', 'Exactos', 'Correctos', 'Fallos', 'Puntos', 'Oculto'];
  const rows = _adminRanking.map((r, i) => [i + 1, r.nombre, r.alias, r.email, r.codigo, r.gol || '', r.done, r.exactos, r.correctos, r.fallos, r.pts, r.oculto ? 'si' : 'no']);
  const csv = [cols.join(','), ...rows.map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); a.download = 'ranking_quiniela2026.csv'; a.click();
}

function activarDemoAdmin() {
  activarDemo();
  renderAdminParticipantes();
}

// ============================================================
// RESULTADOS OFICIALES
// ============================================================
function initResultadosOficiales() {
  cargarResultadosOficialesSupabase();
  renderResGrupoTabs();
  renderResPartidos();
  renderResBracket();
}

function renderResBracket(){
  const c=document.getElementById('res-bracket-container');if(!c)return;
  let html='';
  BRACKET_RONDAS.forEach(ronda=>{
    html+=`<div style="margin-bottom:1rem">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--oro);margin-bottom:.5rem;padding-bottom:.4rem;border-bottom:1px solid var(--borde)">${ronda.nombre}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">`;
    ronda.partidos.forEach(m=>{
      const r=resultadosOficiales['b'+m.bid]||{};
      const gl=r.gl!==undefined?r.gl:'';
      const gv=r.gv!==undefined?r.gv:'';
      const ganador=r.ganador||'';
      // Equipos del bracket actual
      const lTeam=r.lTeam||'Local';
      const vTeam=r.vTeam||'Visitante';
      html+=`<div style="background:#fafafa;border:1.5px solid var(--borde);border-radius:8px;padding:8px 10px">
        <div style="font-size:9px;color:var(--muted);font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px">Partido ${m.bid} — ${m.desc}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="font-size:11px;font-weight:600;flex:1">${lTeam}</span>
          <input type="number" min="0" max="20" value="${gl}" placeholder="0" style="width:40px;height:30px;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;border:1.5px solid var(--borde);border-radius:5px;padding:0" oninput="setResOficialBracket(${m.bid},'gl',this.value,'${lTeam}','${vTeam}')">
          <span style="color:var(--muted);font-weight:700">–</span>
          <input type="number" min="0" max="20" value="${gv}" placeholder="0" style="width:40px;height:30px;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;border:1.5px solid var(--borde);border-radius:5px;padding:0" oninput="setResOficialBracket(${m.bid},'gv',this.value,'${lTeam}','${vTeam}')">
          <span style="font-size:11px;font-weight:600;flex:1;text-align:right">${vTeam}</span>
        </div>
        <div style="font-size:10px;color:var(--muted)">
          Ganador: <select style="font-size:11px;border:1px solid var(--borde);border-radius:4px;padding:2px 4px" onchange="setResOficialBracketGanador(${m.bid},this.value)">
            <option value="">Seleccionar</option>
            <option value="${lTeam}"${ganador===lTeam?' selected':''}>${lTeam}</option>
            <option value="${vTeam}"${ganador===vTeam?' selected':''}>${vTeam}</option>
          </select>
        </div>
      </div>`;
    });
    html+=`</div></div>`;
  });
  c.innerHTML=html||'<p style="color:var(--muted);font-size:13px">Completa el bracket en 2da Ronda primero para ver los equipos aquí.</p>';
}

function setResOficialBracket(bid,lado,val,lTeam,vTeam){
  const num=parseInt(val,10);
  if(!resultadosOficiales['b'+bid])resultadosOficiales['b'+bid]={lTeam,vTeam,ganador:''};
  if(!isNaN(num)&&num>=0)resultadosOficiales['b'+bid][lado]=num;
  const r=resultadosOficiales['b'+bid];
  if(r.gl!==undefined&&r.gv!==undefined&&r.gl!==r.gv){
    r.ganador=r.gl>r.gv?lTeam:vTeam;
    renderResBracket();
  }
}

function setResOficialBracketGanador(bid,ganador){
  if(!resultadosOficiales['b'+bid])resultadosOficiales['b'+bid]={};
  resultadosOficiales['b'+bid].ganador=ganador;
}

async function cargarResultadosOficialesSupabase() {
  if (!sbClient) return;
  const { data } = await sbClient.from('resultados_reales').select('*');
  if (data) {
    data.forEach(r => {
      if (r.partido_idx === 0) {
        const sel = document.getElementById('res-goleador-oficial');
        if (sel && r.ganador) sel.value = r.ganador;
      } else if (r.partido_idx >= 1000) {
        // Resultado de bracket
        const bid = r.partido_idx - 1000;
        resultadosOficiales['b'+bid] = { gl: r.goles_local, gv: r.goles_visita, ganador: r.ganador||'' };
      } else {
        resultadosOficiales[r.partido_idx] = { l: r.goles_local, v: r.goles_visita };
      }
    });
    renderResGrupoTabs();
    renderResPartidos();
    renderResBracket();
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
  // Goleador oficial (partido_idx=0)
  const goleadorOficial = document.getElementById('res-goleador-oficial')?.value;
  if (goleadorOficial) rows.push({ partido_idx: 0, goles_local: 0, goles_visita: 0, ganador: goleadorOficial });
  // Partidos de grupos
  Object.entries(resultadosOficiales).forEach(([id, r]) => {
    if (id.startsWith('b')) return; // skip bracket
    if (r.l !== undefined && r.v !== undefined) {
      rows.push({ partido_idx: parseInt(id), goles_local: r.l, goles_visita: r.v });
    }
  });
  // Partidos de bracket (partido_idx = 1000+bid para diferenciar)
  Object.entries(resultadosOficiales).forEach(([id, r]) => {
    if (!id.startsWith('b')) return;
    const bid = parseInt(id.slice(1));
    if (r.gl !== undefined && r.gv !== undefined) {
      rows.push({ partido_idx: 1000+bid, goles_local: r.gl, goles_visita: r.gv, ganador: r.ganador||null });
    }
  });
  if (!rows.length) { alertaAdmin('res-alert', 'error', 'No hay resultados para guardar.'); return; }
  // En vez de upsert (INSERT ... ON CONFLICT DO UPDATE, que choca con sql_safe_updates),
  // borramos los partidos que vamos a escribir y los reinsertamos. El delete lleva
  // WHERE (.in) y el insert no tiene problema con el candado de safe-update.
  const idxs = rows.map(r => r.partido_idx);
  const { error: delErr } = await sbClient.from('resultados_reales').delete().in('partido_idx', idxs);
  if (delErr) { alertaAdmin('res-alert', 'error', 'Error al limpiar previos: ' + delErr.message); return; }
  const { data, error } = await sbClient.from('resultados_reales').insert(rows).select();
  if (error) { alertaAdmin('res-alert', 'error', 'Error: ' + error.message); return; }
  if (!data || !data.length) { alertaAdmin('res-alert', 'error', 'No se guardó nada: revisa las políticas INSERT/DELETE de `resultados_reales` (RLS) en Supabase.'); return; }
  alertaAdmin('res-alert', 'success', `${data.length} resultados guardados. El ranking ya los está usando.`);
}

async function borrarResultadosOficiales() {
  if (!sbClient) { alertaAdmin('res-alert', 'error', 'Conecta Supabase primero.'); return; }
  if (!confirm('¿Borrar TODOS los resultados oficiales de Supabase? La quiniela queda en blanco y los puntos vuelven a 0. Útil para pruebas.')) return;
  // Borrar todas las filas (.gte('id',0) lleva WHERE, evita el candado safe-update)
  const { data, error } = await sbClient.from('resultados_reales').delete().gte('id', 0).select();
  if (error) { alertaAdmin('res-alert', 'error', 'Error: ' + error.message); return; }
  // Limpiar memoria + UI
  resultadosOficiales = {};
  if (window._resOficiales) window._resOficiales = {};
  const golSel = document.getElementById('res-goleador-oficial');
  if (golSel) golSel.value = '';
  renderResGrupoTabs(); renderResPartidos(); renderResBracket();
  const n = data ? data.length : 0;
  if (!n) { alertaAdmin('res-alert', 'success', 'No había resultados que borrar (la tabla ya estaba en blanco).'); return; }
  alertaAdmin('res-alert', 'success', `${n} resultados borrados. La tabla quedó en blanco; el ranking volverá a 0.`);
}

// ============================================================
// API FOOTBALL-DATA.ORG
// ============================================================
async function cargarDesdeAPI() {
  if (!sbClient) { alertaAdmin('res-alert', 'error', 'Conecta Supabase primero.'); return; }
  alertaAdmin('res-alert', 'success', 'Consultando API...');
  try {
    // La key NO está en el frontend: se llama a la Edge Function 'football-proxy'
    // (la key vive como secreto del servidor). Ver supabase/functions/football-proxy.
    const { data, error } = await sbClient.functions.invoke('football-proxy');
    if (error) throw new Error('Edge Function football-proxy: ' + error.message + ' (¿está desplegada?)');
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
  let quinielas = [], codigos = [], configVisual = [], config = null, resultados = [];
  if (sbClient) {
    const [q, c, cv, cfg, r] = await Promise.all([
      sbClient.from('quinielas').select('*'),
      sbClient.from('codigos_participante').select('*'),
      sbClient.from('configuracion_visual').select('*'),
      sbClient.from('configuracion').select('*').limit(1).maybeSingle(),
      sbClient.from('resultados_reales').select('*'),
    ]);
    quinielas = q.data || [];
    codigos = c.data || [];
    configVisual = cv.data || [];
    config = cfg.data || null;
    resultados = r.data || [];
  }

  // Backup general (legible)
  const backup = {
    meta: { fecha: new Date().toISOString(), version: '7.0', total_participantes: participantes.length },
    participantes,
    quinielas: quinielas.map(q => ({
      participante_id: q.participante_id,
      predicciones: parseMaybeJSON(q.predicciones, {}),
      bracket: parseMaybeJSON(q.bracket, {}),
      goleador: q.goleador,
      puntos: q.puntos,
    })),
    resultados_oficiales: resultadosOficiales,
  };
  descargarJSON(backup, `backup_quiniela2026_${new Date().toISOString().slice(0,10)}.json`);

  // Backup reimportable (estructura exacta Supabase)
  const reimportable = {
    meta: { fecha: new Date().toISOString(), version: '7.0', instrucciones: 'Usar importarBackup() para restaurar' },
    tablas: {
      participantes,
      quinielas,
      codigos_participante: codigos,
      configuracion_visual: configVisual,
      configuracion: config ? [config] : [],
      resultados_reales: resultados,
    }
  };
  descargarJSON(reimportable, `backup_reimportable_${new Date().toISOString().slice(0,10)}.json`);
  alertaAdmin('backup-alert', 'success', `✅ Dos archivos descargados: backup general + backup reimportable para Supabase.`);
}

function descargarJSON(data, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  a.download = filename;
  a.click();
}

async function importarBackup() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    let data;
    try { data = JSON.parse(text); } catch { alertaAdmin('backup-alert','error','Archivo JSON inválido.'); return; }

    if (!data.tablas) { alertaAdmin('backup-alert','error','Este archivo no es un backup reimportable. Usa el archivo backup_reimportable_*.json'); return; }
    if (!sbClient) { alertaAdmin('backup-alert','error','Conecta Supabase primero.'); return; }
    if (!confirm(`¿Importar backup de ${data.meta?.fecha?.slice(0,10)}? Esto sobreescribirá los datos actuales.`)) return;

    alertaAdmin('backup-alert','success','Importando...');
    const tablas = data.tablas;
    try {
      // Restaurar en orden correcto
      if (tablas.participantes?.length) {
        await sbClient.from('participantes').upsert(tablas.participantes, { onConflict: 'id' });
      }
      if (tablas.codigos_participante?.length) {
        await sbClient.from('codigos_participante').upsert(tablas.codigos_participante, { onConflict: 'codigo' });
      }
      if (tablas.quinielas?.length) {
        await sbClient.from('quinielas').upsert(tablas.quinielas, { onConflict: 'participante_id' });
      }
      if (tablas.configuracion_visual?.length) {
        await sbClient.from('configuracion_visual').upsert(tablas.configuracion_visual, { onConflict: 'clave' });
      }
      if (tablas.resultados_reales?.length) {
        await sbClient.from('resultados_reales').upsert(tablas.resultados_reales, { onConflict: 'partido_idx' });
      }
      alertaAdmin('backup-alert','success',`✅ Backup importado exitosamente. Recarga la página para ver los datos.`);
    } catch(e) {
      alertaAdmin('backup-alert','error','Error importando: ' + e.message);
    }
  };
  input.click();
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
              // Si el valor guardado es HTML, extraer solo la URL
              const match = val.match(/src="([^"]+)"/);
              if (match) val = match[1];
              el.value = val;
            }
          }
        });
      }
    } catch(e) {}
  }

  // Fechas de cierre — mostrar en hora de Panamá (UTC-5) en el input
  const setFecha = (id, valor) => {
    const el = document.getElementById(id);
    if (el && valor) {
      const pan = new Date(new Date(valor).getTime() - 5 * 3600 * 1000);
      el.value = pan.toISOString().slice(0, 16);
    }
  };
  setFecha('cfg-fecha-cierre', configGlobal.fecha_cierre);
  setFecha('cfg-fecha-grupos', configGlobal.fecha_cierre_grupos);
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
      // Solo guardar imágenes desde URL validada (anti-XSS); urlImagenSegura viene de app.js
      const url = (typeof urlImagenSegura==='function') ? urlImagenSegura(val) : (val.startsWith('http')?val:null);
      if(!url){ alert(`Zona ${z}: usa una URL de imagen válida (http/https). No se permite HTML.`); return; }
      const html = `<img src="${url}" style="max-width:100%;height:auto;display:block;margin:0 auto">`;
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
async function loginAdmin() {
  const input = document.getElementById('admin-pass-input');
  const errEl = document.getElementById('login-error');
  if (!input) return;
  const pass = input.value.trim();
  if (!pass) return;

  // Verificación segura por RPC (hash bcrypt en el servidor; no hay contraseña en el frontend)
  let ok = false;
  if (!sbClient) {
    if (errEl) { errEl.style.display = ''; errEl.textContent = 'Sin conexión a Supabase.'; }
    return;
  }
  try {
    const { data, error } = await sbClient.rpc('verificar_admin', { p_pass: pass });
    if (error) { if (errEl) { errEl.style.display = ''; errEl.textContent = 'No se pudo verificar. Intenta de nuevo.'; } return; }
    ok = (data === true);
  } catch (e) {
    if (errEl) { errEl.style.display = ''; errEl.textContent = 'Error de verificación.'; }
    return;
  }

  if (ok) {
    // Login exitoso
    sessionStorage.setItem('adminAuth', '1');
    document.getElementById('admin-login-wall').style.display = 'none';
    document.getElementById('admin-content-wrap').style.display = '';
    document.getElementById('admin-nav').style.display = '';
    if (errEl) errEl.style.display = 'none';
    renderAdminParticipantes();
    cargarConfigAdmin();
  } else {
    if (errEl) { errEl.style.display = ''; errEl.textContent = 'Contraseña incorrecta'; }
    input.value = '';
    input.focus();
  }
}

async function initAdmin() {
  await cargarSDK();
  await autoConectar();
  await cargarConfiguracion();

  // Verificar si ya está autenticado en esta sesión
  if (sessionStorage.getItem('adminAuth') === '1') {
    document.getElementById('admin-login-wall').style.display = 'none';
    document.getElementById('admin-content-wrap').style.display = '';
    document.getElementById('admin-nav').style.display = '';
    renderAdminParticipantes();
    cargarConfigAdmin();
  }
  // Si no está autenticado, muestra el login wall (ya visible por defecto)

  // Cargar empresa label
  const emp = localStorage.getItem('cfg_empresa');
  if (emp) {
    const el = document.getElementById('empresa-label');
    if (el) el.textContent = emp;
  }
}

// (verificarPasswordAdmin / getAdminPass eliminados: el login ahora usa la RPC
//  verificar_admin con hash en el servidor; ya no hay contraseña en el frontend.)

document.addEventListener('DOMContentLoaded', initAdmin);
