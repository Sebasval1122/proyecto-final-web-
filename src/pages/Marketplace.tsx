import React from 'react'
import CarCard from '../components/ui/CarCard'
import { useCars } from '../hooks/useCars'

export default function Marketplace(){
  const { getAvailableCars } = useCars()
  const cars = getAvailableCars().filter(car => car.type === 'sale')

  return (
    <section style={{padding:24}}>
      <h2>Marketplace</h2>
      <p>Compra los vehículos disponibles publicados por la concesionaria y otros usuarios.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:16}}>
        {cars.length === 0 ? <p style={{color:'#94a3b8'}}>No hay vehículos a la venta en este momento.</p> : cars.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>
  )
}
