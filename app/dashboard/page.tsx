'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Users, LogOut, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface Patient {
  id: string
  name: string
  created_at: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
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

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
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
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Deconectare
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panou de control</h1>
          <p className="text-gray-600 mt-2">
            Bun venit, {user.user_metadata?.full_name || 'utilizator'}! Iată o imagine de ansamblu a practicii dumneavoastră.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Pacienți Total</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{patients.length}</div>
              <p className="text-xs text-gray-500">Pacienți înregistrați</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Adăugați Luna Aceasta</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {patients.filter(p => {
                  const createdAt = new Date(p.created_at)
                  const now = new Date()
                  return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
                }).length}
              </div>
              <p className="text-xs text-gray-500">Pacienți noi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">Status Cont</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">Activ</div>
              <p className="text-xs text-gray-500">Cont verificat</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pacienți Recenți</CardTitle>
              <CardDescription>Ultimele pacienți adăugați</CardDescription>
            </div>
            <Button onClick={() => router.push('/patients/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Adaugă Pacient
            </Button>
          </CardHeader>
          <CardContent>
            {patients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nu aveți pacienți încă</h3>
                <p className="text-gray-600 mb-4">Începeți prin a adăuga primul pacient</p>
                <Button onClick={() => router.push('/patients/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă Primul Pacient
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {patients.slice(0, 5).map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <p className="text-sm text-gray-500">
                        Adăugat la {new Date(patient.created_at).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/patients/${patient.id}`)}
                    >
                      Vezi Detalii
                    </Button>
                  </div>
                ))}
                {patients.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => router.push('/patients')}>
                      Vezi Toți Pacienții ({patients.length})
                    </Button>
                  </div>
                )}
              </div>
            )}
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
