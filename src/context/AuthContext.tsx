import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type Role = 'admin' | 'dealer' | 'user'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: Role
}

type AuthContextType = {
  user: UserProfile | null
  login: (email: string, password: string, role?: Role) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role?: Role) => Promise<void>
  createUser: (profile: UserProfile) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LS_KEY = 'drivepoint_auth'
const USERS_KEY = 'drivepoint_users'

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) setUser(JSON.parse(raw))
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user))
    else localStorage.removeItem(LS_KEY)
  }, [user])

  const readUsers = (): UserProfile[] => {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const saveUsers = (list: UserProfile[]) => localStorage.setItem(USERS_KEY, JSON.stringify(list))

  const login = async (email: string, password: string, role?: Role) => {
    // Mock auth: find user by email (role optional)
    const users = readUsers()
    const found = users.find(u => u.email === email && (!role || u.role === role))
    if (found) {
      setUser(found)
      return
    }
    // If not found, for convenience allow login as selected role creating a temporary profile
    const tmp: UserProfile = { id: generateId(), name: email.split('@')[0], email, role: role || 'user' }
    saveUsers([...users, tmp])
    setUser(tmp)
  }

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const register = async (name: string, email: string, password: string, role: Role = 'user') => {
    const users = readUsers()
    const exists = users.find(u => u.email === email)
    if (exists) throw new Error('El email ya está registrado')
    const profile: UserProfile = { id: generateId(), name, email, role }
    saveUsers([...users, profile])
    setUser(profile)
    navigate('/')
  }

  const createUser = (profile: UserProfile) => {
    const users = readUsers()
    saveUsers([...users, profile])
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, createUser }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
