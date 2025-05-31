import React, { useState } from 'react'
import { useGetPokemonDetails, type Pokemon } from '../requests'

export const PokemonsList = () => {
  const { data: pokemonDetails, isLoading } = useGetPokemonDetails()
  const [buttonLabel, setButtonLabel] = useState('Ver Favoritos')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<Pokemon[]>([])
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (isLoading || !pokemonDetails) {
    return <div className="flex justify-center items-center h-[500px]">Loading...</div>
  }

  const filteredPokemons = showFavorites ? favorites : pokemonDetails
  const displayedPokemons = filteredPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="h-[500px] flex flex-col justify-start px-10 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1>Pokemon List</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button onClick={() => handleShowFavorites()}>
            {buttonLabel}
          </button>
        </div>
      </div>
      <article className="mx-4 mb-4 grid grid-cols-3 gap-4">
        {displayedPokemons.map((pokemon, index) => (
          <button onClick={() => console.log(pokemon.name)} key={index}>
            <div
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
        ))}
      </article>
    </section>
  )
}