import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProfile, Role } from '../types'
import { authService } from '../services/auth.service'

type AuthContextType = {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  login: (email: string, password: string, role?: Role) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role?: Role) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const current = authService.getCurrentUser()
    if (current) setUser(current)
  }, [])

  const login = async (email: string, password: string, role?: Role) => {
    const profile = await authService.login(email, password, role)
    setUser(profile)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const register = async (name: string, email: string, password: string, role?: Role) => {
    const profile = await authService.register(name, email, password, role)
    setUser(profile)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
