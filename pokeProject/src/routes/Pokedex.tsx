import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PokedexCard } from '../shared/PokedexCard'
import { useGetPokemonInfo, useGetPokemonDescription } from '../requests'

export const Pokedex: React.FC = () => {
  const navigate = useNavigate()
  const { id: pokemonId } = useParams()
  const { data: pokedexData, isLoading: loadingData } = useGetPokemonInfo(pokemonId as string)
  const { data: pokemonDescription, isLoading: loadingDescription } = useGetPokemonDescription(pokemonId as string)

  if (loadingData || loadingDescription) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }
  const { id, name, types, weight, height, sprites } = pokedexData


  const handleBack = () => {
    navigate('/pokemons-list')
  }

  return (
    <section className="h-full flex flex-col justify-start px-10 overflow-y-auto">
      <div className="mt-3 flex justify-center font-semibold text-4xl mb-4">
        <span className="mb-8 text-center text-4xl font-extrabold text-red-600">Pokédex</span>
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <PokedexCard
          id={id}
          name={name}
          types={types.map((type) => type.type.name)}
          weight={weight}
          height={height}
          imageUrl={sprites.front_default}
          description={pokemonDescription}
        />
      </div>
      <div className="flex justify-center mb-3">
        <button
          className="bg-red-600 border-radious items-center rounded-lg w-[500px] h-10 text-white font-semibold"
          onClick={() => handleBack()}
        >
          Atrás
        </button>
      </div>
    </section>
  )
}
