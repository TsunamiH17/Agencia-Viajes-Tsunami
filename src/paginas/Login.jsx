import { useState } from 'react'

function Login({ onLogin, backgroundImage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        onLogin(data) 
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    }
  }

  const containerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }
    : {}

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] relative overflow-hidden" 
      style={containerStyle}
    >
      {/* Botón Volver Atrás (Sin Router, usando href al index) */}
      <a 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all group z-10"
      >
        <div className="bg-white p-2.5 rounded-full shadow-lg border border-slate-100 group-hover:-translate-x-1 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="hidden sm:inline text-sm tracking-tight">Volver al Menú</span>
      </a>

      {/* Círculos de diseño modernos en el fondo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-60"></div>

      {/* Tarjeta de Login */}
      <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-md border border-white relative z-0">
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bienvenido</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Accede a tu cuenta de Agencia Tsunami</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email</label>
              <input
                type="email"
                required
                className="w-full p-4 bg-slate-100/50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-300 font-medium"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Contraseña</label>
              <input
                type="password"
                required
                className="w-full p-4 bg-slate-100/50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-300 font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            Entrar a la Agencia
          </button>

          <div className="text-center pt-2">
            <p className="text-sm font-bold text-slate-400">
              ¿No tienes cuenta? <a href="#register" className="text-blue-600 hover:underline">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login