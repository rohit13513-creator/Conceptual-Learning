-- Run once in Supabase: SQL Editor > New query > paste > Run. Safe to run more than once.
-- Adds the columns that record whether a school mark has been checked against the student's result page or test copy.
-- Needs supabase_profiles_and_marks.sql to have been run first (it creates the school_marks table).

alter table school_marks add column if not exists verification_status text not null default 'unverified'; -- unverified | verified | mismatch | review
alter table school_marks add column if not exists verification_note text;
alter table school_marks add column if not exists verified_at timestamptz;
alter table school_marks add column if not exists proof_paths text[];   -- private storage paths of the uploaded result page / test copy

-- Check: should list the 4 new columns.
select column_name from information_schema.columns where table_name = 'school_marks' and column_name in ('verification_status', 'verification_note', 'verified_at', 'proof_paths');
