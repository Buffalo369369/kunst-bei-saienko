insert into public.artworks (
  slug,
  title,
  price,
  image,
  status,
  description,
  exhibition
)
values
  (
    'verschmelzung-von-formen',
    'Verschmelzung von Formen',
    '250 €',
    '/images/fb-1.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'einfach-und-komplex',
    'Einfach und komplex',
    '250 €',
    '/images/fb-2.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'standards-unterschiede',
    'Standards-unterschiede',
    '250 €',
    '/images/fb-3.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'sonnentanz',
    'Sonnentanz',
    '200 €',
    '/images/fb-4.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'kontinentale-kontraste',
    'Kontinentale Kontraste',
    '200 €',
    '/images/fb-5.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'lichtspiel',
    'Lichtspiel',
    '200 €',
    '/images/fb-6.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'globale-harmonie',
    'Globale Harmonie',
    '200 €',
    '/images/fb-7.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'herbstliches-licht',
    'Herbstliches Licht',
    '200 €',
    '/images/fb-8.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  ),
  (
    'tiefsee-echo',
    'Tiefsee-Echo',
    '200 €',
    '/images/fb-9.jpg',
    'Verfügbar',
    '',
    'farben-der-welt'
  )
on conflict (slug) do update
set
  title = excluded.title,
  price = excluded.price,
  image = excluded.image,
  status = excluded.status,
  description = excluded.description,
  exhibition = excluded.exhibition;
