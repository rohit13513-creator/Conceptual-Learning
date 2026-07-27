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

-- 3. HOMEWORK SUBMISSIONS — new, for the upload + auto-check feature
create table homework_submissions (
  id uuid primary key default gen_random_uuid(),
  student_email text not null references users(email),
  file_path text not null,                  -- path inside Supabase Storage bucket
  subject text,
  submitted_at timestamptz not null default now(),
  status text not null default 'pending',   -- pending | checked | reviewed
  ai_score numeric,
  ai_feedback text,
  admin_notes text
);

-- 4. ANNOUNCEMENTS — new, for the admin "push updates" feature
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  created_by text not null,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index idx_homework_student on homework_submissions(student_email);
create index idx_users_status on users(status);
