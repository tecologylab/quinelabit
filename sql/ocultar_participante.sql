-- =====================================================================
-- Quiniela FIFA 2026 — Ocultar participantes del ranking (usuarios de prueba)
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor.
-- Agrega un campo `oculto`: si es true, el participante NO aparece en el
-- ranking público (pero sigue calculando puntos y puede jugar normal).
-- =====================================================================

alter table public.participantes add column if not exists oculto boolean default false;

-- El admin alterna oculto/visible con un UPDATE (la app usa solo la anon key)
drop policy if exists "p_update" on public.participantes;
create policy "p_update" on public.participantes
  for update to anon
  using (true);

notify pgrst, 'reload schema';

-- Opcional: ocultar un usuario de prueba directamente por su alias o email
-- update public.participantes set oculto = true where alias = 'TU_ALIAS_DE_PRUEBA';
