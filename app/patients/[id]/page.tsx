'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, ArrowLeft, Calendar, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface Patient {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [patientLoading, setPatientLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && params.id) {
      fetchPatient()
    }
  }, [user, params.id])

  const fetchPatient = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching patient:', error)
        router.push('/patients')
      } else {
        setPatient(data)
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/patients')
    } finally {
      setPatientLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!patient) return
    
    if (!confirm(`Sunteți sigur că doriți să ștergeți pacientul "${patient.name}"?`)) {
      return
    }

    setIsDeleting(true)
    
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', patient.id)
        .eq('user_id', user?.id)

      if (error) {
        console.error('Error deleting patient:', error)
        alert('A apărut o eroare la ștergerea pacientului')
      } else {
        router.push('/patients')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('A apărut o eroare la ștergerea pacientului')
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading || patientLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!user || !patient) {
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
        <div className="max-w-4xl mx-auto">
          {/* Patient Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600 mt-2">Detalii pacient</p>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <Button variant="outline" onClick={() => router.push(`/patients/${patient.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Editează
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Se șterge...' : 'Șterge'}
              </Button>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Informații Generale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Nume Pacient</h4>
                  <p className="text-lg font-medium text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">ID Pacient</h4>
                  <p className="text-sm font-mono text-gray-700">{patient.id}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timestamp-uri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Data Adăugării</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(patient.created_at).toLocaleDateString('ro-RO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(patient.created_at).toLocaleTimeString('ro-RO')}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ultima Modificare</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(patient.updated_at).toLocaleDateString('ro-RO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(patient.updated_at).toLocaleTimeString('ro-RO')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acțiuni Rapide</CardTitle>
              <CardDescription>Operațiuni comune pentru acest pacient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Programează Ședință</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Activity className="h-6 w-6 mb-2" />
                  <span>Adaugă Notă</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  <span>Editează Pacient</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Note și Observații</CardTitle>
              <CardDescription>Adăugați note despre progresul pacientului</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Nu există note încă</p>
                <Button variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Adaugă Prima Notă
                </Button>
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
