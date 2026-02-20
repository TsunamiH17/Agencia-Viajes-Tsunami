import { useState, useEffect } from 'react'

function Paises({ user, onAgregarCarrito }) {
  // --- ESTADOS ---
  const [viajes, setViajes] = useState([]) // Aquí guardo todos los países que vienen de la API
  const [error, setError] = useState(null) // Para guardar el mensaje si el servidor falla
  const [cargando, setCargando] = useState(true) // Para mostrar el spinner de carga

  // Estados para el buscador y el selector de orden
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('defecto')

  // Estados para el modal de vuelos
  const [modalAbierto, setModalAbierto] = useState(false)
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null)
  const [vuelos, setVuelos] = useState([]) // Aquí guardo los vuelos que encuentro para un país
  const [buscandoVuelos, setBuscandoVuelos] = useState(false)

  // --- EFECTOS (Llamada a la API) ---
  useEffect(() => {
    // Al cargar el componente, pido la lista de países al backend (puerto 4000)
    fetch('http://localhost:4000/api/paises')
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron obtener los destinos del servidor')
        return res.json()
      })
      .then(data => {
        setViajes(data) // Guardo los datos en el estado
        setCargando(false) // Quito el spinner de carga
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  // --- LÓGICA DE VUELOS ---
  const abrirModalVuelos = async (destino) => {
    // Si el usuario no está logueado, no le dejo reservar
    if (!user) {
      alert("⚠️ Debes iniciar sesión para configurar tu viaje.");
      return;
    }
    
    setDestinoSeleccionado(destino);
    setModalAbierto(true);
    setBuscandoVuelos(true);

    try {
      // Llamo a la API de vuelos pasando el código del país (ej: 'JPN')
      const respuesta = await fetch(`http://localhost:4000/api/vuelos/${destino.code}`);
      const datosVuelos = await respuesta.json();
      setVuelos(datosVuelos);
    } catch (err) {
      console.error("Error al obtener vuelos:", err);
    } finally {
      setBuscandoVuelos(false);
    }
  };

  const confirmarVuelo = (vueloElegido) => {
    // Cuando el usuario elige un vuelo, creo un objeto que mezcla el Destino + el Vuelo
    const viajeConfigurado = {
      ...destinoSeleccionado,
      flight: vueloElegido,
      nombreVuelo: `Salida desde ${vueloElegido.origin} el ${new Date(vueloElegido.departure_date).toLocaleDateString()}`
    };
    
    // Lo mando a la función que viene por props de App.js para meterlo al carrito
    onAgregarCarrito(viajeConfigurado);
    setModalAbierto(false); // Cierro el modal
  };

  // --- FILTRADO Y ORDENACIÓN ---
  // Esta variable se recalcula cada vez que escribimos en el buscador o cambiamos el select
  const viajesProcesados = viajes
    .filter(destino => 
      destino.name.toLowerCase().includes(busqueda.toLowerCase()) || 
      (destino.description && destino.description.toLowerCase().includes(busqueda.toLowerCase()))
    )
    .sort((a, b) => {
      if (orden === 'precio_asc') return a.price - b.price;
      if (orden === 'precio_desc') return b.price - a.price;
      if (orden === 'nombre_az') return a.name.localeCompare(b.name);
      return 0;
    });

  // Si todavía está cargando, muestro un spinner de Tailwind centrado
  if (cargando) return (
    <div className="flex justify-center items-center min-h-[60vh] animate__animated animate__fadeIn">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-8 relative">
      
      {/* Título de la sección con un borde izquierdo azul grueso */}
      <div className="mb-10 animate__animated animate__fadeInLeft">
        <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter border-l-[12px] border-blue-600 pl-6">
          Explora el <span className="text-blue-600">Mundo</span>
        </h2>
        <p className="text-slate-500 mt-3 text-lg font-medium">Encuentra tu próximo destino con estilo</p>
      </div>

      {/* Mensaje de error (solo si falla el fetch) */}
      {error && (
        <div className="bg-red-50 border-red-200 border-2 text-red-600 p-5 rounded-2xl mb-8 flex items-center gap-3 animate__animated animate__shakeX">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      {/* --- BARRA DE BÚSQUEDA Y FILTROS --- */}
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white mb-12 flex flex-col md:flex-row gap-5 items-center justify-between animate__animated animate__fadeInUp">
        {/* Input de búsqueda con icono de lupa SVG */}
        <div className="relative w-full md:w-1/2 lg:w-2/3">
          <svg className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="¿A dónde quieres ir?" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-100/50 pl-16 pr-6 py-5 rounded-[1.8rem] border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 outline-none text-slate-800 font-bold transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Selector de orden (Precio, Nombre, etc.) */}
        <div className="w-full md:w-auto flex items-center gap-4">
          <select 
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="w-full md:w-auto bg-slate-100/50 border-2 border-transparent py-5 pl-6 pr-14 rounded-[1.8rem] text-slate-700 font-extrabold focus:border-blue-600 focus:ring-8 focus:ring-blue-100 outline-none cursor-pointer appearance-none transition-all"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
          >
            <option value="defecto">⭐ Recomendados</option>
            <option value="precio_asc">💰 Económicos primero</option>
            <option value="precio_desc">💎 Premium primero</option>
            <option value="nombre_az">🔤 Orden A-Z</option>
          </select>
        </div>
      </div>

      {/* --- RENDERIZADO DE LAS TARJETAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {viajesProcesados.length > 0 ? (
          viajesProcesados.map((destino, index) => (
            <div 
              key={destino.id} 
              className="group bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden hover:-translate-y-4 transition-all duration-500 border border-slate-50 animate__animated animate__fadeInUp"
              // Cálculo para que las tarjetas salgan una detrás de otra con delay
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Imagen con el precio flotando arriba a la derecha */}
              <div className="relative h-72 overflow-hidden">
                <img src={destino.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={destino.name}/>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl font-black text-blue-600 shadow-xl border border-white">
                  {destino.price ? `${destino.price}€` : 'Consultar'} 
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{destino.name}</h3>
                  <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-100">{destino.code}</span>
                </div>
                {/* line-clamp-2 corta el texto a 2 líneas para que todas las tarjetas midan lo mismo */}
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">{destino.description}</p>

                <button 
                  onClick={() => abrirModalVuelos(destino)}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95 flex justify-center items-center gap-3 group/btn"
                >
                  <span>Configurar mi Viaje</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">🚀</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Pantalla de "No se han encontrado resultados" */
          <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-slate-100 animate__animated animate__pulse">
            <p className="text-7xl mb-6">🏝️</p>
            <p className="text-slate-800 font-black text-3xl">Sin resultados para "{busqueda}"</p>
            <button 
              onClick={() => setBusqueda('')} 
              className="mt-8 bg-blue-50 text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      {/* --- MODAL DE VUELOS --- */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh] animate__animated animate__zoomIn animate__faster border border-white">
            
            {/* Header del Modal con degradado azul */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-3xl font-black tracking-tight">Elige tu Vuelo</h3>
                <p className="text-blue-100 font-bold opacity-80 mt-1">Hacia: {destinoSeleccionado?.name}</p>
              </div>
              <button onClick={() => setModalAbierto(false)} className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all active:scale-90">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Cuerpo del Modal (Scrollable si hay muchos vuelos) */}
            <div className="p-8 overflow-y-auto bg-slate-50/50 flex-grow">
              {buscandoVuelos ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto mb-6"></div>
                  <p className="text-slate-500 font-black text-xl">Buscando las mejores rutas...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {vuelos.map((vuelo, idx) => (
                    <div 
                      key={vuelo.id} 
                      className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center hover:border-blue-400 transition-all shadow-sm group animate__animated animate__fadeInUp"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Información de Origen y Fechas */}
                      <div className="w-full sm:w-auto text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Salida</span>
                          <p className="font-black text-slate-800 text-2xl">{vuelo.origin}</p>
                        </div>
                        <div className="space-y-1 text-slate-500 font-bold text-sm">
                          <p>🛫 Ida: {new Date(vuelo.departure_date).toLocaleDateString()}</p>
                          <p>🛬 Vuelta: {new Date(vuelo.return_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      {/* Precio y Botón de Selección */}
                      <div className="text-center sm:text-right w-full sm:w-auto mt-6 sm:mt-0 pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l-2 border-slate-100 sm:pl-8">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Plus por vuelo</p>
                        <p className="text-3xl font-black text-blue-600 mb-4">+{vuelo.price}€</p>
                        <button 
                          onClick={() => confirmarVuelo(vuelo)}
                          className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
                        >
                          Seleccionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Paises