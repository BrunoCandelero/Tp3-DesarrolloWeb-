import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(data => setPersonajes(data.results))
  }, [])

  return (
    <div className="container">
      <h1>Personajes de Rick & Morty</h1>
      <div className="grid">
        {personajes.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.status} - {p.species}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App