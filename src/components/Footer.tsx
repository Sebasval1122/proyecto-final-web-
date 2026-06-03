import React from 'react'

export default function Footer(){
  return (
    <footer style={{padding:20,textAlign:'center',color:'#94a3b8'}}>
      © {new Date().getFullYear()} DrivePoint — Proyecto de Ingeniería
    </footer>
  )
}
