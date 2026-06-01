# Mensaje de inicio — Auditoría y puesta al día desde Claude Code

## Copia y pega esto al abrir Claude Code con el repositorio:

---

Hola Claude. Necesito que te pongas al día con este proyecto y hagas una auditoría de seguridad completa.

**Paso 1 — Lee el contexto del proyecto**
Lee el archivo `CLAUDE.md` en la raíz del repositorio. Contiene todo el contexto técnico del proyecto.

**Paso 2 — Revisa el código actual**
Revisa los 4 archivos principales del proyecto:
- `index.html` — frontend público
- `app.js` — lógica principal
- `admin.html` — panel de administración
- `admin.js` — lógica del admin

Para cada archivo necesito que identifiques:
1. Qué hace cada sección principal
2. Dependencias entre archivos
3. Llamadas a Supabase y cómo se manejan

**Paso 3 — Auditoría de seguridad**
Con base en el código revisado, genera un reporte que incluya:
1. Vulnerabilidades encontradas (clasificadas por severidad: ALTA / MEDIA / BAJA)
2. Datos expuestos en el frontend (credenciales, API keys, etc.)
3. Políticas RLS de Supabase y si son suficientes
4. Control de acceso — admin y participantes
5. Validación de datos — frontend vs server-side
6. Recomendaciones prioritarias antes del lanzamiento

**Contexto adicional:**
- Es una quiniela del Mundial FIFA 2026 para uso corporativo B2B (Business IT Panama)
- Los participantes acceden con códigos de un solo uso (formato BIT-XXXXX)
- El admin tiene su propio panel protegido con password en Supabase
- El backend es Supabase (PostgreSQL + RLS) — no hay servidor propio
- Hosting en GitHub Pages — código 100% visible al público
- Ya existe una auditoría previa en `AUDITORIA_SEGURIDAD.md` — compara y actualiza

**Al terminar necesito:**
- Reporte de auditoría actualizado
- Lista de cambios críticos a hacer antes del lanzamiento
- Estimado de esfuerzo para cada fix

¿Listo para empezar?

---
