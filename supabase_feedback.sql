-- Run once in Supabase: SQL Editor > New query > paste > Run. Safe to run more than once.
-- Creates the place where students' complaints, feedback and testimonials are kept, so they also show on your admin page.
-- Until it is run, everything students send is still e-mailed to you; it just is not kept in the list on the admin page.
create table if not exists student_feedback (
  id uuid primary key default gen_random_uuid(),
  student_email text not null,
  student_name text,
  student_class text,
  kind text not null default 'feedback',        -- complaint | feedback | testimonial
  rating integer check (rating between 1 and 5), -- stars: only a testimonial has them
  message text,
  allow_public boolean not null default false,   -- the student agreed that the words may be shown as a testimonial
  is_read boolean not null default false,
  show_on_home boolean not null default false,   -- the admin approved this 5-star testimonial for the first page
  created_at timestamptz not null default now()
);
-- If an earlier version of this script was already run, bring the table up to date:
alter table student_feedback add column if not exists kind text not null default 'feedback';
alter table student_feedback alter column rating drop not null;
alter table student_feedback add column if not exists show_on_home boolean not null default false;
create index if not exists student_feedback_created_idx on student_feedback (created_at desc);
alter table student_feedback enable row level security;  -- same protection as every other table: only the server can read it

-- Check: should show the columns kind, rating and show_on_home.
select column_name, is_nullable from information_schema.columns where table_name = 'student_feedback' and column_name in ('kind', 'rating', 'show_on_home');
