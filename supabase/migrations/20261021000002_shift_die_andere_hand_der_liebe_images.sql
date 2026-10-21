-- Run this migration manually in the Supabase SQL Editor after review.
-- It updates only image paths for all 31 artworks. Existing artwork fields,
-- including active reservation data, remain unchanged.

begin;

do $$
declare
  artwork_count integer;
begin
  select count(*)
  into artwork_count
  from public.artworks
  where slug ~ '^die-andere-hand-der-liebe-werk-(0[1-9]|[12][0-9]|3[01])$';

  if artwork_count <> 31 then
    raise exception 'Expected all 31 Die andere Hand der Liebe artworks, found %', artwork_count;
  end if;
end;
$$;

with artwork_images (slug, image) as (
  select
    'die-andere-hand-der-liebe-werk-' || lpad(item_number::text, 2, '0'),
    '/images/' || item_number || '.jpg'
  from generate_series(1, 31) as items(item_number)
)
update public.artworks as artwork
set image = artwork_images.image
from artwork_images
where artwork.slug = artwork_images.slug;

commit;
