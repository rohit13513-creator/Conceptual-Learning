-- Run once in Supabase: SQL Editor > New query > paste > Run. Safe to run more than once.
-- Creates the place where students' feedback and testimonials are kept, so they also show on your admin page.
-- Until it is run, every feedback is still e-mailed to you; it just is not kept in the list on the admin page.
create table if not exists student_feedback (
  id uuid primary key default gen_random_uuid(),
  student_email text not null,
  student_name text,
  student_class text,
  rating integer not null check (rating between 1 and 5),
  message text,
  allow_public boolean not null default false,  -- the student agreed that the words may be shown as a testimonial
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists student_feedback_created_idx on student_feedback (created_at desc);
alter table student_feedback enable row level security;  -- same protection as every other table: only the server can read it

-- Check: should show one row with the name student_feedback.
select table_name from information_schema.tables where table_name = 'student_feedback';
