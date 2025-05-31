import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const handleNextPage = () => {
    navigate('/pokemons-list')
  }

  return (
    <section className="h-full flex flex-col justify-start px-10 overflow-y-auto">
      <div className="mt-40 flex flex-col justify-center items-center font-semibold text-4xl mb-4">
        <span className="mb-8 text-center text-4xl font-extrabold text-red-600"> PokeWeb </span>
        <button className="bg-red-600 border-radious items-center rounded-lg w-96 h-10 text-white font-semibold" onClick={ () => handleNextPage() }>START</button>
      </div>
    </section>
  )
}
