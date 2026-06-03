import React from 'react'
import AdminUsers from './AdminUsers'

export default function AdminDashboard(){
  return (
    <section style={{padding:24}}>
      <h1>Administración — DrivePoint</h1>
      <p>Panel administrativo: gestionar usuarios y la plataforma.</p>
      <div style={{marginTop:24}}>
        <AdminUsers />
      </div>
    </section>
  )
}
