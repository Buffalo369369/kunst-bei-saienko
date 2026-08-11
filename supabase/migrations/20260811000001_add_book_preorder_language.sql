alter table public.book_preorders
add column if not exists language text;

update public.book_preorders
set language = 'de'
where language is null;

alter table public.book_preorders
alter column language set default 'de';

alter table public.book_preorders
alter column language set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'book_preorders_language_check'
      and conrelid = 'public.book_preorders'::regclass
  ) then
    alter table public.book_preorders
    add constraint book_preorders_language_check
    check (language in ('de', 'uk'));
  end if;
end;
$$;
