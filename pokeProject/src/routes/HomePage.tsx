import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const handleNextPage = () => {
    navigate('/pokemons-list')
  }

  return (
    <section className="h-[500px] flex justify-center px-10">
      <article className="mx-4 mb-4 flex flex-row justify-center">
        <div className="justify-center items-center flex-col h-full w-full">
          <h1> PokeWeb </h1>
          <button onClick={ () => handleNextPage() }>START</button>
        </div>
      </article>
    </section>
  )
}
