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
  created_at timestamptz not null default now(),
  photo_url text,                           -- profile photo, public URL in the "avatars" bucket
  date_of_birth date,
  bio text,
  favorite_subject text,
  hobbies text
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

-- 6. FORUM THREADS — one shared forum, visible to all classes and the admin.
-- Student posts start "pending" and only appear to everyone once an admin approves them;
-- admin's own posts are auto-approved. The author can always see their own pending post.
create table forum_threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  author_email text not null,
  author_name text not null,
  image_url text,                           -- optional photo, public URL in the "forum" bucket
  status text not null default 'pending',   -- pending | approved
  created_at timestamptz not null default now()
);

-- 7. FORUM REPLIES
create table forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references forum_threads(id) on delete cascade,
  body text not null,
  author_email text not null,
  author_name text not null,
  image_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index idx_homework_student on homework_submissions(student_email);
create index idx_users_status on users(status);
create index idx_forum_replies_thread on forum_replies(thread_id);
