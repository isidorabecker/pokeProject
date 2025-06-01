import React, { useState, useEffect } from 'react'
import { useGetPokemonDetails, type Pokemon } from '../requests'
import { ClassicCard } from '../shared/ClassicCard'

export const PokemonsList = () => {
  const [page, setPage] = useState(1)
  const { data: pokemonDetails, isLoading } = useGetPokemonDetails(page)
  const [buttonLabel, setButtonLabel] = useState('Ver Favoritos')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<Pokemon[]>(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const handleFavorite = (pokemonSelected: Pokemon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === pokemonSelected.id)) {
        return prevFavorites.filter((selected) => selected.id !== pokemonSelected.id)
      } else {
        return [...prevFavorites, pokemonSelected]
      }
    })
  }

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites)
    setButtonLabel(showFavorites ? 'Ver Favoritos' : 'Ver Todos')
    setPage(1)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (isLoading || !pokemonDetails) {
    return <div className="flex justify-center items-center h-[500px]">Loading...</div>
  }

  const { pokemons, totalCount } = pokemonDetails
  const totalPages = Math.ceil(totalCount / 30)
  const filteredPokemons = showFavorites ? favorites : pokemons
  const displayedPokemons = filteredPokemons.filter((pokemon) =>
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
            className="bg-red-600 items-center rounded-lg w-96 h-10 text-white font-semibold hover:bg-red-700"
            onClick={handleShowFavorites}
          >
            {buttonLabel}
          </button>
        </div>
        <article className="mb-4 grid grid-cols-3 gap-4">
          {displayedPokemons.map((pokemon) => (
            <ClassicCard
              pokemon={pokemon}
              favorites={favorites}
              handleFavorite={handleFavorite}
              key={pokemon.id}
            />
          ))}
        </article>
        {!showFavorites && (
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="self-center">
              Page {page} of {totalPages}
            </span>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
