import { useState, useEffect } from 'react'

function Paises() {
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Llamamos a la API que creamos en el index.js del servidor
    fetch('http://localhost:4000/api/paises')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener viajes')
        return res.json()
      })
      .then(data => setViajes(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-8 animate-fadeIn">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter border-l-8 border-blue-600 pl-4">
          Explora el Mundo
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Ofertas de Temporada</p>
      </div>

      {error && <p className="text-red-500 font-bold">⚠️ {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {viajes.length > 0 ? (
          viajes.map((destino) => (
            <div key={destino.id} className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destino.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={destino.name}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full font-black text-blue-600 shadow-lg">
                  {destino.price}€
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{destino.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {destino.description || 'Disfruta de una experiencia inolvidable en este destino seleccionado por Tsunami Viajes.'}
                </p>
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg active:scale-95">
                  Reservar Ahora
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">Buscando las mejores ofertas para ti...</p>
        )}
      </div>
    </div>
  )
}

export default Paises