-- Run once in Supabase: SQL Editor > New query > paste > Run. Safe to run more than once.
-- Adds the "State" field to student profiles. Until it is run, everything else keeps working and State simply is not saved.
alter table users add column if not exists state text;

-- Check: should show one row with the word state.
select column_name from information_schema.columns where table_name = 'users' and column_name = 'state';
