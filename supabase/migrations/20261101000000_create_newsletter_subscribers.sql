create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique check (email = lower(email)),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  consent_at timestamptz not null,
  confirmed_at timestamptz,
  consent_text_version text not null,
  signup_source text not null,
  confirmation_token_hash text,
  confirmation_token_expires_at timestamptz,
  confirmation_sent_at timestamptz,
  unsubscribe_token_hash text not null,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_confirmation_token_hash_idx
  on public.newsletter_subscribers (confirmation_token_hash)
  where confirmation_token_hash is not null;

create unique index if not exists newsletter_subscribers_unsubscribe_token_hash_idx
  on public.newsletter_subscribers (unsubscribe_token_hash);

create table if not exists public.newsletter_rate_limits (
  key_hash text primary key,
  request_count integer not null default 0 check (request_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.consume_newsletter_rate_limit(
  p_key_hash text,
  p_limit integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  request_allowed boolean;
begin
  if char_length(p_key_hash) <> 64 or p_limit < 1 then
    raise exception 'Invalid newsletter rate limit input';
  end if;

  delete from public.newsletter_rate_limits
  where updated_at < now() - interval '1 day';

  insert into public.newsletter_rate_limits (key_hash, request_count)
  values (p_key_hash, 1)
  on conflict (key_hash) do update
    set request_count = public.newsletter_rate_limits.request_count + 1,
        updated_at = now()
    where public.newsletter_rate_limits.request_count < p_limit
  returning true into request_allowed;

  return coalesce(request_allowed, false);
end;
$$;

create or replace function public.set_newsletter_subscribers_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists newsletter_subscribers_updated_at on public.newsletter_subscribers;
create trigger newsletter_subscribers_updated_at
before update on public.newsletter_subscribers
for each row
execute function public.set_newsletter_subscribers_updated_at();

alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_rate_limits enable row level security;

revoke all on table public.newsletter_subscribers from anon, authenticated;
revoke all on table public.newsletter_rate_limits from anon, authenticated;
grant all on table public.newsletter_subscribers to service_role;
grant all on table public.newsletter_rate_limits to service_role;
revoke all on function public.consume_newsletter_rate_limit(text, integer) from public;
grant execute on function public.consume_newsletter_rate_limit(text, integer) to service_role;
