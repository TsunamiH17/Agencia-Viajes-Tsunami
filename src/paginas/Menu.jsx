import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './paginas/Login'
import Register from './paginas/Register'
import Menu from './paginas/Menu'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuario_tsunami')
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada))
    }
  }, [])

  const handleLogin = (datos) => {
    setUsuario(datos.user)
    localStorage.setItem('usuario_tsunami', JSON.stringify(datos.user))
    localStorage.setItem('token_tsunami', datos.token)
  }

  const handleLogout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario_tsunami')
    localStorage.removeItem('token_tsunami')
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
        {/* Navbar Moderno */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                <span className="text-xl">✈️</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter sm:block hidden">
                TSUNAMI<span className="text-blue-600">VIAJES</span>
              </h1>
            </Link>
            
            <div className="flex items-center gap-6">
              {usuario ? (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Viajero</p>
                    <p className="text-sm font-bold text-slate-700">{usuario.name}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border border-transparent hover:border-red-100 shadow-sm"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-blue-600 px-4 py-2 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95">
                    Registro
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route 
              path="/login" 
              element={!usuario ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
            />
            
            <Route 
              path="/register" 
              element={!usuario ? <Register /> : <Navigate to="/" />} 
            />
            
            <Route 
              path="/" 
              element={usuario ? <Menu user={usuario} /> : <Navigate to="/login" />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App