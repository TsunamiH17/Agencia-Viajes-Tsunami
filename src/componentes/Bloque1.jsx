import { useState } from 'react'
import './bloque1.css'

function Bloque1({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <>
     <div className="Bloque1">
          <div className="promo-left">
            <p className="promo-text">Descubre destinos increíbles, experiencias únicas y aventuras que recordarás toda la vida. Nosotros nos encargamos de todo: vuelos, alojamiento y actividades, para que tú solo disfrutes. Reserva hoy y empieza tu próxima aventura.</p>
            
            {/* SOLUCIÓN: Cambiamos <button> por <a> y le añadimos href="#paises" */}
            <a href="#paises" className="btn-reservar inline-block text-center">
              Empezar Aventura
            </a>
            
          </div>
          <div className="promo-right">
            <img src="https://www.giftcampaign.es/blog/wp-content/uploads/2023/07/marketing-agencia-viajes-1024x569.jpg" alt="Viajes" className="promo-img" />
          </div>
        </div>
    </>
  )
}

export default Bloque1