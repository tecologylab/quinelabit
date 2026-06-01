# Quiniela FIFA 2026 — Contexto del Proyecto para Claude Code

## Descripción
Plataforma web de predicciones del Mundial FIFA 2026 para Business IT Panama. Stack: HTML + CSS + Vanilla JavaScript + Supabase (PostgreSQL) + GitHub Pages.

- **URL producción:** https://tecologylab.github.io/quinelabit
- **Repo:** https://github.com/tecologylab/quinelabit
- **Admin:** https://tecologylab.github.io/quinelabit/admin.html

---

## Archivos del Proyecto

| Archivo | Descripción |
|---|---|
| `index.html` | Frontend público — registro, quiniela, ranking, premios |
| `app.js` | Lógica principal (~2300 líneas) |
| `admin.html` | Panel de administración con login wall |
| `admin.js` | Lógica admin — resultados, backup, configuración |

---

## Credenciales Supabase

```
SB_URL = 'https://zriyqyeoiommrnyvwjto.supabase.co'
SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
FOOTBALL_API_KEY = 'f82a29de770a432ebe388346a80416a5'
```

⚠️ CRÍTICO: La variable del cliente Supabase SIEMPRE se llama `sbClient`. NUNCA `supabase` — hay conflicto con el SDK.

---

## Tablas Supabase

| Tabla | Descripción | Campos clave |
|---|---|---|
| `participantes` | Usuarios registrados | id, nombre, alias, email, tel, codigo, favorito |
| `quinielas` | Predicciones por usuario | participante_id (UNIQUE), predicciones (JSONB), bracket (JSONB), goleador, puntos |
| `codigos_participante` | Códigos de acceso | codigo (UNIQUE), usado (bool) |
| `resultados_reales` | Resultados oficiales | partido_idx (UNIQUE), goles_local, goles_visita, ganador |
| `configuracion` | Config del torneo | fecha_cierre, permitir_edicion, fecha_cierre_r32/r16/qf/sf/final, admin_password |
| `configuracion_visual` | Config visual | clave (UNIQUE), valor |

partido_idx: 0=goleador, 1-72=grupos, 1000+bid=bracket

---

## Variables Globales Clave

```javascript
let sbClient;              // Cliente Supabase — NUNCA 'supabase'
let predicciones = {};     // {partidoId: {l, v}}
let bracket = {};          // {bid: {l, v, gl, gv, penales}}
let configGlobal = { permitir_edicion, fecha_cierre, fecha_cierre_r32, ... };
window._resOficiales = {}; // Resultados oficiales para predictor
window._configVisual = {}; // Config visual de Supabase
```

---

## Bracket FIFA 2026

Lado izquierdo → Semi 101: partidos 74,77,73,75,83,84,81,82
Lado derecho → Semi 102: partidos 76,78,79,80,86,88,85,87

España (1H) está en partido 84 → Semi 101
Argentina (1J) está en partido 86 → Semi 102
Se encuentran solo en Final (104)

---

## Sistema de Puntos

Grupos: exacto=5pts, resultado=2pts
R32/R16/QF/SF/Final: exacto=6/8/10/12/15pts, resultado=3/4/5/6/8pts
País goleador: 30pts

---

## Funciones Importantes

```javascript
estaCerrada(ronda)              // 'grupos','r32','r16','qf','sf','final'
propagarGanador(bid, visitados) // Propaga ganador al siguiente partido
propagarPerdedor(bid)           // SF perdedor → partido 103
aplicarConfigVisual(cfg)        // Aplica config_visual de Supabase al DOM
predictorHTML(local, visita, pid) // Predictor con barra FIFA + mayoría + resultado
calcPuntosConDesglose(preds, brac, gol, resultados)
calcTablaGrupo(g) / calcTablaGrupoReal(g)
renderBracket() / renderPartidosGrupo() / renderRanking()
```

---

## Configuración Visual (claves en Supabase)

cfg_empresa, cfg_color, hero_badge, hero_titulo, hero_subtitulo,
ad_zona1, ad_zona2, ad_zona6,
premio1_img, premio1_desc, premio2_img, premio2_desc, premio3_img, premio3_desc

---

## Notas Críticas

1. `sbClient` — NUNCA renombrar a `supabase`
2. `Rep. Checa` no `Chequia`, `EEUU` no `Estados Unidos`
3. localStorage solo es fallback — datos compartidos siempre a Supabase
4. Admin usa `sessionStorage` — expira al cerrar el tab
5. GitHub Pages: esperar 1-2 min tras push, verificar en incógnito

---

## Pendientes

- [ ] Envío de código por correo (Resend) — espera correo Business IT
- [ ] Ofuscación del código (último paso)
- [ ] Fork Tecology: Supabase Auth, registro abierto, multi-tenant

## Vulnerabilidades Conocidas

1. ALTA: Sin RLS por usuario en tabla quinielas
2. MEDIA: API key football-data.org expuesta en frontend
3. MEDIA: Login admin sin rate limiting

Ver AUDITORIA_SEGURIDAD.md para detalles.
