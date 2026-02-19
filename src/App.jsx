import { useState, useEffect } from 'react'
import Login from './paginas/Login'
import Header from './paginas/Header'
import Footer from './paginas/Footer'
import Bloque1 from './componentes/Bloque1'
import Bloque2 from './componentes/Bloque2' 
import Bloque3 from './componentes/Bloque3'
import Paises from './paginas/Paises'
import Noticias from './paginas/Noticias'
import Register from './paginas/Register'
import Estadisticas from './paginas/Estadisticas' 
import Carrito from './paginas/Carrito'
import Perfil from './paginas/Perfil'

function App() {
  // 1. CARGA INICIAL: Recuperamos al usuario al abrir o refrescar la web
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const saved = localStorage.getItem('usuario_tsunami')
    return saved ? JSON.parse(saved) : null
  })

  const [carrito, setCarrito] = useState([])
  const [route, setRoute] = useState(window.location.hash || '#inicio')

  // 2. NAVEGACIÓN: Escucha los cambios en la URL (los hashes #)
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#inicio')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // 3. PERSISTENCIA: Si el usuario cambia, lo guardamos o borramos del localStorage
  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem('usuario_tsunami', JSON.stringify(usuarioLogueado))
    } else {
      localStorage.removeItem('usuario_tsunami')
      localStorage.removeItem('token_tsunami')
    }
  }, [usuarioLogueado])

  const handleLogin = (datosServidor) => {
    setUsuarioLogueado(datosServidor.user)
    localStorage.setItem('token_tsunami', datosServidor.token)
    window.location.hash = '#inicio'
  }

  const handleLogout = () => {
    setUsuarioLogueado(null)
    setCarrito([]) 
    window.location.hash = '#inicio'
  }

  const agregarAlCarrito = (viaje) => {
    setCarrito((prev) => [...prev, viaje])
    alert(`🌟 ${viaje.name} se ha añadido a tu selección.`)
  }

  const vaciarCarrito = () => setCarrito([])
  
  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index))
  }

  // 4. VISTAS ESPECIALES (Login y Registro no llevan Header/Footer)
  if (route === '#login' || route === '#/login') {
    return <Login onLogin={handleLogin} backgroundImage="/images/fondos/1456.jpg" />
  }

  if (route === '#register' || route === '#/register') {
    return <Register onRegister={handleLogin} backgroundImage="/images/fondos/1460.jpg" />
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header 
        usuario={usuarioLogueado} 
        onLogout={handleLogout} 
        cartCount={carrito.length} 
      />

      <main className="flex-grow">
        {(() => {
          switch (true) {
            case route === '#paises' || route === '#/paises':
              return <Paises user={usuarioLogueado} onAgregarCarrito={agregarAlCarrito} />
            
            case route === '#carrito' || route === '#/carrito':
              return (
                <Carrito 
                  carrito={carrito} 
                  eliminarDelCarrito={eliminarDelCarrito} 
                  vaciarCarrito={vaciarCarrito}
                  user={usuarioLogueado} 
                />
              )

            case route === '#perfil' || route === '#/perfil':
              return <Perfil user={usuarioLogueado} onLogout={handleLogout} />
            
            case route.startsWith('#noticias'):
              return <Noticias usuarioLogueado={usuarioLogueado} />

            case route === '#estadisticas':
              if (usuarioLogueado?.role === 'admin') {
                return <Estadisticas />
              }
              window.location.hash = '#inicio'
              return null
            
            case route === '#inicio' || route === '':
            default:
              return (
                <div className="animate-fadeIn">
                  <Bloque1 usuario={usuarioLogueado} />
                  <Bloque2 />
                  <Bloque3 />
                </div>
              )
          }
        })()}
      </main>

      <Footer />
    </div>
  )
}

export default App