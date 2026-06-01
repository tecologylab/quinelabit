-- =====================================================================
-- Quiniela FIFA 2026 — Políticas RLS / esquema para guardar QUINIELAS
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor SOLO si el autoguardado de predicciones
-- reporta "No se guardó (revisa políticas INSERT/UPDATE de quinielas...)".
--
-- El guardado usa upsert con onConflict=participante_id, así que:
--   - participante_id necesita un índice ÚNICO
--   - anon necesita políticas de SELECT (ranking/login) + INSERT + UPDATE
-- =====================================================================

-- Índice único para el upsert (onConflict=participante_id)
create unique index if not exists quinielas_participante_id_key
  on public.quinielas(participante_id);

-- Lectura (ranking en vivo + login leen quinielas)
drop policy if exists "leer_quinielas" on public.quinielas;
create policy "leer_quinielas" on public.quinielas
  for select to anon using (true);

-- Crear quiniela (primer guardado de un participante)
drop policy if exists "crear_quinielas" on public.quinielas;
create policy "crear_quinielas" on public.quinielas
  for insert to anon with check (true);

-- Actualizar quiniela (guardados siguientes / autoguardado)
drop policy if exists "actualizar_quinielas" on public.quinielas;
create policy "actualizar_quinielas" on public.quinielas
  for update to anon using (true);

notify pgrst, 'reload schema';
