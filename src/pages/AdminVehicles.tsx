import React from 'react'
import { useAuth } from '../context/AuthContext'
import CarCard from '../components/CarCard'

export default function AdminVehicles() {
  const { cars } = useAuth()

  return (
    <section style={{padding:24}}>
      <h2>Vehículos</h2>
      <p>Gestiona el inventario completo disponible en la plataforma.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {cars.length === 0 ? (
          <p style={{color:'#94a3b8'}}>No hay vehículos registrados por ahora.</p>
        ) : cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </section>
  )
}
