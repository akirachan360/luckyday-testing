-- Lucky Day Dashboard - Supabase Schema
-- Helping people experiencing homelessness through direct micro-donations
-- Run this in Supabase SQL Editor

-- ============================================
-- CORE TABLES
-- ============================================

-- Recipients: People receiving help
CREATE TABLE recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  story TEXT,
  needs TEXT[],
  status TEXT DEFAULT 'active', -- active, housed, relocated, inactive
  intake_date DATE DEFAULT CURRENT_DATE,
  case_worker TEXT,
  contact_method TEXT,
  photo_consent BOOLEAN DEFAULT false,
  total_received DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations: Individual donations made
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID REFERENCES recipients(id),
  amount DECIMAL(10,2) NOT NULL,
  donation_type TEXT DEFAULT 'cash', -- cash, gift_card, supplies, services
  donor_name TEXT,
  donor_email TEXT,
  donor_anonymous BOOLEAN DEFAULT false,
  platform TEXT, -- venmo, paypal, cash, check, in_kind
  date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  status TEXT DEFAULT 'completed', -- pending, completed, refunded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donors: Recurring or tracked donors
CREATE TABLE donors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  donor_type TEXT DEFAULT 'individual', -- individual, business, foundation, corporate
  total_given DECIMAL(10,2) DEFAULT 0,
  first_donation DATE,
  last_donation DATE,
  frequency TEXT, -- one_time, monthly, quarterly, annual
  status TEXT DEFAULT 'active', -- prospect, active, lapsed, major
  communication_preference TEXT DEFAULT 'email',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Volunteers: People helping with outreach
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT, -- outreach, driver, coordinator, photographer, social_media
  availability TEXT,
  skills TEXT[],
  background_check BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- prospect, active, inactive, onboarding
  hours_logged DECIMAL(10,2) DEFAULT 0,
  start_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners: Organizations we work with
CREATE TABLE partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization_type TEXT, -- shelter, food_bank, clinic, government, nonprofit, business
  location TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  services_offered TEXT[],
  referral_relationship TEXT, -- we_refer_to, they_refer_to_us, mutual, funding
  status TEXT DEFAULT 'active', -- prospect, active, inactive
  mou_signed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outreach Events: Days/events where we connect with recipients
CREATE TABLE outreach_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  event_type TEXT, -- street_outreach, distribution, fundraiser, awareness, volunteer_day
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  volunteers_needed INTEGER DEFAULT 0,
  volunteers_confirmed INTEGER DEFAULT 0,
  recipients_served INTEGER DEFAULT 0,
  donations_distributed DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'planned', -- planned, confirmed, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks: Action items for the team
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'general', -- outreach, donations, volunteers, partners, admin, fundraising
  due_date DATE,
  priority TEXT DEFAULT 'medium', -- high, medium, low
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Impact Stories: Success stories for marketing/fundraising
CREATE TABLE impact_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  recipient_id UUID REFERENCES recipients(id),
  story_type TEXT, -- housing_success, milestone, gratitude, awareness
  content TEXT,
  photo_approved BOOLEAN DEFAULT false,
  video_link TEXT,
  platform TEXT[], -- website, instagram, facebook, newsletter, press
  publish_date DATE,
  status TEXT DEFAULT 'draft', -- draft, review, approved, published
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grants & Funding: Grant applications and funding sources
CREATE TABLE grants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  funder TEXT NOT NULL,
  amount TEXT,
  deadline TEXT,
  fit TEXT DEFAULT 'medium', -- high, medium, low
  requirements TEXT,
  link TEXT,
  status TEXT DEFAULT 'pipeline', -- pipeline, researching, applying, submitted, awarded, declined
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media & Press: Media opportunities
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  outlet TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  coverage_type TEXT, -- feature, interview, mention, partnership
  topic TEXT,
  status TEXT DEFAULT 'prospect', -- prospect, pitched, interested, confirmed, published, declined
  date DATE,
  link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Log: Track all changes
CREATE TABLE activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings: Dashboard configuration
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DISABLE ROW LEVEL SECURITY (for simplicity)
-- ============================================

ALTER TABLE recipients DISABLE ROW LEVEL SECURITY;
ALTER TABLE donations DISABLE ROW LEVEL SECURITY;
ALTER TABLE donors DISABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE grants DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Sample Recipients
INSERT INTO recipients (name, location, story, needs, status, case_worker) VALUES
('Marcus J.', 'Downtown San Diego', 'Vietnam veteran, lost housing after medical emergency', ARRAY['housing assistance', 'medical care', 'job training'], 'active', 'Sarah'),
('Elena R.', 'Ocean Beach', 'Single mother, fleeing domestic situation', ARRAY['family shelter', 'childcare', 'legal aid'], 'active', 'Mike'),
('David K.', 'North Park', 'Recently employed, saving for deposit', ARRAY['rental deposit', 'work supplies', 'transportation'], 'active', 'Sarah');

-- Sample Donors
INSERT INTO donors (name, email, donor_type, total_given, frequency, status) VALUES
('Anonymous Monthly Donor', NULL, 'individual', 500, 'monthly', 'active'),
('Carlsbad Community Foundation', 'grants@ccf.org', 'foundation', 5000, 'annual', 'active'),
('Local Coffee Shop', 'owner@localcoffee.com', 'business', 250, 'quarterly', 'active');

-- Sample Volunteers
INSERT INTO volunteers (name, email, role, availability, skills, status, background_check) VALUES
('Jamie L.', 'jamie@email.com', 'outreach', 'Saturdays', ARRAY['Spanish speaker', 'social work background'], 'active', true),
('Chris M.', 'chris@email.com', 'driver', 'Flexible', ARRAY['licensed driver', 'CPR certified'], 'active', true);

-- Sample Partners
INSERT INTO partners (name, organization_type, location, contact_name, services_offered, referral_relationship, status) VALUES
('San Diego Rescue Mission', 'shelter', 'Downtown San Diego', 'Intake Coordinator', ARRAY['emergency shelter', 'meals', 'case management'], 'mutual', 'active'),
('Father Joe''s Villages', 'shelter', 'East Village', 'Outreach Team', ARRAY['housing', 'medical', 'employment'], 'mutual', 'active'),
('Feeding San Diego', 'food_bank', 'Sorrento Valley', 'Partner Relations', ARRAY['food distribution', 'mobile pantry'], 'we_refer_to', 'active');

-- Sample Outreach Events
INSERT INTO outreach_events (name, event_type, date, location, volunteers_needed, status) VALUES
('Saturday Street Outreach', 'street_outreach', CURRENT_DATE + INTERVAL '3 days', 'Downtown San Diego', 4, 'planned'),
('Monthly Supply Distribution', 'distribution', CURRENT_DATE + INTERVAL '10 days', 'Balboa Park', 6, 'planned');

-- Sample Tasks
INSERT INTO tasks (title, category, due_date, priority, status) VALUES
('Follow up with Marcus re: housing application', 'outreach', CURRENT_DATE + INTERVAL '2 days', 'high', 'pending'),
('Prepare volunteer training materials', 'volunteers', CURRENT_DATE + INTERVAL '7 days', 'medium', 'pending'),
('Submit monthly donor report', 'donations', CURRENT_DATE + INTERVAL '5 days', 'medium', 'pending'),
('Schedule partner meeting with Rescue Mission', 'partners', CURRENT_DATE + INTERVAL '3 days', 'medium', 'pending'),
('Post impact story to Instagram', 'admin', CURRENT_DATE + INTERVAL '1 day', 'low', 'pending');

-- Sample Grants
INSERT INTO grants (title, funder, amount, deadline, fit, status) VALUES
('Emergency Assistance Fund', 'San Diego Foundation', '$10,000', '2026-06-30', 'high', 'researching'),
('Community Impact Grant', 'California Community Foundation', '$25,000', '2026-08-15', 'high', 'pipeline');

-- Initialize settings
INSERT INTO settings (key, value) VALUES 
('last_updated', '{"timestamp": "' || NOW() || '"}');
