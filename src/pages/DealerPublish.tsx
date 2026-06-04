import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useCars } from '../hooks/useCars'
import PublishCarForm from '../components/forms/PublishCarForm'

export default function DealerPublish(){
  const { user } = useAuth()
  const { publishCar } = useCars()

  const handlePublish = async (data: any) => {
    if (!user) return
    await publishCar(user, {
      make: data.make,
      model: data.model,
      year: Number(data.year),
      price: Number(data.price),
      type: data.type as 'sale' | 'rent'
    })
  }

  return (
    <section style={{padding:24,maxWidth:600,margin:'0 auto'}}>
      <h1 style={{fontSize:32,marginBottom:24}}>Publicar nuevo vehículo</h1>
      <p style={{color:'#94a3b8',marginBottom:32}}>Completa el formulario para listar un auto en el marketplace o catálogo de rentas.</p>
      <PublishCarForm onSubmit={handlePublish} />
    </section>
  )
}
