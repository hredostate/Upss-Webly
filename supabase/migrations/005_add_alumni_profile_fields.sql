-- Add new fields to alumni_profiles table
-- name_while_enrolled: Capture the full name the student used while attending UPSS
-- school_nickname: Capture any nickname the alumni was known by during their time at UPSS

ALTER TABLE alumni_profiles 
ADD COLUMN IF NOT EXISTS name_while_enrolled VARCHAR(200),
ADD COLUMN IF NOT EXISTS school_nickname VARCHAR(100);
