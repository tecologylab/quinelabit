// =============================================
// QUINIELA FIFA 2026 - app.js v7.0
// Business IT — Produccion
// =============================================

const SB_URL = "https://zriyqyeoiommrnyvwjto.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXlxeWVvaW9tbXJueXZ3anRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzQ1ODMsImV4cCI6MjA5MjE1MDU4M30.fylrPptB3VpnkXw2qMxh2PgLPBpt5OvIjoPgOzTTjog";
const FECHA_INICIO = new Date('2026-06-11T00:00:00');
// Cierre de la elección de País Goleador: 24 jun 2026, 2:00 PM hora Panamá (UTC-5)
const FECHA_CIERRE_GOLEADOR = new Date('2026-06-24T14:00:00-05:00');

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
  {id:5,g:'D',l:'Australia',v:'Turkiye',f:'2026-06-14',h:'00:00',s:'BC Place, Vancouver'},
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
  {id:17,g:'I',l:'Francia',v:'Senegal',f:'2026-06-16',h:'14:00',s:'MetLife, NJ'},
  {id:18,g:'I',l:'Iraq',v:'Noruega',f:'2026-06-16',h:'17:00',s:'Gillette, Foxborough'},
  {id:19,g:'J',l:'Argentina',v:'Argelia',f:'2026-06-16',h:'20:00',s:'Arrowhead, Kansas City'},
  {id:20,g:'J',l:'Austria',v:'Jordania',f:'2026-06-16',h:'23:00',s:"Levi's, Santa Clara"},
  {id:21,g:'K',l:'Portugal',v:'DR Congo',f:'2026-06-17',h:'13:00',s:'NRG, Houston'},
  {id:22,g:'L',l:'Inglaterra',v:'Croacia',f:'2026-06-17',h:'16:00',s:'AT&T, Arlington'},
  {id:23,g:'L',l:'Ghana',v:'Panama',f:'2026-06-17',h:'19:00',s:'BMO Field, Toronto'},
  {id:24,g:'K',l:'Uzbekistan',v:'Colombia',f:'2026-06-17',h:'22:00',s:'Azteca, Cdmx'},
  {id:25,g:'A',l:'Rep. Checa',v:'Sudafrica',f:'2026-06-18',h:'12:00',s:'Mercedes-Benz, Atlanta'},
  {id:26,g:'B',l:'Suiza',v:'Bosnia-Herzegovina',f:'2026-06-18',h:'15:00',s:'SoFi, Inglewood'},
  {id:27,g:'B',l:'Canada',v:'Qatar',f:'2026-06-18',h:'18:00',s:'BC Place, Vancouver'},
  {id:28,g:'A',l:'Mexico',v:'Corea del Sur',f:'2026-06-18',h:'21:00',s:'Akron, Zapopan'},
  {id:29,g:'D',l:'Turkiye',v:'Paraguay',f:'2026-06-19',h:'23:00',s:"Levi's, Santa Clara"},
  {id:30,g:'D',l:'EEUU',v:'Australia',f:'2026-06-19',h:'15:00',s:'Lumen Field, Seattle'},
  {id:31,g:'C',l:'Escocia',v:'Marruecos',f:'2026-06-19',h:'18:00',s:'Gillette, Foxborough'},
  {id:32,g:'C',l:'Brasil',v:'Haiti',f:'2026-06-19',h:'21:00',s:'Lincoln Financial, Phila'},
  {id:33,g:'F',l:'Tunez',v:'Japon',f:'2026-06-21',h:'00:00',s:'BBVA, Monterrey'},
  {id:34,g:'F',l:'Paises Bajos',v:'Suecia',f:'2026-06-20',h:'22:00',s:'NRG, Houston'},
  {id:35,g:'E',l:'Alemania',v:'Costa de Marfil',f:'2026-06-20',h:'16:00',s:'BMO Field, Toronto'},
  {id:36,g:'E',l:'Ecuador',v:'Curazao',f:'2026-06-20',h:'19:00',s:'Arrowhead, Kansas City'},
  {id:37,g:'H',l:'Espana',v:'Arabia Saudita',f:'2026-06-21',h:'12:00',s:'Mercedes-Benz, Atlanta'},
  {id:38,g:'G',l:'Belgica',v:'Iran',f:'2026-06-21',h:'15:00',s:'SoFi, Inglewood'},
  {id:39,g:'H',l:'Uruguay',v:'Cabo Verde',f:'2026-06-21',h:'18:00',s:'Hard Rock, Miami'},
  {id:40,g:'G',l:'Nueva Zelanda',v:'Egipto',f:'2026-06-21',h:'21:00',s:'BC Place, Vancouver'},
  {id:41,g:'J',l:'Argentina',v:'Austria',f:'2026-06-22',h:'13:00',s:'AT&T, Arlington'},
  {id:42,g:'I',l:'Francia',v:'Iraq',f:'2026-06-22',h:'16:00',s:'Lincoln Financial, Phila'},
  {id:43,g:'I',l:'Noruega',v:'Senegal',f:'2026-06-22',h:'19:00',s:'MetLife, NJ'},
  {id:44,g:'J',l:'Jordania',v:'Argelia',f:'2026-06-22',h:'23:00',s:"Levi's, Santa Clara"},
  {id:45,g:'K',l:'Portugal',v:'Uzbekistan',f:'2026-06-23',h:'13:00',s:'NRG, Houston'},
  {id:46,g:'L',l:'Inglaterra',v:'Ghana',f:'2026-06-23',h:'16:00',s:'Gillette, Foxborough'},
  {id:47,g:'L',l:'Panama',v:'Croacia',f:'2026-06-23',h:'19:00',s:'BMO Field, Toronto'},
  {id:48,g:'K',l:'Colombia',v:'DR Congo',f:'2026-06-23',h:'22:00',s:'Akron, Zapopan'},
  {id:49,g:'B',l:'Suiza',v:'Canada',f:'2026-06-24',h:'19:00',s:'BC Place, Vancouver'},
  {id:50,g:'B',l:'Bosnia-Herzegovina',v:'Qatar',f:'2026-06-24',h:'19:00',s:'Lumen Field, Seattle'},
  {id:51,g:'C',l:'Escocia',v:'Brasil',f:'2026-06-24',h:'16:00',s:'Hard Rock, Miami'},
  {id:52,g:'C',l:'Marruecos',v:'Haiti',f:'2026-06-24',h:'16:00',s:'Mercedes-Benz, Atlanta'},
  {id:53,g:'A',l:'Rep. Checa',v:'Mexico',f:'2026-06-24',h:'22:00',s:'Azteca, Cdmx'},
  {id:54,g:'A',l:'Sudafrica',v:'Corea del Sur',f:'2026-06-24',h:'22:00',s:'BBVA, Monterrey'},
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
    {bid:104,desc:'FINAL',    sede:'MetLife, Nueva Jersey'},
    {bid:103,desc:'3er Lugar',sede:'Hard Rock, Miami'},
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
// PREMIOS
// ============================================================
async function renderPremios(cfg=null){
  const c=document.getElementById('premios-container');
  const empty=document.getElementById('premios-empty');
  if(!c)return;
  // Si no hay config cargada, intentar desde Supabase
  if(!cfg&&!window._configVisual&&sbClient){
    try{
      const{data}=await sbClient.from('configuracion_visual').select('*');
      if(data&&data.length){const cv={};data.forEach(r=>{cv[r.clave]=r.valor;});window._configVisual=cv;cfg=cv;}
    }catch(e){}
  }
  const src=cfg||window._configVisual||{};
  const premios=[];
  for(let i=1;i<=3;i++){
    const img=src['premio'+i+'_img']||localStorage.getItem('premio'+i+'_img');
    const desc=src['premio'+i+'_desc']||localStorage.getItem('premio'+i+'_desc');
    if(img||desc)premios.push({n:i,img,desc});
  }
  if(!premios.length){
    c.innerHTML='';
    if(empty)empty.style.display='';
    return;
  }
  if(empty)empty.style.display='none';
  const medals=['🥇','🥈','🥉'];
  const titulos=['1er Premio','2do Premio','3er Premio'];
  c.innerHTML=`<div class="card">
    <div class="card-hdr">
      <div class="card-icon">🏆</div>
      <div class="card-title">Premios de la Quiniela</div>
    </div>
    <div class="premios-grid">
      ${premios.map(p=>`
        <div class="premio-card">
          ${p.img?`<img src="${p.img}" alt="Premio ${p.n}" onerror="this.style.display='none'">`:''}
          <div class="premio-card-body">
            <div class="premio-medal">${medals[p.n-1]}</div>
            <div class="premio-titulo">${titulos[p.n-1]}</div>
            ${p.desc?`<div class="premio-desc">${p.desc}</div>`:''}
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

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
function estaCerrada(ronda=null){
  if(modoDemo)return false;
  if(configGlobal.permitir_edicion===false)return true;
  // Cierre global
  if(configGlobal.fecha_cierre&&new Date()>new Date(configGlobal.fecha_cierre))return true;
  // Cierre propio del País Goleador
  if(ronda==='goleador'&&FECHA_CIERRE_GOLEADOR&&new Date()>FECHA_CIERRE_GOLEADOR)return true;
  // Cierre por ronda
  if(ronda){
    const mapaCierre={
      'grupos':'fecha_cierre_grupos',
      'r32':'fecha_cierre_r32',
      'r16':'fecha_cierre_r16',
      'qf':'fecha_cierre_qf',
      'sf':'fecha_cierre_sf',
      'final':'fecha_cierre_final',
    };
    const clave=mapaCierre[ronda];
    if(clave&&configGlobal[clave]&&new Date()>new Date(configGlobal[clave]))return true;
  }
  return false;
}
// Fecha de cierre efectiva de una ronda (round-specific o global, la más temprana)
function fechaCierreRonda(ronda){
  const mapa={grupos:'fecha_cierre_grupos',r32:'fecha_cierre_r32',r16:'fecha_cierre_r16',qf:'fecha_cierre_qf',sf:'fecha_cierre_sf',final:'fecha_cierre_final'};
  const propia=configGlobal[mapa[ronda]]||null;
  const global=configGlobal.fecha_cierre||null;
  if(propia&&global)return new Date(propia)<new Date(global)?propia:global;
  return propia||global||null;
}
// Texto para mostrar bajo el título de cada ronda
function textoCierreRonda(ronda){
  if(configGlobal.permitir_edicion===false)return '🔒 Edición cerrada por el administrador';
  const f=fechaCierreRonda(ronda);
  if(!f)return '';
  const fecha=new Date(f);
  const fmt=fecha.toLocaleString('es-PA',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'});
  return (new Date()>fecha)?('🔒 Cerró el '+fmt+' (hora Panamá)'):('⏰ Cierra: '+fmt+' (hora Panamá)');
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
  if(id==='premios')renderPremios();
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
      if(data){
        configGlobal={
          permitir_edicion:data.permitir_edicion!==false,
          fecha_cierre:data.fecha_cierre||null,
          fecha_cierre_grupos:data.fecha_cierre_grupos||null,
          fecha_cierre_r32:data.fecha_cierre_r32||null,
          fecha_cierre_r16:data.fecha_cierre_r16||null,
          fecha_cierre_qf:data.fecha_cierre_qf||null,
          fecha_cierre_sf:data.fecha_cierre_sf||null,
          fecha_cierre_final:data.fecha_cierre_final||null,
        };
      }
      // Cargar configuracion visual desde Supabase
      await cargarConfigVisualSupabase();
    } else {
      const loc=parseMaybeJSON(localStorage.getItem('configuracion_local'),null);
      if(loc)configGlobal=loc;
      // Fallback localStorage para config visual
      cargarConfigVisualLocal();
    }
  }catch(e){console.error('Error cargando config:',e);}
  aplicarCierreUI();
}

async function cargarConfigVisualSupabase(){
  try{
    const{data}=await sbClient.from('configuracion_visual').select('*');
    if(!data||!data.length)return;
    const cfg={};
    data.forEach(r=>{cfg[r.clave]=r.valor;});
    aplicarConfigVisual(cfg);
  }catch(e){}
}

function cargarConfigVisualLocal(){
  const claves=['cfg_empresa','cfg_color','hero_badge','hero_titulo','hero_subtitulo',
    'ad_zona1','ad_zona2','ad_zona6',
    'premio1_img','premio1_desc','premio2_img','premio2_desc','premio3_img','premio3_desc'];
  const cfg={};
  claves.forEach(k=>{const v=localStorage.getItem(k);if(v)cfg[k]=v;});
  aplicarConfigVisual(cfg);
}

// ============================================================
// SANITIZACIÓN (anti-XSS) para config visual escrita en Supabase
// ============================================================
// Permite solo etiquetas de formato seguras; elimina scripts, on*=, javascript:, y otros tags
function sanitizarHTML(str){
  if(!str)return '';
  let s=String(str);
  s=s.replace(/<\/?(?:script|style|iframe|object|embed|link|meta|svg|img|video|audio|form|input)[^>]*>/gi,'');
  s=s.replace(/\son\w+\s*=\s*"[^"]*"/gi,'').replace(/\son\w+\s*=\s*'[^']*'/gi,'').replace(/\son\w+\s*=\s*[^\s>]+/gi,'');
  s=s.replace(/javascript:/gi,'');
  // dejar solo tags de formato permitidos; quitar cualquier otro tag
  s=s.replace(/<(?!\/?(?:span|b|strong|i|em|br)\b)[^>]*>/gi,'');
  return s;
}
// Devuelve una URL de imagen segura (http/https) extraída del valor, o null
function urlImagenSegura(val){
  if(!val)return null;
  let url=String(val).trim();
  const m=url.match(/src\s*=\s*["']([^"']+)["']/i);
  if(m)url=m[1].trim();
  if(/^https?:\/\//i.test(url)&&!/["'<>]/.test(url)&&!/javascript:/i.test(url))return url;
  return null;
}

function aplicarConfigVisual(cfg){
  // Empresa y color
  if(cfg.cfg_empresa){
    const el=document.getElementById('empresa-label');
    if(el)el.textContent=cfg.cfg_empresa;
  }
  if(cfg.cfg_color&&/^#[0-9a-fA-F]{6}$/.test(cfg.cfg_color)){
    document.documentElement.style.setProperty('--verde',cfg.cfg_color);
  }
  // Hero texts
  const heroBadge=document.getElementById('hero-badge-txt');
  const heroTitulo=document.getElementById('hero-titulo-txt');
  const heroSub=document.getElementById('hero-subtitulo-txt');
  if(cfg.hero_badge&&heroBadge)heroBadge.textContent=cfg.hero_badge;
  if(cfg.hero_titulo&&heroTitulo)heroTitulo.innerHTML=sanitizarHTML(cfg.hero_titulo);
  if(cfg.hero_subtitulo&&heroSub)heroSub.textContent=cfg.hero_subtitulo;
  // Ads — solo imágenes desde URL validada (nunca HTML arbitrario -> evita XSS)
  ['1','2','6'].forEach(z=>{
    const val=cfg['ad_zona'+z];
    const zona=document.getElementById('ad-zona'+z);
    const contenido=document.getElementById('ad-zona'+z+'-content');
    if(!zona||!contenido)return;
    const url=urlImagenSegura(val);
    if(url){
      contenido.innerHTML=`<img src="${url}" style="max-width:100%;height:auto;display:block;margin:0 auto">`;
      // Quitar el recuadro placeholder (borde punteado) al mostrar el anuncio real
      contenido.style.border='none';contenido.style.background='none';contenido.style.minHeight='0';contenido.style.padding='0';
      zona.style.display='';
    }
  });
  // Premios
  window._configVisual=cfg;
  renderPremios(cfg);
}

async function guardarConfiguracionAdmin(){
  const v=id=>document.getElementById(id)?.value||'';
  // El input datetime-local se interpreta SIEMPRE como hora de Panamá (UTC-5, sin horario de verano)
  const toISO=s=>{ if(!s)return null; const conSeg=s.length===16?s+':00':s; return new Date(conSeg+'-05:00').toISOString(); };
  const permitir=v('cfg-permitir-edicion')==='true';
  const payload={
    fecha_cierre: toISO(v('cfg-fecha-cierre')),
    permitir_edicion: permitir,
    fecha_cierre_grupos: toISO(v('cfg-fecha-grupos')),
    fecha_cierre_r32: toISO(v('cfg-fecha-r32')),
    fecha_cierre_r16: toISO(v('cfg-fecha-r16')),
    fecha_cierre_qf: toISO(v('cfg-fecha-qf')),
    fecha_cierre_sf: toISO(v('cfg-fecha-sf')),
    fecha_cierre_final: toISO(v('cfg-fecha-final')),
  };
  const nuevaPass=v('cfg-admin-pass').trim();
  try{
    if(sbClient){
      const{data:ex}=await sbClient.from('configuracion').select('id').limit(1).maybeSingle();
      let res;
      if(ex?.id){res=await sbClient.from('configuracion').update(payload).eq('id',ex.id).select();}
      else{res=await sbClient.from('configuracion').insert([payload]).select();}
      if(res.error)throw res.error;
      if(!res.data||!res.data.length)throw new Error('No se guardó: falta política UPDATE/INSERT en `configuracion` (RLS) en Supabase.');
    } else {localStorage.setItem('configuracion_local',JSON.stringify(payload));}
    configGlobal={...configGlobal,...payload};aplicarCierreUI();
    renderPartidosGrupo();renderBracket();renderGoleador();
    const cerrada=estaCerrada();
    alerta('cfg-alert','success','Configuración guardada.'+(cerrada?' La quiniela quedó CERRADA.':' La quiniela está ABIERTA.'));
    // Cambio de contraseña admin (vía RPC con hash; requiere la contraseña actual)
    if(nuevaPass&&sbClient){
      const actual=prompt('Para cambiar la contraseña de admin, ingresa la contraseña ACTUAL:');
      if(actual){
        const{data:ok,error}=await sbClient.rpc('cambiar_admin_password',{p_actual:actual,p_nueva:nuevaPass});
        if(error)alerta('cfg-alert','error','No se pudo cambiar la contraseña (¿falta la RPC en Supabase?): '+error.message);
        else if(ok)alerta('cfg-alert','success','Contraseña de admin actualizada.');
        else alerta('cfg-alert','error','La contraseña actual no es correcta. No se cambió.');
      }
      const passInput=document.getElementById('cfg-admin-pass');if(passInput)passInput.value='';
    }
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
  const tel=document.getElementById('r-tel')?.value.trim()||'';
  const codigo=document.getElementById('r-codigo').value.trim().toUpperCase();
  const favorito=document.getElementById('r-favorito')?.value||'';
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
    guardarSesion(email,codigo);
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
    guardarSesion(email,codigo);
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

// ============================================================
// SESION LOCAL (recordar correo+codigo para auto-login)
// ============================================================
function guardarSesion(email,codigo){
  try{localStorage.setItem('bit_sesion',JSON.stringify({email,codigo}));}catch(e){}
}
function borrarSesion(){try{localStorage.removeItem('bit_sesion');}catch(e){}}

async function autoLoginSesion(){
  const s=parseMaybeJSON(localStorage.getItem('bit_sesion'),null);
  if(!s||!s.email||!s.codigo||!sbClient||usuarioActual)return;
  try{
    const{data}=await sbClient.from('participantes').select('*').eq('email',s.email).eq('codigo',s.codigo).maybeSingle();
    if(!data){borrarSesion();return;} // codigo cambiado/borrado: limpiar sesion
    usuarioActual=data;
    const{data:q}=await sbClient.from('quinielas').select('*').eq('participante_id',data.id).maybeSingle();
    if(q){predicciones=parseMaybeJSON(q.predicciones,{});bracket=parseMaybeJSON(q.bracket,{});goleador=q.goleador||null;}
    mostrarUsuario(usuarioActual.alias||usuarioActual.nombre);
    renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();
  }catch(e){}
}

function cerrarSesion(){
  borrarSesion();
  usuarioActual=null;predicciones={};bracket={};goleador=null;
  document.getElementById('uchip').classList.remove('on');
  renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();
  const reg=document.querySelector('.nav-btn');if(reg)goSec('registro',reg);
}
async function cargarParticipantes(){
  if(sbClient){const{data}=await sbClient.from('participantes').select('*');participantes=data||[];}
  else{participantes=JSON.parse(localStorage.getItem('participantes')||'[]');}
  actualizarContadores();
}
function actualizarContadores(){
  const n=participantes.filter(p=>!p.oculto).length;
  document.querySelectorAll('#hero-part,#stat-total').forEach(el=>{if(el)el.textContent=n;});
}

// ============================================================
// GUARDADO CENTRAL
// ============================================================
async function guardarQuinielaCompleta(){
  const datos={participante_id:usuarioActual?.id,predicciones:JSON.stringify(predicciones),bracket:JSON.stringify(bracket),goleador,fecha:new Date().toISOString()};
  if(sbClient&&!modoDemo){
    const{data,error}=await sbClient.from('quinielas').upsert([datos],{onConflict:'participante_id'}).select();
    if(error)throw error;
    if(!data||!data.length)throw new Error('No se guardó (revisa políticas INSERT/UPDATE de quinielas en Supabase).');
  } else {localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'),JSON.stringify(datos));}
}

// Autoguardado en tiempo real (con debounce) al editar predicciones
let _autoQTimer=null;
function autoGuardarQuiniela(){
  if(modoDemo||!usuarioActual||!sbClient)return;
  const s=document.getElementById('q-status');
  if(s)s.textContent='Guardando…';
  clearTimeout(_autoQTimer);
  _autoQTimer=setTimeout(async()=>{
    try{
      autoRellenarBracketDesdeGrupos();
      await guardarQuinielaCompleta();
      const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
      if(s)s.textContent=`Guardado automático ✓ (${done}/${PARTIDOS.length})`;
    }catch(e){
      if(s)s.textContent='Error al guardar: '+e.message;
    }
  },700);
}



const EDITORIAL = {
  1: {fav:'Mexico',conf:'Alta',exp:'México tiene ventaja por localía, mejor Elo relativo y experiencia mundialista. Sudáfrica llega como rival físico, pero con menor profundidad.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  2: {fav:'Corea del Sur',conf:'Baja',exp:'Es uno de los partidos más parejos del grupo. Corea tiene ritmo e intensidad, mientras Rep. Checa aporta orden europeo y juego directo.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  25: {fav:'Rep. Checa',conf:'Media',exp:'Rep. Checa parte mejor por estructura táctica y roce UEFA. Sudáfrica puede igualarlo si lleva el partido a duelo físico.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  28: {fav:'Mexico',conf:'Media-baja',exp:'México tendrá apoyo regional y mejor contexto, pero Corea puede castigar con velocidad y presión alta. Partido incómodo.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  53: {fav:'Mexico',conf:'Media-baja',exp:'México luce ligeramente superior por localía y jerarquía, aunque Rep. Checa puede complicarlo si necesita puntos para clasificar.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  54: {fav:'Corea del Sur',conf:'Media',exp:'Corea tiene más continuidad mundialista y mejor dinámica competitiva. Sudáfrica necesitaría un partido muy disciplinado para sorprender.',grupo:'México parte como favorito; Corea y Rep. Checa pelean cerrado por el segundo lugar.'},
  3: {fav:'Canada',conf:'Media',exp:'Canadá tiene localía, velocidad y mejor momento competitivo. Bosnia tiene talento técnico, pero menor profundidad reciente.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  6: {fav:'Suiza',conf:'Alta',exp:'Suiza tiene ventaja clara por Elo, experiencia europea y solidez defensiva. Qatar tendría que jugar a marcador bajo para competir.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  26: {fav:'Suiza',conf:'Alta',exp:'Suiza es el equipo más estable del grupo y suele competir bien en torneos. Bosnia puede incomodar, pero parte abajo.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  27: {fav:'Canada',conf:'Alta',exp:'Canadá combina localía, físico y transiciones rápidas. Qatar luce como el rival más vulnerable del grupo.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  49: {fav:'Suiza',conf:'Baja',exp:'Suiza tiene mejor estructura, pero Canadá juega en casa y puede convertirlo en una final del grupo. Muy cerrado.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  50: {fav:'Bosnia-Herzegovina',conf:'Media',exp:'Bosnia tiene más argumentos técnicos y mejor roce competitivo. Qatar puede resistir si controla el ritmo.',grupo:'Suiza y Canadá lucen como los más fuertes; el duelo directo puede definir el primer lugar.'},
  7: {fav:'Brasil',conf:'Media',exp:'Brasil tiene más techo individual, pero llega con ruido por lesiones y decisiones de convocatoria. Marruecos es tácticamente fuerte.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  8: {fav:'Escocia',conf:'Media-alta',exp:'Escocia tiene mejor Elo relativo, más roce europeo y más oficio competitivo. Haití llega como posible sorpresa, pero parte abajo.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  31: {fav:'Marruecos',conf:'Baja',exp:'Marruecos tiene más calidad reciente y mejor estructura, pero Escocia puede hacerlo muy físico y cerrado. Partido trampa.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  32: {fav:'Brasil',conf:'Alta',exp:'Diferencia fuerte en talento, profundidad y jerarquía. Haití tendría que sostener un partido defensivo casi perfecto.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  51: {fav:'Brasil',conf:'Alta',exp:'Brasil tiene una ventaja importante en ataque y profundidad de banca. Escocia puede competir, pero el diferencial individual pesa.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  52: {fav:'Marruecos',conf:'Alta',exp:'Marruecos llega con una base sólida y mejor actualidad internacional. Haití necesitaría orden total y efectividad máxima.',grupo:'Brasil y Marruecos parten arriba; Escocia tiene perfil de tercero peligroso.'},
  4: {fav:'EEUU',conf:'Media',exp:'EEUU tiene localía y mejor profundidad, aunque llega con algunas dudas físicas recientes. Paraguay es intenso y competitivo.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  5: {fav:'Turkiye',conf:'Media-baja',exp:'Turquía tiene más talento técnico y mejor techo ofensivo. Australia suele competir bien físicamente y no será fácil de quebrar.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  29: {fav:'Turkiye',conf:'Baja',exp:'Partido muy parejo. Turquía tiene más recursos creativos, pero Paraguay puede hacerlo incómodo con presión, orden y duelos.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  30: {fav:'EEUU',conf:'Media-alta',exp:'La localía y el ritmo del equipo estadounidense pesan bastante. Australia puede resistir, pero le costará generar volumen ofensivo.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  59: {fav:'EEUU',conf:'Media-baja',exp:'EEUU tendrá ventaja de entorno, pero Turquía tiene calidad para disputar posesión y castigar errores. Partido de alto riesgo.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  60: {fav:'Paraguay',conf:'Media-baja',exp:'Paraguay tiene mejor perfil sudamericano para partidos tensos. Australia puede igualar por físico y balón parado.',grupo:'EEUU parte favorito por localía; Turquía y Paraguay pelean fuerte por clasificación.'},
  9: {fav:'Alemania',conf:'Alta',exp:'Alemania tiene ventaja enorme en Elo, profundidad y experiencia. Curazao llega como historia linda, pero con una brecha grande.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  11: {fav:'Ecuador',conf:'Media-baja',exp:'Ecuador tiene una base competitiva fuerte y buen historial reciente en eliminatorias. Costa de Marfil puede equilibrar por potencia física.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  35: {fav:'Alemania',conf:'Alta',exp:'Alemania parte superior por estructura y variantes ofensivas. Costa de Marfil puede generar peligro físico, pero necesitaría alta efectividad.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  36: {fav:'Ecuador',conf:'Alta',exp:'Ecuador tiene mayor calidad colectiva y más experiencia en partidos de alta presión. Curazao necesitaría defender muy bajo.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  55: {fav:'Costa de Marfil',conf:'Media-alta',exp:'Costa de Marfil tiene más físico, talento y experiencia internacional. Curazao puede competir si mantiene orden y calma.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  56: {fav:'Alemania',conf:'Media',exp:'Alemania tiene más jerarquía, pero Ecuador es de los rivales más incómodos del grupo. Puede ser partido cerrado si hay puntos en juego.',grupo:'Alemania es favorito claro; Ecuador y Costa de Marfil se perfilan como duelo clave por el segundo puesto.'},
  10: {fav:'Paises Bajos',conf:'Media',exp:'Países Bajos tiene más jerarquía y poder físico. Japón llega competitivo, aunque con bajas ofensivas importantes recientes.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  12: {fav:'Suecia',conf:'Media',exp:'Suecia tiene más peso europeo y mejor estructura ofensiva. Túnez puede hacerlo cerrado si ordena bien el bloque medio.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  33: {fav:'Japon',conf:'Media',exp:'Japón tiene mejor ritmo técnico y mayor dinámica colectiva. Túnez puede reducir diferencias con disciplina defensiva.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  34: {fav:'Paises Bajos',conf:'Media-alta',exp:'Países Bajos tiene ventaja por talento y experiencia en grandes torneos. Suecia puede incomodar con juego directo y balón parado.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  57: {fav:'Japon',conf:'Baja',exp:'Partido muy parejo. Japón tiene más movilidad y automatismos, mientras Suecia puede castigar por físico y pelota aérea.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  58: {fav:'Paises Bajos',conf:'Alta',exp:'Países Bajos tiene una ventaja clara en calidad y profundidad. Túnez necesitaría un partido perfecto para sostenerlo.',grupo:'Países Bajos es el favorito; Japón y Suecia pueden definir el segundo lugar en duelo directo.'},
  14: {fav:'Belgica',conf:'Media',exp:'Bélgica tiene mejor Elo y más profundidad, pero Egipto puede ser peligroso si Salah llega en forma. Partido con alerta.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  16: {fav:'Iran',conf:'Media-alta',exp:'Irán tiene más experiencia mundialista y mejor estructura competitiva. Nueva Zelanda puede competir por físico, pero parte abajo.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  38: {fav:'Belgica',conf:'Media-alta',exp:'Bélgica tiene más variantes ofensivas y calidad individual. Irán puede volverlo incómodo si protege bien el centro.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  40: {fav:'Egipto',conf:'Media-alta',exp:'Egipto tiene más talento diferencial y mayor jerarquía competitiva. Nueva Zelanda dependerá del orden y balón parado.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  65: {fav:'Egipto',conf:'Baja',exp:'Duelo muy parejo por estilo y experiencia. Egipto tiene ligera ventaja por mayor peso ofensivo, pero Irán puede cerrar espacios.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  66: {fav:'Belgica',conf:'Alta',exp:'La diferencia de profundidad y talento favorece claramente a Bélgica. Nueva Zelanda necesitaría una sorpresa grande.',grupo:'Bélgica parte favorita; Egipto e Irán pueden jugarse el segundo lugar en un duelo muy cerrado.'},
  13: {fav:'Espana',conf:'Alta',exp:'España llega como una de las selecciones más fuertes por Elo y juego colectivo. Cabo Verde compite bien, pero la brecha es grande.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  15: {fav:'Uruguay',conf:'Alta',exp:'Uruguay tiene más jerarquía, intensidad y experiencia en torneos grandes. Arabia Saudita puede incomodar si baja el ritmo.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  37: {fav:'Espana',conf:'Alta',exp:'España tiene ventaja clara en posesión, calidad técnica y profundidad. Arabia Saudita necesitaría resistir y salir muy bien.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  39: {fav:'Uruguay',conf:'Alta',exp:'Uruguay tiene mayor oficio competitivo y mejor capacidad física. Cabo Verde puede pelear, pero parte abajo.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  63: {fav:'Arabia Saudita',conf:'Baja',exp:'Partido parejo. Arabia tiene más experiencia mundialista, pero Cabo Verde puede competir físicamente y aprovechar transiciones.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  64: {fav:'Espana',conf:'Media-baja',exp:'España tiene mejor Elo, pero Uruguay es uno de los rivales más duros del grupo. Partido intenso y de detalles.',grupo:'España y Uruguay son favoritos claros; el duelo directo debe definir el primer puesto.'},
  17: {fav:'Francia',conf:'Media',exp:'Francia es candidata por Elo y profundidad, pero Deschamps ha pedido cautela: Senegal es fuerte, físico y muy competitivo.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  18: {fav:'Noruega',conf:'Media-alta',exp:'Noruega tiene mayor peso ofensivo y figuras diferenciales. Iraq puede competir con orden, pero parte abajo estadísticamente.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  42: {fav:'Francia',conf:'Alta',exp:'Francia tiene una ventaja clara por talento, profundidad y experiencia. Iraq necesitaría un partido defensivo de altísimo nivel.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  43: {fav:'Senegal',conf:'Baja',exp:'Partido muy parejo. Senegal tiene más balance colectivo, mientras Noruega puede cambiar el partido con su poder ofensivo.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  61: {fav:'Francia',conf:'Media',exp:'Francia tiene mejor plantilla, pero Noruega puede hacer daño si encuentra espacios. Partido de cuidado para el favorito.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  62: {fav:'Senegal',conf:'Alta',exp:'Senegal tiene más físico, experiencia y jerarquía reciente. Iraq necesita orden total para sostenerlo.',grupo:'Francia parte arriba; Senegal y Noruega pueden jugarse una clasificación muy apretada.'},
  19: {fav:'Argentina',conf:'Alta',exp:'Argentina llega con jerarquía de campeón, alto Elo y mucha experiencia. Argelia tiene talento, pero necesita máxima eficiencia.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  20: {fav:'Austria',conf:'Alta',exp:'Austria tiene una estructura europea muy competitiva y mayor profundidad. Jordania llega con bajas recientes importantes.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  41: {fav:'Argentina',conf:'Media',exp:'Argentina tiene más jerarquía, pero Austria es un rival ordenado, físico y tácticamente fuerte. Puede ser el partido clave del grupo.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  44: {fav:'Argelia',conf:'Media',exp:'Argelia tiene más talento y experiencia internacional. Jordania puede competir con bloque bajo, pero las bajas le pesan.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  71: {fav:'Austria',conf:'Baja',exp:'Partido de clasificación probable. Austria tiene más orden, Argelia más desequilibrio individual; margen muy corto.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  72: {fav:'Argentina',conf:'Alta',exp:'Diferencia fuerte en calidad, experiencia y profundidad. Jordania necesitaría un partido perfecto para rascar puntos.',grupo:'Argentina es favorita clara; Austria y Argelia deben pelear el segundo lugar.'},
  21: {fav:'Portugal',conf:'Alta',exp:'Portugal tiene más calidad, profundidad y experiencia en torneos. RD Congo puede competir físicamente, pero parte bastante abajo.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  24: {fav:'Colombia',conf:'Media-alta',exp:'Colombia llega con mayor jerarquía sudamericana y mejor Elo relativo. Uzbekistán puede ser ordenado, pero le falta roce mundialista.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  45: {fav:'Portugal',conf:'Alta',exp:'Portugal tiene ventaja clara por talento ofensivo y banca. Uzbekistán necesitaría resistir mucho sin balón.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  48: {fav:'Colombia',conf:'Media-alta',exp:'Colombia tiene más continuidad competitiva y mejor calidad técnica. RD Congo puede incomodar por físico y transiciones.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  69: {fav:'Portugal',conf:'Baja',exp:'Duelo premium del grupo. Portugal tiene ligera ventaja por profundidad, pero Colombia puede competir de tú a tú.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  70: {fav:'DR Congo',conf:'Baja',exp:'Partido muy parejo. RD Congo tiene más potencia física, Uzbekistán más orden; puede definirse por detalles.',grupo:'Portugal y Colombia son favoritos; el duelo directo debe definir el primer lugar.'},
  22: {fav:'Inglaterra',conf:'Media-baja',exp:'Inglaterra tiene mejor Elo y más profundidad, aunque llega con historial reciente de inconvenientes físicos. Croacia siempre compite.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
  23: {fav:'Ghana',conf:'Media',exp:'Ghana tiene ventaja por potencia física y experiencia mundialista. Panamá puede competir si sostiene orden, presión y transiciones rápidas.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
  46: {fav:'Inglaterra',conf:'Alta',exp:'Inglaterra tiene más variantes ofensivas y profundidad. Ghana puede ser peligroso físicamente, pero parte abajo.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
  47: {fav:'Croacia',conf:'Media-alta',exp:'Croacia tiene más oficio, control de ritmo y experiencia. Panamá necesita intensidad, orden defensivo y máxima efectividad.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
  67: {fav:'Inglaterra',conf:'Alta',exp:'Inglaterra tiene una brecha importante por plantilla y jerarquía. Panamá tendría que jugar un partido muy ordenado y sin errores.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
  68: {fav:'Croacia',conf:'Media',exp:'Croacia tiene más control y experiencia en torneos. Ghana puede hacerlo incómodo con físico y velocidad.',grupo:'Inglaterra parte como favorita; Croacia es fuerte candidata al segundo lugar.'},
};

// ============================================================
// PREDICTOR DE FAVORITOS — Ranking FIFA 2025
// ============================================================
const FIFA_RANKING = {
  'Francia':1890,'Espana':1876,'Inglaterra':1856,'Brasil':1840,'Argentina':1830,
  'Portugal':1820,'Belgica':1780,'Paises Bajos':1760,'Alemania':1755,'Uruguay':1720,
  'Colombia':1710,'EEUU':1690,'Mexico':1680,'Marruecos':1660,'Japon':1640,
  'Senegal':1620,'Croacia':1610,'Suiza':1600,'Australia':1580,'Corea del Sur':1570,
  'Iran':1550,'Canada':1540,'Ecuador':1530,'Panama':1520,'Tunez':1510,
  'Noruega':1500,'Austria':1490,'Suecia':1480,'Turkiye':1470,'Egypte':1460,
  'Egipto':1460,'Escocia':1450,'Uzbekistan':1440,'Bolivia':1430,'Paraguay':1420,
  'Iraq':1410,'Jordania':1400,'Arabia Saudita':1390,'Ghana':1380,'Argelia':1370,
  'Colombia':1710,'DR Congo':1360,'Cabo Verde':1350,'Rep. Checa':1340,
  'Bosnia-Herzegovina':1330,'Nueva Zelanda':1320,'Haiti':1310,'Curazao':1300,
  'Qatar':1290,'Sudafrica':1280,'Uzbekistan':1440,'Indonesia':1270,
  'Australia':1580,'Iran':1550,
};

function getProbabilidad(local, visita) {
  const ptsL = FIFA_RANKING[local] || 1300;
  const ptsV = FIFA_RANKING[visita] || 1300;
  const total = ptsL + ptsV;
  const pctL = Math.round((ptsL / total) * 100);
  const pctV = 100 - pctL;
  return { pctL, pctV, favoritoL: ptsL >= ptsV };
}

function predictorHTML(local, visita, pid) {
  const { pctL, pctV, favoritoL } = getProbabilidad(local, visita);
  const barL = pctL;
  const barV = pctV;
  const may = calcMayoriaCompleta(pid, local, visita);
  const ed = EDITORIAL[pid];
  const confColor = {'Alta':'#0a5c2e','Media':'#c9a84c','Media-alta':'#7ab04e','Media-baja':'#e67e22','Baja':'#c0392b'}[ed?.conf||'']||'#888';
  // Resultado oficial si existe
  const resOf = resultadosAdmin[pid]||(window._resOficiales&&window._resOficiales[pid]);
  let resHtml='';
  if(resOf&&resOf.l!==undefined&&resOf.v!==undefined){
    const pr=predicciones[pid];
    let badge='',bgColor='',txtColor='';
    if(pr&&pr.l!==undefined){
      if(pr.l===resOf.l&&pr.v===resOf.v){badge='+5pts ✓';bgColor='#0a5c2e';txtColor='#fff';}
      else if(Math.sign(pr.l-pr.v)===Math.sign(resOf.l-resOf.v)){badge='+2pts';bgColor='#f0cb6a';txtColor='#7a5500';}
      else{badge='0pts ✗';bgColor='#c0392b';txtColor='#fff';}
    }
    const rowBg=badge.includes('5')?'#eaf5ee':badge.includes('2')?'#fffbf0':'#fef0f0';
    const rowBorder=badge.includes('5')?'var(--verde)':badge.includes('2')?'var(--oro)':'#c0392b';
    resHtml=`<div class='res-oficial-row' style='background:${rowBg};border-left-color:${rowBorder}'>
      <div class='res-oficial-marcador'>⚽ Resultado oficial: ${resOf.l} – ${resOf.v}</div>
      ${pr&&pr.l!==undefined?`<div class='res-oficial-pred'>Tu predicción: ${pr.l}-${pr.v} <span class='res-badge' style='background:${bgColor};color:${txtColor}'>${badge}</span></div>`:''}
    </div>`;
  }
  return `<div class='predictor-wrap'>
    ${resHtml}
    <div class='pred-elo-lbl' style='font-family:Barlow Condensed,sans-serif;font-weight:700;letter-spacing:.06em'>PREDICCIÓN X RANKING FIFA</div>
    <div class='pred-bar-row'>
      <span class='pred-pct${favoritoL?' pred-fav':''}'>${pctL}%</span>
      <div class='pred-bar'>
        <div class='pred-fill-l' style='width:${barL}%'></div>
        <div class='pred-fill-r' style='width:${barV}%'></div>
      </div>
      <span class='pred-pct${!favoritoL?' pred-fav':''}'>${pctV}%</span>
    </div>
    ${may?`<div class='pred-mayoria'>👥 Mayoría eligió: <b>${may.equipo}</b> (${may.count} ${may.count===1?'persona':'personas'}) &nbsp;·&nbsp; Marcador más votado: <b>${may.marcador}</b></div>`:''}
    ${ed?`<div class='pred-info-link' data-pid='${pid}' onclick='abrirEditorial(parseInt(this.dataset.pid))'>ℹ️ Más info para elegir →</div>`:''}
  </div>`;
}

function calcMayoriaCompleta(pid, local, visita) {
  if (!window._predMayoria || !window._predMayoria[pid]) return null;
  const counts = window._predMayoria[pid];
  if (!Object.keys(counts).length) return null;
  // Marcador más votado
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const [marcador, count] = sorted[0];
  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  // Equipo ganador de ese marcador
  const [gl,gv] = marcador.split('-').map(Number);
  const equipo = gl>gv?local:gv>gl?visita:'Empate';
  return {equipo, count, total, marcador};
}

function abrirEditorial(pid) {
  const ed = EDITORIAL[pid];
  if (!ed) return;
  const p = PARTIDOS.find(x=>x.id===pid);
  if (!p) return;
  const confColor = {'Alta':'#0a5c2e','Media':'#888','Media-alta':'#7ab04e','Media-baja':'#e67e22','Baja':'#c0392b'}[ed.conf]||'#888';
  const modal = document.getElementById('editorial-modal');
  const body = document.getElementById('editorial-body');
  if (!modal||!body) return;
  body.innerHTML = `
    <div style='display:flex;align-items:center;gap:10px;margin-bottom:1rem'>
      ${flagBadge(p.l,24)} <span style='font-weight:700;font-size:15px'>${p.l}</span>
      <span style='color:var(--muted);font-size:13px;margin:0 4px'>vs</span>
      ${flagBadge(p.v,24)} <span style='font-weight:700;font-size:15px'>${p.v}</span>
    </div>
    <div style='background:#f0f8f4;border-radius:8px;padding:10px 14px;margin-bottom:.75rem'>
      <div style='font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px'>Favorito por la IA y los medios</div>
      <div style='font-weight:700;font-size:16px;color:var(--verde)'>${flagBadge(ed.fav,20)} ${ed.fav}</div>
    </div>
    <div style='display:flex;align-items:center;gap:8px;margin-bottom:.75rem'>
      <span style='font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em'>Confianza:</span>
      <span style='font-weight:700;font-size:13px;color:${confColor};background:${confColor}22;padding:2px 10px;border-radius:12px'>${ed.conf}</span>
    </div>
    <div style='font-size:13px;color:var(--text);line-height:1.6;margin-bottom:1rem'>${ed.exp}</div>
    <div style='border-top:1px solid var(--borde);padding-top:.75rem'>
      <div style='font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px'>Lectura del grupo</div>
      <div style='font-size:12px;color:var(--muted);line-height:1.5;font-style:italic'>${ed.grupo}</div>
    </div>`;
  modal.classList.add('on');
}

function calcMayoria(pid) {
  // Calcular el marcador más predicho entre todos los participantes
  // Solo funciona si tenemos datos cargados
  if (!window._predMayoria || !window._predMayoria[pid]) return null;
  const counts = window._predMayoria[pid];
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return null;
  const [marcador, count] = sorted[0];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return `${marcador} (${count}/${total})`;
}

async function cargarMayorias() {
  if (!sbClient) return;
  try {
    const { data } = await sbClient.from('quinielas').select('predicciones');
    if (!data || !data.length) return;
    const conteos = {};
    data.forEach(q => {
      const preds = parseMaybeJSON(q.predicciones, {});
      Object.entries(preds).forEach(([pid, pr]) => {
        if (pr.l === undefined || pr.v === undefined) return;
        if (!conteos[pid]) conteos[pid] = {};
        const key = `${pr.l}-${pr.v}`;
        conteos[pid][key] = (conteos[pid][key] || 0) + 1;
      });
    });
    window._predMayoria = conteos;
  } catch (e) {}
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

// Cierre automático por partido: cada partido de grupos cierra 1h antes de su inicio.
// La hora de los partidos está en ET (EDT = UTC-4 durante el Mundial jun/jul 2026).
function kickoffPartido(p){
  if(!p||!p.f||!p.h)return null;
  const d=new Date(`${p.f}T${p.h}:00-04:00`);
  return isNaN(d.getTime())?null:d;
}
function partidoCerrado(p){
  if(modoDemo)return false;
  if(estaCerrada('grupos'))return true; // cierre global/ronda lo cierra todo
  const ko=kickoffPartido(p);
  return !!(ko && Date.now() > ko.getTime()-60*60*1000);
}

function renderPartidosGrupo(){
  const c=document.getElementById('partidos-container');if(!c)return;
  const ps=PARTIDOS.filter(p=>p.g===grupoActivo);
  let pHtml='';let fa='';
  ps.forEach(p=>{
    const _fh=p.f+'|'+p.h;if(_fh!==fa){fa=_fh;pHtml+=`<div class="flbl">${fmtFecha(p.f)} · ${p.h} ET</div>`;}
    const cerrada=partidoCerrado(p); // cada partido cierra 1h antes de su inicio
    const pr=predicciones[p.id]||{};
    const lv=pr.l!==undefined?pr.l:'';const vv=pr.v!==undefined?pr.v:'';
    const ok=pr.l!==undefined&&pr.v!==undefined;
    // Resultado oficial: simulador admin, ranking simulado o resultados_reales (window._resOficiales)
    const resOficial=resultadosAdmin[p.id]||(rankingSimulado&&rankingSimulado._resultados&&rankingSimulado._resultados[p.id])||(window._resOficiales&&window._resOficiales[p.id]);
    const hayRes=resOficial&&resOficial.l!==undefined&&resOficial.v!==undefined;
    // Colores segun acierto
    let lClass='',vClass='';
    if(hayRes&&ok){
      if(pr.l===resOficial.l&&pr.v===resOficial.v){lClass='sim-exacto';vClass='sim-exacto';}
      else if(Math.sign(pr.l-pr.v)===Math.sign(resOficial.l-resOficial.v)){lClass='sim-correcto';vClass='sim-correcto';}
      else{lClass='sim-fallo';vClass='sim-fallo';}
    }
    // Badge de puntos si hay resultado oficial
    let ptsBadge='';
    if(hayRes&&ok){
      if(pr.l===resOficial.l&&pr.v===resOficial.v)ptsBadge='<span class="pts-badge pts-exacto">+5pts</span>';
      else if(Math.sign(pr.l-pr.v)===Math.sign(resOficial.l-resOficial.v))ptsBadge='<span class="pts-badge pts-correcto">+2pts</span>';
      else ptsBadge='<span class="pts-badge pts-fallo">0pts</span>';
    }
    pHtml+=`<div class="pcard${ok?' ok':''}${lClass?' '+lClass:''}">
      <div class="psede">${p.s}${ptsBadge}</div>
      <div class="prow">
        <div class="ecol">${flagBadge(p.l,20)}<span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${pr.l!==undefined?' v':''}" ${cerrada?'disabled':''} onkeydown="if(['-','+','e','E'].includes(event.key))event.preventDefault()" oninput="setPred(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${pr.v!==undefined?' v':''}" ${cerrada?'disabled':''} onkeydown="if(['-','+','e','E'].includes(event.key))event.preventDefault()" oninput="setPred(${p.id},'v',this.value)">
        </div>
        <div class="ecol r" style="justify-content:flex-end;margin-left:auto"><span class="ename">${p.v}</span>${flagBadge(p.v,20)}</div>
      </div>
      ${cerrada&&!hayRes?'<div style="font-size:10px;color:#c0392b;text-align:center;margin-top:4px;font-weight:600">🔒 Cerrado (cerró 1h antes del inicio)</div>':''}
      ${predictorHTML(p.l,p.v,p.id)}
    </div>`;
  });
  const tablaHtml=renderTablaGrupo(grupoActivo);
  const zona2=localStorage.getItem('ad_zona2')||'';
  const zona2Html=zona2?`<div id="ad-zona2" style="margin-top:.75rem">${zona2}</div>`:'';
  c.innerHTML=`<div class="grupo-layout"><div class="grupo-partidos">${pHtml}</div><div class="grupo-tabla" id="tabla-grupo">${tablaHtml}${zona2Html}</div></div>`;
  actualizarProgreso();
  const ci=document.getElementById('cierre-grupos');
  if(ci){const t=textoCierreRonda('grupos');ci.textContent=t;ci.classList.toggle('on',!!t);}
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
    <div style="font-size:9px;color:var(--muted);margin-bottom:4px;font-style:italic">Tu predicción</div>
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
  // Tabla de resultados reales si hay datos
  const tablaReal=calcTablaGrupoReal(g);
  if(tablaReal){
    html+=`<div class='gtabla-wrap' style='margin-top:.5rem;border-top:2px solid var(--verde)'>
      <div class='gtabla-title' style='color:var(--verde)'>RESULTADOS REALES — GRUPO ${g}</div>
      <table class='gtabla'><thead><tr>
        <th>POS</th><th style='text-align:left'>PAIS</th>
        <th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DIF</th><th>PTS</th>
      </tr></thead><tbody>`;
    tablaReal.forEach((r,i)=>{
      const cls=i<2?'clasifica':i===2?'posible3ro':'';
      html+=`<tr class='${cls}'>
        <td>${i+1}</td>
        <td class='pais-cell'>${flagBadge(r.eq,14)}<span>${r.eq}</span></td>
        <td>${r.pj}</td><td>${r.g}</td><td>${r.em}</td><td>${r.p}</td>
        <td>${r.gf}</td><td>${r.gc}</td><td>${r.dif>0?'+'+r.dif:r.dif}</td>
        <td style='font-weight:700;color:var(--verde)'>${r.pts}</td>
      </tr>`;
    });
    html+=`</tbody></table></div>`;
  }
  return html;
}

function setPred(id,lado,val){
  if(partidoCerrado(PARTIDOS.find(p=>p.id===id)))return;
  const num=parseInt(val,10);
  if(!predicciones[id])predicciones[id]={};
  if(!isNaN(num)&&num>=0&&num<=20)predicciones[id][lado]=num;
  else delete predicciones[id][lado];
  predicciones[id].t=new Date().toISOString(); // timestamp de actualización por partido
  actualizarProgreso();renderGrupoTabs();
  const te=document.getElementById('tabla-grupo');if(te)te.innerHTML=renderTablaGrupo(grupoActivo);
  // Auto-rellenar bracket en tiempo real
  autoRellenarBracketDesdeGrupos();
  // Si ya estamos viendo el bracket, actualizarlo
  const bracketEl=document.getElementById('bracket-container');
  if(bracketEl&&bracketEl.children.length>0)renderBracket();
  // Guardado en tiempo real (no hace falta completar los 72)
  autoGuardarQuiniela();
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
  if(estaCerrada('grupos')){alerta('q-alert','error','La 1era Ronda esta cerrada.');return;}
  if(!usuarioActual&&!modoDemo){alerta('q-alert','error','Primero registrate.');return;}
  const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  try{
    // Rellenar bracket con clasificados ANTES de guardar
    autoRellenarBracketDesdeGrupos();
    await guardarQuinielaCompleta();
    if(done<PARTIDOS.length)
      alerta('q-alert','success',`Guardado (${done}/${PARTIDOS.length} partidos). Puedes completar el resto cuando quieras.`);
    else
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

// Perdedores de Semis -> 3er lugar
const PROGRESION_PERDEDOR = {
  101:{sig:103,slot:'l'},
  102:{sig:103,slot:'v'},
};

function propagarPerdedor(bid){
  const prog=PROGRESION_PERDEDOR[bid];
  if(!prog)return;
  const b=bracket[bid]||{};
  if(!b.l||!b.v||b.gl===undefined||b.gv===undefined)return;
  let perdedor=null;
  if(b.gl>b.gv)perdedor=b.v;
  else if(b.gv>b.gl)perdedor=b.l;
  else perdedor=b.penales===b.l?b.v:b.l;
  if(!bracket[prog.sig])bracket[prog.sig]={};
  bracket[prog.sig][prog.slot]=perdedor;
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
  const cerrada=estaCerrada(ronda.id);
  const resB=(resultadosAdmin._bracketRes&&resultadosAdmin._bracketRes[m.bid])
    ||(rankingSimulado&&rankingSimulado._resultados&&rankingSimulado._resultados._bracketRes&&rankingSimulado._resultados._bracketRes[m.bid])
    ||(window._resOficiales&&window._resOficiales._bracketRes&&window._resOficiales._bracketRes[m.bid])
    ||null;
  // Calcular puntos bracket si hay resultado real
  let bracketPtsBadge=''; let cardBg=''; let cardBorder='';
  if(resB&&b.gl!==undefined&&b.gv!==undefined){
    const ganPred=b.gl>b.gv?lN:b.gv>b.gl?vN:(b.penales||null);
    if(b.gl===resB.gl&&b.gv===resB.gv){
      bracketPtsBadge=`<span class='res-badge' style='background:#0a5c2e;color:#fff'>+${ronda.pts_ex}pts ✓</span>`;
      cardBg='background:#eaf5ee';cardBorder='border-color:#9fd4b0';
    } else if(ganPred===resB.ganador){
      bracketPtsBadge=`<span class='res-badge' style='background:#f0cb6a;color:#7a5500'>+${ronda.pts_res}pts</span>`;
      cardBg='background:#fffbf0';cardBorder='border-color:#f0cb6a';
    } else {
      bracketPtsBadge=`<span class='res-badge' style='background:#c0392b;color:#fff'>0pts ✗</span>`;
      cardBg='background:#fef0f0';cardBorder='border-color:#f5b7b1';
    }
  }
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
  return `<div class="bmatch${ok?' ok':''}${cerrada?' locked':''}${simClass}" style="${cardBg};${cardBorder}" onclick="abrirModal(${m.bid})" title="${cerrada?'Quiniela cerrada':'Clic para editar'}">
    <div class="bmlbl">${m.desc} <span class="pts-pill">${ronda.pts_ex}pts MAX</span></div>
    <div class="bteam${!lN?' empty':''}${ganador===lN?' winner':''}">
      ${lN?flagBadge(lN,18):'<span class="bq">?</span>'}
      <span class="btn">${lN||'Seleccionar'}</span>
      <span class="bsc">${gl!==null?gl:''}</span>
    </div>
    <div class="bdiv"></div>
    <div class="bteam${!vN?' empty':''}${ganador===vN?' winner':''}">
      ${vN?flagBadge(vN,18):'<span class="bq">?</span>'}
      <span class="btn">${vN||'Seleccionar'}</span>
      <span class="bsc">${gv!==null?gv:''}</span>
    </div>
    ${resB?`<div style='text-align:center;margin-top:4px;font-size:11px;color:var(--muted)'>Resultado oficial: <b>${resB.gl}-${resB.gv}</b> ${bracketPtsBadge}</div>`:''}
    ${penBadge}
  </div>`;
}


// Borrar toda la seleccion de bracket
function resetBracket(){
  if(!confirm('¿Borrar todas las selecciones de la 2da Ronda? Esta accion no se puede deshacer.'))return;
  bracket={};
  renderBracket();
  alerta('b-alert','success','Bracket reiniciado.');
  autoGuardarBracket();
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
  autoGuardarBracket();
}

function scrollToRonda(rondaId){
  const el=document.getElementById('ronda-'+rondaId);
  if(el)el.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
}

function setSliceActive(btn){
  document.querySelectorAll('.bslice-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function renderBracket(){
  const c=document.getElementById('bracket-container');if(!c)return;
  // Calcular espaciado progresivo para efecto árbol
  // R32=8 partidos, R16=4, QF=2, SF=1, Final=1
  // Cada ronda el gap entre partidos se duplica
  let html='<div class="bracket-cols">';
  const cardHeight=148; // altura aprox de cada tarjeta en px
  const gapBase=12;
  BRACKET_RONDAS.forEach((ronda,ri)=>{
    const esFinal=ri===BRACKET_RONDAS.length-1;
    const factor=Math.pow(2,ri);
    // En la columna Final, el 3er lugar va pegado a la Final (gap chico),
    // no con el espaciado de árbol que lo empujaba a la esquina de abajo.
    const gap=ri===0?gapBase:(esFinal?gapBase:(cardHeight+gapBase)*factor-cardHeight);
    const paddingTop=ri>0?(cardHeight+gapBase)*(factor-1)/2:0;
    const cierreTxt=textoCierreRonda(ronda.id);
    html+=`<div class="bcol" id="ronda-${ronda.id}">
      <div class="bcol-title">${ronda.nombre}</div>
      ${cierreTxt?`<div class="bcol-cierre">${cierreTxt}</div>`:''}
      <div class="bcol-matches" style="gap:${gap}px;padding-top:${paddingTop}px">`;
    ronda.partidos.forEach(m=>{html+=matchCard(m,ronda);});
    html+=`</div></div>`;
  });
  html+='</div>';c.innerHTML=html;

  // Spacing dinámico basado en altura real de tarjeta
  setTimeout(()=>{
    const firstCard=c.querySelector('.bmatch');
    if(!firstCard)return;
    const cardH=firstCard.offsetHeight;
    const gapB=12;
    const cols=c.querySelectorAll('.bcol-matches');
    cols.forEach((col,ri)=>{
      if(ri===0){col.style.gap=gapB+'px';return;}
      const factor=Math.pow(2,ri);
      const esFinal=ri===cols.length-1;
      // Columna Final: 3er lugar pegado a la Final (gap chico)
      col.style.gap=(esFinal?gapB:(factor*(cardH+gapB)-cardH))+'px';
      col.style.paddingTop=((factor-1)/2*(cardH+gapB))+'px';
    });
    // Sync scroll
    const mainScroll=document.getElementById('bracket-outer-main');
    const topScroll=document.getElementById('bracket-outer-top');
    const shadow=document.getElementById('bracket-shadow-top');
    if(mainScroll&&topScroll&&shadow){
      shadow.style.width=mainScroll.scrollWidth+'px';
      mainScroll.addEventListener('scroll',()=>{topScroll.scrollLeft=mainScroll.scrollLeft;},{passive:true});
      topScroll.addEventListener('scroll',()=>{mainScroll.scrollLeft=topScroll.scrollLeft;},{passive:true});
    }
  },50);
}

function abrirModal(bid){
  let m=null,ronda=null;
  for(const r of BRACKET_RONDAS){const f=r.partidos.find(x=>x.bid===bid);if(f){m={...f,pts_ex:r.pts_ex};ronda=r;break;}}
  if(!m)return;
  if(estaCerrada(ronda.id)){alert('Esta ronda ya está cerrada.');return;}
  modalActivo={bid,match:m,ronda:ronda.id};
  const b=bracket[bid]||{};
  document.getElementById('modal-title').textContent='Partido '+bid+' — '+m.desc;
  document.getElementById('modal-gl').value=b.gl!==undefined?b.gl:'';
  document.getElementById('modal-gv').value=b.gv!==undefined?b.gv:'';
  document.getElementById('modal-pen-msg').style.display='none';
  const _ps=document.getElementById('penales-section');if(_ps)_ps.innerHTML='';

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
      const guardado=b[lado]||null;
      const esTercerLugar=bid===103;
      let sugerido=null, posibles=[], etiquetaActual='Equipo', etiquetaPend='Partido anterior';

      if(esTercerLugar){
        const semifinal={l:101,v:102}[lado];
        const sf=bracket[semifinal]||{};
        posibles=[sf.l,sf.v].filter(Boolean);
        const ganadorSF=getGanador(semifinal);
        sugerido=ganadorSF?(ganadorSF===sf.l?sf.v:sf.l):null;
        etiquetaActual='Perdedor Semifinal '+semifinal;
        etiquetaPend='Completa Semifinal '+semifinal+' primero';
      } else if(feederBid){
        const fb=bracket[feederBid]||{};
        posibles=[fb.l,fb.v].filter(Boolean);
        sugerido=getGanador(feederBid);
        etiquetaActual='Ganador partido '+feederBid;
        etiquetaPend='Completa partido '+feederBid+' primero';
      }

      if(sugerido){
        // Feeder decidido: equipo propagado (o el guardado si hubo override manual)
        const eq=guardado||sugerido;
        const manual=eq!==sugerido;
        html+=`<div class="equipo-fijo">
          ${flagBadge(eq,24)}
          <div><div class="ef-nombre">${eq}</div><div class="ef-label">${manual?'Selección manual':etiquetaActual}</div></div>
        </div>`;
        html+=`<div class="modal-opt sel" data-lado="${lado}" data-eq="${eq}" style="display:none"></div>`;
      } else if(posibles.length===2){
        // Feeder con equipos pero sin ganador: elegir entre los 2
        html+=`<div style="font-size:11px;color:var(--muted);margin-bottom:6px">${esTercerLugar?'Perdedor de Semifinal':('¿Quién ganará el partido '+feederBid+'?')}</div>`;
        posibles.forEach(eq=>{
          html+=`<div class="modal-opt${guardado===eq?' sel':''}" data-lado="${lado}" data-eq="${eq}" onclick="selOpt(this)">
            ${flagBadge(eq,20)} <span>${eq}</span>
          </div>`;
        });
      } else if(guardado){
        // Override manual sin info del feeder aún
        html+=`<div class="equipo-fijo">
          ${flagBadge(guardado,24)}
          <div><div class="ef-nombre">${guardado}</div><div class="ef-label">Selección manual</div></div>
        </div>`;
        html+=`<div class="modal-opt sel" data-lado="${lado}" data-eq="${guardado}" style="display:none"></div>`;
      } else {
        html+=`<div class="equipo-fijo pendiente">
          <span class="bq" style="width:36px;height:24px;font-size:12px">?</span>
          <div><div class="ef-nombre">Pendiente</div><div class="ef-label">${etiquetaPend}</div></div>
        </div>`;
      }
      // Override manual: elegir CUALQUIER equipo (por si se equivocó en la ronda previa)
      html+=`<button type="button" class="pred-info-link" style="margin-top:6px" onclick="mostrarSelectorManual('${lado}')">✏️ Elegir otro equipo manualmente</button>`;
      html+=`<div id="manual-sel-${lado}"></div>`;
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
    html+=`<div style="margin-top:.75rem;padding:8px 10px;background:#fffbf0;border:1px solid #f0cb6a;border-radius:6px;font-size:11px;color:#7a5500;line-height:1.4">💡 Si eliges manualmente, selecciona los equipos que avanzaron de los partidos correspondientes de la ronda anterior, respetando el mismo orden del bracket.</div>`;
  }

  document.getElementById('modal-opts').innerHTML=html;
  actualizarModalSelbar();
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
      <div style="background:#fef0f0;border:1px solid #f5b7b1;border-radius:6px;padding:8px 10px;margin-bottom:8px">
        <div style="font-size:12px;font-weight:700;color:#c0392b">⚽ Empate — ¿quién gana en penales? <span style="font-weight:400;font-size:11px">(obligatorio)</span></div>
        <div style="display:flex;gap:6px;margin-top:6px">
          ${[lTeam,vTeam].map(eq=>`
            <div class="modal-opt${b.penales===eq?' sel':''}" data-lado="pen" data-eq="${eq}" onclick="selOpt(this)" style="flex:1">
              ${flagBadge(eq,18)} <span>${eq}</span>
            </div>`).join('')}
        </div>
      </div>`;
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
  actualizarModalSelbar();
}

// Despliega un selector de CUALQUIER equipo para override manual en R16+
function mostrarSelectorManual(lado){
  const cont=document.getElementById('manual-sel-'+lado);
  if(!cont)return;
  if(cont.dataset.open==='1'){cont.innerHTML='';cont.dataset.open='';return;}
  let h='<div style="font-size:11px;color:var(--oro);font-weight:700;margin:8px 0 4px">Selección manual — elige cualquier equipo:</div>';
  Object.keys(GRUPOS).forEach(g=>{
    h+=`<div class="modal-grupo-lbl">Grupo ${g}</div>`;
    GRUPOS[g].forEach(eq=>{
      h+=`<div class="modal-opt" data-lado="${lado}" data-eq="${eq}" onclick="selOpt(this)">${flagBadge(eq,20)} <span>${g} — ${eq}</span></div>`;
    });
  });
  cont.innerHTML=h;cont.dataset.open='1';
}

// Refleja los equipos elegidos en la barra fija de arriba (junto al marcador)
function actualizarModalSelbar(){
  const selL=document.querySelector('.modal-opt[data-lado="l"].sel');
  const selV=document.querySelector('.modal-opt[data-lado="v"].sel');
  const lEl=document.getElementById('msel-l');const vEl=document.getElementById('msel-v');
  if(lEl)lEl.innerHTML=selL?(flagBadge(selL.dataset.eq,18)+' '+selL.dataset.eq):'Local';
  if(vEl)vEl.innerHTML=selV?(flagBadge(selV.dataset.eq,18)+' '+selV.dataset.eq):'Visitante';
}

function confirmarModal(){
  if(!modalActivo)return;
  if(estaCerrada(modalActivo.ronda))return;
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
  bracket[bid].t=new Date().toISOString(); // timestamp de actualización por partido (bracket)
  propagarGanador(bid);
  propagarPerdedor(bid);
  cerrarModal();renderBracket();
  autoGuardarBracket();
}

// Autoguardado en tiempo real del bracket (2da ronda), con debounce
let _autoBTimer=null;
function autoGuardarBracket(){
  if(modoDemo||!usuarioActual||!sbClient)return;
  const s=document.getElementById('b-status-bottom');
  if(s){s.className='alert success';s.style.display='block';s.textContent='Guardando…';}
  clearTimeout(_autoBTimer);
  _autoBTimer=setTimeout(async()=>{
    try{
      await guardarQuinielaCompleta();
      if(s){s.className='alert success';s.style.display='block';s.textContent='Bracket guardado automático ✓';}
    }catch(e){
      if(s){s.className='alert error';s.style.display='block';s.textContent='Error al guardar: '+e.message;}
    }
  },700);
}

function cerrarModal(){document.getElementById('bracket-modal').classList.remove('on');modalActivo=null;}

async function guardarBracket(){
  if(estaCerrada('r32')){alerta('b-alert','error','El bracket esta cerrado.');return;}
  if(!usuarioActual&&!modoDemo){alerta('b-alert','error','Primero registrate.');return;}
  try{await guardarQuinielaCompleta();alerta('b-alert','success','Bracket guardado.');}
  catch(e){alerta('b-alert','error','Error: '+e.message);}
}

// ============================================================
// GOLEADOR
// ============================================================
function renderGoleador(){
  const g=document.getElementById('goleador-grid');if(!g)return;
  const cerrada=estaCerrada('goleador');
  g.innerHTML=TODOS_PAISES.map(eq=>`
    <button class="camp-btn${goleador===eq?' sel':''}" ${cerrada?'disabled':''} onclick="selGoleador('${eq}')">
      ${flagBadge(eq,28)}<span style="font-size:10px;margin-top:3px">${eq}</span>
    </button>`).join('');
  const st=document.getElementById('g-status');
  if(st){
    const fmt=FECHA_CIERRE_GOLEADOR.toLocaleString('es-PA',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'});
    if(cerrada)st.textContent='🔒 Cerrado — ya no se puede cambiar el país goleador';
    else st.textContent=(goleador?'Seleccionado: '+goleador:'Selecciona el país goleador')+' · ⏰ Cierra: '+fmt+' (hora Panamá)';
  }
}
function selGoleador(eq){if(estaCerrada('goleador'))return;goleador=eq;renderGoleador();}
async function guardarGoleador(){
  if(estaCerrada('goleador')){alerta('g-alert','error','La elección del país goleador ya está cerrada.');return;}
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

// Carga los resultados oficiales desde Supabase en el formato que espera calcPuntosConDesglose
async function cargarResultadosReales(){
  const res={};
  if(!sbClient)return res;
  try{
    const{data}=await sbClient.from('resultados_reales').select('*');
    if(!data)return res;
    data.forEach(r=>{
      if(r.partido_idx===0){ res._goleador=r.ganador||null; }
      else if(r.partido_idx>=1000){
        if(!res._bracketRes)res._bracketRes={};
        res._bracketRes[r.partido_idx-1000]={gl:r.goles_local,gv:r.goles_visita,ganador:r.ganador||''};
      } else {
        res[r.partido_idx]={l:r.goles_local,v:r.goles_visita};
      }
    });
  }catch(e){}
  return res;
}

async function renderRanking(){
  let data=[];
  if(rankingSimulado&&Array.isArray(rankingSimulado)&&rankingSimulado.length){
    data=rankingSimulado.filter(x=>x&&!x._resultados&&x.alias);
  } else if(modoDemo){
    data=DEMO_RANK;
  } else if(sbClient){
    // Calcular puntos EN VIVO desde los resultados oficiales + quinielas
    const resultados=await cargarResultadosReales();
    const{data:qs}=await sbClient.from('quinielas').select('*');
    const qmap={};(qs||[]).forEach(q=>{qmap[String(q.participante_id)]=q;});
    data=participantes.filter(p=>!p.oculto).map(p=>{
      const q=qmap[String(p.id)];
      let pts=0, gol=p.favorito||null;
      if(q){
        const preds=parseMaybeJSON(q.predicciones,{});
        const brac=parseMaybeJSON(q.bracket,{});
        gol=q.goleador||null;
        pts=calcPuntosConDesglose(preds,brac,gol,resultados).total;
      }
      return{id:p.id,alias:p.alias||p.nombre,nombre:p.nombre,pts,goleador:gol};
    });
  }
  // Asegurar que todos los participantes esten en el ranking aunque tengan 0 pts
  if(participantes.length){
    const idsEnRanking=new Set(data.map(x=>String(x.id)));
    participantes.forEach(p=>{
      if(p.oculto)return; // usuarios de prueba ocultos no entran al ranking
      if(!idsEnRanking.has(String(p.id))){
        data.push({id:p.id,alias:p.alias||p.nombre,nombre:p.nombre,pts:0,goleador:p.favorito||null});
      }
    });
  }
  data.sort((a,b)=>(b.pts||0)-(a.pts||0));
  const c=document.getElementById('ranking-container');if(!c)return;
  // Solo mostrar datos demo en modo demo; si no hay participantes reales, estado vacío
  if(!data.length){
    if(modoDemo){data=DEMO_RANK;}
    else{c.innerHTML='<p style="color:var(--muted);font-size:13px;text-align:center;padding:1.5rem">Aún no hay participantes en el ranking. ¡Sé el primero en registrarte y predecir!</p>';
      const st=document.getElementById('stat-total');if(st)st.textContent=participantes.filter(p=>!p.oculto).length||0;
      return;}
  }
  c.innerHTML=data.map((p,i)=>{
    const ini=(p.alias||p.nombre).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const pos=i===0?'&#127951;':i===1?'&#127952;':i===2?'&#127953;':(i+1);
    return `<div class="rankrow">
      <div class="rankpos${i<3?' med':''}">${pos}</div>
      <div class="rankavatar">${ini}</div>
      <div><div class="rankname">${p.alias||p.nombre}</div></div>
      <div class="rankcamp">${p.goleador?flagBadge(p.goleador,16)+' ':''} ${p.goleador||'—'}</div>
      <div class="rankpts">${p.pts||0}<span class="ptslbl">pts</span></div>
    </div>`;
  }).join('');
  document.getElementById('stat-total').textContent=participantes.filter(p=>!p.oculto).length||data.length;
  const stat=document.getElementById('stat-mipos');
  if(stat&&usuarioActual){
    const idx=data.findIndex(x=>String(x.id)===String(usuarioActual.id)||(x.alias||x.nombre)===(usuarioActual.alias||usuarioActual.nombre));
    stat.textContent=idx>=0?(idx+1):'—';
  }
}

async function verPerfilPublico(pid){
  // Deshabilitado: los jugadores solo pueden ver el total de puntos en el ranking,
  // no las predicciones/resultados de los demás.
  return;
  // Buscar en participantes o en ranking
  let p=participantes.find(x=>String(x.id)===String(pid));
  if(!p){alert('Participante no encontrado.');return;}
  let q=null;
  if(sbClient){const{data}=await sbClient.from('quinielas').select('*').eq('participante_id',pid).maybeSingle();q=data;}
  else{const qs=localStorage.getItem('quiniela_'+pid);if(qs)q=JSON.parse(qs);}
  const preds=q?parseMaybeJSON(q.predicciones,{}):{}; const gol=q?q.goleador:null;
  const done=PARTIDOS.filter(x=>{const pr=preds[x.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  let predsHtml='';
  // Resultados oficiales (reales): grupos, bracket y goleador
  const resultados=(rankingSimulado&&rankingSimulado._resultados)||window._resOficiales||resultadosAdmin||{};
  const bracketRes=(resultados&&resultados._bracketRes)||resultadosAdmin._bracketRes||{};
  const golOf=(resultados&&resultados._goleador)||resultadosAdmin._goleador||null;
  PARTIDOS.forEach(pa=>{
    const pr=preds[pa.id]; const r=resultados[pa.id];
    let color='',badge='';
    if(pr&&r&&pr.l!==undefined&&r.l!==undefined){
      if(pr.l===r.l&&pr.v===r.v){color='background:#eaf5ee';badge='<span style="color:#0a5c2e;font-weight:700;font-size:11px">+5pts</span>';}
      else if(Math.sign(pr.l-pr.v)===Math.sign(r.l-r.v)){color='background:#fffbf0';badge='<span style="color:#7a5500;font-weight:700;font-size:11px">+2pts</span>';}
      else{color='background:#fef0f0';badge='<span style="color:#c0392b;font-weight:700;font-size:11px">0pts</span>';}
    }
    predsHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-bottom:1px solid var(--borde);font-size:12px;${color};border-radius:4px;margin-bottom:2px">
      <span>${flagBadge(pa.l,16)} ${pa.l}</span>
      <span style="font-family:'Barlow Condensed',sans-serif;font-weight:800;color:var(--verde);margin:0 6px">${pr?pr.l:'-'} – ${pr?pr.v:'-'}</span>
      <span>${pa.v} ${flagBadge(pa.v,16)}</span>
      <span style="margin-left:auto">${badge}</span>
    </div>`;
  });
  // Bracket predicciones
  let bracketHtml='';
  if(q){
    const brac=parseMaybeJSON(q.bracket,{});
    BRACKET_RONDAS.forEach(ronda=>{
      if(ronda.id==='final'||ronda.id==='sf'||ronda.id==='qf'||ronda.id==='r16'||ronda.id==='r32'){
        bracketHtml+=`<div style="font-size:11px;font-weight:700;color:var(--oro);text-transform:uppercase;letter-spacing:.06em;margin:.75rem 0 .3rem;font-family:'Barlow Condensed',sans-serif">${ronda.nombre}</div>`;
        ronda.partidos.forEach(m=>{
          const b=brac[m.bid]||{};
          if(!b.l&&!b.v)return;
          const resOf=bracketRes[m.bid];
          let badge='',bgColor='',txtColor='';
          if(resOf&&b.gl!==undefined){
            const ganPred=b.gl>b.gv?b.l:b.gv>b.gl?b.v:(b.penales||null);
            if(b.gl===resOf.gl&&b.gv===resOf.gv){badge='+'+ronda.pts_ex+'pts ✓';bgColor='#0a5c2e';txtColor='#fff';}
            else if(ganPred===resOf.ganador){badge='+'+ronda.pts_res+'pts';bgColor='#f0cb6a';txtColor='#7a5500';}
            else{badge='0pts ✗';bgColor='#c0392b';txtColor='#fff';}
          }
          bracketHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-bottom:1px solid var(--borde);font-size:12px">
            <span>${flagBadge(b.l||'?',14)} ${b.l||'?'}</span>
            <span style="font-family:'Barlow Condensed',sans-serif;font-weight:800;color:var(--verde);margin:0 4px">${b.gl!==undefined?b.gl:'-'} – ${b.gv!==undefined?b.gv:'-'}</span>
            <span>${b.v||'?'} ${flagBadge(b.v||'?',14)}</span>
            ${badge?`<span style="margin-left:auto;font-size:10px;font-weight:700;padding:1px 7px;border-radius:10px;background:${bgColor};color:${txtColor}">${badge}</span>`:''}
          </div>`;
        });
      }
    });
  }
  // Goleador
  const golAcerto=gol&&golOf&&gol===golOf;
  const golBadge=golOf?(golAcerto?'+30pts ✓':'0pts ✗'):'';
  const golBg=golAcerto?'#0a5c2e':'#c0392b';

  document.getElementById('perfil-body').innerHTML=`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid var(--borde)">
      <div style="width:44px;height:44px;border-radius:50%;background:#eaf5ee;border:2px solid #9fd4b0;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:18px;color:var(--verde)">${(p.alias||p.nombre).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
      <div>
        <div style="font-weight:700;font-size:16px;color:var(--verde)">${p.alias||p.nombre}</div>
        <div style="font-size:12px;color:var(--muted)">${done}/72 predichos · País goleador: ${gol?`${flagBadge(gol,14)} ${gol}`:'Sin selección'} ${golBadge?`<span style="background:${golBg};color:#fff;padding:1px 6px;border-radius:8px;font-size:10px;font-weight:700">${golBadge}</span>`:''}</div>
      </div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">1era Ronda — ${PARTIDOS.length} partidos</div>
    <div style="max-height:250px;overflow-y:auto;margin-bottom:.75rem">${predsHtml}</div>
    ${bracketHtml?`<div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">2da Ronda</div><div style="max-height:300px;overflow-y:auto">${bracketHtml}</div>`:''}
  `;
  document.getElementById('perfil-modal').classList.add('on');
}

// ============================================================
// SIMULADOR DE RESULTADOS (ADMIN)
// ============================================================
let resultadosAdmin = {}; // {partidoId: {l, v}}
let simGrupoActivo = 'A';

function renderSimGrupoTabs(){
  const c = document.getElementById('sim-grupo-tabs'); if(!c)return;
  c.innerHTML = Object.keys(GRUPOS).map(g=>{
    const done = PARTIDOS.filter(p=>p.g===g&&resultadosAdmin[p.id]!==undefined).length;
    const total = PARTIDOS.filter(p=>p.g===g).length;
    return `<button class="gtab${simGrupoActivo===g?' active':''}${done===total?' done':''}" onclick="selSimGrupo('${g}')">${g}${done===total?' ✓':''}</button>`;
  }).join('');
}

function selSimGrupo(g){ simGrupoActivo=g; renderSimGrupoTabs(); renderSimPartidos(); }

function renderSimPartidos(){
  const c = document.getElementById('sim-partidos-container'); if(!c)return;
  const ps = PARTIDOS.filter(p=>p.g===simGrupoActivo);
  let html=''; let fa='';
  ps.forEach(p=>{
    const _fh=p.f+'|'+p.h;if(_fh!==fa){fa=_fh; html+=`<div class="flbl">${fmtFecha(p.f)} · ${p.h} ET</div>`;}
    const r = resultadosAdmin[p.id]||{};
    const lv = r.l!==undefined?r.l:''; const vv = r.v!==undefined?r.v:'';
    const ok = r.l!==undefined&&r.v!==undefined;
    html+=`<div class="pcard${ok?' ok':''}">
      <div class="psede">${p.s}</div>
      <div class="prow">
        <div class="ecol">${flagBadge(p.l,20)}<span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${r.l!==undefined?' v':''}" oninput="setResultadoAdmin(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${r.v!==undefined?' v':''}" oninput="setResultadoAdmin(${p.id},'v',this.value)">
        </div>
        <div class="ecol r" style="justify-content:flex-end;margin-left:auto"><span class="ename">${p.v}</span>${flagBadge(p.v,20)}</div>
      </div>
    </div>`;
  });
  c.innerHTML=html;
  const done = PARTIDOS.filter(p=>resultadosAdmin[p.id]&&resultadosAdmin[p.id].l!==undefined&&resultadosAdmin[p.id].v!==undefined).length;
  const s=document.getElementById('sim-status'); if(s)s.textContent=`${done} de ${PARTIDOS.length} resultados ingresados`;
}

function setResultadoAdmin(id,lado,val){
  const num=parseInt(val,10);
  if(!resultadosAdmin[id])resultadosAdmin[id]={};
  if(!isNaN(num)&&num>=0&&num<=20)resultadosAdmin[id][lado]=num;
  else delete resultadosAdmin[id][lado];
  renderSimGrupoTabs();
  const done=PARTIDOS.filter(p=>resultadosAdmin[p.id]&&resultadosAdmin[p.id].l!==undefined&&resultadosAdmin[p.id].v!==undefined).length;
  const s=document.getElementById('sim-status'); if(s)s.textContent=`${done} de ${PARTIDOS.length} resultados ingresados`;
}

function setGoleadorAdmin(val){
  if(val)resultadosAdmin._goleador=val;
  else delete resultadosAdmin._goleador;
}

function generarResultadosAleatorios(){
  PARTIDOS.forEach(p=>{
    resultadosAdmin[p.id]={l:Math.floor(Math.random()*4),v:Math.floor(Math.random()*4)};
  });
  // Generar bracket simulado
  resultadosAdmin._goleador=FAVORITOS_SIM[Math.floor(Math.random()*FAVORITOS_SIM.length)];
  resultadosAdmin._bracketRes={};
  BRACKET_RONDAS.forEach(ronda=>{
    ronda.partidos.forEach(m=>{
      const gl=Math.floor(Math.random()*3),gv=Math.floor(Math.random()*2);
      const equipos=Object.values(GRUPOS).flat();
      const ganador=gl>gv?equipos[Math.floor(Math.random()*equipos.length)]:gv>gl?equipos[Math.floor(Math.random()*equipos.length)]:equipos[Math.floor(Math.random()*equipos.length)];
      resultadosAdmin._bracketRes[m.bid]={gl,gv,ganador};
    });
  });
  // Actualizar campo pais goleador en UI
  const gEl=document.getElementById('sim-goleador');
  if(gEl)gEl.value=resultadosAdmin._goleador;
  renderSimGrupoTabs(); renderSimPartidos();
  alerta('sim-alert','success','Resultados aleatorios generados. Haz clic en "Calcular puntos".');
}

function limpiarResultadosAdmin(){
  resultadosAdmin={};
  rankingSimulado=null;
  renderSimGrupoTabs(); renderSimPartidos(); renderRanking(); renderBracket();
  alerta('sim-alert','success','Resultados limpiados.');
}

async function calcularPuntosSimulados(){
  const done=PARTIDOS.filter(p=>resultadosAdmin[p.id]&&resultadosAdmin[p.id].l!==undefined&&resultadosAdmin[p.id].v!==undefined).length;
  if(done===0){alerta('sim-alert','error','Ingresa al menos un resultado primero.');return;}

  const base = participantes.length ? participantes : DEMO_RANK.map((p,i)=>({...p,id:'demo_'+i}));
  if(!base.length){alerta('sim-alert','error','No hay participantes registrados.');return;}

  // Si hay Supabase, cargar quinielas de todos
  let quinielasMap={};
  if(sbClient){
    const{data:qs}=await sbClient.from('quinielas').select('*');
    if(qs)qs.forEach(q=>{quinielasMap[String(q.participante_id)]=q;});
  }

  // Guardar resultados para que renderPartidosGrupo los use
  window._resOficiales={};
  Object.entries(resultadosAdmin).forEach(([k,v])=>{
    if(!k.startsWith('_')&&!k.startsWith('b'))window._resOficiales[parseInt(k)]=v;
  });

  rankingSimulado = base.map(p=>{
    let preds={}, brac={}, gol=null;
    const qSupa=quinielasMap[String(p.id)];
    if(qSupa){
      preds=parseMaybeJSON(qSupa.predicciones,{});
      brac=parseMaybeJSON(qSupa.bracket,{});
      gol=qSupa.goleador||null;
    } else {
      const qLocal=localStorage.getItem('quiniela_'+p.id);
      if(qLocal){const qd=JSON.parse(qLocal);preds=parseMaybeJSON(qd.predicciones,{});brac=parseMaybeJSON(qd.bracket,{});gol=qd.goleador||null;}
    }
    const pts=calcPuntosConDesglose(preds,brac,gol,resultadosAdmin);
    const golAcerto=gol&&resultadosAdmin._goleador&&gol===resultadosAdmin._goleador;
    return{id:p.id,alias:p.alias||p.nombre,nombre:p.nombre,pts:pts.total,goleador:gol,golAcerto,desglose:pts};
  }).sort((a,b)=>b.pts-a.pts);

  renderRanking();
  renderPartidosGrupo();
  alerta('sim-alert','success',`Puntos calculados para ${base.length} participantes. Los colores aparecen en 1era Ronda.`);
}

function calcPuntosConDesglose(preds,brac,gol,resultados){
  let total=0, exactos=0, correctos=0, fallos=0;
  // Grupos
  PARTIDOS.forEach(p=>{
    const pr=preds[p.id]; const r=resultados[p.id];
    if(!pr||!r||pr.l===undefined||pr.v===undefined||r.l===undefined||r.v===undefined)return;
    if(pr.l===r.l&&pr.v===r.v){total+=5;exactos++;}
    else if(Math.sign(pr.l-pr.v)===Math.sign(r.l-r.v)){total+=2;correctos++;}
    else fallos++;
  });
  // Pais goleador
  if(gol&&resultados._goleador&&gol===resultados._goleador)total+=30;
  // Bracket — usar resultadosAdmin._bracketRes si existe
  if(resultados._bracketRes&&brac){
    BRACKET_RONDAS.forEach(ronda=>{
      ronda.partidos.forEach(m=>{
        const pb=brac[m.bid]; const rb=resultados._bracketRes[m.bid];
        if(!pb||!rb)return;
        const ganadorPred=pb.gl>pb.gv?pb.l:pb.gv>pb.gl?pb.v:(pb.penales||null);
        if(pb.gl===rb.gl&&pb.gv===rb.gv){total+=ronda.pts_ex;exactos++;}
        else if(ganadorPred===rb.ganador){total+=ronda.pts_res;correctos++;}
        else fallos++;
      });
    });
  }
  return{total,exactos,correctos,fallos};
}

function initSimulador(){
  renderSimGrupoTabs();
  renderSimPartidos();
  renderSimBracket();
}

function renderSimBracket(){
  const c=document.getElementById('sim-bracket-container');if(!c)return;
  let html='';
  BRACKET_RONDAS.forEach(ronda=>{
    html+=`<div style="margin-bottom:1rem">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--oro);margin-bottom:.5rem;padding-bottom:.4rem;border-bottom:1px solid var(--borde)">${ronda.nombre}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">`;
    ronda.partidos.forEach(m=>{
      const r=resultadosAdmin._bracketRes?resultadosAdmin._bracketRes[m.bid]:{};
      const gl=r&&r.gl!==undefined?r.gl:''; const gv=r&&r.gv!==undefined?r.gv:'';
      const ganador=r&&r.ganador?r.ganador:'';
      // Equipos posibles — ganadores del partido anterior
      const b=bracket[m.bid]||{};
      const lTeam=b.l||'Local'; const vTeam=b.v||'Visitante';
      html+=`<div style="background:#fafafa;border:1.5px solid var(--borde);border-radius:8px;padding:8px 10px">
        <div style="font-size:9px;color:var(--muted);font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px">${m.desc}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="font-size:11px;font-weight:600;flex:1">${lTeam}</span>
          <input type="number" min="0" max="20" value="${gl}" placeholder="0" style="width:40px;height:30px;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;border:1.5px solid var(--borde);border-radius:5px;padding:0" oninput="setSimBracket(${m.bid},'gl',this.value,'${lTeam}','${vTeam}')">
          <span style="color:var(--muted);font-weight:700">–</span>
          <input type="number" min="0" max="20" value="${gv}" placeholder="0" style="width:40px;height:30px;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;border:1.5px solid var(--borde);border-radius:5px;padding:0" oninput="setSimBracket(${m.bid},'gv',this.value,'${lTeam}','${vTeam}')">
          <span style="font-size:11px;font-weight:600;flex:1;text-align:right">${vTeam}</span>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px">
          Ganador: <select style="font-size:11px;border:1px solid var(--borde);border-radius:4px;padding:2px 4px" onchange="setSimBracketGanador(${m.bid},this.value)">
            <option value="">Seleccionar</option>
            <option value="${lTeam}"${ganador===lTeam?' selected':''}>${lTeam}</option>
            <option value="${vTeam}"${ganador===vTeam?' selected':''}>${vTeam}</option>
          </select>
        </div>
      </div>`;
    });
    html+=`</div></div>`;
  });
  c.innerHTML=html;
}

function setSimBracket(bid,lado,val,lTeam,vTeam){
  const num=parseInt(val,10);
  if(!resultadosAdmin._bracketRes)resultadosAdmin._bracketRes={};
  if(!resultadosAdmin._bracketRes[bid])resultadosAdmin._bracketRes[bid]={ganador:''};
  if(!isNaN(num)&&num>=0)resultadosAdmin._bracketRes[bid][lado]=num;
  // Auto-detectar ganador si no hay empate
  const r=resultadosAdmin._bracketRes[bid];
  if(r.gl!==undefined&&r.gv!==undefined&&r.gl!==r.gv){
    r.ganador=r.gl>r.gv?lTeam:vTeam;
    renderSimBracket();
  }
}

function setSimBracketGanador(bid,ganador){
  if(!resultadosAdmin._bracketRes)resultadosAdmin._bracketRes={};
  if(!resultadosAdmin._bracketRes[bid])resultadosAdmin._bracketRes[bid]={};
  resultadosAdmin._bracketRes[bid].ganador=ganador;
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
  const _dfOn=document.getElementById('demo-fab');if(_dfOn)_dfOn.style.display='none';
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
  // Propagar ganadores en orden completo R32->R16->QF->SF->Final
  const ordenPropagacion=[74,77,73,75,83,84,81,82,76,78,79,80,86,88,85,87];
  ordenPropagacion.forEach(bid=>propagarGanador(bid));
  // Propagar R16
  [89,90,91,92,93,94,95,96].forEach(bid=>{
    const b=bracket[bid]||{};
    if(!bracket[bid])bracket[bid]={};
    if(!b.l||!b.v){
      // Asignar equipos desde los feeders si no fueron propagados
      const prog=Object.entries(PROGRESION).filter(([k,v])=>v.sig===bid);
      prog.forEach(([fbid,p])=>{
        const fb=bracket[parseInt(fbid)]||{};
        const ganador=getGanador(parseInt(fbid));
        if(ganador)bracket[bid][p.slot]=ganador;
        else if(fb.l&&!bracket[bid][p.slot])bracket[bid][p.slot]=fb.l;
      });
    }
    const gl=Math.floor(Math.random()*4),gv=Math.floor(Math.random()*3);
    bracket[bid].gl=gl;bracket[bid].gv=gv;
    if(gl===gv)bracket[bid].penales=Math.random()>0.5?bracket[bid].l:bracket[bid].v;
    propagarGanador(bid);
    propagarPerdedor(bid);
  });
  // Propagar QF
  [97,98,99,100].forEach(bid=>{
    const b=bracket[bid]||{};
    if(!bracket[bid])bracket[bid]={};
    if(!b.l||!b.v){
      const prog=Object.entries(PROGRESION).filter(([k,v])=>v.sig===bid);
      prog.forEach(([fbid,p])=>{
        const ganador=getGanador(parseInt(fbid));
        if(ganador)bracket[bid][p.slot]=ganador;
      });
    }
    if(bracket[bid].l&&bracket[bid].v){
      const gl=Math.floor(Math.random()*3),gv=Math.floor(Math.random()*3);
      bracket[bid].gl=gl;bracket[bid].gv=gv;
      if(gl===gv)bracket[bid].penales=Math.random()>0.5?bracket[bid].l:bracket[bid].v;
      propagarGanador(bid);
      propagarPerdedor(bid);
    }
  });
  // Propagar SF
  [101,102].forEach(bid=>{
    const b=bracket[bid]||{};
    if(!bracket[bid])bracket[bid]={};
    if(!b.l||!b.v){
      const prog=Object.entries(PROGRESION).filter(([k,v])=>v.sig===bid);
      prog.forEach(([fbid,p])=>{
        const ganador=getGanador(parseInt(fbid));
        if(ganador)bracket[bid][p.slot]=ganador;
      });
    }
    if(bracket[bid].l&&bracket[bid].v){
      const gl=Math.floor(Math.random()*3),gv=Math.floor(Math.random()*2);
      bracket[bid].gl=gl;bracket[bid].gv=gv;
      if(gl===gv)bracket[bid].penales=Math.random()>0.5?bracket[bid].l:bracket[bid].v;
      propagarGanador(bid);
      propagarPerdedor(bid);
    }
  });
  // Final y 3er lugar
  [103,104].forEach(bid=>{
    if(!bracket[bid])bracket[bid]={};
    if(bracket[bid].l&&bracket[bid].v){
      bracket[bid].gl=Math.floor(Math.random()*3);
      bracket[bid].gv=Math.floor(Math.random()*2);
      if(bracket[bid].gl===bracket[bid].gv)bracket[bid].penales=Math.random()>0.5?bracket[bid].l:bracket[bid].v;
    }
  });

  // Simular resultados demo y calcular puntos
  const resultadosDemo={};
  PARTIDOS.forEach(p=>{resultadosDemo[p.id]={l:Math.floor(Math.random()*4),v:Math.floor(Math.random()*3)};});
  resultadosDemo._goleador=FAVORITOS_SIM[Math.floor(Math.random()*FAVORITOS_SIM.length)];
  resultadosDemo._bracketRes={};
  BRACKET_RONDAS.forEach(ronda=>{
    ronda.partidos.forEach(m=>{
      const b=bracket[m.bid]||{};
      const gl=Math.floor(Math.random()*3),gv=Math.floor(Math.random()*2);
      const ganador=gl>gv?(b.l||'A'):gv>gl?(b.v||'B'):Math.random()>0.5?(b.l||'A'):(b.v||'B');
      resultadosDemo._bracketRes[m.bid]={gl,gv,ganador};
    });
  });

  // Calcular puntos para participantes demo
  rankingSimulado=DEMO_RANK.map((p,i)=>{
    const pts=Math.floor(Math.random()*180)+10;
    return{id:'demo_'+i,alias:p.alias,nombre:p.nombre,pts,goleador:FAVORITOS_SIM[Math.floor(Math.random()*FAVORITOS_SIM.length)]};
  }).sort((a,b)=>b.pts-a.pts);
  rankingSimulado._resultados=resultadosDemo;
  resultadosAdmin=resultadosDemo;

  participantes=DEMO_RANK.map((p,i)=>({...p,id:'demo_'+i}));
  actualizarContadores();renderGrupoTabs();renderPartidosGrupo();renderBracket();renderGoleador();renderRanking();aplicarCierreUI();
  alert('Modo demo activado. El bracket está completo hasta la Final y el ranking muestra puntos simulados.');
}

function salirDemo(){
  modoDemo=false;predicciones={};bracket={};goleador=null;usuarioActual=null;rankingSimulado=null;
  document.getElementById('demo-banner').classList.remove('on');
  const _dfOff=document.getElementById('demo-fab');if(_dfOff)_dfOff.style.display='';
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

async function confirmarAdminPass(){
  const val=document.getElementById('admin-pass-input').value;
  let ok=false;
  if(sbClient){try{const{data,error}=await sbClient.rpc('verificar_admin',{p_pass:val});ok=(!error&&data===true);}catch(e){}}
  if(ok){
    adminAutenticado=true;
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
    <tbody>${data.map((p,i)=>`<tr style="border-bottom:1px solid rgba(0,0,0,0.05)">
      <td style="padding:7px;color:var(--muted)">${i+1}</td>
      <td style="padding:7px;font-weight:500">${p.nombre||'—'}</td>
      <td style="padding:7px;color:var(--verde);font-weight:700">${p.alias||'—'}</td>
      <td style="padding:7px;color:var(--muted)">${p.email||'—'}</td>
      <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo||'—'}</td>
      <td style="padding:7px">
        <span style="color:var(--verde);font-size:12px;font-weight:600;cursor:pointer;margin-right:8px" onclick="verPerfil('${p.id}')">Ver →</span>
        <span style="color:#c0392b;font-size:12px;font-weight:600;cursor:pointer" onclick="event.stopPropagation();borrarParticipante('${p.id}')">✕ Borrar</span>
      </td>
    </tr>`).join('')}</tbody>
  </table>`;
  cargarCodigos();
  initSimulador();
} // end _renderAdminContent

async function verPerfil(pid){
  const p=participantes.find(x=>String(x.id)===String(pid));
  if(!p){alert('Participante no encontrado.');return;}
  let q=null;
  if(sbClient){const{data}=await sbClient.from('quinielas').select('*').eq('participante_id',pid).maybeSingle();q=data;}
  else{const qs=localStorage.getItem('quiniela_'+pid);if(qs)q=JSON.parse(qs);}
  const preds=q?parseMaybeJSON(q.predicciones,{}):{}; const gol=q?q.goleador:null;
  const brac=q?parseMaybeJSON(q.bracket,{}):{};
  const done=PARTIDOS.filter(x=>{const pr=preds[x.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  const doneBrac=BRACKET_RONDAS.reduce((acc,r)=>acc+r.partidos.filter(m=>{const b=brac[m.bid];return b&&b.gl!==undefined;}).length,0);
  // Resultados oficiales reales (si no se está usando el simulador)
  const resOfi=(resultadosAdmin&&Object.keys(resultadosAdmin).length)?resultadosAdmin:(sbClient?await cargarResultadosReales():(window._resOficiales||{}));

  // 1era Ronda
  let predsHtml='';
  PARTIDOS.forEach(pa=>{
    const pr=preds[pa.id];
    const r=resultadosAdmin[pa.id]||resOfi[pa.id];
    let color='',badge='';
    if(pr&&r&&pr.l!==undefined&&r.l!==undefined){
      if(pr.l===r.l&&pr.v===r.v){color='background:#eaf5ee';badge='<span style="color:#0a5c2e;font-weight:700;font-size:10px">+5pts</span>';}
      else if(Math.sign(pr.l-pr.v)===Math.sign(r.l-r.v)){color='background:#fffbf0';badge='<span style="color:#7a5500;font-weight:700;font-size:10px">+2pts</span>';}
      else{color='background:#fef0f0';badge='<span style="color:#c0392b;font-weight:700;font-size:10px">0pts</span>';}
    }
    const tPred=(pr&&pr.t)?new Date(pr.t).toLocaleString('es-PA',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'}):'';
    predsHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-bottom:1px solid var(--borde);font-size:12px;${color};border-radius:3px;margin-bottom:1px">
      <span>${flagBadge(pa.l,14)} ${pa.l}</span>
      <span style="font-family:'Barlow Condensed',sans-serif;font-weight:800;color:var(--verde);margin:0 4px">${pr?pr.l:'-'} – ${pr?pr.v:'-'}</span>
      <span>${pa.v} ${flagBadge(pa.v,14)}</span>
      <span style="margin-left:auto;text-align:right">${badge}${tPred?`<div style="font-size:9px;color:var(--muted);font-weight:400">🕒 ${tPred}</div>`:''}</span>
    </div>`;
  });

  // 2da Ronda — Bracket
  let bracketHtml='';
  BRACKET_RONDAS.forEach(ronda=>{
    const partidosConData=ronda.partidos.filter(m=>{const b=brac[m.bid];return b&&(b.l||b.v);});
    if(!partidosConData.length)return;
    bracketHtml+=`<div style="font-size:11px;font-weight:700;color:var(--oro);text-transform:uppercase;letter-spacing:.06em;margin:.75rem 0 .3rem;font-family:'Barlow Condensed',sans-serif">${ronda.nombre}</div>`;
    partidosConData.forEach(m=>{
      const b=brac[m.bid]||{};
      const resOf=(resultadosAdmin._bracketRes&&resultadosAdmin._bracketRes[m.bid])||(resOfi._bracketRes&&resOfi._bracketRes[m.bid]);
      let badge='',bgColor='',txtColor='';
      if(resOf&&b.gl!==undefined){
        const ganPred=b.gl>b.gv?b.l:b.gv>b.gl?b.v:(b.penales||null);
        if(b.gl===resOf.gl&&b.gv===resOf.gv){badge='+'+ronda.pts_ex+'pts ✓';bgColor='#0a5c2e';txtColor='#fff';}
        else if(ganPred===resOf.ganador){badge='+'+ronda.pts_res+'pts';bgColor='#f0cb6a';txtColor='#7a5500';}
        else{badge='0pts ✗';bgColor='#c0392b';txtColor='#fff';}
      }
      const tB=(b&&b.t)?new Date(b.t).toLocaleString('es-PA',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'}):'';
      bracketHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-bottom:1px solid var(--borde);font-size:12px">
        <span>${flagBadge(b.l||'?',14)} ${b.l||'?'}</span>
        <span style="font-family:'Barlow Condensed',sans-serif;font-weight:800;color:var(--verde);margin:0 4px">${b.gl!==undefined?b.gl:'-'} – ${b.gv!==undefined?b.gv:'-'}</span>
        <span>${b.v||'?'} ${flagBadge(b.v||'?',14)}</span>
        <span style="margin-left:auto;text-align:right">${badge?`<span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:10px;background:${bgColor};color:${txtColor}">${badge}</span>`:''}${tB?`<div style="font-size:9px;color:var(--muted)">🕒 ${tB}</div>`:''}</span>
      </div>`;
    });
  });

  // Goleador
  const golRealP=resultadosAdmin._goleador||resOfi._goleador;
  const golAcerto=gol&&golRealP&&gol===golRealP;
  const golBadge=golRealP?(golAcerto?'+30pts ✓':'0pts ✗'):'';
  const golBg=golAcerto?'#0a5c2e':'#c0392b';

  // Timestamp de última actualización de las predicciones (solo admin)
  const tsAct = (q && q.fecha) ? new Date(q.fecha).toLocaleString('es-PA',{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'}) : null;

  document.getElementById('perfil-body').innerHTML=`
    ${tsAct?`<div style="font-size:11px;color:#7a5500;background:#fffbf0;border:1px solid #f0cb6a;border-radius:6px;padding:6px 10px;margin-bottom:1rem">🕒 Última actualización: <b>${tsAct}</b> (hora Panamá)</div>`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1rem">
      <div style="background:var(--bg);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Nombre</div><div style="font-weight:600;font-size:13px">${p.nombre||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Alias</div><div style="font-weight:700;color:var(--verde);font-size:13px">${p.alias||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Correo</div><div style="font-size:12px">${p.email||'—'}</div></div>
      <div style="background:var(--bg);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Código</div><div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo||'—'}</div></div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:1rem">
      <div style="background:#eaf5ee;color:#0a5c2e;border-radius:8px;padding:10px;flex:1;text-align:center">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.4rem">${done}/72</div>
        <div style="font-size:11px">Partidos predichos</div>
      </div>
      <div style="background:#eef4ff;color:#1a47a0;border-radius:8px;padding:10px;flex:1;text-align:center">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.4rem">${doneBrac}</div>
        <div style="font-size:11px">Partidos bracket</div>
      </div>
      <div style="background:#fffbf0;color:#7a5500;border-radius:8px;padding:10px;flex:1;text-align:center">
        <div style="font-size:1rem">${gol?flagBadge(gol,18)+' ':''}</div>
        <div style="font-size:11px">Goleador: ${gol||'Sin selección'} ${golBadge?`<span style="background:${golBg};color:#fff;padding:1px 5px;border-radius:6px;font-size:9px;font-weight:700">${golBadge}</span>`:''}</div>
      </div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem">1era Ronda — ${PARTIDOS.length} partidos</div>
    <div style="max-height:200px;overflow-y:auto;margin-bottom:.75rem">${predsHtml||'<p style="color:var(--muted);font-size:12px">Sin predicciones</p>'}</div>
    ${bracketHtml?`<div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem">2da Ronda</div><div style="max-height:250px;overflow-y:auto">${bracketHtml}</div>`:''}`;
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
      if(d.usado){
        return `<span class="codigo-chip usado" style="cursor:${pid?'pointer':'default'}" ${pid?`onclick="verPerfil('${pid}')" title="Ver participante"`:''}>${d.codigo} ✓</span>`;
      }
      return `<span class="codigo-chip libre">${d.codigo}<span onclick="borrarCodigoIndividual('${d.codigo}')" title="Borrar código" style="cursor:pointer;margin-left:6px;font-weight:800;color:#c0392b">✕</span></span>`;
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

async function borrarCodigosLibres(){
  if(!sbClient){alert('Conecta Supabase primero.');return;}
  const libres=todosCodigos.filter(d=>!d.usado);
  if(!libres.length){alert('No hay codigos libres para borrar.');return;}
  if(!confirm(`¿Borrar ${libres.length} codigos libres? Esta accion no se puede deshacer.`))return;
  const{data,error}=await sbClient.from('codigos_participante').delete().eq('usado',false).select();
  if(error){alert('Error: '+error.message);return;}
  const n=data?data.length:0;
  if(!n){alert('No se borró ningún código. Falta la política de DELETE en Supabase (ver instrucciones de seguridad).');return;}
  alert(`${n} codigos borrados.`);cargarCodigos();
}

async function borrarTodosCodigosLibres(){
  if(!sbClient){alert('Conecta Supabase primero.');return;}
  if(!confirm('¿Borrar TODOS los codigos (libres y usados)? Esta accion no se puede deshacer.'))return;
  // Filtro siempre-verdadero sobre 'codigo' (no depende de que exista columna 'id')
  const{data,error}=await sbClient.from('codigos_participante').delete().not('codigo','is',null).select();
  if(error){alert('Error: '+error.message);return;}
  const n=data?data.length:0;
  if(!n){alert('No se borró ningún código. Con la política "solo libres" los códigos usados no se borran, o falta la política de DELETE en Supabase.');cargarCodigos();return;}
  todosCodigos=[];alert(`${n} codigos borrados.`);cargarCodigos();
}

async function borrarCodigoIndividual(codigo){
  if(!sbClient){alert('Conecta Supabase primero.');return;}
  if(!confirm(`¿Borrar el código ${codigo}?`))return;
  // Solo borra si esta libre (coincide con la politica RLS "borrar_codigos_libres")
  const{data,error}=await sbClient.from('codigos_participante').delete().eq('codigo',codigo).eq('usado',false).select();
  if(error){alert('Error: '+error.message);return;}
  if(!data||!data.length){alert('No se borró el código. Puede que ya esté usado, o falta la política de DELETE en Supabase.');return;}
  alert(`Código ${codigo} borrado.`);cargarCodigos();
}

async function borrarParticipante(pid){
  if(!confirm('¿Borrar este participante y sus predicciones? Esta accion no se puede deshacer.'))return;
  const part=participantes.find(p=>String(p.id)===String(pid));
  try{
    if(sbClient){
      await sbClient.from('quinielas').delete().eq('participante_id',pid);
      // .select() devuelve las filas realmente borradas: si RLS lo bloquea, viene vacio (sin error)
      const{data,error}=await sbClient.from('participantes').delete().eq('id',pid).select();
      if(error)throw error;
      if(!data||!data.length){
        alert('No se borró el participante. Falta la política de DELETE en Supabase (ver instrucciones de seguridad).');
        return;
      }
      // Liberar el código para que vuelva a estar disponible
      if(part?.codigo){
        await sbClient.from('codigos_participante').update({usado:false}).eq('codigo',part.codigo);
      }
    } else {
      let local=JSON.parse(localStorage.getItem('participantes')||'[]');
      local=local.filter(p=>String(p.id)!==String(pid));
      localStorage.setItem('participantes',JSON.stringify(local));
      localStorage.removeItem('quiniela_'+pid);
    }
    participantes=participantes.filter(p=>String(p.id)!==String(pid));
    actualizarContadores();
    document.getElementById('perfil-modal')?.classList.remove('on');
    alert('Participante borrado'+(part?.codigo?` y código ${part.codigo} liberado`:'')+'.');
    if(typeof renderAdminParticipantes==='function')renderAdminParticipantes();
    else _renderAdminContent();
    if(typeof cargarCodigos==='function')cargarCodigos();
  } catch(e){alert('Error al borrar: '+e.message);}
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

  // Zonas publicitarias
  ['1','2','6'].forEach(z=>{
    const inp=document.getElementById('ad-zona'+z+'-input');
    const zona=document.getElementById('ad-zona'+z);
    const contenido=document.getElementById('ad-zona'+z+'-content');
    if(!inp||!zona||!contenido)return;
    const val=inp.value.trim();
    if(val){
      // Solo imágenes desde URL validada (anti-XSS)
      const url=urlImagenSegura(val);
      if(url){
        const html=`<img src="${url}" style="max-width:100%;height:auto;display:block;margin:0 auto">`;
        contenido.innerHTML=html;
        contenido.style.border='none';contenido.style.background='none';contenido.style.minHeight='0';contenido.style.padding='0';
        zona.style.display='';
        localStorage.setItem('ad_zona'+z,html);
      }
    }
  });

  // Premios
  for(let i=1;i<=3;i++){
    const img=document.getElementById('premio'+i+'-img')?.value.trim()||'';
    const desc=document.getElementById('premio'+i+'-desc')?.value.trim()||'';
    if(img)localStorage.setItem('premio'+i+'_img',img);
    else localStorage.removeItem('premio'+i+'_img');
    if(desc)localStorage.setItem('premio'+i+'_desc',desc);
    else localStorage.removeItem('premio'+i+'_desc');
  }
  renderPremios();
  // Textos del hero
  const badge=document.getElementById('cfg-hero-badge')?.value.trim()||'';
  const titulo=document.getElementById('cfg-hero-titulo')?.value.trim()||'';
  const subtitulo=document.getElementById('cfg-hero-subtitulo')?.value.trim()||'';
  if(badge)localStorage.setItem('hero_badge',badge);
  if(titulo)localStorage.setItem('hero_titulo',titulo);
  if(subtitulo)localStorage.setItem('hero_subtitulo',subtitulo);
  cargarTextosHero();
  alert('Configuracion aplicada.');
}

function cargarAdsGuardados(){
  // La config visual ya se carga desde cargarConfiguracion via Supabase
  // Este fallback es para cuando no hay Supabase
  if(!sbClient){
    cargarConfigVisualLocal();
  }
}

// cargarTextosHero movido a aplicarConfigVisual

// ============================================================
// INIT
// ============================================================
async function init(){
  calcDias();renderGrupoTabs();renderPartidosGrupo();renderGoleador();renderRanking();
  const emp=localStorage.getItem('cfg_empresa');const col=localStorage.getItem('cfg_color');
  if(emp)document.getElementById('empresa-label').textContent=emp;
  if(col)document.documentElement.style.setProperty('--verde',col);
  await cargarSDK();await autoConectar();await cargarConfiguracion();aplicarCierreUI();cargarAdsGuardados();cargarMayorias();
  // Cargar resultados oficiales para mostrar marcador real + puntos por partido en 1era Ronda
  if(sbClient){window._resOficiales=await cargarResultadosReales();renderPartidosGrupo();renderGoleador();renderBracket();}
  await autoLoginSesion();
}
document.addEventListener('DOMContentLoaded',init);function calcTablaGrupoReal(g){
  const equipos=GRUPOS[g];
  const stats={};
  equipos.forEach(e=>{stats[e]={pts:0,pj:0,g:0,em:0,p:0,gf:0,gc:0,dif:0};});
  let hayResultados=false;
  PARTIDOS.filter(p=>p.g===g).forEach(p=>{
    const r=resultadosAdmin[p.id]||(window._resOficiales&&window._resOficiales[p.id]);
    if(!r||r.l===undefined||r.v===undefined)return;
    hayResultados=true;
    const gl=Number(r.l),gv=Number(r.v);
    stats[p.l].pj++;stats[p.v].pj++;
    stats[p.l].gf+=gl;stats[p.l].gc+=gv;stats[p.l].dif+=gl-gv;
    stats[p.v].gf+=gv;stats[p.v].gc+=gl;stats[p.v].dif+=gv-gl;
    if(gl>gv){stats[p.l].g++;stats[p.l].pts+=3;stats[p.v].p++;}
    else if(gv>gl){stats[p.v].g++;stats[p.v].pts+=3;stats[p.l].p++;}
    else{stats[p.l].em++;stats[p.l].pts++;stats[p.v].em++;stats[p.v].pts++;}
  });
  if(!hayResultados)return null;
  return Object.entries(stats).map(([eq,s])=>({eq,...s})).sort((a,b)=>b.pts-a.pts||b.dif-a.dif||b.gf-a.gf);
}
