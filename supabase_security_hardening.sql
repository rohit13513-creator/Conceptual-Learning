-- Security hardening for the live database. Run once in Supabase: SQL Editor > New query > paste > Run.
-- Safe to run more than once. The website never talks to the database directly (only the server does,
-- using the private service key, which ignores these rules), so nothing in the app changes.

-- 1. The two columns the login lockout needs. They were in supabase_schema.sql but were never added to the
--    live database, so "too many wrong passwords locks the account" had never actually worked.
alter table users add column if not exists failed_login_attempts int not null default 0;
alter table users add column if not exists locked_until timestamptz;

-- 2. Turn on row-level security for EVERY table in the public schema, with no policies. With this on, the
--    public (anon / logged-in) database keys can read nothing at all, even if one of them ever leaked.
do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t.tablename);
  end loop;
end $$;

-- 3. Check: every row should show rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' order by tablename;
