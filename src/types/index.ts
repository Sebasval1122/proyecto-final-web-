export type Role = 'admin' | 'dealer' | 'user'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: Role
}

export type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  image?: string
  type: 'sale' | 'rent'
  status: 'available' | 'sold' | 'rented'
  ownerId: string
  ownerName: string
  postedBy: Role
}

export type Transaction = {
  id: string
  carId: string
  carTitle: string
  buyerEmail: string
  sellerEmail: string
  type: 'sale' | 'rent'
  status: 'proceso' | 'finalizado'
  amount: number
  date: string
}

export type PickupPoint = {
  id: string
  name: string
  address: string
  status: 'active' | 'inactive'
  createdBy: string
}
