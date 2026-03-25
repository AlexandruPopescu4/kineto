# KinetoFlow - Schema Completă pentru Kinetoterapeuți și Pacienți

## Schema SQL Completă

Rulează acest SQL în Supabase SQL Editor:

```sql
-- Tabela de utilizatori cu roluri
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('therapist', 'patient')),
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pacienți (legată la users)
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de planuri de recuperare
CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de exerciții/task-uri din plan
CREATE TABLE plan_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de progres (task-uri completate și note)
CREATE TABLE progress_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  plan_item_id UUID NOT NULL REFERENCES plan_items(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS pentru toate tabelele
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;

-- Politici pentru users
CREATE POLICY "Users can register" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = username::text);

-- Politici pentru patients
CREATE POLICY "Therapists can view their patients" ON patients
  FOR SELECT USING (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = therapist_id)
  );

CREATE POLICY "Therapists can insert their patients" ON patients
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = therapist_id)
  );

CREATE POLICY "Patients can view their own profile" ON patients
  FOR SELECT USING (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = user_id)
  );

-- Politici pentru plans
CREATE POLICY "Therapists can view their plans" ON plans
  FOR SELECT USING (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = therapist_id)
  );

CREATE POLICY "Therapists can insert their plans" ON plans
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = therapist_id)
  );

CREATE POLICY "Patients can view their plans" ON plans
  FOR SELECT USING (
    auth.uid()::text IN (SELECT username::text FROM users WHERE id = patient_id)
  );

-- Politici pentru plan_items
CREATE POLICY "Therapists can view their plan items" ON plan_items
  FOR SELECT USING (
    auth.uid()::text IN (SELECT u.username::text FROM plans p JOIN users u ON p.therapist_id = u.id WHERE plan_items.plan_id = p.id)
  );

CREATE POLICY "Therapists can insert their plan items" ON plan_items
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (SELECT u.username::text FROM plans p JOIN users u ON p.therapist_id = u.id WHERE plan_items.plan_id = p.id)
  );

CREATE POLICY "Patients can view their plan items" ON plan_items
  FOR SELECT USING (
    auth.uid()::text IN (SELECT u.username::text FROM plans p JOIN users u ON p.patient_id = u.id WHERE plan_items.plan_id = p.id)
  );

-- Politici pentru progress_entries
CREATE POLICY "Therapists can view patient progress" ON progress_entries
  FOR SELECT USING (
    auth.uid()::text IN (SELECT u.username::text FROM users u JOIN patients p ON p.therapist_id = u.id WHERE progress_entries.patient_id = p.id)
  );

CREATE POLICY "Patients can manage their progress" ON progress_entries
  FOR ALL USING (
    auth.uid()::text IN (SELECT u.username::text FROM users u JOIN patients p ON p.user_id = u.id WHERE progress_entries.patient_id = p.id)
  );

-- Index-uri pentru performanță
CREATE INDEX idx_patients_therapist_id ON patients(therapist_id);
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_plans_patient_id ON plans(patient_id);
CREATE INDEX idx_plans_therapist_id ON plans(therapist_id);
CREATE INDEX idx_plan_items_plan_id ON plan_items(plan_id);
CREATE INDEX idx_progress_entries_patient_id ON progress_entries(patient_id);
CREATE INDEX idx_progress_entries_plan_item_id ON progress_entries(plan_item_id);
CREATE INDEX idx_users_username ON users(username);
```

## Funcții Supabase

Rulează și aceste funcții în Supabase SQL Editor:

```sql
-- Funcție pentru login cu rol
CREATE OR REPLACE FUNCTION login_user(username_input TEXT, password_input TEXT)
RETURNS TABLE(id UUID, username TEXT, role TEXT, full_name TEXT, success BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.role,
    u.full_name,
    true as success
  FROM users u
  WHERE u.username = username_input 
    AND u.password_hash = password_input;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT, false;
  END IF;
END;
$$;

-- Funcție pentru a obține user_id din username
CREATE OR REPLACE FUNCTION get_user_id_from_username(username_input TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT id FROM users WHERE username = username_input LIMIT 1
  );
END;
$$;
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Setup Instructions

1. Creează cont pe [supabase.com](https://supabase.com)
2. Creează proiect nou
3. Rulează SQL-ul de mai sus în Supabase SQL Editor
4. Copiază credențialele din Settings > API
5. Adaugă environment variables în .env.local
