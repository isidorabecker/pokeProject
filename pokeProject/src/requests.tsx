import { useQuery, type  UseQueryResult } from '@tanstack/react-query';

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

interface PokemonResponse {
  results: { name: string; url: string }[]
  [key: string]: number | string | undefined | { name: string; url: string }[]
}

export const useGetPokemonData = (): UseQueryResult<PokemonResponse, Error> => {
  async function getPokemonData(): Promise<PokemonResponse> {
    const response = await fetch(`${pokeApiUrl}?limit=30`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  return useQuery({
    queryKey: ['pokemonData'],
    queryFn: getPokemonData,
  })
}