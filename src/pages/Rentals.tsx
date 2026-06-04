import React from 'react'
import CarCard from '../components/CarCard'
import { useAuth } from '../context/AuthContext'

export default function Rentals(){
  const { getAvailableCars } = useAuth()
  const cars = getAvailableCars().filter(car => car.type === 'rent')

  return (
    <section style={{padding:24}}>
      <h2>Alquileres</h2>
      <p>Encuentra los vehículos disponibles para alquiler.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {cars.length === 0 ? <p style={{color:'#94a3b8'}}>No hay vehículos para alquilar por ahora.</p> : cars.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>
  )
}
