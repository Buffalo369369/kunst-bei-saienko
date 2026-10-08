-- Safe, additive migration for generic reservation support across artworks and shop bags.
-- This does not run automatically in the app; it must be applied in Supabase SQL editor.

BEGIN;

alter table public.artworks
  add column if not exists product_type text;

update public.artworks
set product_type = 'artwork'
where product_type is null;

alter table public.artworks
  alter column product_type set default 'artwork';

alter table public.artworks
  alter column product_type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where c.conname = 'artworks_product_type_check'
      and n.nspname = 'public'
      and t.relname = 'artworks'
  ) then
    alter table public.artworks
      add constraint artworks_product_type_check
      check (product_type in ('artwork', 'shop'));
  end if;
end $$;

alter table public.reservations
  add column if not exists product_type text;

update public.reservations
set product_type = 'artwork'
where product_type is null;

alter table public.reservations
  alter column product_type set default 'artwork';

alter table public.reservations
  alter column product_type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where c.conname = 'reservations_product_type_check'
      and n.nspname = 'public'
      and t.relname = 'reservations'
  ) then
    alter table public.reservations
      add constraint reservations_product_type_check
      check (product_type in ('artwork', 'shop'));
  end if;
end $$;

insert into public.artworks (
  slug,
  title,
  price,
  image,
  status,
  description,
  exhibition,
  product_type,
  reserved_until
)
values
  (
    'handbemalte-tasche-1',
    'Handbemalte Tasche 01',
    '50 €',
    '/images/bag-10.jpg',
    'Verfügbar',
    '',
    'shop',
    'shop',
    null
  ),
  (
    'handbemalte-tasche-2',
    'Handbemalte Tasche 02',
    '50 €',
    '/images/bag-20.jpg',
    'Verfügbar',
    '',
    'shop',
    'shop',
    null
  ),
  (
    'handbemalte-tasche-3',
    'Handbemalte Tasche 03',
    '50 €',
    '/images/bag-30.jpg',
    'Verfügbar',
    '',
    'shop',
    'shop',
    null
  ),
  (
    'handbemalte-tasche-4',
    'Handbemalte Tasche 04',
    '50 €',
    '/images/bag-40.jpg',
    'Verfügbar',
    '',
    'shop',
    'shop',
    null
  ),
  (
    'handbemalte-tasche-5',
    'Handbemalte Tasche 05',
    '50 €',
    '/images/bag-50.jpg',
    'Verfügbar',
    '',
    'shop',
    'shop',
    null
  )
on conflict (slug) do update
set
  title = excluded.title,
  price = excluded.price,
  image = excluded.image,
  description = excluded.description,
  exhibition = excluded.exhibition,
  product_type = excluded.product_type;

create or replace function public.reserve_product(
  p_artwork_slug text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_message text,
  p_product_type text default 'artwork'
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_type text := lower(coalesce(p_product_type, 'artwork'));
  v_item public.artworks%rowtype;
begin
  if v_type not in ('artwork', 'shop') then
    v_type := 'artwork';
  end if;

  update public.artworks
  set
    status = 'Reserviert',
    reserved_until = now() + interval '24 hours'
  where slug = p_artwork_slug
    and product_type = v_type
    and (
      status = 'Verfügbar'
      or (
        status = 'Reserviert'
        and reserved_until is not null
        and reserved_until <= now()
      )
    )
  returning * into v_item;

  if not found then
    if exists (
      select 1
      from public.artworks
      where slug = p_artwork_slug
        and product_type = v_type
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
    message,
    product_type
  )
  values (
    v_item.slug,
    v_item.title,
    p_first_name,
    p_last_name,
    p_email,
    p_phone,
    p_message,
    v_type
  );

  return jsonb_build_object(
    'outcome', 'reserved',
    'id', v_item.id,
    'slug', v_item.slug,
    'title', v_item.title,
    'price', v_item.price,
    'status', v_item.status,
    'reserved_until', v_item.reserved_until,
    'product_type', v_type
  );
end;
$$;

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
begin
  return public.reserve_product(
    p_artwork_slug,
    p_first_name,
    p_last_name,
    p_email,
    p_phone,
    p_message,
    'artwork'
  );
end;
$$;

revoke all on function public.reserve_product(text, text, text, text, text, text, text)
from public;
revoke all on function public.reserve_product(text, text, text, text, text, text, text)
from anon, authenticated;

grant execute on function public.reserve_product(text, text, text, text, text, text, text)
to service_role;

revoke all on function public.reserve_artwork(text, text, text, text, text, text)
from public;
revoke all on function public.reserve_artwork(text, text, text, text, text, text)
from anon, authenticated;

grant execute on function public.reserve_artwork(text, text, text, text, text, text)
to service_role;

COMMIT;
