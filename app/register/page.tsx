'use client'

import { useAuth } from '@/contexts/role-auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const { user, loading, register, isAuthenticated } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'therapist' | 'patient'>('therapist')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated && !loading) {
      if (user?.role === 'therapist') {
        router.push('/therapist')
      } else if (user?.role === 'patient') {
        router.push('/pacient')
      }
    }
  }, [user, loading, router, isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
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

    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc')
      return
    }

    setIsSubmitting(true)
    setError('')

    const result = await register(username.trim(), password.trim(), role, fullName.trim() || undefined)
    
    if (!result.success) {
      setError(result.error || 'Eroare la înregistrare')
    }
    
    setIsSubmitting(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
          </div>
          
          <CardTitle className="text-2xl">Înregistrare</CardTitle>
          <CardDescription>
            Creați un cont nou pentru a începe
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Tip cont
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'therapist' | 'patient')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                <option value="therapist">Kinetoterapeut</option>
                <option value="patient">Pacient</option>
              </select>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Nume complet {role === 'therapist' ? '(opțional)' : '(necesar)'}
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={role === 'therapist' ? 'Numele dumneavoastră' : 'Numele pacientului'}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nume utilizator
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Alegeți un nume de utilizator"
                disabled={isSubmitting}
                minLength={3}
              />
              <p className="text-xs text-gray-500 mt-1">Minim 3 caractere</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Parolă
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Alegeți o parolă"
                  disabled={isSubmitting}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minim 6 caractere</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmare parolă
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Reintroduceți parola"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button 
              type="submit"
              className="w-full py-3 text-lg"
              disabled={isSubmitting || !username.trim() || !password.trim() || !confirmPassword.trim()}
            >
              {isSubmitting ? 'Se înregistrează...' : 'Creează cont'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Aveți deja cont?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Conectați-vă
              </Link>
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Realizat de Otilia Stratu în cadrul proiectului ODA
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
