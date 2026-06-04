import React from 'react'
import { useAuth } from '../context/AuthContext'
import CarCard from '../components/CarCard'

export default function DealerPublications() {
  const { getPublishedCars } = useAuth()
  const cars = getPublishedCars()

  return (
    <section style={{padding:24}}>
      <h2>Mis publicaciones</h2>
      <p>Revisa todos tus anuncios activos para venta o alquiler.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {cars.length === 0 ? (
          <p style={{color:'#94a3b8'}}>No tienes publicaciones activas. Agrega un vehículo desde la sección de publicar.</p>
        ) : cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </section>
  )
}
