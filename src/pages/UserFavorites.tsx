import React from 'react'
import { useAuth } from '../context/AuthContext'
import CarCard from '../components/CarCard'

export default function UserFavorites() {
  const { getAvailableCars } = useAuth()
  const cars = getAvailableCars().filter(car => car.type === 'sale')

  return (
    <section style={{padding:24}}>
      <h2>Favoritos</h2>
      <p>Aquí verás los vehículos que guardes como favoritos desde el marketplace.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {cars.length === 0 ? (
          <p style={{color:'#94a3b8'}}>No hay favoritos todavía. Ve a Marketplace y marca los autos que te interesen.</p>
        ) : cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </section>
  )
}
