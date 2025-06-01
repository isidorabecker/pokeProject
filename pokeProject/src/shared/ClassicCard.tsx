import React from 'react'
import { Link } from 'react-router-dom'
import type { Pokemon } from '../requests'

interface CardProps {
  pokemon: Pokemon
  favorites: Pokemon[]
  handleFavorite: (pokemon: Pokemon) => void
}

export const ClassicCard: React.FC<CardProps> = ({ pokemon, favorites, handleFavorite }) => {
  return (
    <Link to={`/pokemons/${pokemon.id}`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
      >
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
        <h3 className="mt-2 text-lg text-black font-semibold capitalize">
          #{pokemon.id} {pokemon.name}
        </h3>
        <button
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            handleFavorite(pokemon)
          }}
          className="flex mt-2 px-4 py-2 bg-red-600 text-white font-semibold w-full rounded-lg hover:bg-red-700"
        >
          {favorites.some((fav) => fav.id === pokemon.id) ? 'Remover de Favoritos' : 'Agregar a Favoritos'}
        </button>
      </div>
    </Link>
  )
}