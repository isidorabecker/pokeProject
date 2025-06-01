import React, { useState } from 'react'
import { useGetPokemonDetails, type Pokemon } from '../requests'
import { ClassicCard } from '../shared/ClassicCard'

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
    <section className="h-full flex flex-col justify-start px-10 overflow-y-auto">
      <div>
        <div className="mt-3 flex justify-center font-semibold text-4xl mb-4">
          <span className="mb-8 text-center text-4xl font-extrabold text-red-600">Pokemon List</span>
        </div>
        <div className="flex justify-between mb-3">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
          />
          <button
            className="bg-red-600 border-radious items-center rounded-lg w-96 h-10 text-white font-semibold"
            onClick={() => handleShowFavorites()}
          >
            {buttonLabel}
          </button>
        </div>
        <article className="mb-4 grid grid-cols-3 gap-4">
          {displayedPokemons.map((pokemon, index) => (
            <ClassicCard
              pokemon={pokemon}
              favorites={favorites}
              handleFavorite={handleFavorite}
              key={index}
            />
          ))}
        </article>
      </div>
    </section>
  )
}