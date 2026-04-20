// =============================================
// QUINIELA FIFA 2026 - app.js v3.0
// Business IT — Todas las funciones
// =============================================

const SB_URL = "https://zriyqyeoiommrnyvwjto.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXlxeWVvaW9tbXJueXZ3anRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzQ1ODMsImV4cCI6MjA5MjE1MDU4M30.fylrPptB3VpnkXw2qMxh2PgLPBpt5OvIjoPgOzTTjog";
const FECHA_INICIO = new Date('2026-06-11');

// =============================================
// DATOS
// =============================================
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

const ISO = {
  'Mexico':'mx','Sudafrica':'za','Corea del Sur':'kr','Chequia':'cz',
  'Canada':'ca','Bosnia-Herzegovina':'ba','Qatar':'qa','Suiza':'ch',
  'Brasil':'br','Marruecos':'ma','Haiti':'ht','Escocia':'gb-sct',
  'EEUU':'us','Paraguay':'py','Australia':'au','Turkiye':'tr',
  'Alemania':'de','Curazao':'cw','Costa de Marfil':'ci','Ecuador':'ec',
  'Paises Bajos':'nl','Japon':'jp','Suecia':'se','Tunez':'tn',
  'Belgica':'be','Egipto':'eg','Iran':'ir','Nueva Zelanda':'nz',
  'Espana':'es','Cabo Verde':'cv','Arabia Saudita':'sa','Uruguay':'uy',
  'Francia':'fr','Senegal':'sn','Iraq':'iq','Noruega':'no',
  'Argentina':'ar','Argelia':'dz','Austria':'at','Jordania':'jo',
  'Portugal':'pt','DR Congo':'cd','Uzbekistan':'uz','Colombia':'co',
  'Inglaterra':'gb-eng','Croacia':'hr','Ghana':'gh','Panama':'pa',
};

function flagImg(pais, size=22) {
  const code = ISO[pais];
  if (!code) return '';
  const h = Math.round(size * 0.67);
  return `<img src="https://flagcdn.com/w${size*2}/${code}.png" alt="${pais}" style="width:${size}px;height:${h}px;object-fit:cover;border-radius:2px;box-shadow:0 0 0 1px rgba(0,0,0,0.08);vertical-align:middle">`;
}

const TODOS_PAISES = Object.keys(ISO);

const PARTIDOS = [
  {id:1,g:'A',l:'Mexico',v:'Sudafrica',f:'2026-06-11',h:'15:00 ET',s:'Azteca, Cdmx'},
  {id:2,g:'A',l:'Corea del Sur',v:'Chequia',f:'2026-06-11',h:'22:00 ET',s:'Akron, Zapopan'},
  {id:3,g:'B',l:'Canada',v:'Bosnia-Herzegovina',f:'2026-06-12',h:'15:00 ET',s:'BMO Field, Toronto'},
  {id:4,g:'D',l:'EEUU',v:'Paraguay',f:'2026-06-12',h:'21:00 ET',s:'SoFi, Inglewood'},
  {id:5,g:'D',l:'Australia',v:'Turkiye',f:'2026-06-13',h:'00:00 ET',s:'BC Place, Vancouver'},
  {id:6,g:'B',l:'Qatar',v:'Suiza',f:'2026-06-13',h:'15:00 ET',s:"Levi's, Santa Clara"},
  {id:7,g:'C',l:'Brasil',v:'Marruecos',f:'2026-06-13',h:'18:00 ET',s:'MetLife, NJ'},
  {id:8,g:'C',l:'Haiti',v:'Escocia',f:'2026-06-13',h:'21:00 ET',s:'Gillette, Foxborough'},
  {id:9,g:'E',l:'Alemania',v:'Curazao',f:'2026-06-14',h:'13:00 ET',s:'NRG, Houston'},
  {id:10,g:'F',l:'Paises Bajos',v:'Japon',f:'2026-06-14',h:'16:00 ET',s:'AT&T, Arlington'},
  {id:11,g:'E',l:'Costa de Marfil',v:'Ecuador',f:'2026-06-14',h:'19:00 ET',s:'Lincoln Financial, Philadelphia'},
  {id:12,g:'F',l:'Suecia',v:'Tunez',f:'2026-06-14',h:'22:00 ET',s:'BBVA, Monterrey'},
  {id:13,g:'H',l:'Espana',v:'Cabo Verde',f:'2026-06-15',h:'12:00 ET',s:'Mercedes-Benz, Atlanta'},
  {id:14,g:'G',l:'Belgica',v:'Egipto',f:'2026-06-15',h:'15:00 ET',s:'Lumen Field, Seattle'},
  {id:15,g:'H',l:'Arabia Saudita',v:'Uruguay',f:'2026-06-15',h:'18:00 ET',s:'Hard Rock, Miami'},
  {id:16,g:'G',l:'Iran',v:'Nueva Zelanda',f:'2026-06-15',h:'21:00 ET',s:'SoFi, Inglewood'},
  {id:17,g:'I',l:'Francia',v:'Senegal',f:'2026-06-16',h:'15:00 ET',s:'MetLife, NJ'},
  {id:18,g:'I',l:'Iraq',v:'Noruega',f:'2026-06-16',h:'18:00 ET',s:'Gillette, Foxborough'},
  {id:19,g:'J',l:'Argentina',v:'Argelia',f:'2026-06-16',h:'21:00 ET',s:'Arrowhead, Kansas City'},
  {id:20,g:'J',l:'Austria',v:'Jordania',f:'2026-06-17',h:'00:00 ET',s:"Levi's, Santa Clara"},
  {id:21,g:'K',l:'Portugal',v:'DR Congo',f:'2026-06-17',h:'13:00 ET',s:'NRG, Houston'},
  {id:22,g:'L',l:'Inglaterra',v:'Croacia',f:'2026-06-17',h:'16:00 ET',s:'AT&T, Arlington'},
  {id:23,g:'L',l:'Ghana',v:'Panama',f:'2026-06-17',h:'19:00 ET',s:'BMO Field, Toronto'},
  {id:24,g:'K',l:'Uzbekistan',v:'Colombia',f:'2026-06-17',h:'22:00 ET',s:'Azteca, Cdmx'},
  {id:25,g:'A',l:'Chequia',v:'Sudafrica',f:'2026-06-18',h:'12:00 ET',s:'Mercedes-Benz, Atlanta'},
  {id:26,g:'B',l:'Suiza',v:'Bosnia-Herzegovina',f:'2026-06-18',h:'15:00 ET',s:'SoFi, Inglewood'},
  {id:27,g:'B',l:'Canada',v:'Qatar',f:'2026-06-18',h:'18:00 ET',s:'BC Place, Vancouver'},
  {id:28,g:'A',l:'Mexico',v:'Corea del Sur',f:'2026-06-18',h:'21:00 ET',s:'Akron, Zapopan'},
  {id:29,g:'D',l:'Turkiye',v:'Paraguay',f:'2026-06-19',h:'00:00 ET',s:"Levi's, Santa Clara"},
  {id:30,g:'D',l:'EEUU',v:'Australia',f:'2026-06-19',h:'15:00 ET',s:'Lumen Field, Seattle'},
  {id:31,g:'C',l:'Escocia',v:'Marruecos',f:'2026-06-19',h:'18:00 ET',s:'Gillette, Foxborough'},
  {id:32,g:'C',l:'Brasil',v:'Haiti',f:'2026-06-19',h:'21:00 ET',s:'Lincoln Financial, Philadelphia'},
  {id:33,g:'F',l:'Tunez',v:'Japon',f:'2026-06-20',h:'00:00 ET',s:'BBVA, Monterrey'},
  {id:34,g:'F',l:'Paises Bajos',v:'Suecia',f:'2026-06-20',h:'13:00 ET',s:'NRG, Houston'},
  {id:35,g:'E',l:'Alemania',v:'Costa de Marfil',f:'2026-06-20',h:'16:00 ET',s:'BMO Field, Toronto'},
  {id:36,g:'E',l:'Ecuador',v:'Curazao',f:'2026-06-20',h:'20:00 ET',s:'Arrowhead, Kansas City'},
  {id:37,g:'H',l:'Espana',v:'Arabia Saudita',f:'2026-06-21',h:'12:00 ET',s:'Mercedes-Benz, Atlanta'},
  {id:38,g:'G',l:'Belgica',v:'Iran',f:'2026-06-21',h:'15:00 ET',s:'SoFi, Inglewood'},
  {id:39,g:'H',l:'Uruguay',v:'Cabo Verde',f:'2026-06-21',h:'18:00 ET',s:'Hard Rock, Miami'},
  {id:40,g:'G',l:'Nueva Zelanda',v:'Egipto',f:'2026-06-21',h:'21:00 ET',s:'BC Place, Vancouver'},
  {id:41,g:'J',l:'Argentina',v:'Austria',f:'2026-06-22',h:'13:00 ET',s:'AT&T, Arlington'},
  {id:42,g:'I',l:'Francia',v:'Iraq',f:'2026-06-22',h:'17:00 ET',s:'Lincoln Financial, Philadelphia'},
  {id:43,g:'I',l:'Noruega',v:'Senegal',f:'2026-06-22',h:'20:00 ET',s:'MetLife, NJ'},
  {id:44,g:'J',l:'Jordania',v:'Argelia',f:'2026-06-22',h:'23:00 ET',s:"Levi's, Santa Clara"},
  {id:45,g:'K',l:'Portugal',v:'Uzbekistan',f:'2026-06-23',h:'13:00 ET',s:'NRG, Houston'},
  {id:46,g:'L',l:'Inglaterra',v:'Ghana',f:'2026-06-23',h:'16:00 ET',s:'Gillette, Foxborough'},
  {id:47,g:'L',l:'Panama',v:'Croacia',f:'2026-06-23',h:'19:00 ET',s:'BMO Field, Toronto'},
  {id:48,g:'K',l:'Colombia',v:'DR Congo',f:'2026-06-23',h:'22:00 ET',s:'Akron, Zapopan'},
  {id:49,g:'B',l:'Suiza',v:'Canada',f:'2026-06-24',h:'15:00 ET',s:'BC Place, Vancouver'},
  {id:50,g:'B',l:'Bosnia-Herzegovina',v:'Qatar',f:'2026-06-24',h:'15:00 ET',s:'Lumen Field, Seattle'},
  {id:51,g:'C',l:'Escocia',v:'Brasil',f:'2026-06-24',h:'18:00 ET',s:'Hard Rock, Miami'},
  {id:52,g:'C',l:'Marruecos',v:'Haiti',f:'2026-06-24',h:'18:00 ET',s:'Mercedes-Benz, Atlanta'},
  {id:53,g:'A',l:'Chequia',v:'Mexico',f:'2026-06-24',h:'21:00 ET',s:'Azteca, Cdmx'},
  {id:54,g:'A',l:'Sudafrica',v:'Corea del Sur',f:'2026-06-24',h:'21:00 ET',s:'BBVA, Monterrey'},
  {id:55,g:'E',l:'Curazao',v:'Costa de Marfil',f:'2026-06-25',h:'16:00 ET',s:'Lincoln Financial, Philadelphia'},
  {id:56,g:'E',l:'Ecuador',v:'Alemania',f:'2026-06-25',h:'16:00 ET',s:'MetLife, NJ'},
  {id:57,g:'F',l:'Japon',v:'Suecia',f:'2026-06-25',h:'19:00 ET',s:'AT&T, Arlington'},
  {id:58,g:'F',l:'Tunez',v:'Paises Bajos',f:'2026-06-25',h:'19:00 ET',s:'Arrowhead, Kansas City'},
  {id:59,g:'D',l:'Turkiye',v:'EEUU',f:'2026-06-25',h:'22:00 ET',s:'SoFi, Inglewood'},
  {id:60,g:'D',l:'Paraguay',v:'Australia',f:'2026-06-25',h:'22:00 ET',s:"Levi's, Santa Clara"},
  {id:61,g:'I',l:'Noruega',v:'Francia',f:'2026-06-26',h:'15:00 ET',s:'Gillette, Foxborough'},
  {id:62,g:'I',l:'Senegal',v:'Iraq',f:'2026-06-26',h:'15:00 ET',s:'BMO Field, Toronto'},
  {id:63,g:'H',l:'Cabo Verde',v:'Arabia Saudita',f:'2026-06-26',h:'20:00 ET',s:'NRG, Houston'},
  {id:64,g:'H',l:'Uruguay',v:'Espana',f:'2026-06-26',h:'20:00 ET',s:'Akron, Zapopan'},
  {id:65,g:'G',l:'Egipto',v:'Iran',f:'2026-06-26',h:'23:00 ET',s:'Lumen Field, Seattle'},
  {id:66,g:'G',l:'Nueva Zelanda',v:'Belgica',f:'2026-06-26',h:'23:00 ET',s:'BC Place, Vancouver'},
  {id:67,g:'L',l:'Panama',v:'Inglaterra',f:'2026-06-27',h:'17:00 ET',s:'MetLife, NJ'},
  {id:68,g:'L',l:'Croacia',v:'Ghana',f:'2026-06-27',h:'17:00 ET',s:'Lincoln Financial, Philadelphia'},
  {id:69,g:'K',l:'Colombia',v:'Portugal',f:'2026-06-27',h:'19:30 ET',s:'Hard Rock, Miami'},
  {id:70,g:'K',l:'DR Congo',v:'Uzbekistan',f:'2026-06-27',h:'19:30 ET',s:'Mercedes-Benz, Atlanta'},
  {id:71,g:'J',l:'Argelia',v:'Austria',f:'2026-06-27',h:'22:00 ET',s:'Arrowhead, Kansas City'},
  {id:72,g:'J',l:'Jordania',v:'Argentina',f:'2026-06-27',h:'22:00 ET',s:'AT&T, Arlington'},
];

// Bracket rondas
const RONDAS_BRACKET = [
  {id:'r32', nombre:'Ronda de 32', pts_exacto:6, pts_resultado:3, partidos:[
    {bid:73, desc:'2do A vs 2do B', grupos:['A','B']},
    {bid:74, desc:'1ro C vs 2do F', grupos:['C','F']},
    {bid:75, desc:'1ro E vs Mejor 3ro', grupos:['A','B','C','D','F']},
    {bid:76, desc:'1ro F vs 2do C', grupos:['F','C']},
    {bid:77, desc:'1ro I vs Mejor 3ro', grupos:['C','D','F','G','H']},
    {bid:78, desc:'2do E vs 2do I', grupos:['E','I']},
    {bid:79, desc:'1ro A vs Mejor 3ro', grupos:['C','E','F','H','I']},
    {bid:80, desc:'1ro L vs Mejor 3ro', grupos:['E','H','I','J','K']},
    {bid:81, desc:'1ro D vs Mejor 3ro', grupos:['B','E','F','I','J']},
    {bid:82, desc:'1ro G vs Mejor 3ro', grupos:['A','E','H','I','J']},
    {bid:83, desc:'2do K vs 2do L', grupos:['K','L']},
    {bid:84, desc:'1ro H vs 2do J', grupos:['H','J']},
    {bid:85, desc:'1ro B vs Mejor 3ro', grupos:['E','F','G','I','J']},
    {bid:86, desc:'1ro J vs 2do H', grupos:['J','H']},
    {bid:87, desc:'1ro K vs Mejor 3ro', grupos:['D','E','I','J','L']},
    {bid:88, desc:'2do D vs 2do G', grupos:['D','G']},
  ]},
  {id:'r16', nombre:'Ronda de 16', pts_exacto:8, pts_resultado:4, partidos:[
    {bid:89, desc:'Ganador M74 vs Ganador M77'},
    {bid:90, desc:'Ganador M73 vs Ganador M75'},
    {bid:91, desc:'Ganador M76 vs Ganador M78'},
    {bid:92, desc:'Ganador M79 vs Ganador M80'},
    {bid:93, desc:'Ganador M83 vs Ganador M84'},
    {bid:94, desc:'Ganador M81 vs Ganador M82'},
    {bid:95, desc:'Ganador M86 vs Ganador M88'},
    {bid:96, desc:'Ganador M85 vs Ganador M87'},
  ]},
  {id:'qf', nombre:'Cuartos de Final', pts_exacto:10, pts_resultado:5, partidos:[
    {bid:97, desc:'Ganador M89 vs Ganador M90'},
    {bid:98, desc:'Ganador M93 vs Ganador M94'},
    {bid:99, desc:'Ganador M91 vs Ganador M92'},
    {bid:100, desc:'Ganador M95 vs Ganador M96'},
  ]},
  {id:'sf', nombre:'Semifinales', pts_exacto:12, pts_resultado:6, partidos:[
    {bid:101, desc:'Ganador M97 vs Ganador M98', sede:'AT&T Stadium, Dallas'},
    {bid:102, desc:'Ganador M99 vs Ganador M100', sede:'Mercedes-Benz Stadium, Atlanta'},
  ]},
  {id:'final', nombre:'Final y 3er Lugar', pts_exacto:15, pts_resultado:8, partidos:[
    {bid:103, desc:'3er Lugar — Perdedor M101 vs Perdedor M102', sede:'Hard Rock Stadium, Miami'},
    {bid:104, desc:'FINAL — Ganador M101 vs Ganador M102', sede:'MetLife Stadium, Nueva Jersey'},
  ]},
];

// =============================================
// ESTADO
// =============================================
let sbClient = null;
let usuarioActual = null;
let modoDemo = false;
let predicciones = {};
let bracket = {};
let goleador = null;
let participantes = [];
let grupoActivo = 'A';

// =============================================
// SUPABASE
// =============================================
async function cargarSDK() {
  return new Promise(resolve => {
    if (window._sbSDK) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = () => { window._sbSDK = window.supabase; resolve(); };
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

// =============================================
// UTILIDADES
// =============================================
function calcDias() {
  const diff = Math.ceil((FECHA_INICIO - new Date()) / 86400000);
  const val = diff > 0 ? diff : 0;
  ['#dias-restantes','#stat-dias'].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = val;
  });
}

function fmtFecha(str) {
  return new Date(str+'T12:00:00').toLocaleDateString('es-PA',{weekday:'short',day:'numeric',month:'short'});
}

function alerta(id, tipo, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert '+tipo;
  el.textContent = msg;
  setTimeout(() => { el.className='alert'; }, 6000);
}

function goSec(id) {
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  event.target.classList.add('active');
  if (id==='ranking') renderRanking();
  if (id==='admin') renderAdmin();
  if (id==='segunda') renderBracket();
}

function showAuth(tab) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('form-reg').style.display = tab==='reg' ? '' : 'none';
  document.getElementById('form-login').style.display = tab==='login' ? '' : 'none';
}

// =============================================
// AUTH — REGISTRO
// =============================================
async function registrar() {
  const nombre  = document.getElementById('r-nombre').value.trim();
  const alias   = document.getElementById('r-alias').value.trim();
  const email   = document.getElementById('r-email').value.trim();
  const tel     = document.getElementById('r-tel').value.trim();
  const codigo  = document.getElementById('r-codigo').value.trim().toUpperCase();
  const favorito= document.getElementById('r-favorito').value;

  if (!nombre||!alias||!email||!codigo) {
    alerta('reg-alert','error','Por favor completa nombre, alias, correo y código de participante.');
    return;
  }

  const btn = document.getElementById('btn-reg');
  btn.innerHTML='<span class="loading"></span> Verificando...';
  btn.disabled=true;

  if (sbClient) {
    // Verificar que el código existe y no está usado
    const { data: cod, error: e1 } = await sbClient
      .from('codigos_participante')
      .select('*')
      .eq('codigo', codigo)
      .eq('usado', false)
      .single();

    if (e1 || !cod) {
      alerta('reg-alert','error','Código de participante inválido o ya utilizado.');
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }

    // Verificar email no duplicado
    const { data: ex } = await sbClient.from('participantes').select('id').eq('email', email).single();
    if (ex) {
      alerta('reg-alert','error','Este correo ya está registrado. Usa "Ya tengo cuenta".');
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }

    const { data, error: e2 } = await sbClient.from('participantes')
      .insert([{ nombre, alias, email, tel, codigo, favorito, fecha: new Date().toISOString() }])
      .select();

    if (e2) {
      alerta('reg-alert','error','Error: '+e2.message);
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }

    // Marcar código como usado
    await sbClient.from('codigos_participante').update({ usado: true }).eq('codigo', codigo);
    usuarioActual = data[0];
  } else {
    // Modo local
    const local = JSON.parse(localStorage.getItem('participantes')||'[]');
    if (local.find(p=>p.email===email)) {
      alerta('reg-alert','error','Este correo ya está registrado.');
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }
    const nuevo = { id: Date.now(), nombre, alias, email, tel, codigo, favorito, fecha: new Date().toISOString() };
    local.push(nuevo);
    localStorage.setItem('participantes', JSON.stringify(local));
    usuarioActual = nuevo;
  }

  participantes.push(usuarioActual);
  actualizarContadores();
  mostrarUsuario(usuarioActual.alias || usuarioActual.nombre);
  alerta('reg-alert','success',`Bienvenido ${alias}! Llena tus predicciones.`);
  btn.innerHTML='Registrado ✓'; btn.disabled=false;
}

// =============================================
// AUTH — LOGIN
// =============================================
async function login() {
  const email  = document.getElementById('l-email').value.trim();
  const codigo = document.getElementById('l-codigo').value.trim().toUpperCase();

  if (!email||!codigo) { alerta('login-alert','error','Ingresa correo y código.'); return; }

  const btn = document.getElementById('btn-login');
  btn.innerHTML='<span class="loading"></span> Verificando...';
  btn.disabled=true;

  if (sbClient) {
    const { data, error } = await sbClient.from('participantes')
      .select('*').eq('email', email).eq('codigo', codigo).single();

    if (error||!data) {
      alerta('login-alert','error','Correo o código incorrecto.');
      btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false; return;
    }
    usuarioActual = data;

    // Cargar quiniela guardada
    const { data: q } = await sbClient.from('quinielas').select('*').eq('participante_id', data.id).single();
    if (q) {
      predicciones = JSON.parse(q.predicciones||'{}');
      bracket = JSON.parse(q.bracket||'{}');
      goleador = q.goleador || null;
    }
  } else {
    const local = JSON.parse(localStorage.getItem('participantes')||'[]');
    const found = local.find(p=>p.email===email&&p.codigo===codigo);
    if (!found) {
      alerta('login-alert','error','Correo o código incorrecto.');
      btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false; return;
    }
    usuarioActual = found;
    const q = localStorage.getItem('quiniela_'+found.id);
    if (q) {
      const qd = JSON.parse(q);
      predicciones = JSON.parse(qd.predicciones||'{}');
      goleador = qd.goleador || null;
    }
  }

  mostrarUsuario(usuarioActual.alias || usuarioActual.nombre);
  alerta('login-alert','success',`Bienvenido de vuelta ${usuarioActual.alias||usuarioActual.nombre}!`);
  renderPartidosGrupo();
  renderBracket();
  renderGoleador();
  btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false;
}

function mostrarUsuario(nombre) {
  const ini = nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('uini').textContent = ini;
  document.getElementById('unombre').textContent = nombre.split(' ')[0];
  document.getElementById('uchip').classList.add('on');
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
  ['#hero-part','#stat-total'].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = n;
  });
}

// =============================================
// PREDICCIONES — GRUPOS
// =============================================
function renderGrupoTabs() {
  const tabs = document.getElementById('gtabs');
  if (!tabs) return;
  tabs.innerHTML = Object.keys(GRUPOS).map(g => {
    const done = PARTIDOS.filter(p=>p.g===g&&predicciones[p.id]&&predicciones[p.id].l!==undefined&&predicciones[p.id].v!==undefined).length;
    const total = PARTIDOS.filter(p=>p.g===g).length;
    const ok = done===total;
    return `<button class="gtab${grupoActivo===g?' active':''}${ok?' done':''}" onclick="selGrupo('${g}')">
      ${g}${ok?' ✓':''}
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
  const partidos = PARTIDOS.filter(p=>p.g===grupoActivo);
  const equipos = GRUPOS[grupoActivo];

  let html = `<div class="gequipos">${equipos.map(eq=>`<span class="ebadge">${flagImg(eq,16)} ${eq}</span>`).join('')}</div>`;

  let fa = '';
  partidos.forEach(p => {
    if (p.f!==fa) { fa=p.f; html+=`<div class="flbl">${fmtFecha(p.f)}</div>`; }
    const pr = predicciones[p.id]||{};
    const lv = pr.l!==undefined?pr.l:'';
    const vv = pr.v!==undefined?pr.v:'';
    const ok = pr.l!==undefined&&pr.v!==undefined;
    html += `<div class="pcard${ok?' ok':''}">
      <div class="psede">${p.h} · ${p.s}</div>
      <div class="prow">
        <div class="ecol"><span class="eflag">${flagImg(p.l)}</span><span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${pr.l!==undefined?' v':''}" oninput="setPred(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${pr.v!==undefined?' v':''}" oninput="setPred(${p.id},'v',this.value)">
        </div>
        <div class="ecol r"><span class="ename">${p.v}</span><span class="eflag">${flagImg(p.v)}</span></div>
      </div>
    </div>`;
  });
  c.innerHTML = html;
  actualizarProgreso();
}

function setPred(id, lado, val) {
  const num = parseInt(val);
  if (!predicciones[id]) predicciones[id]={};
  if (!isNaN(num)&&num>=0) predicciones[id][lado]=num;
  else delete predicciones[id][lado];
  actualizarProgreso();
  renderGrupoTabs();
}

function actualizarProgreso() {
  const total = PARTIDOS.length;
  const done = PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  const pct = Math.round(done/total*100);
  const f=document.getElementById('prog-fill'); if(f) f.style.width=pct+'%';
  const t=document.getElementById('prog-txt'); if(t) t.textContent=`${done} de ${total} predichos`;
  const s=document.getElementById('q-status'); if(s) s.textContent=done===total?'Lista para guardar!':'Faltan '+(total-done)+' partidos';
}

async function guardarQuiniela() {
  if (!usuarioActual&&!modoDemo) { alerta('q-alert','error','Primero regístrate o inicia sesión.'); return; }
  const done = PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  if (done<PARTIDOS.length) { alerta('q-alert','error','Faltan '+(PARTIDOS.length-done)+' partidos.'); return; }

  const datos = { participante_id: usuarioActual?.id, predicciones: JSON.stringify(predicciones), goleador, bracket: JSON.stringify(bracket), fecha: new Date().toISOString() };

  if (sbClient&&!modoDemo) {
    const { error } = await sbClient.from('quinielas').upsert([datos]);
    if (error) { alerta('q-alert','error','Error: '+error.message); return; }
  } else {
    localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'), JSON.stringify(datos));
  }
  alerta('q-alert','success','Predicciones de grupos guardadas!');
}

// =============================================
// BRACKET — SEGUNDA RONDA
// =============================================
function getPaisesParaBracket(grupos) {
  if (!grupos) return TODOS_PAISES;
  let paises = [];
  grupos.forEach(g => { if(GRUPOS[g]) paises = [...paises, ...GRUPOS[g]]; });
  return [...new Set(paises)];
}

function renderBracket() {
  const c = document.getElementById('bracket-container');
  if (!c) return;
  let html = '';

  RONDAS_BRACKET.forEach(ronda => {
    html += `<div class="ronda-title">${ronda.nombre} <span class="pts-chip">${ronda.pts_exacto} pts exacto · ${ronda.pts_resultado} pts resultado</span></div>`;
    ronda.partidos.forEach(p => {
      const b = bracket[p.bid] || {};
      const paises = getPaisesParaBracket(p.grupos);
      const opts = paises.map(eq => `<option value="${eq}" ${b.l===eq?'selected':''}>${eq}</option>`).join('');
      const opts2 = paises.map(eq => `<option value="${eq}" ${b.v===eq?'selected':''}>${eq}</option>`).join('');
      const ok = b.l&&b.v&&b.gl!==undefined&&b.gv!==undefined;

      html += `<div class="bmatch${ok?' ok':''}">
        <div class="bmatch-label">Partido ${p.bid} — ${p.desc}${p.sede?` · ${p.sede}`:''}</div>
        <div class="bmatch-row">
          <select class="bselect" onchange="setBracket(${p.bid},'l',this.value)">
            <option value="">Seleccionar equipo...</option>${opts}
          </select>
          <div class="bsinputs">
            <input type="number" min="0" max="20" placeholder="?" class="bsinput${b.gl!==undefined?' v':''}" value="${b.gl!==undefined?b.gl:''}" oninput="setBracket(${p.bid},'gl',this.value)">
            <span class="bsep">–</span>
            <input type="number" min="0" max="20" placeholder="?" class="bsinput${b.gv!==undefined?' v':''}" value="${b.gv!==undefined?b.gv:''}" oninput="setBracket(${p.bid},'gv',this.value)">
          </div>
          <select class="bselect" onchange="setBracket(${p.bid},'v',this.value)">
            <option value="">Seleccionar equipo...</option>${opts2}
          </select>
        </div>
      </div>`;
    });
  });
  c.innerHTML = html;
}

function setBracket(bid, campo, val) {
  if (!bracket[bid]) bracket[bid]={};
  if (campo==='gl'||campo==='gv') {
    const num = parseInt(val);
    if (!isNaN(num)&&num>=0) bracket[bid][campo]=num;
    else delete bracket[bid][campo];
  } else {
    bracket[bid][campo] = val;
  }
}

async function guardarBracket() {
  if (!usuarioActual&&!modoDemo) { alerta('b-alert','error','Primero regístrate o inicia sesión.'); return; }
  const datos = { participante_id: usuarioActual?.id, predicciones: JSON.stringify(predicciones), bracket: JSON.stringify(bracket), goleador, fecha: new Date().toISOString() };
  if (sbClient&&!modoDemo) {
    const { error } = await sbClient.from('quinielas').upsert([datos]);
    if (error) { alerta('b-alert','error','Error: '+error.message); return; }
  } else {
    localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'), JSON.stringify(datos));
  }
  alerta('b-alert','success','Bracket guardado!');
}

// =============================================
// GOLEADOR
// =============================================
function renderGoleador() {
  const g = document.getElementById('goleador-grid');
  if (!g) return;
  g.innerHTML = TODOS_PAISES.map(eq => `
    <button class="camp-btn${goleador===eq?' sel':''}" onclick="selGoleador('${eq}')">
      ${flagImg(eq,36)}
      <span>${eq}</span>
    </button>`).join('');
  const st = document.getElementById('g-status');
  if (st) st.textContent = goleador ? `Seleccionado: ${goleador}` : 'Selecciona el país goleador';
}

function selGoleador(eq) {
  goleador = eq;
  renderGoleador();
}

async function guardarGoleador() {
  if (!usuarioActual&&!modoDemo) { alerta('g-alert','error','Primero regístrate o inicia sesión.'); return; }
  if (!goleador) { alerta('g-alert','error','Selecciona un país.'); return; }
  const datos = { participante_id: usuarioActual?.id, predicciones: JSON.stringify(predicciones), bracket: JSON.stringify(bracket), goleador, fecha: new Date().toISOString() };
  if (sbClient&&!modoDemo) {
    const { error } = await sbClient.from('quinielas').upsert([datos]);
    if (error) { alerta('g-alert','error','Error: '+error.message); return; }
  } else {
    localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'), JSON.stringify(datos));
  }
  alerta('g-alert','success',`País goleador guardado: ${goleador}!`);
}

// =============================================
// RANKING
// =============================================
const DEMO_RANK = [
  {alias:'Efro Tecology',nombre:'Efrain Gomez',pts:142,goleador:'Brasil'},
  {alias:'LaVaquita FC',nombre:'Carlos Rodriguez',pts:128,goleador:'Argentina'},
  {alias:'MisterMundial',nombre:'Maria Gonzalez',pts:115,goleador:'Francia'},
  {alias:'ElPulpo2026',nombre:'Andres Morales',pts:98,goleador:'Espana'},
  {alias:'GolazoFan',nombre:'Sofia Castillo',pts:87,goleador:'Brasil'},
  {alias:'TigresCR7',nombre:'Pedro Jimenez',pts:76,goleador:'Portugal'},
  {alias:'PajaritoPan',nombre:'Luisa Ramos',pts:61,goleador:'Panama'},
];

async function renderRanking() {
  let data = DEMO_RANK;
  if (sbClient&&!modoDemo) {
    const { data: rows } = await sbClient.from('ranking_view').select('*').order('pts',{ascending:false}).limit(100);
    if (rows&&rows.length) data = rows;
  } else if (modoDemo) {
    data = DEMO_RANK;
  }
  const c = document.getElementById('ranking-container');
  if (!c) return;
  c.innerHTML = data.map((p,i) => {
    const ini = (p.alias||p.nombre).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const pos = i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1);
    return `<div class="rankrow">
      <div class="rankpos${i<3?' med':''}">${pos}</div>
      <div class="rankavatar">${ini}</div>
      <div>
        <div class="rankname">${p.alias||p.nombre}</div>
      </div>
      <div class="rankcamp">${flagImg(p.goleador,16)} ${p.goleador||'—'}</div>
      <div class="rankpts">${p.pts}<span class="ptslbl">pts</span></div>
    </div>`;
  }).join('');
  document.getElementById('stat-total').textContent = modoDemo ? DEMO_RANK.length : (participantes.length || data.length);
}

// =============================================
// MODO DEMO
// =============================================
function activarDemo() {
  modoDemo = true;
  document.getElementById('demo-banner').classList.add('on');
  document.getElementById('demo-fab').style.display = 'none';

  // Usuario demo
  usuarioActual = { id: 'demo', nombre: 'Demo Usuario', alias: 'DemoFan2026', email: 'demo@bit.com', codigo: 'DEMO' };
  mostrarUsuario('DemoFan2026');

  // Llenar predicciones automáticamente
  PARTIDOS.forEach(p => {
    predicciones[p.id] = { l: Math.floor(Math.random()*4), v: Math.floor(Math.random()*3) };
  });

  // Llenar bracket
  RONDAS_BRACKET.forEach(ronda => {
    ronda.partidos.forEach(p => {
      const paises = getPaisesParaBracket(p.grupos);
      bracket[p.bid] = {
        l: paises[Math.floor(Math.random()*paises.length)],
        v: paises[Math.floor(Math.random()*paises.length)],
        gl: Math.floor(Math.random()*3),
        gv: Math.floor(Math.random()*2),
      };
    });
  });

  // Goleador demo
  goleador = 'Brasil';

  // Participantes demo
  participantes = DEMO_RANK.map((p,i) => ({...p, id: 'demo_'+i}));
  actualizarContadores();

  renderGrupoTabs();
  renderPartidosGrupo();
  renderBracket();
  renderGoleador();
  renderRanking();

  alert('Modo demo activado! Navega por todas las secciones para ver la herramienta en accion.');
}

function salirDemo() {
  modoDemo = false;
  predicciones = {}; bracket = {}; goleador = null; usuarioActual = null;
  document.getElementById('demo-banner').classList.remove('on');
  document.getElementById('demo-fab').style.display = '';
  document.getElementById('uchip').classList.remove('on');
  renderGrupoTabs();
  renderPartidosGrupo();
  renderBracket();
  renderGoleador();
  actualizarContadores();
}

// =============================================
// ADMIN
// =============================================
function renderAdmin() {
  const loc = JSON.parse(localStorage.getItem('participantes')||'[]');
  const data = participantes.length ? participantes : loc;
  const c = document.getElementById('admin-table');
  if (!c) return;
  if (!data.length) { c.innerHTML='<p style="color:var(--muted);font-size:13px">Sin participantes registrados.</p>'; return; }
  c.innerHTML=`<table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      <th style="text-align:left;padding:6px;color:var(--muted);font-size:10px;text-transform:uppercase">#</th>
      <th style="text-align:left;padding:6px;color:var(--muted);font-size:10px;text-transform:uppercase">Nombre</th>
      <th style="text-align:left;padding:6px;color:var(--muted);font-size:10px;text-transform:uppercase">Alias</th>
      <th style="text-align:left;padding:6px;color:var(--muted);font-size:10px;text-transform:uppercase">Correo</th>
      <th style="text-align:left;padding:6px;color:var(--muted);font-size:10px;text-transform:uppercase">Código</th>
    </tr></thead>
    <tbody>${data.map((p,i)=>`<tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
      <td style="padding:7px;color:var(--muted)">${i+1}</td>
      <td style="padding:7px;font-weight:500">${p.nombre}</td>
      <td style="padding:7px;color:var(--verde);font-weight:600">${p.alias||'—'}</td>
      <td style="padding:7px;color:var(--muted)">${p.email}</td>
      <td style="padding:7px">${p.codigo||'—'}</td>
    </tr>`).join('')}</tbody>
  </table>`;

  cargarCodigos();
}

async function cargarCodigos() {
  const c = document.getElementById('codigos-list');
  if (!c) return;
  if (!sbClient) { c.textContent='Conecta Supabase para gestionar códigos.'; return; }
  const { data } = await sbClient.from('codigos_participante').select('*').order('codigo');
  if (!data||!data.length) { c.textContent='Sin códigos cargados aún.'; return; }
  c.innerHTML = data.map(d=>`<span style="display:inline-block;margin:3px;padding:3px 10px;background:${d.usado?'#fef0f0':'#eaf5ee'};color:${d.usado?'#c0392b':'#0a5c2e'};border-radius:12px;font-size:12px;font-weight:600">${d.codigo}${d.usado?' (usado)':''}</span>`).join('');
}

async function agregarCodigo() {
  const val = document.getElementById('nuevo-codigo').value.trim().toUpperCase();
  if (!val) return;
  if (!sbClient) { alert('Conecta Supabase primero.'); return; }
  const { error } = await sbClient.from('codigos_participante').insert([{ codigo: val, usado: false }]);
  if (error) { alert('Error: '+error.message); return; }
  document.getElementById('nuevo-codigo').value='';
  cargarCodigos();
}

function exportarCSV() {
  const loc = JSON.parse(localStorage.getItem('participantes')||'[]');
  const data = participantes.length ? participantes : loc;
  if (!data.length) { alert('Sin datos.'); return; }
  const cols = ['nombre','alias','email','tel','codigo','favorito','fecha'];
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

// =============================================
// INIT
// =============================================
async function init() {
  calcDias();
  renderGrupoTabs();
  renderPartidosGrupo();
  renderGoleador();
  renderRanking();

  const emp = localStorage.getItem('cfg_empresa');
  const col = localStorage.getItem('cfg_color');
  if (emp) document.getElementById('empresa-label').textContent=emp;
  if (col) document.documentElement.style.setProperty('--verde',col);

  await cargarSDK();
  await autoConectar();
}

document.addEventListener('DOMContentLoaded', init);
