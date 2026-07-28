-- ============================================
-- Conceptual Learning Online — Database Schema
-- Run this once in Supabase SQL Editor
-- ============================================

-- 1. USERS — replaces data/db.json "users"
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  password_hash text not null,
  status text not null default 'pending',   -- pending | approved | rejected
  role text not null default 'student',     -- student | admin
  devices jsonb not null default '[]',      -- array of device fingerprints
  created_at timestamptz not null default now()
);

-- 2. INVITE CODES — replaces data/db.json "inviteCodes"
create table invite_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  status text not null default 'active',    -- active | used | disabled
  created_at timestamptz not null default now()
);

-- 3. HOMEWORK ASSIGNMENTS — homework posted by the admin for students to complete
create table homework_assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  subject text,
  target_class text not null default 'All',  -- 'All' | '8th' | '9th' | '10th' | '12th'
  file_path text,                            -- optional reference file/worksheet
  assigned_date date not null default current_date,  -- the day this homework was posted for; cannot be backdated
  deadline timestamptz,                      -- always assigned_date + 1 day, 8:00 PM IST (computed by the server on insert)
  created_at timestamptz not null default now()
);

-- 4. HOMEWORK SUBMISSIONS — student uploads, for the upload + auto-check feature
create table homework_submissions (
  id uuid primary key default gen_random_uuid(),
  student_email text not null references users(email),
  file_path text not null,                  -- path inside Supabase Storage bucket
  subject text,
  submitted_at timestamptz not null default now(),
  status text not null default 'pending',   -- pending | checked | reviewed
  ai_score numeric,
  ai_feedback text,
  admin_notes text,
  assignment_id uuid references homework_assignments(id),
  integrity_flag text                       -- admin-only hint if the submission looks copied, never shown to the student
);

-- 5. ANNOUNCEMENTS — admin "push updates" feature (latest news, CBSE syllabus, etc.)
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  target_class text not null default 'All', -- 'All' | '8th' | '9th' | '10th' | '12th'
  created_by text not null,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index idx_homework_student on homework_submissions(student_email);
create index idx_users_status on users(status);
