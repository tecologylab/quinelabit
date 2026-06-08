-- =====================================================================
-- Quiniela FIFA 2026 — Contraseña de admin con HASH + verificación por RPC
-- =====================================================================
-- Ejecutar en Supabase → SQL Editor.
-- Quita el texto plano de la contraseña: se guarda solo un hash bcrypt y la
-- verificación se hace en el servidor con una función SECURITY DEFINER, así
-- el frontend nunca necesita leer ni traer la contraseña.
-- (Auditoría hallazgo 3.6 / Fase 2-A.)
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- 1) Hashear la contraseña ACTUAL en su lugar (sea 'BIT2026ADMIN' u otra que
--    hayas puesto). Idempotente: si ya está hasheada (bcrypt empieza con $2), no la toca.
--    En Supabase pgcrypto vive en el schema `extensions`, por eso se califica.
update public.configuracion
  set admin_password = extensions.crypt(coalesce(nullif(admin_password,''),'BIT2026ADMIN'), extensions.gen_salt('bf'))
  where admin_password is null or admin_password not like '$2%';

-- 2) Verificar contraseña (no devuelve el hash, solo true/false)
create or replace function public.verificar_admin(p_pass text)
  returns boolean
  language sql
  security definer
  set search_path = public, extensions
as $$
  select exists(
    select 1 from public.configuracion
    where admin_password = extensions.crypt(p_pass, admin_password)
  );
$$;
grant execute on function public.verificar_admin(text) to anon;

-- 3) Cambiar contraseña (requiere la actual; impide que un anónimo la resetee)
create or replace function public.cambiar_admin_password(p_actual text, p_nueva text)
  returns boolean
  language plpgsql
  security definer
  set search_path = public, extensions
as $$
declare ok boolean;
begin
  select exists(
    select 1 from public.configuracion
    where admin_password = extensions.crypt(p_actual, admin_password)
  ) into ok;
  if ok then
    update public.configuracion set admin_password = extensions.crypt(p_nueva, extensions.gen_salt('bf'));
  end if;
  return ok;
end;
$$;
grant execute on function public.cambiar_admin_password(text, text) to anon;

-- =====================================================================
-- OPCIONAL (hardening extra): impedir que anon LEA la columna admin_password.
-- El frontend ya no la lee, pero por defecto la anon key puede hacer SELECT *.
-- Si lo activas, asegúrate de que el frontend seleccione columnas explícitas
-- (no usar select('*') sobre configuracion). Descomenta para aplicar:
--
-- revoke select on public.configuracion from anon;
-- grant select (id, fecha_cierre, fecha_cierre_grupos, fecha_cierre_r32,
--   fecha_cierre_r16, fecha_cierre_qf, fecha_cierre_sf, fecha_cierre_final,
--   permitir_edicion) on public.configuracion to anon;
-- =====================================================================

notify pgrst, 'reload schema';
