import { useState } from 'react'
import './bloque3.css'

function Bloque3({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <>
     <h2 className="section-title">Países Populares</h2>
     <div className="paisesPopulares">
          <div className="block1">
            <img className="img1" src= "https://www.taconesviajeros.com/wp-content/uploads/HammametTunez-playa.jpg" alt="Túnez"/>
            <h3>Túnez</h3>
            <p>Disfruta de las playas paradisíacas y la rica historia de Túnez.</p>
            <p>DESDE 123,63€/noche</p>
            {/* ARREGLADO */}
            <a href="#paises" className="boton1 inline-block text-center" style={{textDecoration: 'none'}}>Reservar</a>
          </div>
          
          <div className="block2">
            <img className="img2" src= "https://d0626f1e44.clvaw-cdnwnd.com/efd82a4c10d67d793c62b322158b9943/200003915-837688376c/Tokio%20Japonal%202.jpeg?ph=d0626f1e44" alt="Japón"/>
            <h3>Japón</h3>
            <p>Explora la mezcla única de tradición y modernidad en Japón.</p>
            <p>DESDE 150,00€/noche</p>
            {/* ARREGLADO */}
            <a href="#paises" className="boton2 inline-block text-center" style={{textDecoration: 'none'}}>Reservar</a>
          </div>
          
          <div className="block3">
            <img className="img3" src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_HNRmJuu-JQt5a7WQ8UTvH87XU_HGuyrInA&s" alt="Argentina"/>
            <h3>Argentina</h3>
            <p>Vive la aventura en Argentina, desde las cataratas hasta la Patagonia.</p>
            <p>DESDE 200,50€/noche</p>
            {/* ARREGLADO */}
            <a href="#paises" className="boton3 inline-block text-center" style={{textDecoration: 'none'}}>Reservar</a>
          </div>
        </div>
    </>
  )
}

export default Bloque3