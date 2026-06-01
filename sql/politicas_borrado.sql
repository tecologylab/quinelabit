-- =====================================================================
-- Quiniela FIFA 2026 — Políticas RLS para el borrado desde el panel admin
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor.
--
-- CONTEXTO
-- El panel admin no podía borrar códigos ni participantes porque las tablas
-- tienen RLS activado SIN política de DELETE para el rol `anon`. En ese caso
-- Supabase no devuelve error: simplemente borra 0 filas. Por eso el panel
-- decía "borrado" sin borrar nada. Estas políticas habilitan el borrado.
--
-- TRADEOFF DE SEGURIDAD (vuln 3.11 de AUDITORIA_SEGURIDAD.md)
-- `using (true)` permite el DELETE a cualquiera con la anon key. Como la app
-- usa solo la anon key (sin Supabase Auth), NO hay forma de restringir el
-- DELETE "solo al admin" a nivel de base de datos. Para una quiniela
-- corporativa cerrada detrás del panel admin es un riesgo aceptado.
-- Para la versión SaaS, migrar a Supabase Auth y usar el rol/owner.
-- =====================================================================

-- 1) Borrar códigos LIBRES (no usados).
--    Protege los códigos ya canjeados por participantes reales: esos NO se
--    pueden borrar. Habilita el botón ✕ individual y "Borrar libres".
drop policy if exists "borrar_codigos_libres" on public.codigos_participante;
create policy "borrar_codigos_libres" on public.codigos_participante
  for delete to anon
  using (usado = false);

-- 2) Borrar la quiniela de un participante (necesario para borrar usuarios).
drop policy if exists "borrar_quinielas" on public.quinielas;
create policy "borrar_quinielas" on public.quinielas
  for delete to anon
  using (true);

-- 3) Borrar participantes (botón ✕ en la pestaña Participantes).
drop policy if exists "borrar_participantes" on public.participantes;
create policy "borrar_participantes" on public.participantes
  for delete to anon
  using (true);

-- =====================================================================
-- LIMPIEZA DE DATOS DE PRUEBA (opcional, ejecutar UNA vez antes de lanzar)
-- El SQL Editor corre con privilegios elevados, así que esto funciona
-- aunque las políticas de arriba no existan. Descomentar para usar:
-- ---------------------------------------------------------------------
-- delete from quinielas;
-- delete from participantes;
-- update codigos_participante set usado = false;   -- libera todos los códigos
-- -- o, si los códigos también eran de prueba:
-- -- delete from codigos_participante;
-- =====================================================================
