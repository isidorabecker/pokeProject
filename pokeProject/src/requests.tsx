import { useQuery, type  UseQueryResult } from '@tanstack/react-query';

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export interface Pokemon {
  id: number
  name: string
  imageUrl: string
}

interface PokemonResponse {
  results: { name: string; url: string }[]
}

export const useGetPokemonDetails = (): UseQueryResult<Pokemon[], Error> => {
  async function getPokemonDetails(): Promise<Pokemon[]> {
    const response = await fetch(`${pokeApiUrl}?limit=30`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: PokemonResponse = await response.json()

    const promises = data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url)
      if (!detailResponse.ok) {
        throw new Error(`HTTP error! status: ${detailResponse.status}`)
      }
      const details = await detailResponse.json()
      return {
        id: details.id,
        name: pokemon.name,
        imageUrl: details.sprites.front_default,
      }
    })

    return await Promise.all(promises)
  }

  return useQuery({
    queryKey: ['pokemonDetails'],
    queryFn: getPokemonDetails,
  })
}

export const useGetPokemonInfo = (id: string): UseQueryResult<any, Error> => {
  async function getPokemonInfo(): Promise<Pokemon> {
    const response = await fetch(`${pokeApiUrl}/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }

  return useQuery({
    queryKey: ['pokemonInfo', id],
    queryFn: async () => await getPokemonInfo()
  })
}
