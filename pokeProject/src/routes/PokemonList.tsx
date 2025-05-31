import React from 'react'
import { useGetPokemonData } from '../requests'

export const PokemonsList: React.FC = () => {
  const { data, isLoading } = useGetPokemonData()

  if (isLoading) {
    return <div>Loading...</div>
  }
  const { results } = data

  return (
    <section className="h-[500px] flex justify-center px-10">
      <article className="mx-4 mb-4 flex flex-row justify-center">
        <div className="justify-center items-center flex-col h-full w-full">
          <span> PokeList </span>
        </div>
      </article>
    </section>
  )
}
