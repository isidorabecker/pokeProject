import { useQuery, type  UseQueryResult } from '@tanstack/react-query'

const pokeApiUrl = 'https://pokeapi.co/api/v2/'

export interface Pokemon {
  id: number
  name: string
  imageUrl: string
}

interface PokemonResponse {
  count: number
  results: { name: string; url: string }[]
}

export interface PokemonDetails {
  pokemons: Pokemon[]
  totalCount: number
}

export const useGetPokemonDetails = (page: number = 1): UseQueryResult<PokemonDetails, Error> => {
  async function getPokemonDetails(): Promise<PokemonDetails> {
    const limit = 30
    const offset = (page - 1) * limit
    const response = await fetch(`${pokeApiUrl}pokemon/?limit=${limit}&offset=${offset}`)
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

    const pokemons: Pokemon[] = await Promise.all(promises)
    return { pokemons, totalCount: data.count }
  }

  return useQuery({
    queryKey: ['pokemonDetails', page],
    queryFn: getPokemonDetails,
  })
}

export const useGetPokemonInfo = (id: string): UseQueryResult<any, Error> => {
  async function getPokemonInfo(): Promise<Pokemon> {
    const response = await fetch(`${pokeApiUrl}pokemon/${id}`)
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

export const useGetPokemonDescription = (id: string): UseQueryResult<string, Error> => {
  async function getPokemonDescription(): Promise<string> {
    const response = await fetch(`${pokeApiUrl}pokemon-species/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    const description = data.flavor_text_entries.find((entry: any) => entry.language.name === 'es')
    return description ? description.flavor_text : 'No tiene una descripción disponible en español.'
  }

  return useQuery({
    queryKey: ['pokemonDescription', id],
    queryFn: async () => getPokemonDescription()
  })
}
