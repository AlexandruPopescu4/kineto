'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function NewPatientPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [patientName, setPatientName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!patientName.trim()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('patients')
        .insert({
          name: patientName.trim(),
          user_id: user?.id
        })

      if (error) {
        console.error('Error adding patient:', error)
        alert('A apărut o eroare la adăugarea pacientului')
      } else {
        router.push('/patients')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('A apărut o eroare la adăugarea pacientului')
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push('/patients')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi
              </Button>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Adaugă Pacient Nou</h1>
            <p className="text-gray-600 mt-2">Introduceți informațiile pacientului pentru a-l înregistra în sistem</p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Informații Pacient</CardTitle>
              <CardDescription>Toate câmpurile sunt obligatorii</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nume Pacient
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Introduceți numele complet al pacientului"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/patients')}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Anulează
                  </Button>
                  <Button
                    type="submit"
                    disabled={!patientName.trim() || isSubmitting}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Se salvează...' : 'Salvează Pacient'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Informații Utile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Sfat</h4>
                <p className="text-sm text-blue-700">
                  Puteți adăuga mai multe detalii despre pacient după înregistrare, accesând pagina pacientului.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Securitate</h4>
                <p className="text-sm text-green-700">
                  Toate datele pacienților sunt securizate și vizibile doar pentru dumneavoastră.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
