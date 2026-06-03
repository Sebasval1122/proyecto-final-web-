import React from 'react'
import CarCard from '../components/CarCard'
import { Car } from '../types'

const sample: Car[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2022, price: 18000, type: 'sale' },
  { id: '2', make: 'Tesla', model: 'Model 3', year: 2024, price: 42000, type: 'sale' }
]

export default function Marketplace(){
  return (
    <section style={{padding:24}}>
      <h2>Marketplace</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {sample.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>
  )
}
