import { useState, useEffect } from 'react'

function Estadisticas() {
  const [stats, setStats] = useState([])
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Hacemos las dos peticiones al servidor al mismo tiempo
    Promise.all([
      fetch('http://localhost:4000/api/stats').then(res => res.json()),
      fetch('http://localhost:4000/api/ventas').then(res => res.json())
    ])
    .then(([datosStats, datosVentas]) => {
      setStats(datosStats)
      setVentas(datosVentas)
      setCargando(false)
    })
    .catch(err => {
      console.error("Error al cargar las estadísticas:", err)
      setCargando(false)
    })
  }, [])

  if (cargando) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  )

  // Calculamos los totales generales sumando los datos de la vista SQL
  const ingresosTotales = stats.reduce((acc, pais) => acc + Number(pais.ingresos_totales), 0)
  const reservasTotales = stats.reduce((acc, pais) => acc + Number(pais.total_reservas), 0)

  return (
    <div className="max-w-7xl mx-auto p-8 animate-fadeIn">
      
      <div className="mb-10 flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-2xl text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase">Panel de Control</h2>
          <p className="text-slate-500 font-medium text-sm">Visión general del rendimiento de Tsunami Viajes</p>
        </div>
      </div>

      {/* TARJETAS DE RESUMEN GLOBALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Tarjeta 1: Ingresos */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">Ingresos Totales</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{ingresosTotales.toLocaleString('es-ES')}€</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Tarjeta 2: Reservas */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">Viajes Vendidos</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{reservasTotales}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Tarjeta 3: Destinos Activos */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">Destinos Top</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{stats.length}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.204 11h9.592M8.72 15.688A10.02 10.02 0 0112 16a10.02 10.02 0 013.28-.312m-6.56-4.688a10.02 10.02 0 013.28-.312M12 16a10.02 10.02 0 003.28-.312m-6.56-4.688a10.02 10.02 0 003.28-.312m0 0A10.02 10.02 0 0112 12c-1.3 0-2.54-.25-3.68-.704M15.68 15.688A10.02 10.02 0 0012 16c-1.3 0-2.54-.25-3.68-.704m0 0A10.02 10.02 0 0112 12c1.3 0 2.54.25 3.68.704" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* TABLA 1: RANKING DE PAÍSES (Desde v_estadisticas_paises) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4">
            <h3 className="text-white font-bold text-lg">Ranking de Facturación por País</h3>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm uppercase border-b border-slate-100">
                  <th className="pb-3 font-semibold">País</th>
                  <th className="pb-3 font-semibold">Reservas</th>
                  <th className="pb-3 font-semibold text-right">Ingresos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.map((pais, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-800">{pais.pais}</td>
                    <td className="py-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold text-sm">
                        {pais.total_reservas}
                      </span>
                    </td>
                    <td className="py-4 font-black text-slate-800 text-right">
                      {Number(pais.ingresos_totales).toLocaleString('es-ES')}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA 2: ÚLTIMAS VENTAS EN TIEMPO REAL (Desde v_resumen_ventas) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">Últimas 10 Reservas</h3>
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm uppercase border-b border-slate-100">
                  <th className="pb-3 font-semibold">Cliente</th>
                  <th className="pb-3 font-semibold">Destino</th>
                  <th className="pb-3 font-semibold text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ventas.length > 0 ? (
                  ventas.map((venta, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4">
                        <p className="font-bold text-slate-800">{venta.cliente}</p>
                        <p className="text-xs text-slate-400">{new Date(venta.fecha).toLocaleDateString()}</p>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-600">{venta.pais}</td>
                      <td className="py-4 font-black text-green-600 text-right">+{venta.importe}€</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-slate-400 italic">No hay ventas recientes</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Estadisticas