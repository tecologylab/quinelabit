-- =====================================================================
-- Jugadores y su avance en la Ronda de 32 (llaves 73–88 del bracket)
-- Ejecutar en Supabase → SQL Editor y usar "Download CSV".
-- "Lleno" = la llave tiene marcador (gl y gv).
-- =====================================================================

-- 1) TODOS los jugadores con cuántas de las 16 llaves de R32 completaron
--    (los que no llenaron salen primero, con 0).
select
  p.nombre,
  p.alias,
  p.email,
  p.tel,
  p.codigo,
  coalesce((
    select count(*) from generate_series(73,88) bid
    where (q.bracket -> bid::text ->> 'gl') is not null
      and (q.bracket -> bid::text ->> 'gv') is not null
  ), 0) as r32_completas,
  case when q.participante_id is null then 'sin quiniela' else 'con quiniela' end as estado
from public.participantes p
left join public.quinielas q on q.participante_id = p.id
where coalesce(p.oculto, false) = false
order by r32_completas asc, p.nombre;

-- =====================================================================
-- 2) SOLO los que NO llenaron NADA de la R32 (0 de 16):
-- =====================================================================
-- select p.nombre, p.alias, p.email, p.tel, p.codigo
-- from public.participantes p
-- left join public.quinielas q on q.participante_id = p.id
-- where coalesce(p.oculto,false) = false
--   and coalesce((
--     select count(*) from generate_series(73,88) bid
--     where (q.bracket -> bid::text ->> 'gl') is not null
--       and (q.bracket -> bid::text ->> 'gv') is not null
--   ),0) = 0
-- order by p.nombre;

-- =====================================================================
-- 3) Los que la llenaron INCOMPLETA (entre 1 y 15 de 16):
-- =====================================================================
-- select p.nombre, p.alias, p.email,
--   (select count(*) from generate_series(73,88) bid
--     where (q.bracket -> bid::text ->> 'gl') is not null
--       and (q.bracket -> bid::text ->> 'gv') is not null) as r32_completas
-- from public.participantes p
-- join public.quinielas q on q.participante_id = p.id
-- where coalesce(p.oculto,false) = false
--   and (select count(*) from generate_series(73,88) bid
--         where (q.bracket -> bid::text ->> 'gl') is not null
--           and (q.bracket -> bid::text ->> 'gv') is not null) between 1 and 15
-- order by r32_completas asc, p.nombre;
