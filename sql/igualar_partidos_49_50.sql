-- =====================================================================
-- Quiniela FIFA 2026 — Igualar predicciones de 2 partidos para TODOS
-- =====================================================================
-- Motivo: algunos jugadores hicieron trampa en los partidos #49 y #50
-- (24-jun). Para neutralizar la ventaja, se pone a TODOS la misma
-- predicción (el resultado oficial), de modo que todos sumen los mismos
-- puntos (acierto exacto en ambos = 5+5 = 10 pts).
--
--   #49  Suiza 2 - 1 Canadá
--   #50  Bosnia-Herzegovina 3 - 1 Qatar
--
-- Ejecutar TODO el bloque en Supabase → SQL Editor.
-- El puntaje se recalcula solo (el ranking se calcula en vivo en la app).
-- =====================================================================

-- 1) RESPALDO (por si hay que revertir). Copia exacta de la tabla.
create table if not exists public.quinielas_backup_20260625 as
  select * from public.quinielas;

-- 2) Igualar las predicciones de los partidos 49 y 50 para TODOS los jugadores.
set session sql_safe_updates = off;

update public.quinielas
set predicciones = jsonb_set(
                     jsonb_set(
                       coalesce(predicciones, '{}'::jsonb),
                       '{49}', '{"l":2,"v":1}'::jsonb, true),
                     '{50}', '{"l":3,"v":1}'::jsonb, true)
where participante_id is not null;

-- 3) VERIFICAR — todos deben mostrar {"l":2,"v":1} y {"l":3,"v":1}.
select participante_id,
       predicciones->'49' as partido_49,
       predicciones->'50' as partido_50
from public.quinielas
order by participante_id;

-- =====================================================================
-- REVERTIR (solo si fuese necesario):
--   update public.quinielas q
--   set predicciones = b.predicciones
--   from public.quinielas_backup_20260625 b
--   where q.participante_id = b.participante_id;
-- =====================================================================
