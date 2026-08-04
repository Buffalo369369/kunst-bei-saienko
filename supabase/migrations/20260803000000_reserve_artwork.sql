-- Run this migration manually in the Supabase SQL editor after review.
-- It creates an atomic, service-role-only reservation RPC.

create or replace function public.reserve_artwork(
  p_artwork_slug text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_message text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_artwork public.artworks%rowtype;
begin
  update public.artworks
  set
    status = 'Reserviert',
    reserved_until = now() + interval '24 hours'
  where slug = p_artwork_slug
    and (
      status = 'Verfügbar'
      or (
        status = 'Reserviert'
        and reserved_until is not null
        and reserved_until <= now()
      )
    )
  returning * into v_artwork;

  if not found then
    if exists (
      select 1
      from public.artworks
      where slug = p_artwork_slug
    ) then
      return jsonb_build_object('outcome', 'unavailable');
    end if;

    return jsonb_build_object('outcome', 'not_found');
  end if;

  insert into public.reservations (
    artwork_slug,
    artwork_title,
    first_name,
    last_name,
    email,
    phone,
    message
  )
  values (
    v_artwork.slug,
    v_artwork.title,
    p_first_name,
    p_last_name,
    p_email,
    p_phone,
    p_message
  );

  return jsonb_build_object(
    'outcome', 'reserved',
    'id', v_artwork.id,
    'slug', v_artwork.slug,
    'title', v_artwork.title,
    'price', v_artwork.price,
    'status', v_artwork.status,
    'reserved_until', v_artwork.reserved_until
  );
end;
$$;

revoke all on function public.reserve_artwork(text, text, text, text, text, text)
from public;

revoke all on function public.reserve_artwork(text, text, text, text, text, text)
from anon, authenticated;

grant execute on function public.reserve_artwork(text, text, text, text, text, text)
to service_role;
