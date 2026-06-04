import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Rentals from './pages/Rentals'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminVehicles from './pages/AdminVehicles'
import AdminPending from './pages/AdminPending'
import AdminReports from './pages/AdminReports'
import AdminSettings from './pages/AdminSettings'
import DealerDashboard from './pages/DealerDashboard'
import DealerPublish from './pages/DealerPublish'
import DealerPublications from './pages/DealerPublications'
import DealerRequests from './pages/DealerRequests'
import DealerStats from './pages/DealerStats'
import DealerProfile from './pages/DealerProfile'
import UserDashboard from './pages/UserDashboard'
import UserFavorites from './pages/UserFavorites'
import UserReservations from './pages/UserReservations'
import MapPage from './pages/Map'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/rentals" element={<Rentals />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dealer"
            element={
              <ProtectedRoute roles={["dealer"]}>
                <DealerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute roles={["user","dealer","admin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/favorites" element={<ProtectedRoute roles={["user"]}><UserFavorites /></ProtectedRoute>} />
          <Route path="/reservations" element={<ProtectedRoute roles={["user"]}><UserReservations /></ProtectedRoute>} />

          <Route path="/dealer/publish" element={<ProtectedRoute roles={["dealer"]}><DealerPublish /></ProtectedRoute>} />
          <Route path="/dealer/publications" element={<ProtectedRoute roles={["dealer"]}><DealerPublications /></ProtectedRoute>} />
          <Route path="/dealer/requests" element={<ProtectedRoute roles={["dealer"]}><DealerRequests /></ProtectedRoute>} />
          <Route path="/dealer/stats" element={<ProtectedRoute roles={["dealer"]}><DealerStats /></ProtectedRoute>} />
          <Route path="/dealer/profile" element={<ProtectedRoute roles={["dealer"]}><DealerProfile /></ProtectedRoute>} />

          <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/vehicles" element={<ProtectedRoute roles={["admin"]}><AdminVehicles /></ProtectedRoute>} />
          <Route path="/admin/pending" element={<ProtectedRoute roles={["admin"]}><AdminPending /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute roles={["admin"]}><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roles={["admin"]}><AdminSettings /></ProtectedRoute>} />

          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
