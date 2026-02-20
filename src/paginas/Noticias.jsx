import { useEffect, useState } from 'react'

// Datos estáticos para las noticias, para no saturar la base de datos
const NOTICIAS_DATA = [
  {
    id: 1,
    titulo: 'Descubriendo los rincones secretos de Málaga',
    autor: 'María López',
    fecha: '2025-11-10',
    tags: ['Málaga', 'Cultura', 'Playas'],
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60',
    contenido: 'Un paseo por Málaga revela una ciudad bañada por luz, donde playas doradas coexisten con cafés escondidos.',
    cuerpo: ['Desde las callejuelas del centro histórico hasta el vibrante Muelle Uno, Málaga invita a perderse.']
  },
  {
    id: 2,
    titulo: 'La magia de los Templos de Kioto en Otoño',
    autor: 'Yumi Tanaka',
    fecha: '2026-01-15',
    tags: ['Japón', 'Tradición', 'Fotografía'],
    imagen: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=60',
    contenido: 'Cuando las hojas de los arces se vuelven rojas, los templos de Kioto parecen sacados de un cuento antiguo.',
    cuerpo: [
      'El templo Kiyomizu-dera ofrece las mejores vistas de la ciudad bajo el "momiji" (enrojecimiento de las hojas).',
      'Es la época perfecta para disfrutar de una ceremonia del té tradicional en el barrio de Gion sin el calor extremo del verano.'
    ]
  },
  {
    id: 3,
    titulo: 'Ruta Gastronómica por el Trastévere romano',
    autor: 'Marco Rossi',
    fecha: '2026-02-02',
    tags: ['Italia', 'Gourmet', 'Europa'],
    imagen: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=60',
    contenido: 'Más allá del Coliseo, Roma se come en las calles empedradas de su barrio más bohemio.',
    cuerpo: [
      'No puedes irte sin probar la auténtica Carbonara en Da Enzo o los famosos suplì (croquetas de arroz) de las pequeñas freidurías locales.',
      'El ambiente nocturno con las plazas llenas de gente local hace que te sientas un romano más.'
    ]
  },
  {
    id: 4,
    titulo: 'Glaciares de Islandia: Un viaje al origen del hielo',
    autor: 'Erik Sigurdson',
    fecha: '2026-02-18',
    tags: ['Islandia', 'Aventura', 'Naturaleza'],
    imagen: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=60',
    contenido: 'Caminar sobre el glaciar Vatnajökull es entender la fuerza imparable de la naturaleza.',
    cuerpo: [
      'Las cuevas de hielo azul cristalino solo son visitables durante los meses de invierno y ofrecen un espectáculo visual único en el mundo.',
      'Acompañamos a guías expertos para explorar las grietas profundas y terminar el día bañándonos en aguas termales naturales bajo las auroras boreales.'
    ]
  },
  {
    id: 5,
    titulo: 'Los tesoros ocultos de la Gran Muralla',
    autor: 'Li Wei',
    fecha: '2026-02-20',
    tags: ['China', 'Historia', 'Senderismo'],
    imagen: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=60',
    contenido: 'Evita las multitudes de Badaling y descubre los tramos más salvajes y auténticos de la muralla.',
    cuerpo: [
      'El tramo de Jinshanling ofrece una caminata exigente pero gratificante con torres de vigilancia originales que se conservan intactas.',
      'Dormir en una casa local al pie de la muralla permite ver el amanecer sobre las montañas sin un solo turista a la vista.'
    ]
  }
];
function Noticias({ usuarioLogueado }) {
  const [seleccionada, setSeleccionada] = useState(NOTICIAS_DATA[0]) // La noticia que se ve en grande
  const [comentarios, setComentarios] = useState([]) // Lista de comentarios de la noticia actual
  const [texto, setTexto] = useState('') // Lo que el usuario escribe en el textarea

  // Cada vez que el usuario cambia de noticia, cargo sus comentarios del LocalStorage
  useEffect(() => {
    if (!seleccionada) return
    const key = `comentarios_noticia_${seleccionada.id}`
    const saved = localStorage.getItem(key)
    setComentarios(saved ? JSON.parse(saved) : [])
  }, [seleccionada])

  // Función para guardar un comentario nuevo
  const handleEnviar = (e) => {
    e.preventDefault()
    if (!texto.trim() || !usuarioLogueado) return // Si está vacío o no hay usuario, fuera

    const nuevo = {
      id: Date.now(),
      autor: usuarioLogueado.name,
      texto: texto.trim(),
      fecha: new Date().toLocaleString()
    }

    const updated = [nuevo, ...comentarios] // Lo pongo el primero de la lista
    setComentarios(updated)
    // Lo guardo en LocalStorage para que no se borre al refrescar
    localStorage.setItem(`comentarios_noticia_${seleccionada.id}`, JSON.stringify(updated))
    setTexto('') // Limpio el cuadro de texto
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto animate__animated animate__fadeIn">
      
      {/* --- LISTADO LATERAL (ASIDE) --- */}
      <aside className="w-full lg:w-1/3 space-y-6">
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Últimas Noticias</h2>
        <div className="space-y-4">
          {NOTICIAS_DATA.map((n, index) => (
            <div
              key={n.id}
              onClick={() => setSeleccionada(n)} // Al hacer click, la noticia pasa al detalle central
              className={`flex gap-4 p-4 rounded-[1.5rem] cursor-pointer transition-all duration-500`}
              style={{ 
                // Si está seleccionada, le pongo borde azul y fondo blanco
                background: seleccionada?.id === n.id ? 'white' : 'transparent',
                border: seleccionada?.id === n.id ? '2px solid #2563eb' : '2px solid transparent'
              }}
            >
              {/* Miniatura de la noticia */}
              <div className="relative shrink-0">
                <img src={n.imagen} className="w-24 h-24 object-cover rounded-2xl" alt="" />
              </div>
              <div>
                <h3 className="font-black text-sm leading-tight">{n.titulo}</h3>
                <span className="text-xs font-bold text-slate-400">{n.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* --- DETALLE DE LA NOTICIA (ARTICLE) --- */}
      <section className="w-full lg:w-2/3">
        {seleccionada && (
          <article className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white">
            {/* Tags y Título */}
            <div className="flex gap-3">
               {seleccionada.tags?.map(tag => <span key={tag} className="text-blue-600 font-black">#{tag}</span>)}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">{seleccionada.titulo}</h1>
            
            <img src={seleccionada.imagen} className="w-full h-[400px] object-cover rounded-[2rem] my-8" alt="" />
            
            <div className="prose prose-slate">
              <p className="text-2xl font-bold text-slate-800">{seleccionada.contenido}</p>
              {seleccionada.cuerpo?.map((p, i) => <p key={i} className="text-slate-600 mt-4">{p}</p>)}
            </div>

            {/* --- SECCIÓN COMENTARIOS --- */}
            <div className="mt-16 pt-10 border-t-2">
              <h3 className="text-3xl font-black">Comunidad ({comentarios.length})</h3>
              
              {/* Solo muestro el formulario si el viajero está logueado */}
              {usuarioLogueado ? (
                <form onSubmit={handleEnviar} className="mt-8 space-y-4">
                  <textarea
                    className="w-full p-6 bg-slate-50 rounded-[2rem] focus:border-blue-600 outline-none"
                    placeholder="Comparte tu experiencia viajera..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                  />
                  <button type="submit" className="bg-slate-900 text-white font-black py-4 px-10 rounded-2xl">
                    Enviar comentario
                  </button>
                </form>
              ) : (
                <div className="bg-blue-50 p-6 rounded-[2rem] text-center">✈️ Inicia sesión para comentar</div>
              )}

              {/* Lista de comentarios renderizada */}
              <ul className="mt-10 space-y-6">
                {comentarios.map((c) => (
                  <li key={c.id} className="bg-slate-50/50 p-6 rounded-[2rem]">
                    <div className="flex justify-between">
                      <strong className="text-blue-600">@{c.autor.toLowerCase()}</strong>
                      <span className="text-xs text-slate-400">{c.fecha}</span>
                    </div>
                    <p className="text-slate-700 mt-2">{c.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}

export default Noticias