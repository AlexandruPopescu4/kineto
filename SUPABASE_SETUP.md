# KinetoFlow - Supabase Configuration

## Required Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Supabase Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the Project URL and API keys from Settings > API

### 2. Enable Google Authentication
1. Go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Get from Google Cloud Console
   - Add authorized redirect URI: `https://[your-project-ref].supabase.co/auth/v1/callback`

### 3. Create Database Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create patients table
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own patients
CREATE POLICY "Users can view their own patients" ON patients
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy for users to insert their own patients
CREATE POLICY "Users can insert their own patients" ON patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own patients
CREATE POLICY "Users can update their own patients" ON patients
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own patients
CREATE POLICY "Users can delete their own patients" ON patients
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Configure consent screen:
   - Application type: Web application
   - Authorized redirect URIs: `https://[your-project-ref].supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret to Supabase Auth settings

## Local Development

```bash
npm install
npm run dev
```

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

## Environment Variables for Vercel

Add these in Vercel > Settings > Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
