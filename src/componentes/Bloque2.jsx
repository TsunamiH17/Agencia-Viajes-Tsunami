import { useState } from 'react'

function Bloque2() {
  return (
    // Contenedor centrado con max-width para que no se pegue a los bordes en pantallas ultra anchas
    <div className="max-w-7xl mx-auto px-8 py-20 animate__animated animate__fadeIn">
      
      {/* Título de la sección con una rayita azul debajo */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
          ¿Por qué elegir <span className="text-blue-600">TsunamiViajes?</span>
        </h2>
        <div className="h-2 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Grid de 2 columnas: 1 columna en móvil, 2 en pantallas grandes (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* --- TARJETA IZQUIERDA (BLANCA) --- */}
        {/* Al hacer hover, la tarjeta sube 2 píxeles (-translate-y-2) */}
        <div className="group bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 hover:-translate-y-2">
          <div className="p-10 space-y-6">
            <h3 className="text-3xl font-black text-slate-800 leading-tight">Explora el mundo con nosotros</h3>
            <p className="text-slate-500 font-medium">Descubre nuevos países, culturas y emociones: despega con nosotros hacia el mundo que siempre soñaste.</p>
            {/* Botón con estilo suave (fondo azul clarito) */}
            <a href="#noticias" className="inline-block bg-blue-50 text-blue-600 font-black px-8 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              Contactar con un Agente
            </a>
          </div>
          {/* Contenedor de la imagen con overflow-hidden para que al hacer zoom no se salga de los bordes */}
          <div className="h-64 overflow-hidden">
            <img 
              src="https://media.istockphoto.com/id/1391033471/es/foto/avi%C3%B3n-y-dedo-se%C3%B1alando-el-mapa.jpg?s=612x612&w=0&k=20&c=zIt22X3544LRaP0cxr8IrjI5ZgUmo6IhqAYws0W_ekw=" 
              alt="Mapa" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* --- TARJETA DERECHA (AZUL) --- */}
        {/* Esta tarjeta es la oscura/azul para que haya contraste visual en la web */}
        <div className="group bg-blue-500 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="p-10 space-y-6">
            <h3 className="text-3xl font-black text-white leading-tight">Tu viaje, nuestra pasión</h3>
            <p className="text-white font-medium">Combinamos experiencia, creatividad y compromiso para transformar cada proyecto en un éxito real.</p>
            {/* Botón blanco para que destaque sobre el fondo azul */}
            <a href="#paises" className="inline-block bg-white text-slate-900 font-black px-8 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-lg">
              Ver Catálogo Completo
            </a>
          </div>
          <div className="h-64 overflow-hidden">
            <img 
              src="https://www.ceupe.com/images/easyblog_images/168/b2ap3_thumbnail_viaje.jpg" 
              alt="Viajes"
              className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Bloque2