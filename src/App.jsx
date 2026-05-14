import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import EncabezadoHero from './componentes/EncabezadoHero'
import SeccionListadoPersonajes from './componentes/SeccionListadoPersonajes'
import SeccionDetallePersonaje from './componentes/SeccionDetallePersonajes'
import SeccionDetalleEpisodio from './componentes/SeccionDetalleEpisodio'
import SeccionComparador from './componentes/SeccionComparador'

function App() {
  const navigate = useNavigate()
  const [resumenLista, setResumenLista] = useState({
    paginas: 1,
    cantidadPersonajes: 0,
    etiquetaEstado: 'Todos',
  })

  const handleSeleccionarPersonaje = (id) => {
    navigate(`/personaje/${id}`)
  }

  const handleCambioResumen = (resumen) => {
    setResumenLista(resumen)
  }

  return (
    <div className="pagina">
      <EncabezadoHero
        paginas={resumenLista.paginas}
        cantidadPersonajes={resumenLista.cantidadPersonajes}
        etiquetaEstado={resumenLista.etiquetaEstado}
      />
      <Routes>
        <Route
          path="/"
          element={
            <SeccionListadoPersonajes
              onSeleccionarPersonaje={handleSeleccionarPersonaje}
              onCambioResumen={handleCambioResumen}
            />
          }
        />
        <Route path="/personaje/:id" element={<SeccionDetallePersonaje />} />
        <Route path="/episodio/:id" element={<SeccionDetalleEpisodio />} />
        <Route path="/comparador" element={<SeccionComparador />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App