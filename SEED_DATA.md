# KinetoFlow - Seed Data pentru Testare

## Date Demo pentru Testare

Rulează acest SQL în Supabase SQL Editor după ce ați creat tabelele:

```sql
-- Insert therapist demo user
INSERT INTO users (id, username, password_hash, role, full_name, created_at, updated_at) 
VALUES (
  gen_random_uuid(),
  'terapeut1',
  '$2a$10$placeholder', -- parola123 (hashed)
  'therapist',
  'Dr. Ionescu Kinetoterapeut',
  NOW(),
  NOW()
);

-- Insert patient demo user
INSERT INTO users (id, username, password_hash, role, full_name, created_at, updated_at) 
VALUES (
  gen_random_uuid(),
  'pacient1',
  '$2a$10$placeholder', -- parola123 (hashed)
  'patient',
  'Popescu Marin',
  NOW(),
  NOW()
);

-- Get therapist and patient IDs for relationships
-- NOTĂ: Va trebui să înlocuiți ID-urile reale cu cele generate de sistem

-- Insert demo patients (legat la therapist)
INSERT INTO patients (id, full_name, therapist_id, user_id, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Ana Popescu',
  (SELECT id FROM users WHERE username = 'terapeut1' LIMIT 1),
  (SELECT id FROM users WHERE username = 'pacient1' LIMIT 1),
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Mihai Radu',
  (SELECT id FROM users WHERE username = 'terapeut1' LIMIT 1),
  NULL, -- Pacientul nu are cont încă
  NOW(),
  NOW()
);

-- Insert demo recovery plan
INSERT INTO plans (id, patient_id, therapist_id, title, description, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM patients WHERE full_name = 'Ana Popescu' LIMIT 1),
  (SELECT id FROM users WHERE username = 'terapeut1' LIMIT 1),
  'Plan de Recuperare - Spate',
  'Exerciții pentru recuperarea durerii de spate și îmbunătățirea posturii',
  NOW(),
  NOW()
);

-- Insert demo plan items
INSERT INTO plan_items (id, plan_id, title, description, sort_order, created_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM plans WHERE title = 'Plan de Recuperare - Spate' LIMIT 1),
  'Întindere Lombară',
  'Întinderi blânde pentru zona lombară, 3 seturi de 30 secunde',
  1,
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM plans WHERE title = 'Plan de Recuperare - Spate' LIMIT 1),
  'Podombras',
  'Exerciții de întărire pentru muscul spatelui, 2 seturi de 15 secunde',
  2,
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM plans WHERE title = 'Plan de Recuperare - Spate' LIMIT 1),
  'Plank',
  'Plank pentru stabilitatea core-ului, 3 seturi de 45 secunde',
  3,
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM plans WHERE title = 'Plan de Recuperare - Spate' LIMIT 1),
  'Mers pe loc',
  'Mers ușor pentru mobilitate și recuperare, 10 minute',
  4,
  NOW()
);

-- Insert demo progress entries
INSERT INTO progress_entries (id, patient_id, plan_item_id, completed, note, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM patients WHERE full_name = 'Ana Popescu' LIMIT 1),
  (SELECT id FROM plan_items WHERE title = 'Întindere Lombară' LIMIT 1),
  true,
  'Executat corect, durere redus semnificativ',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM patients WHERE full_name = 'Ana Popescu' LIMIT 1),
  (SELECT id FROM plan_items WHERE title = 'Podombras' LIMIT 1),
  true,
  'Executat cu formă corectă',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM patients WHERE full_name = 'Ana Popescu' LIMIT 1),
  (SELECT id FROM plan_items WHERE title = 'Plank' LIMIT 1),
  false,
  'Necesită mai multă stabilitate în zona abdominală',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM patients WHERE full_name = 'Ana Popescu' LIMIT 1),
  (SELECT id FROM plan_items WHERE title = 'Mers pe loc' LIMIT 1),
  false,
  'Nu a început încă, dificultate la mers',
  NOW(),
  NOW()
);
```

## Credențiale Demo

După rularea SQL-ului de mai sus, puteți folosi următoarele credențiale:

### Kinetoterapeut:
- **Utilizator**: `terapeut1`
- **Parolă**: `parola123`

### Pacient:
- **Utilizator**: `pacient1`
- **Parolă**: `parola123`

## Funcționalități Testabile

1. **Autentificare** - Ambele roluri se pot autentifica
2. **Dashboard Kinetoterapeut** - Vede pacienții și statistici
3. **Dashboard Pacient** - Vede planul de recuperare și progres
4. **Management Pacienți** - Adăugare pacienți noi
5. **Progres Tracking** - Marcarea exercițiilor ca fiind completate/incomplete

## Note despre Securitate

- Parolele sunt stocate ca hash-uri (deși în demo folosesc placeholder)
- Fiecare utilizator vede doar datele sale
- Row Level Security (RLS) protejează accesul la date
- Conturile demo sunt pentru testare și dezvoltare
