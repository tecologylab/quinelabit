// =============================================
// QUINIELA FIFA 2026 - app.js v4.0
// Business IT
// =============================================

const SB_URL = "https://zriyqyeoiommrnyvwjto.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXlxeWVvaW9tbXJueXZ3anRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NzQ1ODMsImV4cCI6MjA5MjE1MDU4M30.fylrPptB3VpnkXw2qMxh2PgLPBpt5OvIjoPgOzTTjog";
const FECHA_INICIO = new Date('2026-06-11');

// =============================================
// BANDERAS — emojis unicode (sin CDN, sin roturas)
// =============================================
const EMOJIS = {
  'Mexico':'🇲🇽','Sudafrica':'🇿🇦','Corea del Sur':'🇰🇷','Chequia':'🇨🇿',
  'Canada':'🇨🇦','Bosnia-Herzegovina':'🇧🇦','Qatar':'🇶🇦','Suiza':'🇨🇭',
  'Brasil':'🇧🇷','Marruecos':'🇲🇦','Haiti':'🇭🇹','Escocia':'🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'EEUU':'🇺🇸','Paraguay':'🇵🇾','Australia':'🇦🇺','Turkiye':'🇹🇷',
  'Alemania':'🇩🇪','Curazao':'🇨🇼','Costa de Marfil':'🇨🇮','Ecuador':'🇪🇨',
  'Paises Bajos':'🇳🇱','Japon':'🇯🇵','Suecia':'🇸🇪','Tunez':'🇹🇳',
  'Belgica':'🇧🇪','Egipto':'🇪🇬','Iran':'🇮🇷','Nueva Zelanda':'🇳🇿',
  'Espana':'🇪🇸','Cabo Verde':'🇨🇻','Arabia Saudita':'🇸🇦','Uruguay':'🇺🇾',
  'Francia':'🇫🇷','Senegal':'🇸🇳','Iraq':'🇮🇶','Noruega':'🇳🇴',
  'Argentina':'🇦🇷','Argelia':'🇩🇿','Austria':'🇦🇹','Jordania':'🇯🇴',
  'Portugal':'🇵🇹','DR Congo':'🇨🇩','Uzbekistan':'🇺🇿','Colombia':'🇨🇴',
  'Inglaterra':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croacia':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦',
};

function ef(pais) { return EMOJIS[pais] || '🏳️'; }

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

const TODOS_PAISES = Object.keys(EMOJIS);

const PARTIDOS = [
  {id:1,g:'A',l:'Mexico',v:'Sudafrica',f:'2026-06-11',h:'15:00',s:'Azteca, Cdmx'},
  {id:2,g:'A',l:'Corea del Sur',v:'Chequia',f:'2026-06-11',h:'22:00',s:'Akron, Zapopan'},
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
  {id:25,g:'A',l:'Chequia',v:'Sudafrica',f:'2026-06-18',h:'12:00',s:'Mercedes-Benz, Atlanta'},
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
  {id:53,g:'A',l:'Chequia',v:'Mexico',f:'2026-06-24',h:'21:00',s:'Azteca, Cdmx'},
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

// Bracket slots — cada slot tiene un id, descripcion, y grupos posibles
// pos: '1A'=primero grupo A, '2A'=segundo grupo A, '3ABCDF'=mejor 3ro de esos grupos
const BRACKET_SLOTS = [
  // Ronda de 32 — lado izquierdo
  {sid:'r32_73_l', pos:'1E', grupo:'E', tipo:'1'},
  {sid:'r32_73_v', pos:'3ABCDF', grupos:['A','B','C','D','F'], tipo:'3'},
  {sid:'r32_74_l', pos:'1I', grupo:'I', tipo:'1'},
  {sid:'r32_74_v', pos:'3CDFGH', grupos:['C','D','F','G','H'], tipo:'3'},
  {sid:'r32_75_l', pos:'2A', grupo:'A', tipo:'2'},
  {sid:'r32_75_v', pos:'2B', grupo:'B', tipo:'2'},
  {sid:'r32_76_l', pos:'1F', grupo:'F', tipo:'1'},
  {sid:'r32_76_v', pos:'2C', grupo:'C', tipo:'2'},
  {sid:'r32_77_l', pos:'2K', grupo:'K', tipo:'2'},
  {sid:'r32_77_v', pos:'2L', grupo:'L', tipo:'2'},
  {sid:'r32_78_l', pos:'1H', grupo:'H', tipo:'1'},
  {sid:'r32_78_v', pos:'2J', grupo:'J', tipo:'2'},
  {sid:'r32_79_l', pos:'1D', grupo:'D', tipo:'1'},
  {sid:'r32_79_v', pos:'3BEFIJ', grupos:['B','E','F','I','J'], tipo:'3'},
  {sid:'r32_80_l', pos:'1G', grupo:'G', tipo:'1'},
  {sid:'r32_80_v', pos:'3AEHIJ', grupos:['A','E','H','I','J'], tipo:'3'},
  // Ronda de 32 — lado derecho
  {sid:'r32_84_l', pos:'1C', grupo:'C', tipo:'1'},
  {sid:'r32_84_v', pos:'2F', grupo:'F', tipo:'2'},
  {sid:'r32_85_l', pos:'2E', grupo:'E', tipo:'2'},
  {sid:'r32_85_v', pos:'2I', grupo:'I', tipo:'2'},
  {sid:'r32_86_l', pos:'1A', grupo:'A', tipo:'1'},
  {sid:'r32_86_v', pos:'3CEFHI', grupos:['C','E','F','H','I'], tipo:'3'},
  {sid:'r32_87_l', pos:'1L', grupo:'L', tipo:'1'},
  {sid:'r32_87_v', pos:'3EHIJK', grupos:['E','H','I','J','K'], tipo:'3'},
  {sid:'r32_88_l', pos:'1J', grupo:'J', tipo:'1'},
  {sid:'r32_88_v', pos:'2H', grupo:'H', tipo:'2'},
  {sid:'r32_89_l', pos:'2D', grupo:'D', tipo:'2'},
  {sid:'r32_89_v', pos:'2G', grupo:'G', tipo:'2'},
  {sid:'r32_90_l', pos:'1B', grupo:'B', tipo:'1'},
  {sid:'r32_90_v', pos:'3EFGIJ', grupos:['E','F','G','I','J'], tipo:'3'},
  {sid:'r32_91_l', pos:'1K', grupo:'K', tipo:'1'},
  {sid:'r32_91_v', pos:'3DEIJL', grupos:['D','E','I','J','L'], tipo:'3'},
];

// Definicion visual del bracket en filas/columnas
// Formato: {bid, label, pts_exacto, pts_resultado}
const BRACKET_MATCHES = [
  // Ronda de 32 (16 partidos)
  {bid:73, label:'R32 — 1E vs 3ABCDF', grupos_l:['E'], tipo_l:'1', grupos_v:['A','B','C','D','F'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:74, label:'R32 — 1I vs 3CDFGH', grupos_l:['I'], tipo_l:'1', grupos_v:['C','D','F','G','H'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:75, label:'R32 — 2A vs 2B', grupos_l:['A'], tipo_l:'2', grupos_v:['B'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:76, label:'R32 — 1F vs 2C', grupos_l:['F'], tipo_l:'1', grupos_v:['C'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:77, label:'R32 — 2K vs 2L', grupos_l:['K'], tipo_l:'2', grupos_v:['L'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:78, label:'R32 — 1H vs 2J', grupos_l:['H'], tipo_l:'1', grupos_v:['J'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:79, label:'R32 — 1D vs 3BEFIJ', grupos_l:['D'], tipo_l:'1', grupos_v:['B','E','F','I','J'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:80, label:'R32 — 1G vs 3AEHIJ', grupos_l:['G'], tipo_l:'1', grupos_v:['A','E','H','I','J'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:81, label:'R32 — 1C vs 2F', grupos_l:['C'], tipo_l:'1', grupos_v:['F'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:82, label:'R32 — 2E vs 2I', grupos_l:['E'], tipo_l:'2', grupos_v:['I'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:83, label:'R32 — 1A vs 3CEFHI', grupos_l:['A'], tipo_l:'1', grupos_v:['C','E','F','H','I'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:84, label:'R32 — 1L vs 3EHIJK', grupos_l:['L'], tipo_l:'1', grupos_v:['E','H','I','J','K'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:85, label:'R32 — 1J vs 2H', grupos_l:['J'], tipo_l:'1', grupos_v:['H'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:86, label:'R32 — 2D vs 2G', grupos_l:['D'], tipo_l:'2', grupos_v:['G'], tipo_v:'2', pts_ex:6, pts_res:3},
  {bid:87, label:'R32 — 1B vs 3EFGIJ', grupos_l:['B'], tipo_l:'1', grupos_v:['E','F','G','I','J'], tipo_v:'3', pts_ex:6, pts_res:3},
  {bid:88, label:'R32 — 1K vs 3DEIJL', grupos_l:['K'], tipo_l:'1', grupos_v:['D','E','I','J','L'], tipo_v:'3', pts_ex:6, pts_res:3},
  // Ronda de 16
  {bid:89, label:'R16 — Gan.73 vs Gan.74', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:90, label:'R16 — Gan.75 vs Gan.76', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:91, label:'R16 — Gan.77 vs Gan.78', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:92, label:'R16 — Gan.79 vs Gan.80', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:93, label:'R16 — Gan.81 vs Gan.82', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:94, label:'R16 — Gan.83 vs Gan.84', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:95, label:'R16 — Gan.85 vs Gan.86', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  {bid:96, label:'R16 — Gan.87 vs Gan.88', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:8, pts_res:4},
  // Cuartos
  {bid:97, label:'Cuartos — Gan.89 vs Gan.90', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:10, pts_res:5},
  {bid:98, label:'Cuartos — Gan.91 vs Gan.92', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:10, pts_res:5},
  {bid:99, label:'Cuartos — Gan.93 vs Gan.94', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:10, pts_res:5},
  {bid:100, label:'Cuartos — Gan.95 vs Gan.96', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:10, pts_res:5},
  // Semis
  {bid:101, label:'Semifinal — Gan.97 vs Gan.98', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:12, pts_res:6, sede:'AT&T Stadium, Dallas'},
  {bid:102, label:'Semifinal — Gan.99 vs Gan.100', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:12, pts_res:6, sede:'Mercedes-Benz, Atlanta'},
  // 3er lugar y Final
  {bid:103, label:'3er Lugar', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:12, pts_res:6, sede:'Hard Rock, Miami'},
  {bid:104, label:'🏆 FINAL', grupos_l:null, tipo_l:'ganador', grupos_v:null, tipo_v:'ganador', pts_ex:15, pts_res:8, sede:'MetLife Stadium, NJ'},
];

const RONDAS = [
  {nombre:'Ronda de 32', bids:[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88]},
  {nombre:'Ronda de 16', bids:[89,90,91,92,93,94,95,96]},
  {nombre:'Cuartos de Final', bids:[97,98,99,100]},
  {nombre:'Semifinales', bids:[101,102]},
  {nombre:'3er Lugar y Final', bids:[103,104]},
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
let modalActivo = null; // {bid, lado}
let todosCodigos = [];

// =============================================
// SDK SUPABASE
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
    if (!sdk || !sdk.createClient) throw new Error('no sdk');
    sbClient = sdk.createClient(SB_URL, SB_KEY);
    const { error } = await sbClient.from('participantes').select('id').limit(1);
    if (error) throw error;
    await cargarParticipantes();
  } catch(e) { sbClient = null; cargarParticipantes(); }
}

// =============================================
// UTILS
// =============================================
function calcDias() {
  const diff = Math.ceil((FECHA_INICIO - new Date()) / 86400000);
  const val = diff > 0 ? diff : 0;
  document.querySelectorAll('#dias-restantes,#stat-dias').forEach(el => { if(el) el.textContent = val; });
}

function fmtFecha(str) {
  return new Date(str+'T12:00:00').toLocaleDateString('es-PA',{weekday:'short',day:'numeric',month:'short'});
}

function alerta(id, tipo, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert '+tipo;
  el.textContent = msg;
  setTimeout(() => { el.className='alert'; }, 7000);
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

function showAuth(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('form-reg').style.display = tab==='reg' ? '' : 'none';
  document.getElementById('form-login').style.display = tab==='login' ? '' : 'none';
}

// Generar codigo alfanumerico
function generarCodigoAlfanum() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'BIT-';
  for (let i=0; i<5; i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}

// =============================================
// AUTH
// =============================================
async function registrar() {
  const nombre  = document.getElementById('r-nombre').value.trim();
  const alias   = document.getElementById('r-alias').value.trim();
  const email   = document.getElementById('r-email').value.trim();
  const tel     = document.getElementById('r-tel').value.trim();
  const codigo  = document.getElementById('r-codigo').value.trim().toUpperCase();
  const favorito= document.getElementById('r-favorito').value;

  if (!nombre||!alias||!email||!codigo) {
    alerta('reg-alert','error','Completa nombre, alias, correo y código de participante.');
    return;
  }

  const btn = document.getElementById('btn-reg');
  btn.innerHTML='<span class="loading"></span> Verificando...';
  btn.disabled=true;

  if (sbClient) {
    const { data: cod } = await sbClient.from('codigos_participante').select('*').eq('codigo',codigo).eq('usado',false).single();
    if (!cod) {
      alerta('reg-alert','error','Código inválido o ya utilizado. Contacta a Business IT.');
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }
    const { data: ex } = await sbClient.from('participantes').select('id').eq('email',email).single();
    if (ex) {
      alerta('reg-alert','error','Este correo ya está registrado. Usa "Ya tengo cuenta".');
      btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return;
    }
    const { data, error } = await sbClient.from('participantes').insert([{nombre,alias,email,tel,codigo,favorito,fecha:new Date().toISOString()}]).select();
    if (error) { alerta('reg-alert','error','Error: '+error.message); btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return; }
    await sbClient.from('codigos_participante').update({usado:true}).eq('codigo',codigo);
    usuarioActual = data[0];
  } else {
    const local = JSON.parse(localStorage.getItem('participantes')||'[]');
    if (local.find(p=>p.email===email)) { alerta('reg-alert','error','Correo ya registrado.'); btn.innerHTML='Registrarme en la quiniela'; btn.disabled=false; return; }
    const nuevo = {id:Date.now(),nombre,alias,email,tel,codigo,favorito,fecha:new Date().toISOString()};
    local.push(nuevo); localStorage.setItem('participantes',JSON.stringify(local));
    usuarioActual = nuevo;
  }

  participantes.push(usuarioActual);
  actualizarContadores();
  mostrarUsuario(usuarioActual.alias||usuarioActual.nombre);
  alerta('reg-alert','success',`Bienvenido ${alias}! Llena tus predicciones.`);
  btn.innerHTML='Registrado ✓'; btn.disabled=false;
}

async function login() {
  const email  = document.getElementById('l-email').value.trim();
  const codigo = document.getElementById('l-codigo').value.trim().toUpperCase();
  if (!email||!codigo) { alerta('login-alert','error','Ingresa correo y código.'); return; }

  const btn = document.getElementById('btn-login');
  btn.innerHTML='<span class="loading"></span> Verificando...';
  btn.disabled=true;

  if (sbClient) {
    const { data, error } = await sbClient.from('participantes').select('*').eq('email',email).eq('codigo',codigo).single();
    if (error||!data) { alerta('login-alert','error','Correo o código incorrecto.'); btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false; return; }
    usuarioActual = data;
    const { data: q } = await sbClient.from('quinielas').select('*').eq('participante_id',data.id).single();
    if (q) { predicciones=JSON.parse(q.predicciones||'{}'); bracket=JSON.parse(q.bracket||'{}'); goleador=q.goleador||null; }
  } else {
    const local = JSON.parse(localStorage.getItem('participantes')||'[]');
    const found = local.find(p=>p.email===email&&p.codigo===codigo);
    if (!found) { alerta('login-alert','error','Correo o código incorrecto.'); btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false; return; }
    usuarioActual = found;
    const q = localStorage.getItem('quiniela_'+found.id);
    if (q) { const qd=JSON.parse(q); predicciones=JSON.parse(qd.predicciones||'{}'); bracket=JSON.parse(qd.bracket||'{}'); goleador=qd.goleador||null; }
  }

  mostrarUsuario(usuarioActual.alias||usuarioActual.nombre);
  alerta('login-alert','success',`Bienvenido de vuelta ${usuarioActual.alias||usuarioActual.nombre}!`);
  renderGrupoTabs(); renderPartidosGrupo(); renderBracket(); renderGoleador();
  btn.innerHTML='Entrar a mi quiniela'; btn.disabled=false;
}

function mostrarUsuario(nombre) {
  const ini = nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('uini').textContent=ini;
  document.getElementById('unombre').textContent=nombre.split(' ')[0];
  document.getElementById('uchip').classList.add('on');
}

async function cargarParticipantes() {
  if (sbClient) { const {data}=await sbClient.from('participantes').select('*'); participantes=data||[]; }
  else { participantes=JSON.parse(localStorage.getItem('participantes')||'[]'); }
  actualizarContadores();
}

function actualizarContadores() {
  const n = participantes.length;
  document.querySelectorAll('#hero-part,#stat-total').forEach(el=>{if(el)el.textContent=n;});
}

// =============================================
// 1ERA RONDA — GRUPOS
// =============================================
function renderGrupoTabs() {
  const tabs = document.getElementById('gtabs');
  if (!tabs) return;
  tabs.innerHTML = Object.keys(GRUPOS).map(g => {
    const done = PARTIDOS.filter(p=>p.g===g&&predicciones[p.id]&&predicciones[p.id].l!==undefined&&predicciones[p.id].v!==undefined).length;
    const total = PARTIDOS.filter(p=>p.g===g).length;
    return `<button class="gtab${grupoActivo===g?' active':''}${done===total?' done':''}" onclick="selGrupo('${g}')">Grupo ${g}${done===total?' ✓':''}</button>`;
  }).join('');
}

function selGrupo(g) { grupoActivo=g; renderGrupoTabs(); renderPartidosGrupo(); }

function renderPartidosGrupo() {
  const c = document.getElementById('partidos-container');
  if (!c) return;
  const ps = PARTIDOS.filter(p=>p.g===grupoActivo);
  const eqs = GRUPOS[grupoActivo];
  let html = `<div class="gequipos">${eqs.map(eq=>`<span class="ebadge"><span style="font-size:16px">${ef(eq)}</span> ${eq}</span>`).join('')}</div>`;
  let fa='';
  ps.forEach(p => {
    if(p.f!==fa){fa=p.f; html+=`<div class="flbl">${fmtFecha(p.f)} · ${p.h} ET</div>`;}
    const pr=predicciones[p.id]||{};
    const lv=pr.l!==undefined?pr.l:''; const vv=pr.v!==undefined?pr.v:'';
    const ok=pr.l!==undefined&&pr.v!==undefined;
    html+=`<div class="pcard${ok?' ok':''}">
      <div class="psede">${p.s}</div>
      <div class="prow">
        <div class="ecol"><span class="eflag" style="font-size:20px">${ef(p.l)}</span><span class="ename">${p.l}</span></div>
        <div class="sinputs">
          <input type="number" min="0" max="20" value="${lv}" placeholder="?" class="sinput${pr.l!==undefined?' v':''}" oninput="setPred(${p.id},'l',this.value)">
          <span class="ssep">–</span>
          <input type="number" min="0" max="20" value="${vv}" placeholder="?" class="sinput${pr.v!==undefined?' v':''}" oninput="setPred(${p.id},'v',this.value)">
        </div>
        <div class="ecol r"><span class="ename">${p.v}</span><span class="eflag" style="font-size:20px">${ef(p.v)}</span></div>
      </div>
    </div>`;
  });
  c.innerHTML=html; actualizarProgreso();
}

function setPred(id,lado,val) {
  const num=parseInt(val);
  if(!predicciones[id])predicciones[id]={};
  if(!isNaN(num)&&num>=0) predicciones[id][lado]=num;
  else delete predicciones[id][lado];
  actualizarProgreso(); renderGrupoTabs();
}

function actualizarProgreso() {
  const total=PARTIDOS.length;
  const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  const pct=Math.round(done/total*100);
  const f=document.getElementById('prog-fill');if(f)f.style.width=pct+'%';
  const t=document.getElementById('prog-txt');if(t)t.textContent=`${done} de ${total} predichos`;
  const s=document.getElementById('q-status');if(s)s.textContent=done===total?'Lista para guardar!':'Faltan '+(total-done)+' partidos';
}

async function guardarQuiniela() {
  if(!usuarioActual&&!modoDemo){alerta('q-alert','error','Primero regístrate.');return;}
  const done=PARTIDOS.filter(p=>{const pr=predicciones[p.id];return pr&&pr.l!==undefined&&pr.v!==undefined;}).length;
  if(done<PARTIDOS.length){alerta('q-alert','error','Faltan '+(PARTIDOS.length-done)+' partidos.');return;}
  const datos={participante_id:usuarioActual?.id,predicciones:JSON.stringify(predicciones),bracket:JSON.stringify(bracket),goleador,fecha:new Date().toISOString()};
  if(sbClient&&!modoDemo){const{error}=await sbClient.from('quinielas').upsert([datos]);if(error){alerta('q-alert','error','Error: '+error.message);return;}}
  else{localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'),JSON.stringify(datos));}
  alerta('q-alert','success','Predicciones de grupos guardadas!');
}

// =============================================
// 2DA RONDA — BRACKET VISUAL
// =============================================
function getPaisesParaSlot(m, lado) {
  const grupos = lado==='l' ? m.grupos_l : m.grupos_v;
  const tipo = lado==='l' ? m.tipo_l : m.tipo_v;
  if (!grupos || tipo==='ganador') return TODOS_PAISES; // rondas avanzadas = cualquier equipo
  let paises = [];
  grupos.forEach(g => { if(GRUPOS[g]) paises=[...paises,...GRUPOS[g]]; });
  return [...new Set(paises)];
}

function renderBracket() {
  const c = document.getElementById('bracket-container');
  if (!c) return;
  let html = '';

  RONDAS.forEach(ronda => {
    const matches = BRACKET_MATCHES.filter(m => ronda.bids.includes(m.bid));
    html += `<div style="margin-bottom:1.5rem">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--oro);margin-bottom:.5rem;padding-bottom:.5rem;border-bottom:1px solid var(--borde)">${ronda.nombre}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">`;

    matches.forEach(m => {
      const b = bracket[m.bid] || {};
      const lNombre = b.l || null;
      const vNombre = b.v || null;
      const gl = b.gl !== undefined ? b.gl : null;
      const gv = b.gv !== undefined ? b.gv : null;
      const ok = lNombre && vNombre && gl !== null && gv !== null;

      html += `<div class="bmatch${ok?' ok':''}" onclick="abrirModal(${m.bid})" style="cursor:pointer">
        <div class="bmatch-lbl">${m.label}${m.sede?` · ${m.sede}`:''} <span style="float:right;background:var(--oro);color:var(--verde);font-size:9px;padding:1px 6px;border-radius:8px;font-weight:700">${m.pts_ex}pts exacto</span></div>
        <div class="bteam-row${!lNombre?' empty':''}">
          <span class="bteam-flag">${lNombre?ef(lNombre):'?'}</span>
          <span class="bteam-name">${lNombre||'Haz clic para seleccionar'}</span>
          <span class="bteam-score">${gl!==null?gl:''}</span>
        </div>
        <div class="bsep-line"></div>
        <div class="bteam-row${!vNombre?' empty':''}">
          <span class="bteam-flag">${vNombre?ef(vNombre):'?'}</span>
          <span class="bteam-name">${vNombre||'Haz clic para seleccionar'}</span>
          <span class="bteam-score">${gv!==null?gv:''}</span>
        </div>
      </div>`;
    });

    html += `</div></div>`;
  });

  c.innerHTML = html;
}

function abrirModal(bid) {
  const m = BRACKET_MATCHES.find(x=>x.bid===bid);
  if (!m) return;
  modalActivo = { bid, match: m };
  const b = bracket[bid] || {};

  document.getElementById('modal-title').textContent = m.label;
  document.getElementById('modal-gl').value = b.gl !== undefined ? b.gl : '';
  document.getElementById('modal-gv').value = b.gv !== undefined ? b.gv : '';

  // Opciones para local
  const paisesL = getPaisesParaSlot(m,'l');
  const paisesV = getPaisesParaSlot(m,'v');
  const todosGrupos = [...new Set([...(m.grupos_l||[]), ...(m.grupos_v||[])])];

  let html = '';

  // Si hay grupos definidos, agrupar por grupo
  if (m.grupos_l && m.tipo_l !== 'ganador') {
    html += `<div style="margin-bottom:.5rem;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Equipo local (${m.tipo_l==='1'?'1ro':'2do'} de grupo)</div>`;
    const gruposL = m.grupos_l;
    gruposL.forEach(g => {
      html += `<div class="modal-group-title">Grupo ${g}</div>`;
      GRUPOS[g].forEach(eq => {
        html += `<div class="modal-opt${b.l===eq?' sel':''}" onclick="selModalEquipo('l','${eq}',this)">
          <span class="ef" style="font-size:18px">${ef(eq)}</span>
          <span>${g} — ${eq}</span>
        </div>`;
      });
    });

    html += `<div style="margin-top:.75rem;margin-bottom:.5rem;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Equipo visitante (${m.tipo_v==='1'?'1ro':m.tipo_v==='2'?'2do':'Mejor 3ro'} de grupo)</div>`;
    const gruposV = m.grupos_v;
    gruposV.forEach(g => {
      html += `<div class="modal-group-title">Grupo ${g}</div>`;
      GRUPOS[g].forEach(eq => {
        html += `<div class="modal-opt${b.v===eq?' sel':''}" onclick="selModalEquipo('v','${eq}',this)">
          <span class="ef" style="font-size:18px">${ef(eq)}</span>
          <span>${g} — ${eq}</span>
        </div>`;
      });
    });
  } else {
    // Rondas avanzadas — todos los equipos agrupados por grupo
    html += `<div style="margin-bottom:.5rem;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Equipo local</div>`;
    Object.keys(GRUPOS).forEach(g => {
      html += `<div class="modal-group-title">Grupo ${g}</div>`;
      GRUPOS[g].forEach(eq => {
        html += `<div class="modal-opt${b.l===eq?' sel':''}" onclick="selModalEquipo('l','${eq}',this)">
          <span class="ef" style="font-size:18px">${ef(eq)}</span>
          <span>${g} — ${eq}</span>
        </div>`;
      });
    });
    html += `<div style="margin-top:.75rem;margin-bottom:.5rem;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Equipo visitante</div>`;
    Object.keys(GRUPOS).forEach(g => {
      html += `<div class="modal-group-title">Grupo ${g}</div>`;
      GRUPOS[g].forEach(eq => {
        html += `<div class="modal-opt${b.v===eq?' sel':''}" onclick="selModalEquipo('v','${eq}',this)">
          <span class="ef" style="font-size:18px">${ef(eq)}</span>
          <span>${g} — ${eq}</span>
        </div>`;
      });
    });
  }

  document.getElementById('modal-opts').innerHTML = html;
  document.getElementById('bracket-modal').classList.add('on');
}

let modalSelL = null, modalSelV = null;

function selModalEquipo(lado, eq, el) {
  const opts = document.querySelectorAll('.modal-opt');
  // Solo desmarcar los del mismo lado
  if (lado==='l') {
    opts.forEach(o => { if(o.onclick&&o.onclick.toString().includes("'l'")) o.classList.remove('sel'); });
    modalSelL = eq;
  } else {
    opts.forEach(o => { if(o.onclick&&o.onclick.toString().includes("'v'")) o.classList.remove('sel'); });
    modalSelV = eq;
  }
  el.classList.add('sel');
}

function confirmarModal() {
  if (!modalActivo) return;
  const bid = modalActivo.bid;
  if (!bracket[bid]) bracket[bid]={};

  // Leer selecciones
  const selL = document.querySelector('.modal-opt.sel[onclick*="\'l\'"]');
  const selV = document.querySelector('.modal-opt.sel[onclick*="\'v\'"]');

  if (selL) {
    const texto = selL.querySelector('span:last-child').textContent;
    bracket[bid].l = texto.split(' — ')[1];
  }
  if (selV) {
    const texto = selV.querySelector('span:last-child').textContent;
    bracket[bid].v = texto.split(' — ')[1];
  }

  const gl = parseInt(document.getElementById('modal-gl').value);
  const gv = parseInt(document.getElementById('modal-gv').value);
  if (!isNaN(gl)&&gl>=0) bracket[bid].gl=gl;
  if (!isNaN(gv)&&gv>=0) bracket[bid].gv=gv;

  cerrarModal();
  renderBracket();
}

function cerrarModal() {
  document.getElementById('bracket-modal').classList.remove('on');
  modalActivo=null; modalSelL=null; modalSelV=null;
}

async function guardarBracket() {
  if(!usuarioActual&&!modoDemo){alerta('b-alert','error','Primero regístrate.');return;}
  const datos={participante_id:usuarioActual?.id,predicciones:JSON.stringify(predicciones),bracket:JSON.stringify(bracket),goleador,fecha:new Date().toISOString()};
  if(sbClient&&!modoDemo){const{error}=await sbClient.from('quinielas').upsert([datos]);if(error){alerta('b-alert','error','Error: '+error.message);return;}}
  else{localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'),JSON.stringify(datos));}
  alerta('b-alert','success','Bracket guardado!');
}

// =============================================
// PAÍS GOLEADOR
// =============================================
function renderGoleador() {
  const g = document.getElementById('goleador-grid');
  if (!g) return;
  g.innerHTML = TODOS_PAISES.map(eq => `
    <button class="camp-btn${goleador===eq?' sel':''}" onclick="selGoleador('${eq}')">
      <span class="ef" style="font-size:28px;line-height:1">${ef(eq)}</span>
      <span style="font-size:10px">${eq}</span>
    </button>`).join('');
  const st=document.getElementById('g-status');
  if(st) st.textContent=goleador?`Seleccionado: ${ef(goleador)} ${goleador}`:'Selecciona el país goleador';
}

function selGoleador(eq) { goleador=eq; renderGoleador(); }

async function guardarGoleador() {
  if(!usuarioActual&&!modoDemo){alerta('g-alert','error','Primero regístrate.');return;}
  if(!goleador){alerta('g-alert','error','Selecciona un país.');return;}
  const datos={participante_id:usuarioActual?.id,predicciones:JSON.stringify(predicciones),bracket:JSON.stringify(bracket),goleador,fecha:new Date().toISOString()};
  if(sbClient&&!modoDemo){const{error}=await sbClient.from('quinielas').upsert([datos]);if(error){alerta('g-alert','error','Error: '+error.message);return;}}
  else{localStorage.setItem('quiniela_'+(usuarioActual?.id||'demo'),JSON.stringify(datos));}
  alerta('g-alert','success',`País goleador guardado: ${ef(goleador)} ${goleador}!`);
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
  let data = modoDemo ? DEMO_RANK : [];
  if(sbClient&&!modoDemo){const{data:rows}=await sbClient.from('ranking_view').select('*').order('pts',{ascending:false}).limit(100);if(rows&&rows.length)data=rows;}
  if(!data.length&&!modoDemo)data=DEMO_RANK;
  const c=document.getElementById('ranking-container');if(!c)return;
  c.innerHTML=data.map((p,i)=>{
    const ini=(p.alias||p.nombre).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const pos=i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1);
    return `<div class="rankrow">
      <div class="rankpos${i<3?' med':''}">${pos}</div>
      <div class="rankavatar">${ini}</div>
      <div><div class="rankname">${p.alias||p.nombre}</div></div>
      <div class="rankcamp">${p.goleador?ef(p.goleador):''} ${p.goleador||'—'}</div>
      <div class="rankpts">${p.pts}<span class="ptslbl">pts</span></div>
    </div>`;
  }).join('');
  document.getElementById('stat-total').textContent=modoDemo?DEMO_RANK.length:(participantes.length||data.length);
}

// =============================================
// MODO DEMO
// =============================================
function activarDemo() {
  modoDemo=true;
  document.getElementById('demo-banner').classList.add('on');
  document.getElementById('demo-fab').style.display='none';
  usuarioActual={id:'demo',nombre:'Demo Usuario',alias:'DemoFan2026',email:'demo@bit.com',codigo:'BIT-DEMO0'};
  mostrarUsuario('DemoFan2026');
  PARTIDOS.forEach(p=>{predicciones[p.id]={l:Math.floor(Math.random()*4),v:Math.floor(Math.random()*3)};});
  BRACKET_MATCHES.forEach(m=>{
    const paisesL=getPaisesParaSlot(m,'l');
    const paisesV=getPaisesParaSlot(m,'v');
    bracket[m.bid]={
      l:paisesL[Math.floor(Math.random()*paisesL.length)],
      v:paisesV[Math.floor(Math.random()*paisesV.length)],
      gl:Math.floor(Math.random()*3),
      gv:Math.floor(Math.random()*2)
    };
  });
  goleador='Brasil';
  participantes=DEMO_RANK.map((p,i)=>({...p,id:'demo_'+i}));
  actualizarContadores();
  renderGrupoTabs(); renderPartidosGrupo(); renderBracket(); renderGoleador(); renderRanking();
  alert('Modo demo activado! Navega por todas las secciones para presentar la herramienta.');
}

function salirDemo() {
  modoDemo=false; predicciones={}; bracket={}; goleador=null; usuarioActual=null;
  document.getElementById('demo-banner').classList.remove('on');
  document.getElementById('demo-fab').style.display='';
  document.getElementById('uchip').classList.remove('on');
  renderGrupoTabs(); renderPartidosGrupo(); renderBracket(); renderGoleador(); actualizarContadores();
}

// =============================================
// ADMIN
// =============================================
function renderAdmin() {
  const loc=JSON.parse(localStorage.getItem('participantes')||'[]');
  const data=participantes.length?participantes:loc;
  const c=document.getElementById('admin-table');if(!c)return;
  if(!data.length){c.innerHTML='<p style="color:var(--muted);font-size:13px">Sin participantes registrados.</p>';return;}
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
      <td style="padding:7px;color:var(--verde);font-weight:700">${p.alias||'—'}</td>
      <td style="padding:7px;color:var(--muted)">${p.email}</td>
      <td style="padding:7px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.05em">${p.codigo||'—'}</td>
    </tr>`).join('')}</tbody>
  </table>`;
  cargarCodigos();
}

async function cargarCodigos() {
  const c=document.getElementById('codigos-list');if(!c)return;
  if(!sbClient){c.innerHTML='<p style="color:var(--muted);font-size:13px">Conecta Supabase para gestionar códigos.</p>';return;}
  const{data}=await sbClient.from('codigos_participante').select('*').order('codigo');
  todosCodigos=data||[];
  if(!todosCodigos.length){c.innerHTML='<p style="color:var(--muted);font-size:13px">Sin códigos generados aún.</p>';return;}
  const libres=todosCodigos.filter(d=>!d.usado).length;
  c.innerHTML=`<p style="font-size:12px;color:var(--muted);margin-bottom:.75rem">${libres} disponibles · ${todosCodigos.length-libres} usados</p>`+
    todosCodigos.map(d=>`<span class="codigo-chip ${d.usado?'usado':'libre'}" title="${d.usado?'Usado':'Disponible'}">${d.codigo}</span>`).join('');
}

async function generarCodigos() {
  const cant=parseInt(document.getElementById('cant-codigos').value)||10;
  if(!sbClient){alert('Conecta Supabase primero.');return;}

  const nuevos=[];
  const existentes=new Set(todosCodigos.map(c=>c.codigo));
  let intentos=0;
  while(nuevos.length<cant&&intentos<cant*10){
    const cod=generarCodigoAlfanum();
    if(!existentes.has(cod)){nuevos.push({codigo:cod,usado:false});existentes.add(cod);}
    intentos++;
  }

  if(!nuevos.length){alert('No se pudieron generar códigos únicos.');return;}
  const{error}=await sbClient.from('codigos_participante').insert(nuevos);
  if(error){alert('Error: '+error.message);return;}
  alert(`${nuevos.length} códigos generados exitosamente.`);
  cargarCodigos();
}

function exportarCodigos() {
  if(!todosCodigos.length){alert('No hay códigos para exportar.');return;}
  const csv=['Codigo,Estado',...todosCodigos.map(d=>`${d.codigo},${d.usado?'Usado':'Disponible'}`)].join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  a.download='codigos_quiniela2026.csv'; a.click();
}

function exportarCSV() {
  const loc=JSON.parse(localStorage.getItem('participantes')||'[]');
  const data=participantes.length?participantes:loc;
  if(!data.length){alert('Sin datos.');return;}
  const cols=['nombre','alias','email','tel','codigo','favorito','fecha'];
  const csv=[cols.join(','),...data.map(r=>cols.map(c=>`"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  a.download='participantes_quiniela2026.csv'; a.click();
}

function aplicarConfig() {
  const emp=document.getElementById('cfg-empresa').value.trim();
  const col=document.getElementById('cfg-color').value.trim();
  if(emp){document.getElementById('empresa-label').textContent=emp;localStorage.setItem('cfg_empresa',emp);}
  if(col&&/^#[0-9a-fA-F]{6}$/.test(col)){document.documentElement.style.setProperty('--verde',col);localStorage.setItem('cfg_color',col);}
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
  const emp=localStorage.getItem('cfg_empresa');
  const col=localStorage.getItem('cfg_color');
  if(emp)document.getElementById('empresa-label').textContent=emp;
  if(col)document.documentElement.style.setProperty('--verde',col);
  await cargarSDK();
  await autoConectar();
}

document.addEventListener('DOMContentLoaded', init);
