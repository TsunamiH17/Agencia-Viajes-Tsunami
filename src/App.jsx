import { useState, useEffect } from 'react'
import Login from './paginas/Login'
import Header from './paginas/Header'
import Footer from './paginas/Footer'
import Bloque1 from './componentes/bloque1'
import Bloque2 from './componentes/Bloque2' 
import Bloque3 from './componentes/Bloque3'
import Paises from './paginas/Paises'
import Noticias from './paginas/Noticias'
import Register from './paginas/Register'
import Estadisticas from './paginas/Estadisticas' 

function App() {
  // 1. ESTADO GLOBAL DEL USUARIO (Persistencia)
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const saved = localStorage.getItem('usuario_tsunami')
    return saved ? JSON.parse(saved) : null
  })

  // 2. ESTADO GLOBAL DEL CARRITO
  const [carrito, setCarrito] = useState([])

  // 3. ESTADO DE NAVEGACIÓN
  const [route, setRoute] = useState(window.location.hash || '#inicio')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#inicio')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem('usuario_tsunami', JSON.stringify(usuarioLogueado))
    } else {
      localStorage.removeItem('usuario_tsunami')
      localStorage.removeItem('token_tsunami')
    }
  }, [usuarioLogueado])

  // --- FUNCIONES DE SESIÓN ---
  const handleLogin = (datosServidor) => {
    setUsuarioLogueado(datosServidor.user)
    localStorage.setItem('token_tsunami', datosServidor.token)
    window.location.hash = '#inicio'
  }

  const handleLogout = () => {
    setUsuarioLogueado(null)
    setCarrito([]) // Vaciamos carrito al cerrar sesión por seguridad
    window.location.hash = '#inicio'
  }

  // --- FUNCIONES DEL CARRITO ---
  const agregarAlCarrito = (viaje) => {
    // Evitamos duplicados en el carrito si lo deseas, o permitimos varios
    setCarrito((prev) => [...prev, viaje])
    alert(`🌟 ${viaje.name} se ha añadido a tu selección.`)
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index))
  }

  // --- RENDERIZADO ---

  if (route === '#login' || route === '#/login') {
    return <Login onLogin={handleLogin} backgroundImage="/images/fondos/1456.jpg" />
  }

  if (route === '#register' || route === '#/register') {
    return <Register onRegister={handleLogin} backgroundImage="/images/fondos/1460.jpg" />
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Pasamos el contador del carrito al Header para que el usuario vea cuántos lleva */}
      <Header 
        usuario={usuarioLogueado} 
        onLogout={handleLogout} 
        cartCount={carrito.length} 
      />

      <main className="flex-grow">
        {(() => {
          switch (true) {
            case route === '#paises' || route === '#/paises':
              // Ahora Paises no compra directo, sino que añade al carrito global
              return (
                <Paises 
                  user={usuarioLogueado} 
                  onAgregarCarrito={agregarAlCarrito} 
                />
              )

            case route === '#carrito' || route === '#/carrito':
              // Aquí iría tu nueva página de Checkout para pagar con el saldo de 'wallets'
              return (
                <div className="max-w-4xl mx-auto p-10">
                  <h2 className="text-3xl font-black mb-6">Tu Carrito ({carrito.length})</h2>
                  {carrito.length > 0 ? (
                    <div className="bg-white p-6 rounded-3xl shadow-lg">
                      {carrito.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-4">
                          <div>
                            <p className="font-bold text-lg">{item.name}</p>
                            <p className="text-blue-600 font-black">{item.price}€</p>
                          </div>
                          <button 
                            onClick={() => eliminarDelCarrito(index)}
                            className="text-red-500 font-bold hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                      <div className="mt-8 flex justify-between items-center">
                        <p className="text-2xl font-black">Total: {carrito.reduce((acc, item) => acc + Number(item.price), 0)}€</p>
                        <button 
                          onClick={() => alert("Próximo paso: Ejecutar PROCEDURE sp_comprar_paquete para cada item")}
                          className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700"
                        >
                          Pagar con mi Saldo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">El carrito está vacío. ¡Explora nuestros destinos!</p>
                  )}
                </div>
              )
            
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