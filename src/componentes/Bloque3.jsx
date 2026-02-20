import './bloque3.css'

function Bloque3() {
  // Aquí me he creado un array de objetos "destinos"
  // Así, en lugar de escribir 3 veces el mismo HTML, uso un .map y recorro la lista
  const destinos = [
    {
      nombre: 'Túnez',
      desc: 'Playas paradisíacas y la rica historia del mediterráneo.',
      precio: '123,63',
      img: 'https://www.taconesviajeros.com/wp-content/uploads/HammametTunez-playa.jpg',
      delay: 'animate__delay-1s' // Este delay es para que las tarjetas no salgan todas a la vez
    },
    {
      nombre: 'Japón',
      desc: 'Mezcla única de tradición milenaria y modernidad futurista.',
      precio: '150,00',
      img: 'https://d0626f1e44.clvaw-cdnwnd.com/efd82a4c10d67d793c62b322158b9943/200003915-837688376c/Tokio%20Japonal%202.jpeg?ph=d0626f1e44',
      delay: 'animate__delay-2s'
    },
    {
      nombre: 'Argentina',
      desc: 'Desde las cataratas de Iguazú hasta el fin del mundo en la Patagonia.',
      precio: '200,50',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_HNRmJuu-JQt5a7WQ8UTvH87XU_HGuyrInA&s',
      delay: 'animate__delay-3s'
    }
  ];

  return (
    // Pongo un fondo gris clarito (bg-slate-50) para que las tarjetas blancas resalten
    <div className="max-w-7xl mx-auto px-8 py-20 bg-slate-50">
      
      {/* Cabecera de la sección: Título a la izquierda y enlace "Ver más" a la derecha */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-blue-600 font-black uppercase tracking-widest text-xs mb-2">Favoritos de los clientes</p>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Países <span className="text-blue-600">Populares</span></h2>
        </div>
        {/* El "Ver más" desaparece en móvil (hidden md:block) para que no moleste */}
        <a href="#paises" className="hidden md:block text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">Ver más →</a>
      </div>

      {/* Grid que se adapta: 1 columna en móvil, 2 en tablet y 3 en PC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Aquí recorro el array de destinos y pinto una tarjeta por cada uno */}
        {destinos.map((dest, index) => (
          <div 
            key={index} 
            // La clase animate__fadeInUp hace que las tarjetas "suban" al aparecer
            className={`group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-white hover:shadow-2xl transition-all duration-500 animate__animated animate__fadeInUp ${dest.delay}`}
          >
            {/* Contenedor de la foto con altura fija (h-72) */}
            <div className="relative h-72 overflow-hidden">
              <img src={dest.img} alt={dest.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
              {/* Etiqueta del precio: flota sobre la imagen con un efecto de desenfoque (backdrop-blur) */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1 text-center">Noche</p>
                <p className="text-lg font-black text-blue-600 leading-none">€{dest.precio}</p>
              </div>
            </div>
            
            {/* Texto de la tarjeta y botón de acción */}
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black text-slate-800">{dest.nombre}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{dest.desc}</p>
              {/* Al hacer click en Reservar, te manda a la sección de países */}
              <a 
                href="#paises" 
                className="block w-full text-center bg-slate-100 text-slate-800 font-black py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bloque3