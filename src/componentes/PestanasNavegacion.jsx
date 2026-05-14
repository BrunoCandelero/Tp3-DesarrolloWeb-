import { NavLink } from 'react-router-dom'

const PESTANAS = [
  { ruta: '/', etiqueta: 'Personajes' },
  { ruta: '/personaje/1', etiqueta: 'Personaje' },
  { ruta: '/episodio/1', etiqueta: 'Episodio' },
  { ruta: '/comparador', etiqueta: 'Comparador' },
]

function PestanasNavegacion() {
  return (
    <nav className="pestanas">
      {PESTANAS.map((pestana) => (
        <NavLink
          key={pestana.ruta}
          to={pestana.ruta}
          end={pestana.ruta === '/'}
          className={({ isActive }) => (isActive ? 'activo' : '')}
        >
          {pestana.etiqueta}
        </NavLink>
      ))}
    </nav>
  )
}

export default PestanasNavegacion