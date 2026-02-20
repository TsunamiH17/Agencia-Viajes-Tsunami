import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
// Importo mis páginas
import Login from './paginas/Login'
import Register from './paginas/Register'
import Menu from './paginas/Menu'

function App() {
  const [usuario, setUsuario] = useState(null) // Estado global para saber quién está conectado

  // Al abrir la web, miro si ya había una sesión guardada en el navegador
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuario_tsunami')
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada))
    }
  }, [])

  // Esta función se la paso al Login para que me devuelva los datos del usuario
  const handleLogin = (datos) => {
    setUsuario(datos.user)
    // Guardo en LocalStorage para que no se cierre la sesión al pulsar F5
    localStorage.setItem('usuario_tsunami', JSON.stringify(datos.user))
    localStorage.setItem('token_tsunami', datos.token) // El token por si hiciera falta para el back
  }

  // Limpio todo al salir
  const handleLogout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario_tsunami')
    localStorage.removeItem('token_tsunami')
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* --- NAVBAR GLOBAL --- */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Logo con Link para volver a la home */}
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl text-xl">✈️</div>
              <h1 className="font-black">TSUNAMI<span className="text-blue-600">VIAJES</span></h1>
            </Link>
            
            {/* Lógica de botones del Navbar */}
            <div className="flex items-center gap-6">
              {usuario ? (
                // Si hay usuario: muestro su nombre y botón de Salir
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-blue-500 font-black uppercase">Viajero</p>
                    <p className="text-sm font-bold">{usuario.name}</p>
                  </div>
                  <button onClick={handleLogout} className="bg-slate-100 px-5 py-2.5 rounded-xl text-xs font-black">Salir</button>
                </>
              ) : (
                // Si no hay usuario: botones de Login y Registro
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-bold text-slate-500">Login</Link>
                  <Link to="/register" className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl">Registro</Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* --- SISTEMA DE RUTAS --- */}
        <main className="max-w-7xl mx-auto">
          <Routes>
            {/* Si ya estoy logueado y voy a /login, me redirige a la home */}
            <Route 
              path="/login" 
              element={!usuario ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
            />
            
            <Route 
              path="/register" 
              element={!usuario ? <Register /> : <Navigate to="/" />} 
            />
            
            {/* La ruta principal (Menu) solo es accesible si estás logueado, si no, al login */}
            <Route 
              path="/" 
              element={usuario ? <Menu user={usuario} /> : <Navigate to="/login" />} 
            />

            {/* Si el usuario escribe cualquier cosa rara en la URL, lo mando a la home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App