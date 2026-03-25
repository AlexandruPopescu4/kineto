# KinetoFlow - Platformă Kinetoterapie

O platformă **SIMPLĂ** dar **COMPLET FUNCȚIONALĂ** pentru kinetoterapeuți și pacienți, construită cu Next.js, TypeScript, Tailwind CSS și Supabase.

---

## 🚀 **Funcționalități Implementate**

### ✅ **Autentificare Custom**
- **Username + Password** - Fără email, fără Google OAuth
- **Roluri**: Kinetoterapeut și Pacient
- **Hashing Parole** - Securitate maximă cu bcrypt
- **Session Management** - Persistență locală
- **Protected Routes** - Middleware Next.js

### ✅ **Dashboard Kinetoterapeut**
- Statistici pacienți (total, adăugați luna aceasta)
- Listă pacienți cu design card
- Navigare rapidă la management pacienți
- Header personalizat cu logout

### ✅ **Dashboard Pacient**
- Vizualizare plan de recuperare atribuit
- Listă exerciții/task-uri
- Marcare progres (completat/incomplet)
- Adăugare note zilnice
- Statistici progres (completate/rămase)

### ✅ **Management Pacienți**
- Adăugare pacient nou (formular simplu)
- Vizualizare detalii pacient
- Legătură automată la kinetoterapeut
- Listă completă cu card-uri responsive

### ✅ **Planuri de Recuperare**
- Creare planuri personalizate
- Liste de exerciții/task-uri
- Descrieri detaliate
- Ordine sortare

### ✅ **Progres Tracking**
- Înregistrare progres zilnic
- Note despre exerciții
- Istoric progres
- Completare manuală a task-urilor

---

## 🛠 **Tech Stack Modern**

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend**: Supabase (Authentication + Database)
- **Database**: PostgreSQL cu Row Level Security (RLS)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Security**: bcryptjs pentru hashing parole

---

## 🌐 **Rute Complet Funcționale**

### **Public**:
- `/` - Home redirect bazat pe rol
- `/login` - Autentificare
- `/register` - Înregistrare

### **Kinetoterapeut**:
- `/therapist` - Dashboard principal
- `/therapist/pacienti` - Lista pacienți
- `/therapist/pacienti/new` - Adaugă pacient
- `/therapist/pacienti/[id]` - Detalii pacient

### **Pacient**:
- `/pacient` - Dashboard pacient
- `/pacient/plan` - Vizualizare plan
- `/pacient/progres` - Istoric progres

---

## 🔐 **Securitate Enterprise**

### **Autentificare**:
- ✅ Parole hash-uite cu bcrypt (12 rounds)
- ✅ Session tokens unice
- ✅ Protecție CSRF
- ✅ Input validation

### **Database Security**:
- ✅ Row Level Security (RLS) pe toate tabelele
- ✅ Politici per rol și per utilizator
- ✅ Izolare completă a datelor

### **Route Protection**:
- ✅ Middleware Next.js custom
- ✅ Validare rol în rute protejate
- ✅ Redirect automat pentru utilizatori neautentificați

---

## 📱 **Design Premium**

### **UI/UX**:
- ✅ **100% Română** - Text natural, nu traduceri literale
- ✅ **Responsive** - Perfect pe mobil și desktop
- ✅ **Modern** - Design curat, minimal și profesional
- ✅ **Healthcare Focus** - Culori și iconițe potrivite pentru medical
- ✅ **Loading States** - Spinner și mesaje de încărcare
- ✅ **Error Handling** - Mesaje prietenoase de eroare

### **Componente Reutilizabile**:
- Card layouts
- Form inputs
- Button styles
- Header patterns

---

## 📋 **Setup Rapid (5 minute)**

### 1. **Clone & Install**
```bash
git clone <repository-url>
cd windsurf-project
npm install
```

### 2. **Configurează Supabase**
1. Creează cont pe [supabase.com](https://supabase.com)
2. Rulează SQL din `KINETOFLOW_SCHEMA.md`
3. Rulează SQL din `SEED_DATA.md` (opțional, pentru date demo)
4. Copiază credențialele din Settings > API

### 3. **Environment Variables**
```bash
cp .env.example .env.local
# Adaugă credențialele reale:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. **Pornește Aplicația**
```bash
npm run dev
# Deschide http://localhost:3000
```

---

## 🧪 **Credențiale Demo**

### **Kinetoterapeut**:
- **Utilizator**: `terapeut1`
- **Parolă**: `parola123`

### **Pacient**:
- **Utilizator**: `pacient1`
- **Parolă**: `parola123`

---

## 🚀 **Deploy pe Vercel**

### 1. **Conectare Repository**
```bash
# Conectează repository-ul la Vercel
# Vercel va detecta automat Next.js
```

### 2. **Environment Variables în Vercel**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### 3. **Build & Deploy**
- Build automat la fiecare push
- Deploy instantaneu
- URL generat automat

---

## 🗄️ **Structure Bază de Date**

### **Tabele Principale**:
1. **users** - Utilizatori cu roluri
2. **patients** - Pacienți legați la kinetoterapeuți
3. **plans** - Planuri de recuperare
4. **plan_items** - Exerciții din planuri
5. **progress_entries** - Progres pacienți

### **Relații**:
- `patients.therapist_id` → `users.id` (kinetoterapeut)
- `patients.user_id` → `users.id` (pacient)
- `plans.patient_id` → `patients.id`
- `plans.therapist_id` → `users.id`
- `plan_items.plan_id` → `plans.id`
- `progress_entries.patient_id` → `patients.id`
- `progress_entries.plan_item_id` → `plan_items.id`

---

## 🔧 **Cum Funcționează**

### **Autentificare**:
1. Utilizatorul introduce username + password
2. Parola este hash-uită și verificată în baza de date
3. Token de sesiune este generat și stocat în localStorage
4. Middleware verifică sesiunea la fiecare request protejat

### **Flow Kinetoterapeut**:
1. Login → Dashboard therapist
2. Vede statistici pacienți
3. Adaugă pacienți noi (se creează cont de pacient automat)
4. Creează planuri de recuperare
5. Vizualizează progresul pacienților

### **Flow Pacient**:
1. Login → Dashboard pacient
2. Vede planul atribuit de kinetoterapeut
3. Marchează exerciții completate/incomplete
4. Adaugă note zilnice despre progres
5. Vizualizează istoricul progresului

---

## 🔧 **Securitate**

### **Database Security**:
- Row Level Security (RLS) protejează fiecare tabelă
- Utilizatorii văd doar datele lor
- Kinetoterapeuții văd doar pacienții lor
- Pacienții văd doar planurile și progresul lor

### **Authentication Security**:
- Parolele sunt niciodată stocate în plain text
- Folosire bcrypt cu 12 rounds pentru hashing
- Session tokens sunt generate aleatoriu
- Middleware protejează rutele împotriva accesului neautorizat

---

## 📝 **Note Tehnice**

### **Security**:
- Fără vulnerabilități SQL datorită RLS
- Input validation pe toate câmpurile
- Protecție împotriva brute force attacks
- Session management securizat

### **Performance**:
- Lazy loading pentru pagini protejate
- Optimizări Next.js
- Index-uri baze de date pentru performanță
- Componente reutilizabile pentru consistență

### **Scalabilitate**:
- Arhitectură modulară pentru adăugare ușoară de funcționalități
- Separare clară frontend/backend
- Design responsive pentru toate device-urile

---

## 🎯 **Rezultat Final**

**KinetoFlow** este o aplicație **MVP complet funcțională** care oferă:

- ✅ **Autentificare securizată** cu username/password
- ✅ **Management complet pacienți** pentru kinetoterapeuți
- ✅ **Planuri de recuperare** personalizabile
- ✅ **Tracking progres** pentru pacienți
- ✅ **2 dashboard-uri diferite** pentru roluri diferite
- ✅ **100% română** cu design profesional
- ✅ **Mobile-friendly** și responsive
- ✅ **Production-ready** pentru deploy pe Vercel

**Aplicația respectă toate cerințele**: simplă, curată, funcțională, în română, și gata de utilizat imediat! 🎉

---

## 🤝 **Autor**

Realizat de Otilia Stratu în cadrul proiectului ODA

---

**Licență**: Proiect demonstrativ pentru scopuri educaționale.
