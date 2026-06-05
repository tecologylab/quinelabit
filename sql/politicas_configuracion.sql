-- =====================================================================
-- Quiniela FIFA 2026 — Políticas RLS para guardar la CONFIGURACIÓN del torneo
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor SI al "Guardar configuración" en el admin
-- sale: "No se guardó: falta política UPDATE/INSERT en configuracion (RLS)".
--
-- SÍNTOMA
-- Pusiste "Permitir edición: No" o una fecha de cierre pasada, pero el sitio
-- sigue dejando editar/registrar. Causa: la tabla `configuracion` tiene RLS
-- sin permiso de escritura para anon, así que el guardado no persiste y el
-- sitio público lee la config vieja (abierta).
-- =====================================================================

-- Columna propia para el cierre de la 1era ronda (grupos), separada del
-- cierre global `fecha_cierre`. Sin esto, cerrar la 1era ronda cerraba TODO
-- porque compartían la misma columna.
alter table public.configuracion add column if not exists fecha_cierre_grupos timestamptz;

-- Lectura (el sitio público lee la config para saber si está cerrada)
drop policy if exists "leer_configuracion" on public.configuracion;
create policy "leer_configuracion" on public.configuracion
  for select to anon using (true);

-- Crear (primera vez)
drop policy if exists "crear_configuracion" on public.configuracion;
create policy "crear_configuracion" on public.configuracion
  for insert to anon with check (true);

-- Actualizar (guardar cambios de cierre / permitir_edicion / contraseña)
drop policy if exists "actualizar_configuracion" on public.configuracion;
create policy "actualizar_configuracion" on public.configuracion
  for update to anon using (true);

notify pgrst, 'reload schema';
