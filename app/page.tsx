'use client'

import { useAuth } from '@/contexts/role-auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const { user, loading, isAuthenticated, isTherapist, isPatient } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        if (isTherapist) {
          router.push('/therapist')
        } else if (isPatient) {
          router.push('/pacient')
        }
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router, isAuthenticated, isTherapist, isPatient])

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

  return null
}
