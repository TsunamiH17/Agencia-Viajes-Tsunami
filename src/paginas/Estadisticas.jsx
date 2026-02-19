import React, { useEffect, useState } from 'react';

const Estadisticas = () => {
  const [stats, setStats] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Llamadas paralelas a las vistas de tu base de datos
        const [resStats, resVentas] = await Promise.all([
          fetch('http://localhost:4000/api/admin/stats-paises'),
          fetch('http://localhost:4000/api/admin/resumen-ventas')
        ]);

        const dataStats = await resStats.json();
        const dataVentas = await resVentas.json();

        setStats(dataStats);
        setVentas(dataVentas);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 animate-fadeIn">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          📊 Panel de Control <span className="text-blue-600">Estadísticas</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium italic">Información en tiempo real extraída de MySQL</p>
      </header>
      
      {/* Ranking de Países - Basado en v_estadisticas_paises */}
      <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-slideIn">
        <div className="bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🌍 Ranking de Países más Rentables
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">País</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Reservas</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Ingresos Totales</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Rating Medio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((s, index) => (
                <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">{s.pais}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded-lg text-sm font-bold">{s.total_reservas}</span>
                  </td>
                  <td className="p-4 font-black text-blue-600">{s.ingresos_totales?.toLocaleString()} €</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {'★'.repeat(Math.round(s.rating_medio_paquetes))}
                      <span className="text-slate-400 text-xs font-bold ml-1">({s.rating_medio_paquetes})</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Historial de Ventas - Basado en v_resumen_ventas */}
      <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-slideIn" style={{ animationDelay: '0.2s' }}>
        <div className="bg-blue-600 p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🧾 Historial de Ventas Recientes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Cliente</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Paquete</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Importe</th>
                <th className="p-4 text-xs font-black uppercase text-slate-400 tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ventas.map((v, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        {v.cliente?.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-700">{v.cliente}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{v.paquete}</td>
                  <td className="p-4 font-bold text-green-600">{v.importe} €</td>
                  <td className="p-4 text-slate-400 text-xs font-bold">
                    {new Date(v.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Estadisticas;