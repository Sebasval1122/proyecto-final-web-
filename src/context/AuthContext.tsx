import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, Role, Transaction, PickupPoint, UserProfile as Profile } from '../types'

export type UserProfile = Profile & {
  password?: string
}

type AuthContextType = {
  user: UserProfile | null
  cars: Car[]
  transactions: Transaction[]
  pickupPoints: PickupPoint[]
  login: (email: string, password: string, role?: Role) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role?: Role) => Promise<void>
  publishCar: (vehicle: Omit<Car, 'id' | 'status' | 'ownerId' | 'ownerName' | 'postedBy'>) => Promise<void>
  addPickupPoint: (name: string, address: string) => Promise<void>
  markDealFinalized: (transactionId: string) => void
  getAvailableCars: () => Car[]
  getPublishedCars: () => Car[]
  getDealsForDealer: () => Transaction[]
  getOrdersForUser: () => Transaction[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LS_KEY = 'drivepoint_auth'
const USERS_KEY = 'drivepoint_users'
const CARS_KEY = 'drivepoint_cars'
const TRANSACTIONS_KEY = 'drivepoint_transactions'
const PICKUPS_KEY = 'drivepoint_pickups'

const defaultUsers: UserProfile[] = [
  {
    id: 'admin-001',
    name: 'Admin Drive',
    email: 'admin@drivepoint.test',
    role: 'admin',
    password: 'Admin1234!'
  },
  {
    id: 'dealer-001',
    name: 'Concesionaria Alfa',
    email: 'dealer@drivepoint.test',
    role: 'dealer',
    password: 'Dealer1234!'
  },
  {
    id: 'user-001',
    name: 'Cliente Demo',
    email: 'user@drivepoint.test',
    role: 'user',
    password: 'User1234!'
  }
]

const defaultCars: Car[] = [
  {
    id: 'car-001',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 18500,
    type: 'sale',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-002',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 42000,
    type: 'sale',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-003',
    make: 'Hyundai',
    model: 'Kona',
    year: 2021,
    price: 49,
    type: 'rent',
    status: 'available',
    ownerId: 'dealer-001',
    ownerName: 'Concesionaria Alfa',
    postedBy: 'dealer'
  },
  {
    id: 'car-004',
    make: 'Ford',
    model: 'EcoSport',
    year: 2020,
    price: 22,
    type: 'rent',
    status: 'available',
    ownerId: 'user-001',
    ownerName: 'Cliente Demo',
    postedBy: 'user'
  }
]

const defaultTransactions: Transaction[] = [
  {
    id: 'tx-001',
    carId: 'car-001',
    carTitle: 'Toyota Corolla',
    buyerEmail: 'user@drivepoint.test',
    sellerEmail: 'dealer@drivepoint.test',
    type: 'sale',
    status: 'finalizado',
    amount: 18500,
    date: '2026-05-01'
  },
  {
    id: 'tx-002',
    carId: 'car-003',
    carTitle: 'Hyundai Kona',
    buyerEmail: 'user@drivepoint.test',
    sellerEmail: 'dealer@drivepoint.test',
    type: 'rent',
    status: 'proceso',
    amount: 245,
    date: '2026-06-01'
  }
]

const defaultPickupPoints: PickupPoint[] = [
  {
    id: 'pickup-001',
    name: 'Terminal Norte',
    address: 'Av. Principal 540',
    status: 'active',
    createdBy: 'dealer@drivepoint.test'
  },
  {
    id: 'pickup-002',
    name: 'Parque Central',
    address: 'Calle 12 #34-56',
    status: 'active',
    createdBy: 'dealer@drivepoint.test'
  }
]

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [cars, setCars] = useState<Car[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) setUser(JSON.parse(raw))

    const storedUsers = localStorage.getItem(USERS_KEY)
    if (!storedUsers) localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))

    const storedCars = localStorage.getItem(CARS_KEY)
    if (!storedCars) {
      localStorage.setItem(CARS_KEY, JSON.stringify(defaultCars))
      setCars(defaultCars)
    } else {
      setCars(JSON.parse(storedCars))
    }

    const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY)
    if (!storedTransactions) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(defaultTransactions))
      setTransactions(defaultTransactions)
    } else {
      setTransactions(JSON.parse(storedTransactions))
    }

    const storedPickups = localStorage.getItem(PICKUPS_KEY)
    if (!storedPickups) {
      localStorage.setItem(PICKUPS_KEY, JSON.stringify(defaultPickupPoints))
      setPickupPoints(defaultPickupPoints)
    } else {
      setPickupPoints(JSON.parse(storedPickups))
    }
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user))
    else localStorage.removeItem(LS_KEY)
  }, [user])

  useEffect(() => {
    localStorage.setItem(CARS_KEY, JSON.stringify(cars))
  }, [cars])

  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(PICKUPS_KEY, JSON.stringify(pickupPoints))
  }, [pickupPoints])

  const readUsers = (): UserProfile[] => {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const saveUsers = (list: UserProfile[]) => localStorage.setItem(USERS_KEY, JSON.stringify(list))

  const login = async (email: string, password: string, role?: Role) => {
    const users = readUsers()
    const found = users.find(
      u => u.email === email && u.password === password && (!role || u.role === role)
    )

    if (found) {
      setUser(found)
      return
    }

    const existing = users.find(u => u.email === email)
    if (existing) {
      throw new Error('Email o contraseña incorrectos')
    }

    const tmp: UserProfile = {
      id: generateId(),
      name: email.split('@')[0],
      email,
      role: role || 'user',
      password
    }
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
    const profile: UserProfile = { id: generateId(), name, email, role, password }
    saveUsers([...users, profile])
    setUser(profile)
    navigate('/')
  }

  const publishCar = async (vehicle: Omit<Car, 'id' | 'status' | 'ownerId' | 'ownerName' | 'postedBy'>) => {
    if (!user) throw new Error('Necesitas iniciar sesión para publicar un vehículo')
    const newCar: Car = {
      ...vehicle,
      id: generateId(),
      status: 'available',
      ownerId: user.id,
      ownerName: user.name,
      postedBy: user.role
    }
    setCars(prev => [...prev, newCar])
  }

  const addPickupPoint = async (name: string, address: string) => {
    if (!user) throw new Error('Necesitas iniciar sesión para agregar un punto de entrega')
    const newPoint: PickupPoint = {
      id: generateId(),
      name,
      address,
      status: 'active',
      createdBy: user.email
    }
    setPickupPoints(prev => [...prev, newPoint])
  }

  const markDealFinalized = (transactionId: string) => {
    setTransactions(prev => prev.map(item => item.id === transactionId ? { ...item, status: 'finalizado' } : item))
  }

  const getAvailableCars = () => cars.filter(car => car.status === 'available')
  const getPublishedCars = () => (user ? cars.filter(car => car.ownerId === user.id) : [])
  const getDealsForDealer = () => (user ? transactions.filter(tx => tx.sellerEmail === user.email) : [])
  const getOrdersForUser = () => (user ? transactions.filter(tx => tx.buyerEmail === user.email) : [])

  return (
    <AuthContext.Provider value={{
      user,
      cars,
      transactions,
      pickupPoints,
      login,
      logout,
      register,
      publishCar,
      addPickupPoint,
      markDealFinalized,
      getAvailableCars,
      getPublishedCars,
      getDealsForDealer,
      getOrdersForUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
