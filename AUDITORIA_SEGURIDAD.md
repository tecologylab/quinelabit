# Auditoría de Seguridad — Quiniela FIFA 2026
## Business IT Panama / Tecology
**Fecha:** Mayo 2026  
**URL:** https://tecologylab.github.io/quinelabit  
**Repositorio:** https://github.com/tecologylab/quinelabit

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
| Participantes | Código alfanumérico único (BIT-XXXXX) | ✅ Implementado |
| Admin | Password verificado contra Supabase | ✅ Implementado |
| Sesión admin | `sessionStorage` (expira al cerrar tab) | ✅ Implementado |
| Participante SaaS (futuro) | Supabase Auth email+password | 🔄 Pendiente |

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
| football-data.org API Key | API key | Frontend JS | **Medio** — podría ser usada por terceros |
| Admin Password | Hash en Supabase | No expuesto | Bajo |

---

## 3. Vulnerabilidades Identificadas

### 3.1 ALTA — Sin restricción de escritura por usuario
**Descripción:** Cualquier participante autenticado puede modificar las predicciones de otro participante si conoce su `participante_id`.  
**Causa:** Las políticas RLS de `quinielas` permiten UPDATE sin verificar que el `participante_id` corresponda al usuario actual.  
**Impacto:** Un participante malintencionado podría alterar predicciones de otros.  
**Recomendación:** Implementar Supabase Auth y agregar política RLS: `USING (auth.uid() = user_id)`.

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
- ✅ Password de admin en Supabase (no hardcodeado)
- ✅ RLS habilitado en todas las tablas

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

## 6. Recomendaciones Prioritarias

1. **Crítico para producción:** Implementar política RLS que restrinja UPDATE en `quinielas` al participante dueño del registro.
2. **Antes del lanzamiento público:** Mover la API key de football-data.org a Supabase Edge Function.
3. **Mejora recomendada:** Agregar rate limiting en el login del admin (máx 5 intentos).
4. **Para la versión SaaS:** Migrar a Supabase Auth para autenticación robusta por usuario.

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

*Documento generado para auditoría de seguridad interna — Business IT Panama / Tecology — Mayo 2026*
