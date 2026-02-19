import { useState, useEffect } from 'react'

function Perfil({ user, onLogout }) {
  const [saldo, setSaldo] = useState(0)
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)

  // Estados para el Modal de Recarga
  const [mostrarModal, setMostrarModal] = useState(false)
  const [cantidadRecarga, setCantidadRecarga] = useState(100)
  const [procesandoPago, setProcesandoPago] = useState(false)

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:4000/api/wallet/${user.id}`)
      .then(res => res.json())
      .then(data => setSaldo(data.balance))
      .catch(err => console.error("Error al cargar saldo:", err));

    fetch(`http://localhost:4000/api/reservas/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar reservas:", err);
        setCargando(false);
      });
  }, [user]);

  // Función para procesar la recarga de saldo
  const handleRecargar = async () => {
    setProcesandoPago(true);
    
    try {
      const respuesta = await fetch('http://localhost:4000/api/wallet/recargar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          amount: cantidadRecarga
        })
      });

      if (respuesta.ok) {
        // Actualizamos el saldo visualmente sin tener que recargar la página
        setSaldo(Number(saldo) + Number(cantidadRecarga));
        setMostrarModal(false);
        alert(`✅ ¡Recarga de ${cantidadRecarga}€ completada con éxito!`);
      } else {
        alert("❌ Hubo un error procesando el pago.");
      }
    } catch (error) {
      console.error(error);
      alert("🚫 Error de conexión.");
    } finally {
      setProcesandoPago(false);
    }
  };

  if (!user) return <div className="p-20 text-center">Inicia sesión para ver tu perfil.</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 animate-fadeIn min-h-screen relative">
      
      {/* CABECERA DEL PERFIL Y SALDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* Tarjeta de Usuario */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-black border-4 border-white shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Hola, {user.name}</h2>
            <p className="text-slate-500 font-medium">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">
              Cliente {user.role === 'admin' ? 'Premium' : 'Estándar'}
            </span>
          </div>
        </div>

        {/* Tarjeta de Wallet */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-blue-200 font-medium mb-1 z-10">Saldo Tsunami Wallet</p>
          <h3 className="text-5xl font-black z-10">{Number(saldo).toLocaleString('es-ES')}€</h3>
          
          {/* BOTÓN QUE ABRE EL MODAL */}
          <button 
            onClick={() => setMostrarModal(true)}
            className="mt-4 bg-white hover:bg-slate-100 text-slate-900 text-sm font-black py-3 px-6 rounded-xl w-max z-10 transition-transform active:scale-95 shadow-lg"
          >
            + Añadir Fondos
          </button>
        </div>
      </div>

      {/* HISTORIAL DE RESERVAS */}
      <div>
        <h3 className="text-2xl font-black text-slate-800 mb-6 border-l-4 border-blue-600 pl-3">Tus Próximos Viajes</h3>
        {cargando ? (
          <p className="text-slate-500">Cargando tus aventuras...</p>
        ) : reservas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden relative">
                  <img src={reserva.image_url} alt={reserva.country_name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-sm">
                    {reserva.status === 'confirmed' ? '✅ Confirmado' : '⏳ Pendiente'}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-blue-600 uppercase mb-1">{reserva.country_name}</p>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{reserva.title}</h4>
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-xs text-slate-400">Importe pagado</p>
                      <p className="font-black text-lg text-slate-700">{reserva.total_paid}€</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      Reserva: {new Date(reserva.booking_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-3xl text-center border border-slate-100 shadow-sm">
            <p className="text-5xl mb-4">✈️</p>
            <p className="text-slate-600 font-medium">Aún no tienes reservas.</p>
            <a href="#paises" className="inline-block mt-4 text-blue-600 font-bold hover:underline">¡Encuentra tu próximo destino!</a>
          </div>
        )}
      </div>

      {/* --- MODAL DE PASARELA DE PAGO --- */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative transform transition-all">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <h3 className="text-2xl font-black text-slate-800 mb-1">Recargar Monedero</h3>
            <p className="text-slate-500 text-sm mb-6">Añade fondos a tu Tsunami Wallet de forma segura.</p>

            {/* Opciones de recarga rápidas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[50, 100, 500].map(monto => (
                <button 
                  key={monto}
                  onClick={() => setCantidadRecarga(monto)}
                  className={`py-3 rounded-xl font-bold border-2 transition-colors ${
                    cantidadRecarga === monto 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-slate-100 text-slate-500 hover:border-blue-300'
                  }`}
                >
                  {monto}€
                </button>
              ))}
            </div>

            {/* Simulación de Tarjeta */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Datos de la Tarjeta</label>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="font-mono tracking-widest">**** **** **** 4242</span>
                </div>
                <span className="text-xs font-bold text-slate-400">12/28</span>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <button 
              onClick={handleRecargar}
              disabled={procesandoPago}
              className={`w-full py-4 rounded-2xl font-black text-white transition-transform ${
                procesandoPago 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 hover:bg-blue-600 active:scale-95 shadow-lg'
              }`}
            >
              {procesandoPago ? 'Procesando pago...' : `Pagar ${cantidadRecarga}€ ahora`}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              🔒 Pago seguro encriptado con SSL
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Perfil