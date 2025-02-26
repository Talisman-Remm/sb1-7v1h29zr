/*
  # Create Submit table for simplified submissions

  1. New Tables
    - `submit`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `service` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `submit` table
    - Add policy for anonymous submissions
*/

CREATE TABLE IF NOT EXISTS submit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create submissions"
  ON submit
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON submit
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');