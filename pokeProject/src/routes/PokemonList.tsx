import React, { useState } from 'react'
import { useGetPokemonDetails, type Pokemon } from '../requests'

export const PokemonsList = () => {
  const { data: pokemonDetails, isLoading } = useGetPokemonDetails()
  const [buttonLabel, setButtonLabel] = useState('Ver Favoritos')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<Pokemon[]>([])

  const handleFavorite = (pokemonSelected: Pokemon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonSelected)) {
        return prevFavorites.filter((selected) => selected !== pokemonSelected)
      } else {
        return [...prevFavorites, pokemonSelected]
      }
    })
  }

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites)
    setButtonLabel(showFavorites ? 'Ver Favoritos' : 'Ver Todos')
  }

  if (isLoading || !pokemonDetails) {
    return <div className="flex justify-center items-center h-[500px]">Loading...</div>
  }

  const displayedPokemons = showFavorites ? favorites : pokemonDetails

  return (
    <section className="h-[500px] flex justify-center px-10 overflow-y-auto">
      <h1>Pokemon List</h1>
      <button onClick={() => handleShowFavorites()}>{buttonLabel}</button>
      <article className="mx-4 mb-4 grid grid-cols-3 gap-4">
        {displayedPokemons.map((pokemon, index) => (
            <button onClick={() => console.log(pokemon.name)} key={index}>
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
                <button onClick={() => handleFavorite(pokemon)}>Agregar a Favoritos</button>
              </div>
            </button>
          )
        )}
      </article>
    </section>
  )
}