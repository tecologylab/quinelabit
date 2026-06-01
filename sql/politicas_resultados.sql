-- =====================================================================
-- Quiniela FIFA 2026 — Políticas RLS para guardar RESULTADOS OFICIALES
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor.
--
-- SÍNTOMA
-- En el panel Admin → Resultados, "Guardar en Supabase" decía éxito pero
-- la tabla `resultados_reales` quedaba VACÍA, y el Ranking mostraba 0
-- puntos para todos.
--
-- CAUSA
-- `resultados_reales` tiene RLS activado SIN política de INSERT/UPDATE para
-- el rol `anon`. Supabase no devuelve error: simplemente escribe 0 filas.
-- Sin resultados oficiales guardados, el cálculo de puntos da 0.
--
-- Estas políticas habilitan que el admin guarde resultados (el upsert usa
-- onConflict=partido_idx, por eso se necesitan INSERT y UPDATE).
--
-- TRADEOFF (vuln 3.10 de AUDITORIA_SEGURIDAD.md)
-- `with check (true)` / `using (true)` permiten la escritura a cualquiera
-- con la anon key. Sin Supabase Auth no hay forma de limitarlo "solo al
-- admin" a nivel de BD. Aceptable para la quiniela corporativa cerrada;
-- para la versión SaaS, migrar a Supabase Auth + rol admin.
-- =====================================================================

-- 0) ESQUEMA: la columna `ganador` debe existir.
--    El código guarda en `ganador` el país goleador (partido_idx=0) y el
--    ganador de cada partido del bracket (partido_idx>=1000). Si falta,
--    el guardado falla con:
--    "Could not find the 'ganador' column of 'resultados_reales'".
alter table public.resultados_reales add column if not exists ganador text;

-- Si la tabla fue creada con un esquema viejo, puede tener columnas NOT NULL
-- que el código no llena (p.ej. `resultado`). Las relajamos para no bloquear
-- el guardado. Guardado en bloque DO para que no falle si la columna no existe.
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_name='resultados_reales' and column_name='resultado') then
    alter table public.resultados_reales alter column resultado drop not null;
  end if;
end $$;

-- El upsert del admin usa onConflict=partido_idx, así que partido_idx
-- necesita un índice ÚNICO (la PK de la tabla es `id`, no partido_idx).
create unique index if not exists resultados_reales_partido_idx_key
  on public.resultados_reales(partido_idx);

-- Forzar a PostgREST a recargar el esquema (por si no lo hace solo)
notify pgrst, 'reload schema';

-- 1) Políticas de escritura (el upsert usa onConflict=partido_idx → INSERT+UPDATE)
drop policy if exists "guardar_resultados" on public.resultados_reales;
create policy "guardar_resultados" on public.resultados_reales
  for insert to anon
  with check (true);

drop policy if exists "actualizar_resultados" on public.resultados_reales;
create policy "actualizar_resultados" on public.resultados_reales
  for update to anon
  using (true);

-- El guardado borra los partidos a reescribir antes de reinsertar (evita el
-- upsert/ON CONFLICT que choca con sql_safe_updates), así que necesita DELETE.
drop policy if exists "borrar_resultados" on public.resultados_reales;
create policy "borrar_resultados" on public.resultados_reales
  for delete to anon
  using (true);
