import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Rentals from './pages/Rentals'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
