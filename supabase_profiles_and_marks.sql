-- Run once in Supabase: SQL Editor > New query > paste > Run. Safe to run more than once.
-- Adds the new profile fields (city, school, ambition, privacy choices) and the school-marks table.
-- The website keeps working before and after; the new profile options and the School Marks section switch on
-- as soon as this has been run.

alter table users add column if not exists city text;
alter table users add column if not exists school text;
alter table users add column if not exists ambition text;
-- Which parts of the profile the student chooses to show to other students, e.g. {"city": true, "school": false}
alter table users add column if not exists profile_visibility jsonb not null default '{}'::jsonb;

create table if not exists school_marks (
  id uuid primary key default gen_random_uuid(),
  student_email text not null references users(email) on update cascade on delete cascade,
  academic_year text not null,          -- e.g. 2026-27
  exam_name text not null,              -- PT1, PT2, Half Yearly, PT3, PT4, Final Exam, or a name the student types
  subject text not null,
  marks_obtained numeric not null check (marks_obtained >= 0),
  max_marks numeric not null check (max_marks > 0),
  exam_date date,
  student_class text,                   -- the student's class when the marks were entered (taken automatically)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (marks_obtained <= max_marks),
  unique (student_email, academic_year, exam_name, subject)
);
create index if not exists idx_school_marks_student on school_marks(student_email);

-- Same protection as every other table: nobody can read it with the public database keys.
alter table school_marks enable row level security;

-- Check: should show the 4 new columns and the new table.
select column_name from information_schema.columns where table_name = 'users' and column_name in ('city', 'school', 'ambition', 'profile_visibility');
select count(*) as school_marks_rows from school_marks;
