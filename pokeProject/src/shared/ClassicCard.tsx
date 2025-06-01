import React from 'react'
import type { Pokemon } from '../requests'

interface CardProps {
  pokemon: Pokemon
  favorites: Pokemon[]
  handleFavorite: (pokemon: Pokemon) => void
}

export const ClassicCard: React.FC<CardProps> = ({pokemon, favorites, handleFavorite}: CardProps) => {
  return (
    <button onClick={() => console.log(pokemon.name)}>
      <div
        className="flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
      >
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
        <h3 className="mt-2 text-lg text-black font-semibold capitalize">
          {pokemon.name}
        </h3>
        <button
          onClick={() => handleFavorite(pokemon)}
          className="flex mt-2 px-4 py-2 bg-red-600 text-white font-semibold w-full rounded-lg hover:bg-red-600"
          >
          {favorites.includes(pokemon) ? 'Remover de Favoritos' : 'Agregar a Favoritos'}
        </button>
      </div>
    </button>
  )
}