'use client'

import { useAuth } from '@/contexts/role-auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, LogOut, CheckCircle, Circle, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface Plan {
  id: string
  title: string
  description: string
  created_at: string
}

interface PlanItem {
  id: string
  title: string
  description: string
  sort_order: number
  completed: boolean
}

export const dynamic = 'force-dynamic'

export default function PatientDashboard() {
  const { user, loading, logout, isPatient } = useAuth()
  const router = useRouter()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [planItems, setPlanItems] = useState<PlanItem[]>([])
  const [planLoading, setPlanLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!isPatient && !loading) {
      router.push('/login')
    }
  }, [isPatient, loading, router])

  useEffect(() => {
    if (user && isPatient) {
      fetchPlan()
    }
  }, [user, isPatient])

  const fetchPlan = async () => {
    try {
      // Fetch patient's plan
      const { data: planData, error: planError } = await supabase
        .from('plans')
        .select('*')
        .eq('patient_id', user?.id)
        .single()

      if (planError && planError.code !== 'PGRST116') {
        console.error('Error fetching plan:', planError)
      }

      // Fetch plan items
      const { data: itemsData, error: itemsError } = await supabase
        .from('plan_items')
        .select('*')
        .eq('plan_id', planData?.id)
        .order('sort_order')

      if (itemsError) {
        console.error('Error fetching plan items:', itemsError)
      }

      setPlan(planData)
      setPlanItems(itemsData || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setPlanLoading(false)
    }
  }

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }

  const toggleTaskComplete = async (itemId: string, completed: boolean) => {
    try {
      // Check if progress entry exists
      const { data: existingProgress } = await supabase
        .from('progress_entries')
        .select('*')
        .eq('patient_id', user?.id)
        .eq('plan_item_id', itemId)
        .single()

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('progress_entries')
          .update({ completed })
          .eq('id', existingProgress.id)
      } else {
        // Create new progress entry
        await supabase
          .from('progress_entries')
          .insert({
            patient_id: user?.id,
            plan_item_id: itemId,
            completed
          })
      }

      // Refresh plan items
      fetchPlan()
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  if (loading || planLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!isPatient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
              <span className="text-sm text-gray-500">Panou pacient</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.username}</p>
                <p className="text-xs text-gray-500">Pacient</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
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
          <h1 className="text-3xl font-bold text-gray-900">Bun venit, {user?.full_name || user?.username}!</h1>
          <p className="text-gray-600 mt-2">Vizualizați planul de recuperare și progresul</p>
        </div>

        {/* Plan Section */}
        {plan ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description || 'Planul dumneavoastră de recuperare'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-900">Plan Activ</h4>
                    <p className="text-sm text-blue-700">Creat la {new Date(plan.created_at).toLocaleDateString('ro-RO')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-600">Plan personalizat</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nu aveți un plan activ</h3>
              <p className="text-gray-600">Kinetoterapeutul dumneavoastră vă va atribui un plan curând</p>
            </CardContent>
          </Card>
        )}

        {/* Tasks Section */}
        {planItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Exerciții și Task-uri</CardTitle>
              <CardDescription>Marcați exercițiile completate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <Button
                      variant={item.completed ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTaskComplete(item.id, !item.completed)}
                      className={item.completed ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {item.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completat
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4 mr-2" />
                          Marchează
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Summary */}
        {planItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Progres Zilnic</CardTitle>
              <CardDescription>Adăugați note despre progresul zilnic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    {planItems.filter(item => item.completed).length}
                  </div>
                  <p className="text-sm text-green-700">Exerciții completate</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">
                    {planItems.filter(item => !item.completed).length}
                  </div>
                  <p className="text-sm text-blue-700">Exerciții rămase</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" variant="outline">
                  Adaugă Notă Zilnică
                </Button>
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
