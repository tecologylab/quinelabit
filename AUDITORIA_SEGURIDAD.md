# Auditoría de Seguridad — Quiniela FIFA 2026
## Business IT Panama / Tecology
**Fecha original:** Mayo 2026  
**Revisión contra código real:** Junio 2026 (verificada sobre `index.html`, `app.js`, `admin.html`, `admin.js`)  
**URL:** https://tecologylab.github.io/quinelabit  
**Repositorio:** https://github.com/tecologylab/quinelabit

---

## 0. Resumen de la revisión (Junio 2026)

Se verificó el código fuente real contra la auditoría original de Mayo. **La auditoría subestimaba el riesgo real.** El modelo de seguridad descansa por completo en políticas RLS que hoy son `public` para casi todas las operaciones, mientras el cliente usa únicamente la `anon key` (sin Supabase Auth). Esto convierte varias vulnerabilidades "BAJAS/MEDIAS" en **CRÍTICAS** y revela afirmaciones del documento original que **no coinciden con el código**.

### Estado de las vulnerabilidades documentadas

| # | Vulnerabilidad | Severidad original | Estado verificado |
|---|---|---|---|
| 3.1 | Sin restricción de escritura por usuario en `quinielas` | ALTA | 🔴 **Pendiente — confirmada** (`guardarQuinielaCompleta` hace `upsert` con `onConflict:participante_id` y la `anon key`) |
| 3.2 | API Key football-data.org expuesta | MEDIA | 🟠 **Pendiente — confirmada** (`admin.js:6`; el proxy Edge Function sigue como "TODO") |
| 3.3 | Admin sin rate limiting | MEDIA | 🟠 **Pendiente — confirmada** (`loginAdmin` sin throttle) |
| 3.4 | Códigos predecibles en formato | BAJA | 🟡 **Pendiente — confirmada** (charset 32 × 5 = ~33.5M; eclipsada por 3.8) |
| 3.5 | Sin validación server-side | BAJA | 🟡 **Pendiente — confirmada** (sin triggers/constraints de rango ni fecha) |

### Hallazgos NUEVOS (no estaban en la auditoría de Mayo)

| # | Vulnerabilidad | Severidad |
|---|---|---|
| 3.6 | Contraseña de admin **hardcodeada en texto plano** en el frontend y en texto plano en la BD | 🔴 CRÍTICA |
| 3.7 | **XSS persistente** vía `configuracion_visual` (escritura pública + `innerHTML`) | 🔴 CRÍTICA |
| 3.8 | Credenciales de participante (email + código) **legibles con la anon key** | 🔴 CRÍTICA |
| 3.9 | Tabla `configuracion` escribible y `admin_password` legible públicamente | 🟠 ALTA |
| 3.10 | `resultados_reales` escribible públicamente → manipulación de puntos/ranking | 🟠 ALTA |
| 3.11 | Borrado público de datos (`codigos_participante`, `participantes`, quinielas) | 🟠 ALTA |

---

## 1. Descripción del Sistema

Plataforma web de predicciones del Mundial FIFA 2026 (quiniela) para uso corporativo de Business IT Panama. Permite a empleados y clientes registrarse, hacer predicciones de partidos, ver rankings en tiempo real y ganar premios.

**Stack tecnológico:**
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (sin frameworks)
- **Backend/DB:** Supabase (PostgreSQL con Row Level Security)
- **Hosting:** GitHub Pages (sitio estático)
- **Panel Admin:** `admin.html` + `admin.js` separado del frontend público

---

## 2. Arquitectura de Seguridad

### 2.1 Autenticación
| Componente | Método | Estado |
|---|---|---|
| Participantes | Código alfanumérico único (BIT-XXXXX) | ⚠️ Implementado — pero el código se guarda y es **legible** vía anon key (ver 3.8) |
| Admin | Password | ⚠️ **Hardcodeado** `BIT2026ADMIN` en `app.js:9` y `admin.js:616`; en Supabase se guarda en **texto plano** (ver 3.6) |
| Sesión admin | `sessionStorage` (expira al cerrar tab) | ✅ Implementado |
| Participante SaaS (futuro) | Supabase Auth email+password | 🔄 Pendiente — **prerequisito** para una RLS real por usuario |

### 2.2 Base de Datos (Supabase)
**Row Level Security (RLS) habilitado en todas las tablas:**

| Tabla | SELECT | INSERT | UPDATE | DELETE | Notas |
|---|---|---|---|---|---|
| `participantes` | ✅ public | ✅ public | ❌ | ✅ public | Delete requiere política adicional |
| `quinielas` | ✅ public | ✅ public | ✅ public | ❌ | Sin restricción por usuario |
| `codigos_participante` | ✅ public | ✅ public | ✅ public | ✅ public | |
| `configuracion` | ✅ public | ✅ public | ✅ public | ❌ | |
| `configuracion_visual` | ✅ public | ✅ public | ✅ public | ✅ public | |
| `resultados_reales` | ✅ public | ✅ public | ✅ public | ✅ public | |

### 2.3 Credenciales Expuestas
| Credencial | Tipo | Exposición | Riesgo |
|---|---|---|---|
| Supabase URL | Endpoint público | Frontend JS | Bajo — es el endpoint público por diseño |
| Supabase Anon Key | Clave pública | Frontend JS | Bajo — solo permite operaciones dentro de RLS |
| football-data.org API Key | API key | Frontend JS (`admin.js:6`) | **Medio** — podría ser usada por terceros |
| Admin Password | **Texto plano** | **Expuesto en `app.js:9` (`ADMIN_PASS='BIT2026ADMIN'`) y como fallback en `admin.js:616`; además legible desde `configuracion.admin_password`** | 🔴 **Crítico** — la afirmación original ("Hash en Supabase / No expuesto") es incorrecta |

---

## 3. Vulnerabilidades Identificadas

### 3.1 ALTA — Sin restricción de escritura por usuario  🔴 CONFIRMADA / PENDIENTE
**Descripción:** Cualquiera (no hace falta estar registrado) puede sobrescribir la quiniela de otro participante si conoce o adivina su `participante_id`.  
**Evidencia en código:** `app.js:538-543` — `guardarQuinielaCompleta()` ejecuta
`sbClient.from('quinielas').upsert([{participante_id, predicciones, bracket, goleador}], {onConflict:'participante_id'})`
usando solo la `anon key`. La RLS de `quinielas` es `UPDATE public`, por lo que no hay verificación de propiedad.  
**Impacto:** Un atacante puede alterar o borrar predicciones de cualquier participante, falseando el ranking y los premios.  
**Matiz importante (verificado):** la recomendación original `USING (auth.uid() = user_id)` **no es aplicable tal cual**: la app **no usa Supabase Auth**, así que `auth.uid()` siempre es `NULL` y esa política bloquearía *todas* las escrituras (rompería la app). El fix real requiere **una de dos rutas**: (a) migrar el login a Supabase Auth y ligar `quinielas.user_id` a `auth.uid()`, o (b) interim sin Auth — canalizar las escrituras por una función `SECURITY DEFINER` que valide `email + código` server-side y **revocar** el `INSERT/UPDATE` directo de la tabla a `anon`. Ver `sql/quinielas_rls.sql`.

### 3.2 MEDIA — API Key de football-data.org expuesta
**Descripción:** La API key `f82a29de770a432ebe388346a80416a5` está en el código JavaScript del frontend, visible para cualquier usuario.  
**Impacto:** Terceros podrían usar la key para consumir el límite de requests gratuitos.  
**Recomendación:** Mover las llamadas a la API a una Supabase Edge Function o proxy en servidor. La key quedaría en el servidor, no en el cliente.

### 3.3 MEDIA — Admin sin rate limiting
**Descripción:** El formulario de login del admin no tiene límite de intentos.  
**Impacto:** Ataques de fuerza bruta sobre la contraseña de admin.  
**Recomendación:** Implementar bloqueo después de N intentos fallidos usando `sessionStorage` o Supabase.

### 3.4 BAJA — Códigos de acceso predecibles en formato
**Descripción:** Los códigos tienen formato conocido `BIT-XXXXX` con charset reducido (sin O, 0, I, 1).  
**Impacto:** Reducción del espacio de búsqueda para ataques de fuerza bruta.  
**Recomendación:** El sistema es aceptable para uso corporativo cerrado. Para uso público, aumentar longitud o agregar rate limiting en registro.

### 3.5 BAJA — Sin validación server-side de predicciones
**Descripción:** La validación de datos (rango de goles, fechas de cierre) se hace en el frontend.  
**Impacto:** Un usuario con conocimiento técnico podría enviar predicciones fuera de tiempo o con valores inválidos directamente a la API de Supabase.  
**Recomendación:** Agregar triggers en PostgreSQL para validar datos en el servidor.

### 3.6 CRÍTICA — Contraseña de admin hardcodeada y en texto plano  🆕
**Descripción:** La contraseña del panel admin está escrita en el JavaScript público.  
**Evidencia:** `app.js:9` → `const ADMIN_PASS = 'BIT2026ADMIN';`. En `admin.js:615-617`, `getAdminPass()` devuelve `window._adminPassActual || 'BIT2026ADMIN'`, y `verificarPasswordAdmin()` lee `configuracion.admin_password` **en texto plano** vía la `anon key`. `confirmarAdminPass()` (`app.js:1971-1983`) compara contra el literal y guarda la clave en `localStorage`.  
**Impacto:** Cualquier visitante que abra el `.js` (o que consulte la tabla `configuracion`) obtiene acceso total de administración: editar resultados, borrar participantes, cambiar premios, exportar todos los datos personales.  
**Recomendación:** Eliminar el literal del frontend. El admin debe autenticarse con Supabase Auth (rol admin) y las operaciones administrativas deben exigir ese rol vía RLS. Si se mantiene una clave en BD, guardar **solo un hash** y verificar mediante una función `SECURITY DEFINER`, nunca leyendo el campo desde el cliente.

### 3.7 CRÍTICA — XSS persistente vía `configuracion_visual`  🆕
**Descripción:** La configuración visual se inyecta como HTML sin sanitizar, y la tabla que la alimenta admite escritura pública.  
**Evidencia:** `app.js:408-434` `aplicarConfigVisual()` hace `heroTitulo.innerHTML = cfg.hero_titulo` (línea 422) y `contenido.innerHTML = val` para las zonas publicitarias (línea 429). Estos valores provienen de `configuracion_visual`, cuya RLS es `INSERT/UPDATE public`. `aplicarConfig()` (`admin.js:461-497`) los persiste con la `anon key`.  
**Impacto:** Un atacante anónimo escribe un payload (ej. `ad_zona1 = <img src=x onerror=...>`) y **todos** los visitantes del sitio ejecutan ese JavaScript: robo de sesiones, redirección, desfiguración persistente.  
**Recomendación:** Restringir la escritura de `configuracion_visual` al rol admin (RLS) y sanitizar/escapar en el cliente (evitar `innerHTML`; usar `textContent`, o una allowlist para los banners de imagen ya que `ad_zona*` se arma con `<img src>`).

### 3.8 CRÍTICA — Credenciales de participante legibles con la anon key  🆕
**Descripción:** El "código de un solo uso" funciona como contraseña de acceso, pero se almacena en `participantes` y esa tabla es `SELECT public`.  
**Evidencia:** El login (`app.js:489-517`) valida `email + codigo` contra `participantes`. Como la RLS es `SELECT public`, cualquiera puede ejecutar `sbClient.from('participantes').select('email,codigo')` y obtener las credenciales de **todas** las cuentas, tomando control de cualquier quiniela.  
**Impacto:** Robo masivo de cuentas y de datos personales (nombre, correo, teléfono) — además es un incidente de privacidad.  
**Recomendación:** No exponer `codigo` (ni datos personales) en `SELECT public`. El ranking solo necesita `alias` y `puntos` → exponer eso mediante una **vista** pública restringida, y mover el login a una función `SECURITY DEFINER` (o a Supabase Auth). Combinar con 3.4.

### 3.9 ALTA — `configuracion` escribible y `admin_password` legible públicamente  🆕
**Descripción:** La tabla `configuracion` admite `UPDATE/INSERT public` y contiene `admin_password`, fechas de cierre y `permitir_edicion`.  
**Impacto:** Un anónimo puede (a) leer la clave admin, (b) reabrir o cerrar la quiniela cambiando `permitir_edicion`/`fecha_cierre`, anulando el control de integridad de las rondas.  
**Recomendación:** RLS de `configuracion` solo lectura de campos no sensibles (o ninguna), escritura solo para rol admin; nunca exponer `admin_password` por `SELECT`.

### 3.10 ALTA — `resultados_reales` escribible públicamente  🆕
**Descripción:** RLS `INSERT/UPDATE/DELETE public`. Los puntos de todos los participantes se calculan a partir de esta tabla.  
**Impacto:** Cualquiera puede inyectar resultados falsos y reescribir por completo el ranking y, por ende, quién gana los premios.  
**Recomendación:** Escritura de `resultados_reales` exclusiva para rol admin vía RLS.

### 3.11 ALTA — Borrado público de datos  🆕
**Descripción:** `codigos_participante` es `DELETE public` y `borrarParticipante()` (`app.js:2168-2179`) borra `quinielas` y `participantes` con la `anon key`.  
**Impacto:** Un anónimo puede vaciar códigos, participantes y predicciones (pérdida de datos / denegación de servicio).  
**Recomendación:** `DELETE` restringido a rol admin en todas las tablas.

---

## 4. Controles de Seguridad Implementados

### 4.1 Control de acceso
- ✅ Registro controlado por códigos de un solo uso
- ✅ Códigos marcados como `usado=true` al registrarse
- ✅ Panel admin protegido por contraseña almacenada en Supabase
- ✅ Sesión admin expira al cerrar el navegador
- ✅ Admin separado en URL diferente (`/admin.html`)

### 4.2 Integridad de datos
- ✅ Fechas de cierre por ronda (grupos, R32, R16, QF, SF, Final)
- ✅ UI bloqueada después del cierre (botones deshabilitados)
- ✅ Códigos únicos con constraint UNIQUE en base de datos

### 4.3 Configuración
- ✅ Configuración visual en Supabase (no en código)
- ❌ ~~Password de admin en Supabase (no hardcodeado)~~ — **incorrecto:** está hardcodeado en `app.js`/`admin.js` y en texto plano en BD (ver 3.6)
- ⚠️ RLS habilitado en todas las tablas — pero con políticas `public` en casi todas las operaciones, lo que equivale a *no* tener control de acceso real (ver 3.1, 3.7–3.11)

### 4.4 Datos sensibles
- ✅ No se almacenan contraseñas de usuarios (solo códigos)
- ✅ No se procesa información financiera
- ✅ Datos personales mínimos: nombre, alias, correo, teléfono

---

## 5. Datos Almacenados

| Dato | Tabla | Sensibilidad | Necesario |
|---|---|---|---|
| Nombre completo | participantes | Media | Sí |
| Alias público | participantes | Baja | Sí |
| Correo electrónico | participantes | Media | Sí |
| Teléfono | participantes | Media | Opcional |
| Predicciones | quinielas | Baja | Sí |
| Bracket | quinielas | Baja | Sí |
| País goleador | quinielas | Baja | Sí |

**No se almacena:** contraseñas, datos bancarios, documentos de identidad, ubicación.

---

## 6. Cambios críticos antes del lanzamiento (con estimado de tiempo)

Ordenados por prioridad. Los tiempos son de esfuerzo de desarrollo + prueba para un dev familiarizado con el stack.

| # | Cambio | Vulns que cierra | Esfuerzo |
|---|---|---|---|
| 1 | **Endurecer RLS de todas las tablas** y canalizar escrituras (quinielas, configuracion, resultados_reales, codigos) por funciones `SECURITY DEFINER` / rol admin. Revocar `INSERT/UPDATE/DELETE public`. | 3.1, 3.9, 3.10, 3.11 | **4–6 h** |
| 2 | **Quitar la contraseña admin del frontend**; mover el admin a Supabase Auth (rol) o, como mínimo, guardar solo un *hash* y verificar vía RPC `SECURITY DEFINER`. | 3.6 | **2–3 h** |
| 3 | **Cerrar `SELECT` de `participantes`/`configuracion`**: exponer el ranking por una vista (`alias`, `puntos`) y mover el login a una RPC que valide credenciales server-side. | 3.8, 3.9 | **3 h** |
| 4 | **Eliminar inyección por `innerHTML`** en `aplicarConfigVisual` (sanitizar / allowlist para banners) y restringir escritura de `configuracion_visual` a admin. | 3.7 | **2 h** |
| 5 | **Proxy de la API football-data.org** vía Supabase Edge Function; quitar la key del cliente. | 3.2 | **2 h** |
| 6 | **Rate limiting** en el login admin (bloqueo tras N intentos) + en registro. | 3.3, 3.4 | **1–2 h** |
| 7 | **Validación server-side** (triggers de rango de goles y fecha de cierre) en `quinielas`/`resultados_reales`. | 3.5 | **2 h** |

**Total estimado:** ~16–20 h. Los puntos **1, 2, 3 y 4 son bloqueantes** para cualquier lanzamiento (incluso corporativo cerrado); 5–7 son requisitos para lanzamiento público.

> **Nota de arquitectura:** el fix #1 y #3 son mucho más sencillos si primero se adopta **Supabase Auth** (hoy listado como pendiente para la versión SaaS). Sin Auth, la única forma robusta de restringir la escritura por dueño es a través de funciones `SECURITY DEFINER` que validen el secreto del participante. El archivo `sql/quinielas_rls.sql` implementa el fix #1 para `quinielas` en ambas variantes.

---

## 7. Archivos del Proyecto

| Archivo | Descripción | Líneas |
|---|---|---|
| `index.html` | Frontend público — registro, predicciones, ranking | ~750 |
| `app.js` | Lógica principal — partidos, bracket, Supabase | ~2300 |
| `admin.html` | Panel de administración | ~400 |
| `admin.js` | Lógica admin — resultados, backup, configuración | ~650 |

---

## 8. Infraestructura

| Servicio | Plan | Uso |
|---|---|---|
| GitHub Pages | Gratuito | Hosting frontend estático |
| Supabase | Gratuito | Base de datos PostgreSQL + API |
| football-data.org | Gratuito | API resultados del Mundial |

---

*Documento generado para auditoría de seguridad interna — Business IT Panama / Tecology — Mayo 2026.*
*Revisado y verificado contra el código fuente real en Junio 2026.*
