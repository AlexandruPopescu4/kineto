'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Users, Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface Patient {
  id: string
  name: string
  created_at: string
}

export default function PatientsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [patientsLoading, setPatientsLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchPatients()
    }
  }, [user])

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching patients:', error)
      } else {
        setPatients(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setPatientsLoading(false)
    }
  }

  if (loading || patientsLoading) {
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
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
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
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pacienți</h1>
            <p className="text-gray-600 mt-2">Gestionați și monitorizați pacienții</p>
          </div>
          <Button className="mt-4 sm:mt-0" onClick={() => router.push('/patients/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Adaugă Pacient
          </Button>
        </div>

        {/* Patients Grid */}
        {patients.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nu aveți pacienți încă</h3>
              <p className="text-gray-600 mb-4">Începeți prin a adăuga primul pacient</p>
              <Button onClick={() => router.push('/patients/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Adaugă Primul Pacient
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        Pacient înregistrat
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Data adăugării</span>
                    <span className="font-medium">
                      {new Date(patient.created_at).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    Vezi Detalii
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {patients.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Statistici Sumar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{patients.length}</div>
                  <p className="text-sm text-gray-600">Pacienți Total</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {patients.filter(p => {
                      const createdAt = new Date(p.created_at)
                      const now = new Date()
                      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
                    }).length}
                  </div>
                  <p className="text-sm text-gray-600">Adăugați Luna Aceasta</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {patients.filter(p => {
                      const createdAt = new Date(p.created_at)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return createdAt >= weekAgo
                    }).length}
                  </div>
                  <p className="text-sm text-gray-600">Adăugați Săptămâna Aceasta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
