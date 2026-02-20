import { useState } from 'react'

function Bloque1({ usuario }) {
  return (
    // El contenedor principal tiene bordes muy redondeados y una sombra suave para que parezca una "tarjeta" moderna
    // Uso animate__fadeIn para que aparezca suavemente al cargar la web
    <div className="relative overflow-hidden bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white m-4 md:m-8 animate__animated animate__fadeIn">
      
      {/* Uso flex-col para móvil (uno encima de otro) y lg:flex-row para PC (lado a lado) */}
      <div className="flex flex-col lg:flex-row items-center">
        
        {/* --- LADO IZQUIERDO: TEXTO --- */}
        {/* Este div entra desde la izquierda con animate__fadeInLeft */}
        <div className="w-full lg:w-1/2 p-10 md:p-20 space-y-8 animate__animated animate__fadeInLeft">
          <div className="space-y-4">
            {/* Etiqueta azul pequeña de arriba (el "badge") */}
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em] rounded-full">
              Próxima Parada: El Mundo
            </span>
            {/* Título principal: juego con el tamaño de letra y el color azul en la palabra Límites */}
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Viaja sin <br />
              <span className="text-blue-600">Límites.</span>
            </h2>
          </div>
          
          {/* Párrafo descriptivo con un max-width para que no se estiren mucho las líneas y sea fácil de leer */}
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
            Descubre destinos increíbles y experiencias únicas. Nosotros nos encargamos de los vuelos y el alojamiento para que tú solo te preocupes de <b>coleccionar momentos.</b>
          </p>
          
          {/* Botonera: uso etiquetas <a> con hashes (#) para moverme por la SPA sin recargar */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#paises" 
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 group"
            >
              Empezar Aventura
              {/* Esta flechita se mueve a la derecha cuando pasas el ratón por el botón (group-hover) */}
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
            
            <a 
              href="#noticias" 
              className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              Ver Blog
            </a>
          </div>

          {/* Sección de estadísticas: puro postureo visual para que la agencia parezca top */}
          <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
            <div>
              <p className="text-2xl font-black text-slate-800">+15k</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Viajeros Felices</p>
            </div>
            {/* Línea vertical separadora hecha con un div de 1px de ancho */}
            <div className="w-px h-10 bg-slate-100"></div>
            <div>
              <p className="text-2xl font-black text-slate-800">4.9/5</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Valoración Media</p>
            </div>
          </div>
        </div>

        {/* --- LADO DERECHO: IMAGEN --- */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 animate__animated animate__fadeInRight">
          <div className="relative">
            {/* Estas son las manchas azules difuminadas que se ven detrás de la foto (el blur) */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
            
            {/* La imagen tiene un rotate-2 para que esté un poco torcida y hover:rotate-0 para que se ponga recta al tocarla */}
            <img 
              src="https://www.giftcampaign.es/blog/wp-content/uploads/2023/07/marketing-agencia-viajes-1024x569.jpg" 
              alt="Viajes" 
              className="relative z-10 w-full h-[400px] md:h-[600px] object-cover rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700" 
            />
            
            {/* La tarjetita blanca de "Ofertas" que flota sobre la foto. Solo se ve en pantallas grandes (hidden md:block) */}
            <div className="absolute bottom-10 -left-6 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white hidden md:block animate__animated animate__bounceIn animate__delay-2s">
              <div className="flex items-center gap-4">
                {/* El punto verde con efecto de parpadeo (animate-ping) */}
                <div className="bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                <p className="text-sm font-black text-slate-800">Ofertas disponibles hoy</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Bloque1