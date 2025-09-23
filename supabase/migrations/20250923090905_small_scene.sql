/*
  # Add Eligibility Fields to Users Table

  1. New Columns
    - Add eligibility-related fields to users table
    - Store eligibility responses for compliance tracking

  2. Security
    - Maintain existing RLS policies
    - No changes to security model
*/

-- Add eligibility fields to users table
DO $$
BEGIN
  -- Add age eligibility field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'age_range'
  ) THEN
    ALTER TABLE users ADD COLUMN age_range text;
  END IF;

  -- Add job status field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'job_status'
  ) THEN
    ALTER TABLE users ADD COLUMN job_status text;
  END IF;

  -- Add education status field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'education_status'
  ) THEN
    ALTER TABLE users ADD COLUMN education_status text;
  END IF;

  -- Add family income field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'family_income'
  ) THEN
    ALTER TABLE users ADD COLUMN family_income text;
  END IF;

  -- Add government job field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'govt_job_status'
  ) THEN
    ALTER TABLE users ADD COLUMN govt_job_status text;
  END IF;

  -- Add eligibility confirmation field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'eligibility_confirmed'
  ) THEN
    ALTER TABLE users ADD COLUMN eligibility_confirmed boolean DEFAULT false;
  END IF;

  -- Add profile completion fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'bio'
  ) THEN
    ALTER TABLE users ADD COLUMN bio text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'skills'
  ) THEN
    ALTER TABLE users ADD COLUMN skills text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'location'
  ) THEN
    ALTER TABLE users ADD COLUMN location text;
  END IF;
END $$;

-- Create user_documents table for file uploads
CREATE TABLE IF NOT EXISTS user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('resume', 'cover-letter', 'certificate', 'other')),
  file_url text NOT NULL,
  file_size integer,
  upload_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create user_projects table
CREATE TABLE IF NOT EXISTS user_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  start_date date,
  end_date date,
  project_url text,
  github_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_work_experience table
CREATE TABLE IF NOT EXISTS user_work_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  company text NOT NULL,
  position text NOT NULL,
  start_date date,
  end_date date,
  description text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_work_experience ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for new tables
CREATE POLICY "Users can manage own documents"
  ON user_documents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own projects"
  ON user_projects
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own work experience"
  ON user_work_experience
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_projects_user_id ON user_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_user_work_experience_user_id ON user_work_experience(user_id);

-- Add triggers for updated_at on new tables
CREATE TRIGGER update_user_projects_updated_at 
  BEFORE UPDATE ON user_projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_work_experience_updated_at 
  BEFORE UPDATE ON user_work_experience 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();