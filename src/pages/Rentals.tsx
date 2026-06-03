import React from 'react'
import CarCard from '../components/CarCard'
import { Car } from '../types'

const sample: Car[] = [
  { id: 'r1', make: 'Hyundai', model: 'Kona', year: 2021, price: 49, type: 'rent' },
  { id: 'r2', make: 'Nissan', model: 'Leaf', year: 2020, price: 39, type: 'rent' }
]

export default function Rentals(){
  return (
    <section style={{padding:24}}>
      <h2>Alquileres</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {sample.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>
  )
}
