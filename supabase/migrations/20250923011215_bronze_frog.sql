/*
  # Seed Sample Data for PMIS Portal

  1. Sample Companies
    - Insert major Indian companies across different sectors
  
  2. Sample Internships
    - Create realistic internship opportunities
  
  3. Initial Statistics
    - Set up dashboard statistics
*/

-- Insert sample companies
INSERT INTO companies (id, name, logo, sector, description, website) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Tata Consultancy Services', 'https://via.placeholder.com/60x60/0066cc/ffffff?text=TCS', 'it', 'Leading IT services company', 'https://tcs.com'),
  ('550e8400-e29b-41d4-a716-446655440002', 'HDFC Bank', 'https://via.placeholder.com/60x60/138808/ffffff?text=HDFC', 'banking', 'Premier banking and financial services', 'https://hdfcbank.com'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Mahindra & Mahindra', 'https://via.placeholder.com/60x60/ff9933/ffffff?text=M&M', 'automotive', 'Leading automotive manufacturer', 'https://mahindra.com'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Apollo Hospitals', 'https://via.placeholder.com/60x60/f97316/ffffff?text=Apollo', 'healthcare', 'Healthcare services provider', 'https://apollohospitals.com'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Adani Group', 'https://via.placeholder.com/60x60/0066cc/ffffff?text=Adani', 'energy', 'Diversified conglomerate', 'https://adani.com'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Reliance Retail', 'https://via.placeholder.com/60x60/138808/ffffff?text=RIL', 'retail', 'Retail and consumer goods', 'https://relianceretail.com'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Infosys', 'https://via.placeholder.com/60x60/0066cc/ffffff?text=Infosys', 'it', 'Global IT consulting company', 'https://infosys.com'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Wipro', 'https://via.placeholder.com/60x60/ff9933/ffffff?text=Wipro', 'it', 'IT services and consulting', 'https://wipro.com');

-- Insert sample internships
INSERT INTO internships (
  id, company_id, title, description, location, duration, stipend, sector,
  requirements, application_deadline, start_date, status, max_interns, skills
) VALUES
  (
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Software Development Intern',
    'Work on cutting-edge web applications using React, Node.js, and modern technologies. Gain hands-on experience in full-stack development.',
    'Bangalore',
    12,
    5000,
    'it',
    ARRAY['Basic programming knowledge', 'Graduate/Pursuing graduation'],
    '2024-12-15 23:59:59+00',
    '2024-01-15 00:00:00+00',
    'active',
    50,
    ARRAY['React', 'JavaScript', 'Node.js']
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440002',
    'Digital Marketing Intern',
    'Learn digital marketing strategies, social media management, and campaign analytics in the banking sector.',
    'Mumbai',
    12,
    5000,
    'banking',
    ARRAY['MBA/BBA preferred', 'Good communication skills'],
    '2024-11-30 23:59:59+00',
    '2024-01-01 00:00:00+00',
    'upcoming',
    30,
    ARRAY['Digital Marketing', 'Analytics', 'Communication']
  ),
  (
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440003',
    'Manufacturing Process Intern',
    'Gain hands-on experience in automotive manufacturing processes and quality control systems.',
    'Chennai',
    12,
    5000,
    'automotive',
    ARRAY['Engineering background', 'Interest in manufacturing'],
    '2024-12-01 23:59:59+00',
    '2024-02-01 00:00:00+00',
    'upcoming',
    25,
    ARRAY['Manufacturing', 'Quality Control', 'Process Improvement']
  ),
  (
    '660e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440004',
    'Healthcare Data Analyst Intern',
    'Analyze healthcare data to improve patient outcomes and operational efficiency using modern analytics tools.',
    'Hyderabad',
    12,
    5000,
    'healthcare',
    ARRAY['Statistics/Data Science background', 'Healthcare interest'],
    '2024-11-25 23:59:59+00',
    '2024-01-10 00:00:00+00',
    'active',
    20,
    ARRAY['Data Analysis', 'Healthcare', 'Statistics']
  ),
  (
    '660e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440005',
    'Energy Systems Intern',
    'Work on renewable energy projects and sustainability initiatives in the clean energy sector.',
    'Ahmedabad',
    12,
    5000,
    'energy',
    ARRAY['Engineering degree', 'Interest in renewable energy'],
    '2024-12-10 23:59:59+00',
    '2024-02-15 00:00:00+00',
    'upcoming',
    15,
    ARRAY['Renewable Energy', 'Sustainability', 'Engineering']
  ),
  (
    '660e8400-e29b-41d4-a716-446655440006',
    '550e8400-e29b-41d4-a716-446655440006',
    'Retail Operations Intern',
    'Learn retail operations, inventory management, and customer experience optimization in modern retail.',
    'Delhi',
    12,
    5000,
    'retail',
    ARRAY['Business/Commerce background', 'Customer service skills'],
    '2024-12-05 23:59:59+00',
    '2024-01-20 00:00:00+00',
    'active',
    40,
    ARRAY['Retail Operations', 'Customer Service', 'Inventory Management']
  );

-- Insert initial statistics
INSERT INTO statistics (
  total_applications,
  active_internships,
  partner_companies,
  successful_placements
) VALUES (245000, 85420, 487, 152890);

-- Update applied_count for internships (simulate applications)
UPDATE internships SET applied_count = 245 WHERE id = '660e8400-e29b-41d4-a716-446655440001';
UPDATE internships SET applied_count = 189 WHERE id = '660e8400-e29b-41d4-a716-446655440002';
UPDATE internships SET applied_count = 156 WHERE id = '660e8400-e29b-41d4-a716-446655440003';
UPDATE internships SET applied_count = 98 WHERE id = '660e8400-e29b-41d4-a716-446655440004';
UPDATE internships SET applied_count = 134 WHERE id = '660e8400-e29b-41d4-a716-446655440005';
UPDATE internships SET applied_count = 267 WHERE id = '660e8400-e29b-41d4-a716-446655440006';