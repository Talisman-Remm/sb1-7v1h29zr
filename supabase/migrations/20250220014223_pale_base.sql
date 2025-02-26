/*
  # Create contact form submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `service` (text)
      - `company_name` (text)
      - `problem_description` (text)
      - `additional_info` (text)
      - `created_at` (timestamp)
      - `ip_address` (text)
      - `user_agent` (text)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read their own submissions
    - Add policy for anon users to create submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  company_name text NOT NULL,
  problem_description text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

CREATE POLICY "Anyone can create submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);