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

drop policy if exists "guardar_resultados" on public.resultados_reales;
create policy "guardar_resultados" on public.resultados_reales
  for insert to anon
  with check (true);

drop policy if exists "actualizar_resultados" on public.resultados_reales;
create policy "actualizar_resultados" on public.resultados_reales
  for update to anon
  using (true);
