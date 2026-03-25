'use client'

import { useAuth } from '@/contexts/role-auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, ArrowLeft, Save, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function TherapistPatientsNewPage() {
  const { user, loading, isTherapist } = useAuth()
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!isTherapist && !loading) {
      router.push('/login')
    }
  }, [isTherapist, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName.trim() || !username.trim() || !password.trim()) {
      setError('Completați toate câmpurile')
      return
    }

    if (username.trim().length < 3) {
      setError('Numele de utilizator trebuie să aibă cel puțin 3 caractere')
      return
    }

    if (password.trim().length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username.trim())
        .single()

      if (existingUser) {
        setError('Acest nume de utilizator există deja pentru pacient')
        setIsSubmitting(false)
        return
      }

      // Create patient account
      const { data, error } = await supabase
        .from('patients')
        .insert({
          full_name: fullName.trim(),
          user_id: null, // Will be updated when patient logs in
          therapist_id: user?.id
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating patient:', error)
        setError('Eroare la crearea contului de pacient')
      } else {
        // Create user account for patient
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert({
            username: username.trim(),
            password_hash: '$2a$10$placeholder', // Placeholder - will be updated when patient sets password
            role: 'patient',
            full_name: fullName.trim()
          })
          .select()
          .single()

        if (userError) {
          console.error('Error creating user:', userError)
          setError('Eroare la crearea contului de pacient')
        } else {
          router.push('/therapist/pacienti')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Eroare la crearea contului de pacient')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!isTherapist) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
              <span className="text-sm text-gray-500">Adaugă Pacient</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/therapist/pacienti')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Adaugă Pacient Nou</h1>
          <p className="text-gray-600 mt-2">Creați un cont pentru un pacient nou</p>
        </div>

        {/* Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Informații Pacient</CardTitle>
            <CardDescription>Completați detaliile pentru a crea contul de pacient</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nume complet pacient
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Introduceți numele complet al pacientului"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nume utilizator pacient
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Alegeți un nume de utilizator pentru pacient"
                  disabled={isSubmitting}
                  minLength={3}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minim 3 caractere</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Parolă temporară
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Parolă temporară (pacientul o va schimba)"
                  disabled={isSubmitting}
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minim 6 caractere</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/therapist/pacienti')}
                  disabled={isSubmitting}
                >
                  Anulează
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting || !fullName.trim() || !username.trim() || !password.trim()}
                >
                  {isSubmitting ? 'Se creează...' : 'Creează Cont Pacient'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">📋 Informații importante:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Pacientul va primi credențialele de login</li>
                <li>• Pacientul poate schimba parola la prima autentificare</li>
                <li>• Puteți atribui un plan de recuperare după creare</li>
                <li>• Contul va fi legat de contul dumneavoastră de terapeut</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-400">
            Realizat de Otilia Stratu în cadrul proiectului ODA
          </p>
        </div>
      </footer>
    </div>
  )
}
