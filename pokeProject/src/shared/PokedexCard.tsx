
import React from 'react'
import { Link } from 'react-router-dom'

export interface PokedexCardProps {
  id: number
  name: string
  types: string[]
  height: number
  weight: number
  imageUrl: string
}

export const PokedexCard: React.FC<PokedexCardProps> = ({
  id,
  name,
  types,
  height,
  weight,
  imageUrl
}: PokedexCardProps) => {
  return (
    <Link to={`/pokemons/${id}`}>
      <div className="flex flex-col w-[600px] h-96 p-4 border-2 rounded-lg shadow-md bg-green-200 hover:shadow-lg transition-shadow">
        <h3 className="flex justify-center mt-2 text-xl text-black font-semibold capitalize">
          #{id} {name}
        </h3>
        <div className="mt-3 flex w-full">
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-40 p-4 border-2 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
              <img
                src={imageUrl}
                alt={name}
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-start pl-4">
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 text-lg font-semibold text-white bg-red-600 rounded"
                >
                  {type.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-black text-lg font-semibold">Height: </span>
              <span className="text-black text-lg">{height}</span>
            </div>
            <div className="mt-2">
              <span className="text-black text-lg font-semibold">Weight: </span>
              <span className="text-black text-lg">{weight}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}