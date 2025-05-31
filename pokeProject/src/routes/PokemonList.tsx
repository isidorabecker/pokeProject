import React from 'react'
import { useGetPokemonDetails } from '../requests'

export const PokemonsList = () => {
  const { data: pokemonDetails, isLoading } = useGetPokemonDetails()

  if (isLoading || !pokemonDetails) {
    return <div className="flex justify-center items-center h-[500px]">Loading...</div>
  }

  return (
    <section className="h-[500px] flex justify-center px-10 overflow-y-auto">
      <article className="mx-4 mb-4 grid grid-cols-3 gap-4">
        {pokemonDetails.map((pokemon, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="w-24 h-24 object-contain"
            />
            <h3 className="mt-2 text-lg font-semibold capitalize">
              {pokemon.name}
            </h3>
          </div>
        ))}
      </article>
    </section>
  )
}