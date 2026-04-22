// =============================================
// QUINIELA FIFA 2026 - app.js v7.0
// Business IT — Produccion
// =============================================

const SB_URL = "https://zriyqyeoiommrnyvwjto.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXlxeWVvaW9tbXJueXZ3anRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzQ1ODMsImV4cCI6MjA5MjE1MDU4M30.fylrPptB3VpnkXw2qMxh2PgLPBpt5OvIjoPgOzTTjog";
const FECHA_INICIO = new Date('2026-06-11T00:00:00');
const ADMIN_PASS = 'BIT2026ADMIN';

// BANDERAS
const ISO2 = {
  'Mexico':'mx','Sudafrica':'za','Rep. Checa':'cz','Corea del Sur':'kr',
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

function flagBadge(pais, size=20) {
  const code = ISO2[pais];
  if (!code) return `<span style="width:${Math.round(size*1.4)}px;height:${size}px;background:#ccc;border-radius:3px;display:inline-block"></span>`;
  const h = Math.round(size*0.7), w = Math.round(size*1.4);
  return `<img src="https://flagcdn.com/w40/${code}.png" alt="${pais}" style="width:${w}px;height:${h}px;object-fit:cover;border-radius:2px;vertical-align:middle;box-shadow:0 0 0 1px rgba(0,0,0,0.1);flex-shrink:0" loading="lazy">`;
}

// DATOS
const GRUPOS = {
  'A':['Mexico','Sudafrica','Corea del Sur','Rep. Checa'],
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
const TODOS_PAISES = Object.keys(ISO2);
const FAVORITOS_SIM = ['Brasil','Argentina','Francia','Espana','Alemania','Portugal','Inglaterra','Paises Bajos','Uruguay','Colombia','Mexico','EEUU'];

const PARTIDOS = [
  {id:1,g:'A',l:'Mexico',v:'Sudafrica',f:'2026-06-11',h:'15:00',s:'Azteca, Cdmx'},
  {id:2,g:'A',l:'Corea del Sur',v:'Rep. Checa',f:'2026-06-11',h:'22:00',s:'Akron, Zapopan'},
  {id:3,g:'B',l:'Canada',v:'Bosnia-Herzegovina',f:'2026-06-12',h:'15:00',s:'BMO Field, Toronto'},
  {id:4,g:'D',l:'EEUU',v:'Paraguay',f:'2026-06-12',h:'21:00',s:'SoFi, Inglewood'},
  {id:5,g:'D',l:'Australia',v:'Turkiye',f:'2026-06-13',h:'00:00',s:'BC Place, Vancouver'},
  {id:6,g:'B',l:'Qatar',v:'Suiza',f:'2026-06-13',h:'15:00',s:"Levi's, Santa Clara"},
  {id:7,g:'C',l:'Brasil',v:'Marruecos',f:'2026-06-13',h:'18:00',s:'MetLife, NJ'},
  {id:8,g:'C',l:'Haiti',v:'Escocia',f:'2026-06-13',h:'21:00',s:'Gillette, Foxborough'},
  {id:9,g:'E',l:'Alemania',v:'Curazao',f:'2026-06-14',h:'13:00',s:'NRG, Houston'},
  {id:10,g:'F',l:'Paises Bajos',v:'Japon',f:'2026-06-14',h:'16:00',s:'AT&T, Arlington'},
  {id:11,g:'E',l:'Costa de Marfil',v:'Ecuador',f:'2026-06-14',h:'19:00',s:'Lincoln Financial, Phila'},
  {id:12,g:'F',l:'Suecia',v:'Tunez',f:'2026-06-14',h:'22:00',s:'BBVA, Monterrey'},
  {id:13,g:'H',l:'Espana',v:'Cabo Verde',f:'2026-06-15',h:'12:00',s:'Mercedes-Benz, Atlanta'},
  {id:14,g:'G',l:'Belgica',v:'Egipto',f:'2026-06-15',h:'15:00',s:'Lumen Field, Seattle'},
  {id:15,g:'H',l:'Arabia Saudita',v:'Uruguay',f:'2026-06-15',h:'18:00',s:'Hard Rock, Miami'},
  {id:16,g:'G',l:'Iran',v:'Nueva Zelanda',f:'2026-06-15',h:'21:00',s:'SoFi, Inglewood'},
  {id:17,g:'I',l:'Francia',v:'Senegal',f:'2026-06-16',h:'15:00',s:'MetLife, NJ'},
  {id:18,g:'I',l:'Iraq',v:'Noruega',f:'2026-06-16',h:'18:00',s:'Gillette, Foxborough'},
  {id:19,g:'J',l:'Argentina',v:'Argelia',f:'2026-06-16',h:'21:00',s:'Arrowhead, Kansas City'},
  {id:20,g:'J',l:'Austria',v:'Jordania',f:'2026-06-17',h:'00:00',s:"Levi's, Santa Clara"},
  {id:21,g:'K',l:'Portugal',v:'DR Congo',f:'2026-06-17',h:'13:00',s:'NRG, Houston'},
  {id:22,g:'L',l:'Inglaterra',v:'Croacia',f:'2026-06-17',h:'16:00',s:'AT&T, Arlington'},
  {id:23,g:'L',l:'Ghana',v:'Panama',f:'2026-06-17',h:'19:00',s:'BMO Field, Toronto'},
  {id:24,g:'K',l:'Uzbekistan',v:'Colombia',f:'2026-06-17',h:'22:00',s:'Azteca, Cdmx'},
  {id:25,g:'A',l:'Rep. Checa',v:'Sudafrica',f:'2026-06-18',h:'12:00',s:'Mercedes-Benz, Atlanta'},
  {id:26,g:'B',l:'Suiza',v:'Bosnia-Herzegovina',f:'2026-06-18',h:'15:00',s:'SoFi, Inglewood'},
  {id:27,g:'B',l:'Canada',v:'Qatar',f:'2026-06-18',h:'18:00',s:'BC Place, Vancouver'},
  {id:28,g:'A',l:'Mexico',v:'Corea del Sur',f:'2026-06-18',h:'21:00',s:'Akron, Zapopan'},
  {id:29,g:'D',l:'Turkiye',v:'Paraguay',f:'2026-06-19',h:'00:00',s:"Levi's, Santa Clara"},
  {id:30,g:'D',l:'EEUU',v:'Australia',f:'2026-06-19',h:'15:00',s:'Lumen Field, Seattle'},
  {id:31,g:'C',l:'Escocia',v:'Marruecos',f:'2026-06-19',h:'18:00',s:'Gillette, Foxborough'},
  {id:32,g:'C',l:'Brasil',v:'Haiti',f:'2026-06-19',h:'21:00',s:'Lincoln Financial, Phila'},
  {id:33,g:'F',l:'Tunez',v:'Japon',f:'2026-06-20',h:'00:00',s:'BBVA, Monterrey'},
  {id:34,g:'F',l:'Paises Bajos',v:'Suecia',f:'2026-06-20',h:'13:00',s:'NRG, Houston'},
  {id:35,g:'E',l:'Alemania',v:'Costa de Marfil',f:'2026-06-20',h:'16:00',s:'BMO Field, Toronto'},
  {id:36,g:'E',l:'Ecuador',v:'Curazao',f:'2026-06-20',h:'20:00',s:'Arrowhead, Kansas City'},
  {id:37,g:'H',l:'Espana',v:'Arabia Saudita',f:'2026-06-21',h:'12:00',s:'Mercedes-Benz, Atlanta'},
  {id:38,g:'G',l:'Belgica',v:'Iran',f:'2026-06-21',h:'15:00',s:'SoFi, Inglewood'},
  {id:39,g:'H',l:'Uruguay',v:'Cabo Verde',f:'2026-06-21',h:'18:00',s:'Hard Rock, Miami'},
  {id:40,g:'G',l:'Nueva Zelanda',v:'Egipto',f:'2026-06-21',h:'21:00',s:'BC Place, Vancouver'},
  {id:41,g:'J',l:'Argentina',v:'Austria',f:'2026-06-22',h:'13:00',s:'AT&T, Arlington'},
  {id:42,g:'I',l:'Francia',v:'Iraq',f:'2026-06-22',h:'17:00',s:'Lincoln Financial, Phila'},
  {id:43,g:'I',l:'Noruega',v:'Senegal',f:'2026-06-22',h:'20:00',s:'MetLife, NJ'},
  {id:44,g:'J',l:'Jordania',v:'Argelia',f:'2026-06-22',h:'23:00',s:"Levi's, Santa Clara"},
  {id:45,g:'K',l:'Portugal',v:'Uzbekistan',f:'2026-06-23',h:'13:00',s:'NRG, Houston'},
  {id:46,g:'L',l:'Inglaterra',v:'Ghana',f:'2026-06-23',h:'16:00',s:'Gillette, Foxborough'},
  {id:47,g:'L',l:'Panama',v:'Croacia',f:'2026-06-23',h:'19:00',s:'BMO Field, Toronto'},
  {id:48,g:'K',l:'Colombia',v:'DR Congo',f:'2026-06-23',h:'22:00',s:'Akron, Zapopan'},
  {id:49,g:'B',l:'Suiza',v:'Canada',f:'2026-06-24',h:'15:00',s:'BC Place, Vancouver'},
  {id:50,g:'B',l:'Bosnia-Herzegovina',v:'Qatar',f:'2026-06-24',h:'15:00',s:'Lumen Field, Seattle'},
  {id:51,g:'C',l:'Escocia',v:'Brasil',f:'2026-06-24',h:'18:00',s:'Hard Rock, Miami'},
  {id:52,g:'C',l:'Marruecos',v:'Haiti',f:'2026-06-24',h:'18:00',s:'Mercedes-Benz, Atlanta'},
  {id:53,g:'A',l:'Rep. Checa',v:'Mexico',f:'2026-06-24',h:'21:00',s:'Azteca, Cdmx'},
  {id:54,g:'A',l:'Sudafrica',v:'Corea del Sur',f:'2026-06-24',h:'21:00',s:'BBVA, Monterrey'},
  {id:55,g:'E',l:'Curazao',v:'Costa de Marfil',f:'2026-06-25',h:'16:00',s:'Lincoln Financial, Phila'},
  {id:56,g:'E',l:'Ecuador',v:'Alemania',f:'2026-06-25',h:'16:00',s:'MetLife, NJ'},
  {id:57,g:'F',l:'Japon',v:'Suecia',f:'2026-06-25',h:'19:00',s:'AT&T, Arlington'},
  {id:58,g:'F',l:'Tunez',v:'Paises Bajos',f:'2026-06-25',h:'19:00',s:'Arrowhead, Kansas City'},
  {id:59,g:'D',l:'Turkiye',v:'EEUU',f:'2026-06-25',h:'22:00',s:'SoFi, Inglewood'},
  {id:60,g:'D',l:'Paraguay',v:'Australia',f:'2026-06-25',h:'22:00',s:"Levi's, Santa Clara"},
  {id:61,g:'I',l:'Noruega',v:'Francia',f:'2026-06-26',h:'15:00',s:'Gillette, Foxborough'},
  {id:62,g:'I',l:'Senegal',v:'Iraq',f:'2026-06-26',h:'15:00',s:'BMO Field, Toronto'},
  {id:63,g:'H',l:'Cabo Verde',v:'Arabia Saudita',f:'2026-06-26',h:'20:00',s:'NRG, Houston'},
  {id:64,g:'H',l:'Uruguay',v:'Espana',f:'2026-06-26',h:'20:00',s:'Akron, Zapopan'},
  {id:65,g:'G',l:'Egipto',v:'Iran',f:'2026-06-26',h:'23:00',s:'Lumen Field, Seattle'},
  {id:66,g:'G',l:'Nueva Zelanda',v:'Belgica',f:'2026-06-26',h:'23:00',s:'BC Place, Vancouver'},
  {id:67,g:'L',l:'Panama',v:'Inglaterra',f:'2026-06-27',h:'17:00',s:'MetLife, NJ'},
  {id:68,g:'L',l:'Croacia',v:'Ghana',f:'2026-06-27',h:'17:00',s:'Lincoln Financial, Phila'},
  {id:69,g:'K',l:'Colombia',v:'Portugal',f:'2026-06-27',h:'19:30',s:'Hard Rock, Miami'},
  {id:70,g:'K',l:'DR Congo',v:'Uzbekistan',f:'2026-06-27',h:'19:30',s:'Mercedes-Benz, Atlanta'},
  {id:71,g:'J',l:'Argelia',v:'Austria',f:'2026-06-27',h:'22:00',s:'Arrowhead, Kansas City'},
  {id:72,g:'J',l:'Jordania',v:'Argentina',f:'2026-06-27',h:'22:00',s:'AT&T, Arlington'},
];

const BRACKET_RONDAS = [
  { id:'r32', nombre:'Ronda de 32', pts_ex:6, pts_res:3, partidos:[
    // LADO IZQUIERDO (-> Semi 101)
    {bid:74,desc:'1E vs 3ABCDF', grupos_l:['E'],tipo_l:'1',grupos_v:['A','B','C','D','F'],tipo_v:'3'},
    {bid:77,desc:'1I vs 3CDFGH', grupos_l:['I'],tipo_l:'1',grupos_v:['C','D','F','G','H'],tipo_v:'3'},
    {bid:73,desc:'2A vs 2B',     grupos_l:['A'],tipo_l:'2',grupos_v:['B'],tipo_v:'2'},
    {bid:75,desc:'1F vs 2C',     grupos_l:['F'],tipo_l:'1',grupos_v:['C'],tipo_v:'2'},
    {bid:83,desc:'2K vs 2L',     grupos_l:['K'],tipo_l:'2',grupos_v:['L'],tipo_v:'2'},
    {bid:84,desc:'1H vs 2J',     grupos_l:['H'],tipo_l:'1',grupos_v:['J'],tipo_v:'2'},
    {bid:81,desc:'1D vs 3BEFIJ', grupos_l:['D'],tipo_l:'1',grupos_v:['B','E','F','I','J'],tipo_v:'3'},
    {bid:82,desc:'1G vs 3AEHIJ', grupos_l:['G'],tipo_l:'1',grupos_v:['A','E','H','I','J'],tipo_v:'3'},
    // LADO DERECHO (-> Semi 102)
    {bid:76,desc:'1C vs 2F',     grupos_l:['C'],tipo_l:'1',grupos_v:['F'],tipo_v:'2'},
    {bid:78,desc:'2E vs 2I',     grupos_l:['E'],tipo_l:'2',grupos_v:['I'],tipo_v:'2'},
    {bid:79,desc:'1A vs 3CEFHI', grupos_l:['A'],tipo_l:'1',grupos_v:['C','E','F','H','I'],tipo_v:'3'},
    {bid:80,desc:'1L vs 3EHIJK', grupos_l:['L'],tipo_l:'1',grupos_v:['E','H','I','J','K'],tipo_v:'3'},
    {bid:86,desc:'1J vs 2H',     grupos_l:['J'],tipo_l:'1',grupos_v:['H'],tipo_v:'2'},
    {bid:88,desc:'2D vs 2G',     grupos_l:['D'],tipo_l:'2',grupos_v:['G'],tipo_v:'2'},
    {bid:85,desc:'1B vs 3EFGIJ', grupos_l:['B'],tipo_l:'1',grupos_v:['E','F','G','I','J'],tipo_v:'3'},
    {bid:87,desc:'1K vs 3DEIJL', grupos_l:['K'],tipo_l:'1',grupos_v:['D','E','I','J','L'],tipo_v:'3'},
  ]},
  { id:'r16', nombre:'Ronda de 16', pts_ex:8, pts_res:4, partidos:[
    {bid:89,desc:'Gan.74 vs Gan.77'},{bid:90,desc:'Gan.73 vs Gan.75'},
    {bid:91,desc:'Gan.83 vs Gan.84'},{bid:92,desc:'Gan.81 vs Gan.82'},
    {bid:93,desc:'Gan.76 vs Gan.78'},{bid:94,desc:'Gan.79 vs Gan.80'},
    {bid:95,desc:'Gan.86 vs Gan.88'},{bid:96,desc:'Gan.85 vs Gan.87'},
  ]},
  { id:'qf', nombre:'Cuartos de Final', pts_ex:10, pts_res:5, partidos:[
    {bid:97,desc:'Gan.89 vs Gan.90'},{bid:98,desc:'Gan.91 vs Gan.92'},
    {bid:99,desc:'Gan.93 vs Gan.94'},{bid:100,desc:'Gan.95 vs Gan.96'},
  ]},
  { id:'sf', nombre:'Semifinales', pts_ex:12, pts_res:6, partidos:[
    {bid:101,desc:'Gan.97 vs Gan.98',  sede:'AT&T, Dallas'},
    {bid:102,desc:'Gan.99 vs Gan.100', sede:'Mercedes-Benz, Atlanta'},
  ]},
  { id:'final', nombre:'Final', pts_ex:15, pts_res:8, partidos:[
    {bid:103,desc:'3er Lugar',sede:'Hard Rock, Miami'},
    {bid:104,desc:'FINAL',    sede:'MetLife, Nueva Jersey'},
  ]},
];

// Progresion correcta segun bracket visual oficial FIFA 2026
const PROGRESION = {
  // R32 -> R16 (lado izquierdo -> Semi 101)
  74:{sig:89,slot:'l'},77:{sig:89,slot:'v'},
  73:{sig:90,slot:'l'},75:{sig:90,slot:'v'},
  83:{sig:91,slot:'l'},84:{sig:91,slot:'v'},
  81:{sig:92,slot:'l'},82:{sig:92,slot:'v'},
  // R32 -> R16 (lado derecho -> Semi 102)
  76:{sig:93,slot:'l'},78:{sig:93,slot:'v'},
  79:{sig:94,slot:'l'},80:{sig:94,slot:'v'},
  86:{sig:95,slot:'l'},88:{sig:95,slot:'v'},
  85:{sig:96,slot:'l'},87:{sig:96,slot:'v'},
  // R16 -> QF
  89:{sig:97,slot:'l'},90:{sig:97,slot:'v'},
  91:{sig:98,slot:'l'},92:{sig:98,slot:'v'},
  93:{sig:99,slot:'l'},94:{sig:99,slot:'v'},
  95:{sig:100,slot:'l'},96:{sig:100,slot:'v'},
  // QF -> SF
  97:{sig:101,slot:'l'},98:{sig:101,slot:'v'},
  99:{sig:102,slot:'l'},100:{sig:102,slot:'v'},
  // SF -> Final
  101:{sig:104,slot:'l'},102:{sig:104,slot:'v'},
};

// Auto-rellenar R32 desde clasificados de grupos
const R32_AUTO = {
  74:{l:{g:'E',p:0}, v:null},          // 1E vs 3ABCDF
  77:{l:{g:'I',p:0}, v:null},          // 1I vs 3CDFGH
  73:{l:{g:'A',p:1}, v:{g:'B',p:1}},  // 2A vs 2B
  75:{l:{g:'F',p:0}, v:{g:'C',p:1}},  // 1F vs 2C
  83:{l:{g:'K',p:1}, v:{g:'L',p:1}},  // 2K vs 2L
  84:{l:{g:'H',p:0}, v:{g:'J',p:1}},  // 1H vs 2J
  81:{l:{g:'D',p:0}, v:null},          // 1D vs 3BEFIJ
  82:{l:{g:'G',p:0}, v:null},          // 1G vs 3AEHIJ
  76:{l:{g:'C',p:0}, v:{g:'F',p:1}},  // 1C vs 2F
  78:{l:{g:'E',p:1}, v:{g:'I',p:1}},  // 2E vs 2I
  79:{l:{g:'A',p:0}, v:null},          // 1A vs 3CEFHI
  80:{l:{g:'L',p:0}, v:null},          // 1L vs 3EHIJK
  86:{l:{g:'J',p:0}, v:{g:'H',p:1}},  // 1J vs 2H
  88:{l:{g:'D',p:1}, v:{g:'G',p:1}},  // 2D vs 2G
  85:{l:{g:'B',p:0}, v:null},          // 1B vs 3EFGIJ
  87:{l:{g:'K',p:0}, v:null},          // 1K vs 3DEIJL
};

// ESTADO
let sbClient=null, usuarioActual=null, modoDemo=false;
let predicciones={}, bracket={}, goleador=null;
let participantes=[], grupoActivo='A', todosCodigos=[];
let modalActivo=null, rankingSimulado=null;
let configGlobal={permitir_edicion:true,fecha_cierre:null};
let adminAutenticado=false;

// ============================================================
// SDK
// ============================================================
async function cargarSDK() {
  return new Promise(resolve => {
    if(window._sbSDK){resolve();return;}
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload=()=>{window._sbSDK=window.supabase;resolve();}; s.onerror=()=>resolve();
    document.head.appendChild(s);
  });
}

async function autoConectar() {
  try {
    const sdk=window._sbSDK;
    if(!sdk||!sdk.createClient) throw new Error('no sdk');
    sbClient=sdk.createClient(SB_URL,SB_KEY);
    const{error}=await sbClient.from('participantes').select('id').limit(1);
    if(error) throw error;
    await cargarParticipantes();
  } catch(e){sbClient=null;cargarParticipantes();}
}

// ============================================================
// UTILS
// ============================================================
function calcDias(){
  const diff=Math.ceil((FECHA_INICIO-new Date())/86400000);
  const val=diff>0?diff:0;
  document.querySelectorAll('#dias-restantes,#stat-dias').forEach(el=>{if(el)el.textContent=val;});
}
function fmtFecha(str){return new Date(str+'T12:00:00').toLocaleDateString('es-PA',{weekday:'short',day:'numeric',month:'short'});}
function alerta(id,tipo,msg){
  const el=document.getElementById(id);if(!el)return;
  el.className='alert '+tipo;el.textContent=msg;
  setTimeout(()=>{el.className='alert';},7000);
}
function parseMaybeJSON(v,fb={}){
  if(!v)return fb;if(typeof v==='object')return v;
  try{return JSON.parse(v);}catch{return fb;}
}
function generarCodigoAlfanum(){
  const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code='BIT-';for(let i=0;i<5;i++)code+=c[Math.floor(Math.random()*c.length)];
  return code;
}
function estaCerrada(){
  if(modoDemo)return false;
  if(configGlobal.permitir_edicion===false)return true;
  if(!configGlobal.fecha_cierre)return false;
  return new Date()>new Date(configGlobal.fecha_cierre);
}
function aplicarCierreUI(){
  const cerrada=estaCerrada();
  const lb=document.getElementById('lock-banner');if(lb)lb.classList.toggle('on',cerrada);
  document.querySelectorAll('.editable-action').forEach(el=>{el.disabled=cerrada;});
  const mb=document.getElementById('modal-confirm-btn');if(mb)mb.disabled=cerrada;
}
function goSec(id,btn=null){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const sec=document.getElementById('sec-'+id);if(sec)sec.classList.add('active');
  if(btn)btn.classList.add('active');
  if(id==='ranking')renderRanking();
  if(id==='admin')renderAdmin();
  if(id==='segunda')renderBracket();
}
function showAuth(tab,btn){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('form-reg').style.display=tab==='reg'?'':'none';
  document.getElementById('form-login').style.display=tab==='login'?'':'none';
}

// ============================================================
// CONFIG
// ============================================================
async function cargarConfiguracion(){
  try{
    if(sbClient){
      const{data}=await sbClient.from('configuracion').select('*').limit(1).maybeSingle();
      if(data)configGlobal={permitir_edicion:data.permitir_edicion!==false,fecha_cierre:data.fecha_cierre||null};
    } else {
      const loc=parseMaybeJSON(localStorage.getItem('configuracion_local'),null);
      if(loc)configGlobal=loc;
    }
  }catch(e){}
  const fi=document.getElementById('cfg-fecha-cierre');
  const ei=document.getElementById('cfg-permitir-edicion');
  if(fi&&configGlobal.fecha_cierre){
    const d=new Date(configGlobal.fecha_cierre);
    fi.value=d.toISOString().slice(0,16);
  }
  if(ei)ei.value=configGlobal.permitir_edicion?'true':'false';
  aplicarCierreUI();
}

async function guardarConfiguracionAdmin(){
  const fecha=document.getElementById('cfg-fecha-cierre')?.value||null;
  const permitir=document.getElementById('cfg-permitir-edicion')?.value==='true';
  const payload={fecha_cierre:fecha?new Date(fecha).toISOString():null,permitir_edicion:permitir};
  try{
    if(sbClient){
      const{data:ex}=await sbClient.from('configuracion').select('id').limit(1).maybeSingle();
      if(ex?.id){const{error}=await sbClient.from('configuracion').update(payload).eq('id',ex.id);if(error)throw error;}
      else{const{error}=await sbClient.from('configuracion').insert([payload]);if(error)throw error;}
    } else {localStorage.setItem('configuracion_local',JSON.stringify(payload));}
    configGlobal=payload;aplicarCierreUI();
    renderPartidosGrupo();renderBracket();renderGoleador();
    alerta('cfg-alert','success','Configuracion guardada.');
  }catch(e){alerta('cfg-alert','error','Error: '+e.message);}
}

// ============================================================
// AUTH
// ============================================================
async function registrar(){
  if(estaCerrada()){alerta('reg-alert','error','La quiniela esta cerrada.');return;}
  const nombre=document.getElementById('r-nombre').value.trim();
  const alias=document.getElementById('r-alias').value.trim();
  const email=document.getElementById('r-email').value.trim();
  const tel=document.getElementById('r-tel').value.trim();
  const codigo=document.getElementById('r-codigo').value.trim().toUpperCase();
  const favorito=document.getElementById('r-favorito').value;
  if(!nombre||!alias||!email||!codigo){alerta('reg-alert','error','Completa nombre, alias, correo y codigo.');return;}
  const btn=document.getElementById('btn-reg');
  btn.innerHTML='<span class="loading"></span> Verificando...';btn.disabled=true;
  try{
    if(sbClient){
      const{data:cod}=await sbClient.from('codigos_participante').select('*').eq('codigo',codigo).eq('usado',false).maybeSingle();
      if(!cod)throw new Error('Codigo invalido o ya utilizado.');
      const{data:ex}=await sbClient.from('participantes').select('id').eq('email',email).maybeSingle();
      if(ex)throw new Error('Correo ya registrado. Usa "Ya tengo cuenta".');
      const{data,error}=await sbClient.from('participantes').insert([{nombre,alias,email,tel,codigo,favorito,fecha:new Date().toISOString()}]).select();
      if(error)throw error;
      await sbClient.from('codigos_participante').update({usado:true}).eq('codigo',codigo);
      usuarioActual=data[0];
    } else {
      const local=JSON.parse(localStorage.getItem('participantes')||'[]');
      if(local.find(p=>p.email===email))throw new Error('Correo ya registrado.');
      const nuevo={id:Date.now(),nombre,alias,email,tel,codigo,favorito,fecha:new Date().toISOString()};
      local.push(nuevo);localStorage.setItem('participantes',JSON.stringify(local));usuarioActual=nuevo;
    }
    participantes.push(usuarioActual);actualizarContadores();
    mostrarUsuario(usuarioActual.alias||usuarioActual.nombre);
    alerta('reg-alert','success','Bienvenido '+alias+'. Llena tus predicciones.');
  }catch(e){alerta('reg-alert','error',e.message||'Error de registro.');}
  finally{btn.innerHTML='Registrarme en la quiniela';btn.disabled=estaCerrada();}
}

async function login(){
  const email=document.getElementById('l-email').value.trim();
  const codigo=document.getElementById('l-codigo').value.trim().toUpperCase();
  if(!email||!codigo){alerta('login-alert','error','Ingresa correo y codigo.');return;}
  const btn=document.getElementById('btn-login');
  btn.innerHTML='<span class="loading"></span> Verificando...';btn.disabled=true;
  try{
    if(sbClient){
      const{data,error}=await sbClient.from('participantes').select('*').eq('email',email).eq('codigo',codigo).maybeSingle();
      if(error||!data)throw new Error('Correo o codigo incorrecto.');
      usuarioActual=data;
      const{data:q}=await sbClient.from('quinielas').select('*').eq('participante_id',data.id).maybeSingle();
      if(q){predicciones=parseMaybeJSON(q.predicciones,{});bracket=parseMaybeJSON(q.bracket,{});goleador=q.goleador||null;}
      else{predicciones={};bracket={};goleador=null;}
    } else {
      const local=JSON.parse(localStorage.getItem('participantes')||'[]');
      const found=local.find(p=>p.email===email&&p.codigo===codigo);
      if(!found)throw new Error('Correo o codigo incorrecto.');
      usuarioActual=found;
      const q=localStorage.getItem('quiniela_'+found.id);
      if(q){const qd=JSON.parse(q);predicciones=parseMaybeJSON(qd.predicciones,{});bracket=parseMaybeJSON(qd.bracket,{});goleador=qd.goleador||null;}
      else{predicciones={};bracket={};goleador=null;}
    }
    mostrarUsuario(usuarioActual.alias||usuarioActual.nombre);
    alerta('login-alert','success','Bienvenido de vuelta '+( usuarioActual.alias||usuarioActual.nombre)+'.');
    renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();
  }catch(e){alerta('login-alert','error',e.message||'Error de login.');}
  finally{btn.innerHTML='Entrar a mi quiniela';btn.disabled=false;}
}

function mostrarUsuario(nombre){
  const ini=nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('uini').textContent=ini;
  document.getElementById('unombre').textContent=nombre.split(' ')[0];
  document.getElementById('uchip').classList.add('on');
}
async function cargarParticipantes(){
  if(sbClient){const{data}=await sbClient.from('participantes').select('*');participantes=data||[];}
  else{participantes=JSON.parse(localStorage.getItem('participantes')||'[]');}
  actualizarContadores();
}
function actualizarContadores(){
  const n=participantes.length;
  document.querySelectorAll('#hero-part,#stat-total').forEach(el=>{if(el)el.textContent=n;});
}

// ============================================================
// GUARDADO CENTRAL
// ============================================================
async function guardarQuinielaCompleta(){
  const datos={participante_id:usuarioActual?.id,predicciones:JSON.stringify(predicciones),bracket:JSON.stringify(bracket),goleador,fecha:new Date().toISOString()};
  if(sbClient&&!modoDemo){
    const{error}=await sbClient.from('quinielas').upsert([datos],{onConflict:'participante_id'});
    if(error)throw error;
  } else {localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'),JSON.stringify(datos));}
}

// ============================================================
// 1ERA RONDA — GRUPOS
// ============================================================
function renderGrupoTabs(){
  const tabs=document.getElementById('gtabs');if(!tabs)return;
  tabs.innerHTML=Object.keys(GRUPOS).map(g=>{
    const done=PARTIDOS.filter(p=>p.g===g&&predicciones[p.id]&&predicciones[p.id].l!==undefined&&predicciones[p.id].v!==undefined).length;
    const total=PARTIDOS.filter(p=>p.g===g).length;
    return `<button class="gtab${grupoActivo===g?' active':''}${done===total?' done':''}" onclick="selGrupo('${g}')">Grupo ${g}${done===total?' ✓':''}</button>`;
  }).join('');
}
function selGrupo(g){grupoActivo=g;renderGrupoTabs();renderPartidosGrupo();}

function renderPartidosGrupo(){
  const c=document.getElementById('partidos-container');if(!c)return;
  const cerrada=estaCerrada();
  const ps=PARTIDOS.filter(p=>p.g===grupoActivo);
  let pHtml='';let fa='';
  ps.forEach(p=>{
    if(p.f!==fa){fa=p.f;pHtml+=`<div class="flbl">${fmtFecha(p.f)} · ${p.h} ET</div>`;}
    const pr=predicciones[p.id]||{};
    const lv=pr.l!==undefined?pr.l:'';const vv=pr.v!==undefined?pr.v:'';
    const ok=pr.l!==undefined&&pr.v!==undefined;
    // Colores de simulacion
    let lClass='',vClass='';
    if(rankingSimulado&&rankingSimulado._resultados&&rankingSimulado._resultados[p.id]&&ok){
      const r=rankingSimulado._resultados[p.id];
      if(pr.l===r.l&&pr.v===r.v){lClass='sim-exacto';vClass='sim-exacto';}
      else if(Math.sign(pr.l-pr.v)===Math.sign(r.l-r.v)){lClass='sim-correcto';vClass='sim-correcto';}
      else{lClass='sim-fallo';vClass='sim-fallo';}
    }
    pHtml+=`<div class="pcard${ok?' ok':''}${lClass?' '+lClass:''}">
      <div class="psede">${p.s}</div>
      <div class="prow">
        <div class="ecol">${flagBadge(p.l,20)}<span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${pr.l!==undefined?' v':''}" ${cerrada?'disabled':''} oninput="setPred(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${pr.v!==undefined?' v':''}" ${cerrada?'disabled':''} oninput="setPred(${p.id},'v',this.value)">
        </div>
        <div class="ecol r"><span class="ename">${p.v}</span>${flagBadge(p.v,20)}</div>
      </div>
    </div>`;
  });
  const tablaHtml=renderTablaGrupo(grupoActivo);
  c.innerHTML=`<div class="grupo-layout"><div class="grupo-partidos">${pHtml}</div><div class="grupo-tabla" id="tabla-grupo">${tablaHtml}</div></div>`;
  actualizarProgreso();
}

function calcTablaGrupo(grupo){
  const eqs=GRUPOS[grupo];
  const ps=PARTIDOS.filter(p=>p.g===grupo);
  const tabla={};
  eqs.forEach(eq=>{tabla[eq]={pj:0,g:0,e:0,p:0,gf:0,gc:0,dif:0,pts:0};});
  ps.forEach(p=>{
    const pr=predicciones[p.id];if(!pr||pr.l===undefined||pr.v===undefined)return;
    const gl=pr.l,gv=pr.v;
    tabla[p.l].pj++;tabla[p.v].pj++;
    tabla[p.l].gf+=gl;tabla[p.l].gc+=gv;tabla[p.v].gf+=gv;tabla[p.v].gc+=gl;
    tabla[p.l].dif=tabla[p.l].gf-tabla[p.l].gc;tabla[p.v].dif=tabla[p.v].gf-tabla[p.v].gc;
    if(gl>gv){tabla[p.l].g++;tabla[p.l].pts+=3;tabla[p.v].p++;}
    else if(gv>gl){tabla[p.v].g++;tabla[p.v].pts+=3;tabla[p.l].p++;}
    else{tabla[p.l].e++;tabla[p.l].pts++;tabla[p.v].e++;tabla[p.v].pts++;}
  });
  return eqs.map(eq=>({eq,...tabla[eq]})).sort((a,b)=>b.pts-a.pts||b.dif-a.dif||b.gf-a.gf);
}

function renderTablaGrupo(grupo){
  const rows=calcTablaGrupo(grupo);
  const hayDatos=PARTIDOS.filter(p=>p.g===grupo).some(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;});
  if(!hayDatos)return '';
  return `<div class="gtabla-wrap">
    <div class="gtabla-title">Tabla — Grupo ${grupo}</div>
    <table class="gtabla">
      <thead><tr><th>Pos</th><th style="text-align:left">Pais</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DIF</th><th>Pts</th></tr></thead>
      <tbody>${rows.map((r,i)=>`<tr class="${i<2?'clasif':''}${i===2?' tercero':''}">
        <td class="pos-num">${i+1}</td>
        <td class="pais-cell">${flagBadge(r.eq,16)} <span>${r.eq}</span></td>
        <td>${r.pj}</td><td>${r.g}</td><td>${r.e}</td><td>${r.p}</td>
        <td>${r.gf}</td><td>${r.gc}</td>
        <td class="${r.dif>0?'dif-pos':r.dif<0?'dif-neg':''}">${r.dif>0?'+'+r.dif:r.dif}</td>
        <td class="pts-num">${r.pts}</td>
      </tr>`).join('')}</tbody>
    </table>
    <div class="gtabla-legend">
      <span class="legend-clasif">&#9632; Clasifican directamente</span>
      <span class="legend-tercero">&#9632; Posible mejor 3ro</span>
    </div>
  </div>`;
}

function setPred(id,lado,val){
  if(estaCerrada())return;
  const num=parseInt(val,10);
  if(!predicciones[id])predicciones[id]={};
  if(!isNaN(num)&&num>=0&&num<=20)predicciones[id][lado]=num;
  else delete predicciones[id][lado];
  actualizarProgreso();renderGrupoTabs();
  const te=document.getElementById('tabla-grupo');if(te)te.innerHTML=renderTablaGrupo(grupoActivo);
  // Auto-rellenar bracket en tiempo real
  autoRellenarBracketDesdeGrupos();
  // Si ya estamos viendo el bracket, actualizarlo
  const bracketEl=document.getElementById('bracket-container');
  if(bracketEl&&bracketEl.children.length>0)renderBracket();
}

function actualizarProgreso(){
  const total=PARTIDOS.length;
  const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  const pct=Math.round(done/total*100);
  const f=document.getElementById('prog-fill');if(f)f.style.width=pct+'%';
  const t=document.getElementById('prog-txt');if(t)t.textContent=`${done} de ${total} predichos`;
  const s=document.getElementById('q-status');if(s)s.textContent=done===total?'Lista para guardar':'Faltan '+(total-done)+' partidos';
}

async function guardarQuiniela(){
  if(estaCerrada()){alerta('q-alert','error','La quiniela esta cerrada.');return;}
  if(!usuarioActual&&!modoDemo){alerta('q-alert','error','Primero registrate.');return;}
  const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  if(done<PARTIDOS.length){alerta('q-alert','error','Faltan '+(PARTIDOS.length-done)+' partidos por completar.');return;}
  try{
    // Rellenar bracket con clasificados ANTES de guardar
    autoRellenarBracketDesdeGrupos();
    await guardarQuinielaCompleta();
    alerta('q-alert','success','Predicciones guardadas. Ve a 2da Ronda para ver los clasificados precargados.');
  }
  catch(e){alerta('q-alert','error','Error: '+e.message);}
}

// ============================================================
// PROGRESION AUTOMATICA 1ERA -> 2DA RONDA
// ============================================================
function autoRellenarBracketDesdeGrupos(){
  // Para cada partido de R32 con mapa definido, precarga el clasificado
  Object.entries(R32_AUTO).forEach(([bid,slots])=>{
    const bidN=parseInt(bid);
    if(!bracket[bidN])bracket[bidN]={};
    ['l','v'].forEach(lado=>{
      const s=slots[lado];
      if(!s)return; // slots null = mejor 3ro, no se auto-rellena
      const tabla=calcTablaGrupo(s.g);
      if(tabla.length>s.p){
        const equipoClasificado=tabla[s.p].eq;
        // Siempre actualizar el recomendado — el usuario puede sobreescribir manualmente despues
        bracket[bidN][lado]=equipoClasificado;
      }
    });
  });
}

// ============================================================
// BRACKET
// ============================================================
function getGanador(bid){
  const b=bracket[bid]||{};
  if(!b.l||!b.v||b.gl===undefined||b.gv===undefined)return null;
  if(b.gl>b.gv)return b.l;if(b.gv>b.gl)return b.v;
  return b.penales||null;
}

function propagarGanador(bid,visitados=new Set()){
  if(visitados.has(bid))return; // guard anti-ciclo
  visitados.add(bid);
  const prog=PROGRESION[bid];if(!prog)return;
  const ganador=getGanador(bid);
  const sigBid=prog.sig;const slot=prog.slot;
  if(!bracket[sigBid])bracket[sigBid]={};
  const previo=bracket[sigBid][slot];
  if(previo!==ganador){
    bracket[sigBid][slot]=ganador;
    // Limpiar marcador del partido siguiente para forzar re-prediccion
    delete bracket[sigBid].gl;delete bracket[sigBid].gv;delete bracket[sigBid].penales;
  }
  propagarGanador(sigBid,visitados);
}

function getPaisesSlot(m,lado){
  const grupos=lado==='l'?m.grupos_l:m.grupos_v;
  const tipo=lado==='l'?m.tipo_l:m.tipo_v;
  if(!grupos||tipo==='ganador')return null;
  let paises=[];grupos.forEach(g=>{if(GRUPOS[g])paises=[...paises,...GRUPOS[g]];});
  return{grupos,paises:[...new Set(paises)]};
}

// Obtener todos los equipos ya usados en R32 (para validar duplicados)
function getEquiposEnR32(){
  const r32bids=[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
  const usados={};
  r32bids.forEach(bid=>{
    const b=bracket[bid]||{};
    if(b.l)usados[b.l]=(usados[b.l]||[]).concat(bid);
    if(b.v)usados[b.v]=(usados[b.v]||[]).concat(bid);
  });
  return usados;
}

function matchCard(m,ronda){
  const b=bracket[m.bid]||{};
  const lN=b.l||null;const vN=b.v||null;
  const gl=b.gl!==undefined?b.gl:null;const gv=b.gv!==undefined?b.gv:null;
  const ok=lN&&vN&&gl!==null&&gv!==null;
  const ganador=getGanador(m.bid);
  const esEmpate=ok&&gl===gv;
  const penales=b.penales||null;
  const cerrada=estaCerrada();
  const lCheck=ganador===lN?'<span class="bcheck">&#10003;</span>':'';
  const vCheck=ganador===vN?'<span class="bcheck">&#10003;</span>':'';
  const penBadge=esEmpate&&penales?`<span class="bpen-badge">Pen: ${flagBadge(penales,14)} ${penales}</span>`:'';
  // Color simulacion
  let simClass='';
  if(rankingSimulado&&rankingSimulado._bracketRes&&rankingSimulado._bracketRes[m.bid]&&ok){
    const r=rankingSimulado._bracketRes[m.bid];
    const ganadorReal=r.ganador;
    if(gl===r.gl&&gv===r.gv)simClass=' sim-exacto';
    else if(ganador===ganadorReal)simClass=' sim-correcto';
    else simClass=' sim-fallo';
  }
  return `<div class="bmatch${ok?' ok':''}${cerrada?' locked':''}${simClass}" onclick="abrirModal(${m.bid})" title="${cerrada?'Quiniela cerrada':'Clic para editar'}">
    <div class="bmlbl">${m.desc} <span class="pts-pill">${ronda.pts_ex}pts</span></div>
    <div class="bteam${!lN?' empty':''}${ganador===lN?' winner':''}">
      ${lN?flagBadge(lN,18):'<span class="bq">?</span>'}
      <span class="btn">${lN||'Seleccionar'}</span>
      <span class="bsc">${gl!==null?gl:''}</span>
      ${lCheck}
    </div>
    <div class="bdiv"></div>
    <div class="bteam${!vN?' empty':''}${ganador===vN?' winner':''}">
      ${vN?flagBadge(vN,18):'<span class="bq">?</span>'}
      <span class="btn">${vN||'Seleccionar'}</span>
      <span class="bsc">${gv!==null?gv:''}</span>
      ${vCheck}
    </div>
    ${penBadge}
  </div>`;
}


// Borrar toda la seleccion de bracket
function resetBracket(){
  if(!confirm('¿Borrar todas las selecciones de la 2da Ronda? Esta accion no se puede deshacer.'))return;
  bracket={};
  renderBracket();
  alerta('b-alert','success','Bracket reiniciado.');
}

// Auto-calcular bracket completo desde predicciones de 1era ronda
function autoCalcularBracket(){
  // Llenar R32 con clasificados de grupos
  autoRellenarBracketDesdeGrupos();
  // Para mejor 3ro: tomar los 8 mejores 3eros de todos los grupos
  const todosTerceros=Object.keys(GRUPOS).map(g=>{
    const tabla=calcTablaGrupo(g);
    if(tabla.length<3)return null;
    return{eq:tabla[2].eq,pts:tabla[2].pts,dif:tabla[2].dif,gf:tabla[2].gf,grupo:g};
  }).filter(Boolean).sort((a,b)=>b.pts-a.pts||b.dif-a.dif||b.gf-a.gf);

  // Partidos que necesitan mejor 3ro (slot v=null en R32_AUTO)
  const slotsTercero=[74,77,79,80,81,82,85,87]; // bids con mejor 3ro
  const tercerosUsados=new Set();

  slotsTercero.forEach((bid,idx)=>{
    if(!bracket[bid])bracket[bid]={};
    // Encontrar el mejor 3ro disponible segun grupos permitidos
    const mp=BRACKET_RONDAS[0].partidos.find(p=>p.bid===bid);
    if(!mp)return;
    const gruposPermitidos=new Set(mp.grupos_v||[]);
    const candidato=todosTerceros.find(t=>gruposPermitidos.has(t.grupo)&&!tercerosUsados.has(t.eq));
    if(candidato){
      bracket[bid].v=candidato.eq;
      tercerosUsados.add(candidato.eq);
    }
  });

  renderBracket();
  alerta('b-alert','success','Bracket calculado desde tu seleccion de 1era Ronda. Ahora agrega los marcadores.');
}

function renderBracket(){
  const c=document.getElementById('bracket-container');if(!c)return;
  let html='<div class="bracket-cols">';
  BRACKET_RONDAS.forEach(ronda=>{
    html+=`<div class="bcol"><div class="bcol-title">${ronda.nombre}</div><div class="bcol-matches">`;
    ronda.partidos.forEach(m=>{html+=matchCard(m,ronda);});
    html+=`</div></div>`;
  });
  html+='</div>';c.innerHTML=html;
}

function abrirModal(bid){
  if(estaCerrada()){alert('La quiniela esta cerrada.');return;}
  let m=null,ronda=null;
  for(const r of BRACKET_RONDAS){const f=r.partidos.find(x=>x.bid===bid);if(f){m={...f,pts_ex:r.pts_ex};ronda=r;break;}}
  if(!m)return;
  modalActivo={bid,match:m};
  const b=bracket[bid]||{};
  document.getElementById('modal-title').textContent='Partido '+bid+' — '+m.desc;
  document.getElementById('modal-gl').value=b.gl!==undefined?b.gl:'';
  document.getElementById('modal-gv').value=b.gv!==undefined?b.gv:'';
  document.getElementById('modal-pen-msg').style.display='none';

  const esR32=ronda.id==='r32';
  const slotL=getPaisesSlot(m,'l');
  const slotV=getPaisesSlot(m,'v');
  const lTeam=b.l||null;
  const vTeam=b.v||null;
  let html='';

  if(esR32){
    // R32: mostrar dropdowns de seleccion con advertencia de equipos ya usados
    const r32bids=[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
    const usadosR32={};
    r32bids.forEach(otherBid=>{
      if(otherBid===bid)return;
      const ob=bracket[otherBid]||{};
      if(ob.l)usadosR32[ob.l]=otherBid;
      if(ob.v)usadosR32[ob.v]=otherBid;
    });
    const renderOpts=(grupos,lado)=>{
      const listaGrupos=grupos||Object.keys(GRUPOS);
      listaGrupos.forEach(g=>{
        html+=`<div class="modal-grupo-lbl">Grupo ${g}</div>`;
        GRUPOS[g].forEach(eq=>{
          const yaUsado=usadosR32[eq];
          const esSel=b[lado]===eq;
          const usadoLabel=yaUsado?`<span class="opt-usado-tag">Ya en partido ${yaUsado}</span>`:'';
          html+=`<div class="modal-opt${esSel?' sel':''}${yaUsado?' opt-usado':''}" data-lado="${lado}" data-eq="${eq}" onclick="selOpt(this)">
            ${flagBadge(eq,20)} <span>${g} — ${eq}</span>${usadoLabel}
          </div>`;
        });
      });
    };
    html+=`<div class="modal-sec-title">Equipo local${slotL?` — ${m.tipo_l==='1'?'1ro':m.tipo_l==='2'?'2do':'Mejor 3ro'} del grupo`:''}</div>`;
    renderOpts(slotL?slotL.grupos:null,'l');
    html+=`<div style="height:1px;background:var(--borde);margin:.75rem 0"></div>`;
    html+=`<div class="modal-sec-title">Equipo visitante${slotV?` — ${m.tipo_v==='1'?'1ro':m.tipo_v==='2'?'2do':'Mejor 3ro'} del grupo`:''}</div>`;
    renderOpts(slotV?slotV.grupos:null,'v');
  } else {
    // R16 en adelante: mostrar solo los posibles ganadores de los partidos anteriores
    // Buscar qué partidos alimentan este bid
    const feeders={l:null,v:null};
    Object.entries(PROGRESION).forEach(([fbid,prog])=>{
      if(prog.sig===bid) feeders[prog.slot]=parseInt(fbid);
    });

    const renderSlotAvanzado=(lado)=>{
      const feederBid=feeders[lado];
      const equipoActual=b[lado]||null;
      if(!feederBid){
        // No hay feeder mapeado — mostrar equipo actual como fijo
        html+=`<div class="equipo-fijo${!equipoActual?' pendiente':''}">
          ${equipoActual?flagBadge(equipoActual,24):'<span class="bq" style="width:36px;height:24px;font-size:12px">?</span>'}
          <div><div class="ef-nombre">${equipoActual||'Pendiente'}</div><div class="ef-label">Partido anterior</div></div>
        </div>`;
        if(equipoActual)html+=`<div class="modal-opt sel" data-lado="${lado}" data-eq="${equipoActual}" style="display:none"></div>`;
        return;
      }
      const fb=bracket[feederBid]||{};
      const ganadorFeeder=getGanador(feederBid);
      const posiblesEquipos=[fb.l,fb.v].filter(Boolean);

      if(ganadorFeeder){
        // Ganador ya determinado — mostrar como fijo
        html+=`<div class="equipo-fijo">
          ${flagBadge(ganadorFeeder,24)}
          <div>
            <div class="ef-nombre">${ganadorFeeder}</div>
            <div class="ef-label">Ganador partido ${feederBid}</div>
          </div>
        </div>`;
        html+=`<div class="modal-opt sel" data-lado="${lado}" data-eq="${ganadorFeeder}" style="display:none"></div>`;
      } else if(posiblesEquipos.length===2){
        // Partido anterior tiene equipos pero sin marcador — mostrar los 2 como opcion
        html+=`<div style="font-size:11px;color:var(--muted);margin-bottom:6px">¿Quién ganará el partido ${feederBid}?</div>`;
        posiblesEquipos.forEach(eq=>{
          html+=`<div class="modal-opt${b[lado]===eq?' sel':''}" data-lado="${lado}" data-eq="${eq}" onclick="selOpt(this)">
            ${flagBadge(eq,20)} <span>${eq}</span>
          </div>`;
        });
      } else {
        // Partido anterior no tiene equipos aún
        html+=`<div class="equipo-fijo pendiente">
          <span class="bq" style="width:36px;height:24px;font-size:12px">?</span>
          <div><div class="ef-nombre">Pendiente</div><div class="ef-label">Completa partido ${feederBid} primero</div></div>
        </div>`;
      }
    };

    html+=`<div class="modal-sec-title">Equipo local</div>`;
    html+=`<div class="modal-equipos-fijos" style="flex-direction:column;gap:6px">`;
    renderSlotAvanzado('l');
    html+=`</div>`;
    html+=`<div style="height:1px;background:var(--borde);margin:.75rem 0"></div>`;
    html+=`<div class="modal-sec-title">Equipo visitante</div>`;
    html+=`<div class="modal-equipos-fijos" style="flex-direction:column;gap:6px">`;
    renderSlotAvanzado('v');
    html+=`</div>`;
  }

  document.getElementById('modal-opts').innerHTML=html;
  document.getElementById('bracket-modal').classList.add('on');

  // Actualizar penales en tiempo real al cambiar marcador
  setTimeout(()=>{
    const glEl=document.getElementById('modal-gl');
    const gvEl=document.getElementById('modal-gv');
    if(glEl)glEl.addEventListener('input',actualizarPenalesModal);
    if(gvEl)gvEl.addEventListener('input',actualizarPenalesModal);
    actualizarPenalesModal();
  },50);
}

function actualizarPenalesModal(){
  if(!modalActivo)return;
  const bid=modalActivo.bid;
  const b=bracket[bid]||{};
  const gl=parseInt(document.getElementById('modal-gl')?.value,10);
  const gv=parseInt(document.getElementById('modal-gv')?.value,10);
  const esEmpate=!isNaN(gl)&&!isNaN(gv)&&gl===gv;

  // Obtener equipos seleccionados actualmente en el modal
  const selL=document.querySelector('.modal-opt[data-lado="l"].sel');
  const selV=document.querySelector('.modal-opt[data-lado="v"].sel');
  const lTeam=selL?selL.dataset.eq:(b.l||null);
  const vTeam=selV?selV.dataset.eq:(b.v||null);

  let penSection=document.getElementById('penales-section');
  if(!penSection){
    penSection=document.createElement('div');
    penSection.id='penales-section';
    document.getElementById('modal-opts').appendChild(penSection);
  }

  if(esEmpate&&lTeam&&vTeam){
    penSection.innerHTML=`
      <div style="height:1px;background:var(--borde);margin:.75rem 0"></div>
      <div class="modal-sec-title" style="color:#c0392b">Empate — ¿Quién gana en penales?</div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:.5rem">Obligatorio para continuar</div>
      ${[lTeam,vTeam].map(eq=>`
        <div class="modal-opt${b.penales===eq?' sel':''}" data-lado="pen" data-eq="${eq}" onclick="selOpt(this)">
          ${flagBadge(eq,20)} <span>${eq}</span>
        </div>`).join('')}`;
    document.getElementById('modal-pen-msg').style.display='none';
  } else {
    penSection.innerHTML='';
    document.getElementById('modal-pen-msg').style.display='none';
  }
}

function selOpt(el){
  const lado=el.dataset.lado;
  document.querySelectorAll(`.modal-opt[data-lado="${lado}"]`).forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel');
}

function confirmarModal(){
  if(estaCerrada())return;if(!modalActivo)return;
  const bid=modalActivo.bid;
  if(!bracket[bid])bracket[bid]={};
  const selL=document.querySelector('.modal-opt[data-lado="l"].sel');
  const selV=document.querySelector('.modal-opt[data-lado="v"].sel');
  if(!selL||!selV){alert('Selecciona ambos equipos.');return;}
  const nuevoL=selL.dataset.eq;const nuevoV=selV.dataset.eq;
  // Validar que no sean el mismo
  if(nuevoL===nuevoV){alert('No puedes seleccionar el mismo equipo en ambos lados.');return;}
  // Validar duplicados en R32
  const r32bids=[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
  if(r32bids.includes(bid)){
    for(const otherBid of r32bids){
      if(otherBid===bid)continue;
      const ob=bracket[otherBid]||{};
      if(ob.l===nuevoL||ob.v===nuevoL){alert(`${nuevoL} ya aparece en el partido ${otherBid}. Cada equipo solo puede aparecer una vez en la Ronda de 32.`);return;}
      if(ob.l===nuevoV||ob.v===nuevoV){alert(`${nuevoV} ya aparece en el partido ${otherBid}. Cada equipo solo puede aparecer una vez en la Ronda de 32.`);return;}
    }
  }
  bracket[bid].l=nuevoL;bracket[bid].v=nuevoV;
  const gl=parseInt(document.getElementById('modal-gl').value,10);
  const gv=parseInt(document.getElementById('modal-gv').value,10);
  if(isNaN(gl)||isNaN(gv)||gl<0||gv<0||gl>20||gv>20){alert('Ingresa un marcador valido (0-20).');return;}
  bracket[bid].gl=gl;bracket[bid].gv=gv;
  const selPen=document.querySelector('.modal-opt[data-lado="pen"].sel');
  if(gl===gv&&!selPen){
    document.getElementById('modal-pen-msg').style.display='block';
    return;
  }
  document.getElementById('modal-pen-msg').style.display='none';
  if(gl===gv)bracket[bid].penales=selPen.dataset.eq;
  else delete bracket[bid].penales;
  propagarGanador(bid);
  cerrarModal();renderBracket();
}

function cerrarModal(){document.getElementById('bracket-modal').classList.remove('on');modalActivo=null;}

async function guardarBracket(){
  if(estaCerrada()){alerta('b-alert','error','La quiniela esta cerrada.');return;}
  if(!usuarioActual&&!modoDemo){alerta('b-alert','error','Primero registrate.');return;}
  try{await guardarQuinielaCompleta();alerta('b-alert','success','Bracket guardado.');}
  catch(e){alerta('b-alert','error','Error: '+e.message);}
}

// ============================================================
// GOLEADOR
// ============================================================
function renderGoleador(){
  const g=document.getElementById('goleador-grid');if(!g)return;
  const cerrada=estaCerrada();
  g.innerHTML=TODOS_PAISES.map(eq=>`
    <button class="camp-btn${goleador===eq?' sel':''}" ${cerrada?'disabled':''} onclick="selGoleador('${eq}')">
      ${flagBadge(eq,28)}<span style="font-size:10px;margin-top:3px">${eq}</span>
    </button>`).join('');
  const st=document.getElementById('g-status');if(st)st.textContent=goleador?'Seleccionado: '+goleador:'Selecciona el pais goleador';
}
function selGoleador(eq){if(estaCerrada())return;goleador=eq;renderGoleador();}
async function guardarGoleador(){
  if(estaCerrada()){alerta('g-alert','error','La quiniela esta cerrada.');return;}
  if(!usuarioActual&&!modoDemo){alerta('g-alert','error','Primero registrate.');return;}
  if(!goleador){alerta('g-alert','error','Selecciona un pais.');return;}
  try{await guardarQuinielaCompleta();alerta('g-alert','success','Pais goleador guardado: '+goleador+'.');}
  catch(e){alerta('g-alert','error','Error: '+e.message);}
}

// ============================================================
// RANKING
// ============================================================
const DEMO_RANK=[
  {alias:'Efro Tecology',nombre:'Efrain Gomez',pts:142,goleador:'Brasil'},
  {alias:'LaVaquita FC',nombre:'Carlos Rodriguez',pts:128,goleador:'Argentina'},
  {alias:'MisterMundial',nombre:'Maria Gonzalez',pts:115,goleador:'Francia'},
  {alias:'ElPulpo2026',nombre:'Andres Morales',pts:98,goleador:'Espana'},
  {alias:'GolazoFan',nombre:'Sofia Castillo',pts:87,goleador:'Brasil'},
  {alias:'TigresCR7',nombre:'Pedro Jimenez',pts:76,goleador:'Portugal'},
  {alias:'PajaritoPan',nombre:'Luisa Ramos',pts:61,goleador:'Panama'},
];

async function renderRanking(){
  let data=[];
  if(rankingSimulado?.length)data=rankingSimulado;
  else if(modoDemo)data=DEMO_RANK;
  else if(sbClient){const{data:rows}=await sbClient.from('ranking_view').select('*').order('pts',{ascending:false}).limit(100);if(rows&&rows.length)data=rows;}
  if(!data.length)data=DEMO_RANK;
  const c=document.getElementById('ranking-container');if(!c)return;
  c.innerHTML=data.map((p,i)=>{
    const ini=(p.alias||p.nombre).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const pos=i===0?'&#127951;':i===1?'&#127952;':i===2?'&#127953;':(i+1);
    return `<div class="rankrow">
      <div class="rankpos${i<3?' med':''}">${pos}</div>
      <div class="rankavatar">${ini}</div>
      <div><div class="rankname">${p.alias||p.nombre}</div></div>
      <div class="rankcamp">${p.goleador?flagBadge(p.goleador,16)+' ':''} ${p.goleador||'—'}</div>
      <div class="rankpts">${p.pts}<span class="ptslbl">pts</span></div>
    </div>`;
  }).join('');
  document.getElementById('stat-total').textContent=participantes.length||data.length;
  // Mi posicion
  const stat=document.getElementById('stat-mipos');
  if(stat&&usuarioActual){
    const idx=data.findIndex(x=>String(x.id)===String(usuarioActual.id)||(x.alias||x.nombre)===(usuarioActual.alias||usuarioActual.nombre));
    stat.textContent=idx>=0?(idx+1):'—';
  }
}

// ============================================================
// SIMULACION VISUAL
// ============================================================
function calcPuntosParticipante(preds,brac,gol,resultados){
  let pts=0;
  // Grupos
  PARTIDOS.forEach(p=>{
    const pr=preds[p.id];const r=resultados[p.id];
    if(!pr||!r||pr.l===undefined||pr.v===undefined)return;
    if(pr.l===r.l&&pr.v===r.v)pts+=5; // exacto
    else if(Math.sign(pr.l-pr.v)===Math.sign(r.l-r.v))pts+=2; // resultado
  });
  // Pais goleador
  if(gol&&resultados._goleador&&gol===resultados._goleador)pts+=30;
  return pts;
}

function simularRankingDemo(){
  // Generar resultados simulados para todos los partidos
  const resultados={};
  PARTIDOS.forEach(p=>{
    const gl=Math.floor(Math.random()*4);
    const gv=Math.floor(Math.random()*4);
    resultados[p.id]={l:gl,v:gv};
  });
  resultados._goleador=FAVORITOS_SIM[Math.floor(Math.random()*FAVORITOS_SIM.length)];
  resultados._bracketRes={};
  BRACKET_RONDAS.forEach(ronda=>{
    ronda.partidos.forEach(m=>{
      const gl=Math.floor(Math.random()*3),gv=Math.floor(Math.random()*2);
      const ganador=gl>gv?'Equipo A':gv>gl?'Equipo B':Math.random()>0.5?'Equipo A':'Equipo B';
      resultados._bracketRes[m.bid]={gl,gv,ganador};
    });
  });

  // Calcular puntos por participante
  const base=participantes.length?participantes:DEMO_RANK.map((p,i)=>({...p,id:'demo_'+i}));
  rankingSimulado=base.map(p=>{
    const qLocal=localStorage.getItem('quiniela_'+p.id);
    const q=qLocal?JSON.parse(qLocal):null;
    const preds=q?parseMaybeJSON(q.predicciones,{}):{};
    const gol=q?q.goleador:null;
    const pts=Object.keys(preds).length>0?calcPuntosParticipante(preds,{},gol,resultados):Math.floor(Math.random()*120)+20;
    return{id:p.id,alias:p.alias||p.nombre,nombre:p.nombre,pts,goleador:FAVORITOS_SIM[Math.floor(Math.random()*FAVORITOS_SIM.length)]};
  }).sort((a,b)=>b.pts-a.pts);
  rankingSimulado._resultados=resultados;
  renderRanking();renderPartidosGrupo();renderBracket();
  alerta('sim-alert','success','Simulacion generada. Verde = exacto, Dorado = resultado correcto, Rojo = fallo.');
}

function limpiarSimulacion(){
  rankingSimulado=null;
  renderRanking();renderPartidosGrupo();renderBracket();
  alerta('sim-alert','success','Simulacion limpiada.');
}

// ============================================================
// DEMO
// ============================================================
function getPaisesParaSlot(m,lado){const s=getPaisesSlot(m,lado);return s?s:null;}

function activarDemo(){
  modoDemo=true;
  document.getElementById('demo-banner').classList.add('on');
  document.getElementById('demo-fab').style.display='none';
  usuarioActual={id:'demo',nombre:'Demo Usuario',alias:'DemoFan2026',email:'demo@bit.com',codigo:'BIT-DEMO0'};
  mostrarUsuario('DemoFan2026');
  predicciones={};bracket={};goleador='Brasil';
  PARTIDOS.forEach(p=>{predicciones[p.id]={l:Math.floor(Math.random()*4),v:Math.floor(Math.random()*4)};});
  // Auto-rellenar bracket desde grupos simulados
  autoRellenarBracketDesdeGrupos();
  // Llenar slots restantes (mejor 3ro y rondas avanzadas)
  BRACKET_RONDAS.forEach(ronda=>{
    ronda.partidos.forEach(m=>{
      const b=bracket[m.bid]||{};
      if(!bracket[m.bid])bracket[m.bid]={};
      const sl=getPaisesParaSlot(m,'l');const sv=getPaisesParaSlot(m,'v');
      const pl=sl?sl.paises:TODOS_PAISES;const pv=sv?sv.paises:TODOS_PAISES;
      if(!b.l)bracket[m.bid].l=pl[Math.floor(Math.random()*pl.length)];
      if(!b.v){
        let v=pv[Math.floor(Math.random()*pv.length)];
        if(v===bracket[m.bid].l&&pv.length>1)v=pv.filter(x=>x!==bracket[m.bid].l)[0];
        bracket[m.bid].v=v;
      }
      const gl=Math.floor(Math.random()*4),gv=Math.floor(Math.random()*4);
      bracket[m.bid].gl=gl;bracket[m.bid].gv=gv;
      if(gl===gv)bracket[m.bid].penales=Math.random()>0.5?bracket[m.bid].l:bracket[m.bid].v;
    });
  });
  // Propagar ganadores en orden
  [73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].forEach(bid=>propagarGanador(bid));
  participantes=DEMO_RANK.map((p,i)=>({...p,id:'demo_'+i}));
  actualizarContadores();renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();renderRanking();aplicarCierreUI();
  alert('Modo demo activado. Navega por todas las secciones.');
}

function salirDemo(){
  modoDemo=false;predicciones={};bracket={};goleador=null;usuarioActual=null;rankingSimulado=null;
  document.getElementById('demo-banner').classList.remove('on');
  document.getElementById('demo-fab').style.display='';
  document.getElementById('uchip').classList.remove('on');
  renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();renderRanking();actualizarContadores();aplicarCierreUI();
}

// ============================================================
// ADMIN
// ============================================================
function verificarAdmin(callback){
  // Password temporalmente desactivado
  callback();
}

function confirmarAdminPass(){
  const val=document.getElementById('admin-pass-input').value;
  if(val===ADMIN_PASS){
    adminAutenticado=true;
    localStorage.setItem('admin_auth',val);
    document.getElementById('admin-pass-modal').classList.remove('on');
    if(window._adminCallback)window._adminCallback();
  } else {
    document.getElementById('admin-pass-error').style.display='block';
    document.getElementById('admin-pass-input').value='';
    document.getElementById('admin-pass-input').focus();
  }
}

function cerrarAdminModal(){
  document.getElementById('admin-pass-modal').classList.remove('on');
  window._adminCallback=null;
}

function renderAdmin(){
  verificarAdmin(()=>{_renderAdminContent();});
}

function _renderAdminContent(){
  const loc=JSON.parse(localStorage.getItem('participantes')||'[]');
  const data=participantes.length?participantes:loc;
  const c=document.getElementById('admin-table');if(!c)return;
  if(!data.length){c.innerHTML='<p style="color:var(--muted);font-size:13px">Sin participantes registrados.</p>';cargarCodigos();return;}
  c.innerHTML=`<table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead><tr style="border-bottom:2px solid var(--borde)">
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">#</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Nombre</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Alias</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Correo</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Codigo</th>
      <th style="text-align:left;padding:7px;color:var(--muted);font-size:10px;text-transform:uppercase">Ver</th>
    </tr></thead>
    <tbody>${data.map((p,i)=>`<tr style="border-bottom:1px solid rgba(0,0,0,0.05);cursor:pointer" onclick="verPerfil('${p.id}')">
      <td style="padding:7px;color:var(--muted)">${i+1}</td>
      <td style="padding:7px;font-weight:500">${p.nombre||'—'}</td>
      <td style="padding:7px;color:var(--verde);font-weight:700">${p.alias||'—'}</td>
      <td style="padding:7px;color:var(--muted)">${p.email||'—'}</td>
      <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo||'—'}</td>
      <td style="padding:7px"><span style="color:var(--verde);font-size:12px;font-weight:600">Ver &rarr;</span></td>
    </tr>`).join('')}</tbody>
  </table>`;
  cargarCodigos();
} // end _renderAdminContent

async function verPerfil(pid){
  const p=participantes.find(x=>String(x.id)===String(pid));
  if(!p){alert('Participante no encontrado.');return;}
  let q=null;
  if(sbClient){const{data}=await sbClient.from('quinielas').select('*').eq('participante_id',pid).maybeSingle();q=data;}
  else{const qs=localStorage.getItem('quiniela_'+pid);if(qs)q=JSON.parse(qs);}
  const preds=q?parseMaybeJSON(q.predicciones,{}):{}; const gol=q?q.goleador:null;
  const done=PARTIDOS.filter(x=>{const pr=preds[x.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  let predsHtml='';
  PARTIDOS.slice(0,12).forEach(pa=>{
    const pr=preds[pa.id];
    predsHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid var(--borde);font-size:12px">
      <span>${flagBadge(pa.l,16)} ${pa.l}</span>
      <span style="font-family:'Barlow Condensed',sans-serif;font-weight:800;color:var(--verde);margin:0 6px">${pr?pr.l:'-'} – ${pr?pr.v:'-'}</span>
      <span>${pa.v} ${flagBadge(pa.v,16)}</span>
    </div>`;
  });
  document.getElementById('perfil-body').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1rem">
      <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Nombre</div><div style="font-weight:600">${p.nombre||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Alias</div><div style="font-weight:700;color:var(--verde)">${p.alias||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Correo</div><div style="font-size:13px">${p.email||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Codigo</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo||'—'}</div></div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:1rem">
      <div style="background:#eaf5ee;color:#0a5c2e;border-radius:8px;padding:10px;flex:1;text-align:center">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.5rem">${done}/72</div>
        <div style="font-size:11px">Partidos predichos</div>
      </div>
      <div style="background:#fffbf0;color:#7a5500;border-radius:8px;padding:10px;flex:1;text-align:center">
        <div style="font-size:1rem">${gol?flagBadge(gol,20)+' ':''}</div>
        <div style="font-size:11px">Goleador: ${gol||'Sin seleccion'}</div>
      </div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">Predicciones — Primeros 12 partidos</div>
    ${predsHtml}
    <div style="font-size:11px;color:var(--muted);margin-top:.5rem;text-align:center">Mostrando 12 de ${PARTIDOS.length} partidos</div>`;
  document.getElementById('perfil-modal').classList.add('on');
}
function cerrarPerfil(){document.getElementById('perfil-modal').classList.remove('on');}

async function cargarCodigos(){
  const c=document.getElementById('codigos-list');if(!c)return;
  if(!sbClient){c.innerHTML='<p style="color:var(--muted);font-size:13px">Conecta Supabase para gestionar codigos.</p>';return;}
  const{data}=await sbClient.from('codigos_participante').select('*').order('codigo');
  todosCodigos=data||[];
  if(!todosCodigos.length){c.innerHTML='<p style="color:var(--muted);font-size:13px">Sin codigos generados.</p>';return;}
  const libres=todosCodigos.filter(d=>!d.usado).length;
  c.innerHTML=`<p style="font-size:12px;color:var(--muted);margin-bottom:.75rem"><strong>${libres}</strong> disponibles &middot; <strong>${todosCodigos.length-libres}</strong> usados &middot; <strong>${todosCodigos.length}</strong> total</p>`+
    `<div style="display:flex;flex-wrap:wrap;gap:4px">`+
    todosCodigos.map(d=>{const pid=participantes.find(p=>p.codigo===d.codigo)?.id;
      return `<span class="codigo-chip ${d.usado?'usado':'libre'}" style="cursor:${d.usado?'pointer':'default'}" ${d.usado&&pid?`onclick="verPerfil('${pid}')" title="Ver participante"`:''}>
        ${d.codigo}${d.usado?' ✓':''}
      </span>`;
    }).join('')+`</div>`;
}

async function generarCodigos(){
  const cant=parseInt(document.getElementById('cant-codigos').value,10)||10;
  if(!sbClient){alert('Conecta Supabase primero.');return;}
  const existentes=new Set(todosCodigos.map(c=>c.codigo));
  const nuevos=[];let intentos=0;
  while(nuevos.length<cant&&intentos<cant*20){
    const cod=generarCodigoAlfanum();
    if(!existentes.has(cod)){nuevos.push({codigo:cod,usado:false});existentes.add(cod);}
    intentos++;
  }
  if(!nuevos.length){alert('No se pudieron generar codigos unicos.');return;}
  const{error}=await sbClient.from('codigos_participante').insert(nuevos);
  if(error){alert('Error: '+error.message);return;}
  alert(nuevos.length+' codigos generados.');cargarCodigos();
}

function exportarCodigos(){
  if(!todosCodigos.length){alert('No hay codigos.');return;}
  const csv=['Codigo,Estado,Participante',...todosCodigos.map(d=>{const p=participantes.find(x=>x.codigo===d.codigo);return `${d.codigo},${d.usado?'Usado':'Disponible'},${p?p.nombre:''}`})].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));a.download='codigos_quiniela2026.csv';a.click();
}

function exportarCSV(){
  const loc=JSON.parse(localStorage.getItem('participantes')||'[]');
  const data=participantes.length?participantes:loc;
  if(!data.length){alert('Sin datos.');return;}
  const cols=['nombre','alias','email','tel','codigo','favorito','fecha'];
  const csv=[cols.join(','),...data.map(r=>cols.map(c=>`"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));a.download='participantes_quiniela2026.csv';a.click();
}

function aplicarConfig(){
  const emp=document.getElementById('cfg-empresa').value.trim();
  const col=document.getElementById('cfg-color').value.trim();
  if(emp){document.getElementById('empresa-label').textContent=emp;localStorage.setItem('cfg_empresa',emp);}
  if(col&&/^#[0-9a-fA-F]{6}$/.test(col)){document.documentElement.style.setProperty('--verde',col);localStorage.setItem('cfg_color',col);}
  alert('Configuracion aplicada.');
}

// ============================================================
// INIT
// ============================================================
async function init(){
  calcDias();renderGrupoTabs();renderPartidosGrupo();renderGoleador();renderRanking();
  const emp=localStorage.getItem('cfg_empresa');const col=localStorage.getItem('cfg_color');
  if(emp)document.getElementById('empresa-label').textContent=emp;
  if(col)document.documentElement.style.setProperty('--verde',col);
  await cargarSDK();await autoConectar();await cargarConfiguracion();aplicarCierreUI();
}
document.addEventListener('DOMContentLoaded',init);
