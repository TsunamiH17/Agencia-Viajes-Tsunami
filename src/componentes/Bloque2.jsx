import { useState } from 'react'
import './bloque2.css'

function Bloque2({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <>
    <div>
          <h2 className="section-title">¿Por qué elegir TsunamiViajes?</h2>
        </div>
        <div className="blocks-container">
          <div className="blockIzquierda">
            <div className="textIzquierda">
              <h2 className='h2'>Explora el mundo con TsunamiViajes</h2>
              <p>Descubre nuevos países, culturas y emociones: despega con nosotros hacia el mundo que siempre soñaste</p>
            </div>
            <div className="imgIzquierda">
              <img src="https://media.istockphoto.com/id/1391033471/es/foto/avi%C3%B3n-y-dedo-se%C3%B1alando-el-mapa.jpg?s=612x612&w=0&k=20&c=zIt22X3544LRaP0cxr8IrjI5ZgUmo6IhqAYws0W_ekw=" alt="Mapa" />
              
              {/* ARREGLADO: Botón Contactar -> Redirige a noticias (o pon #paises si lo prefieres) */}
              <a href="#noticias" className="botonIzquierda inline-block text-center" style={{textDecoration: 'none'}}>Contactar</a>
              
            </div>
          </div>

          <div className="blockDerecha">
            <div className="textDerecha">
              <h2 className='h2'>Tu viaje, nuestra pasión</h2>
              <p>Nos eligen porque combinamos experiencia, creatividad y compromiso para transformar cada proyecto en un éxito real</p>  
            </div>
            <div className="imgDerecha">
              <img src="https://www.ceupe.com/images/easyblog_images/168/b2ap3_thumbnail_viaje.jpg" alt="Viajes" />
              
              {/* ARREGLADO: Botón Viajes -> Redirige a la ruta de los países */}
              <a href="#paises" className="botonDerecha inline-block text-center" style={{textDecoration: 'none'}}>Viajes</a>

            </div>
          </div>
        </div>
    </>
  )
}

export default Bloque2