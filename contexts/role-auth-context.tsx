'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { hashPassword, verifyPassword, generateSessionToken } from '@/lib/auth'

export interface User {
  id: string
  username: string
  role: 'therapist' | 'patient'
  full_name?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (username: string, password: string, role: 'therapist' | 'patient', fullName?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isTherapist: boolean
  isPatient: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = () => {
      const sessionToken = localStorage.getItem('session_token')
      const userData = localStorage.getItem('user_data')
      
      if (sessionToken && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('session_token')
          localStorage.removeItem('user_data')
        }
      }
      setLoading(false)
    }

    checkSession()
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase
        .rpc('login_user', { 
          username_input: username, 
          password_input: password 
        })

      if (error) {
        console.error('Login error:', error)
        return { success: false, error: 'Eroare la autentificare' }
      }

      if (data && data.length > 0 && data[0].success) {
        const userData = {
          id: data[0].id,
          username: data[0].username,
          role: data[0].role,
          full_name: data[0].full_name
        }
        
        // Create session
        const sessionToken = generateSessionToken()
        localStorage.setItem('session_token', sessionToken)
        localStorage.setItem('user_data', JSON.stringify(userData))
        
        setUser(userData)
        return { success: true }
      } else {
        return { success: false, error: 'Utilizator sau parolă incorectă' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Eroare la autentificare' }
    }
  }

  const register = async (
    username: string, 
    password: string, 
    role: 'therapist' | 'patient',
    fullName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        return { success: false, error: 'Acest utilizator există deja' }
      }

      // Hash password and create user
      const passwordHash = await hashPassword(password)
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          username,
          password_hash: passwordHash,
          role,
          full_name: fullName
        })
        .select()
        .single()

      if (error) {
        console.error('Registration error:', error)
        return { success: false, error: 'Eroare la înregistrare' }
      }

      if (data) {
        const userData = {
          id: data.id,
          username: data.username,
          role: data.role,
          full_name: data.full_name
        }
        
        // Create session
        const sessionToken = generateSessionToken()
        localStorage.setItem('session_token', sessionToken)
        localStorage.setItem('user_data', JSON.stringify(userData))
        
        setUser(userData)
        return { success: true }
      } else {
        return { success: false, error: 'Eroare la înregistrare' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Eroare la înregistrare' }
    }
  }

  const logout = () => {
    localStorage.removeItem('session_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isTherapist: user?.role === 'therapist',
    isPatient: user?.role === 'patient'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
