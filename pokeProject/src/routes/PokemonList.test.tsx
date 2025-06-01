import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { PokemonsList } from './PokemonList'
import { useGetPokemonDetails } from '../requests'

vi.mock('../requests', () => ({
  useGetPokemonDetails: vi.fn(),
}))

vi.mock('../shared/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}))


vi.mock('../shared/ClassicCard', () => ({
  ClassicCard: ({ pokemon, favorites, handleFavorite }) => (
    <div data-testid={`pokemon-card-${pokemon.id}`}>
      {pokemon.name} - Favorite: {favorites.some((fav) => fav.id === pokemon.id) ? 'Yes' : 'No'}
      <button onClick={() => handleFavorite(pokemon)}>Toggle Favorite</button>
    </div>
  ),
}))

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    clear: () => (store = {}),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('PokemonsList', () => {
  const mockPokemons = [
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://example.com/bulbasaur.png' },
    { id: 2, name: 'Charmander', imageUrl: 'https://example.com/charmander.png' }
  ]

  beforeEach(() => {
    localStorageMock.clear()
    vi.mocked(useGetPokemonDetails).mockReturnValue({
      data: { pokemons: mockPokemons, totalCount: 60 },
      isLoading: false
    })
  })

  it('renders the Pokemon List title correctly', () => {
    render(<PokemonsList />)
    expect(screen.getByText('Pokemon List')).toBeInTheDocument()
  })

  it('renders the Loader component when data is loading', () => {
    vi.mocked(useGetPokemonDetails).mockReturnValue({ data: null, isLoading: true })
    render(<PokemonsList />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByText('Pokemon List')).not.toBeInTheDocument()
  })

  it('renders the Loader component when data is null', () => {
    vi.mocked(useGetPokemonDetails).mockReturnValue({ data: null, isLoading: false })
    render(<PokemonsList />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByText('Pokemon List')).not.toBeInTheDocument()
  })

  it('renders ClassicCard components for pokemons', () => {
    render(<PokemonsList />)
    expect(screen.getByTestId('pokemon-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-card-2')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur - Favorite: No')).toBeInTheDocument()
    expect(screen.getByText('Charmander - Favorite: No')).toBeInTheDocument()
  })

  it('renders search input with correct placeholder and classes', () => {
    render(<PokemonsList />)
    const input = screen.getByPlaceholderText('Search Pokémon...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900')
  })

  it('renders Ver Favoritos button initially', () => {
    render(<PokemonsList />)
    const button = screen.getByText('Ver Favoritos')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-red-600 items-center rounded-lg w-96 h-10 text-white font-semibold hover:bg-red-700')
  })

  it('toggles to Ver Todos button when showing favorites', () => {
    render(<PokemonsList />)
    const button = screen.getByText('Ver Favoritos')
    fireEvent.click(button)
    expect(screen.getByText('Ver Todos')).toBeInTheDocument()
  })

  it('filters pokemons based on search term', () => {
    render(<PokemonsList />)
    const input = screen.getByPlaceholderText('Search Pokémon...')
    fireEvent.change(input, { target: { value: 'Bulba' } })
    expect(screen.getByText('Bulbasaur - Favorite: No')).toBeInTheDocument()
    expect(screen.queryByText('Charmander - Favorite: No')).not.toBeInTheDocument()
  })

  it('displays favorites when Ver Favoritos is clicked', () => {
    localStorageMock.setItem('favorites', JSON.stringify([mockPokemons[0]]))
    render(<PokemonsList />)
    const button = screen.getByText('Ver Favoritos')
    fireEvent.click(button)
    expect(screen.getByText('Bulbasaur - Favorite: Yes')).toBeInTheDocument()
    expect(screen.queryByText('Charmander - Favorite: No')).not.toBeInTheDocument()
  })

  it('toggles favorite status when handleFavorite is called', () => {
    render(<PokemonsList />)
    const favoriteButton = screen.getByTestId('pokemon-card-1').querySelector('button')
    fireEvent.click(favoriteButton)
    expect(screen.getByText('Bulbasaur - Favorite: Yes')).toBeInTheDocument()
    fireEvent.click(favoriteButton)
    expect(screen.getByText('Bulbasaur - Favorite: No')).toBeInTheDocument()
  })

  it('saves favorites to localStorage', () => {
    render(<PokemonsList />)
    const favoriteButton = screen.getByTestId('pokemon-card-1').querySelector('button')
    fireEvent.click(favoriteButton)
    expect(localStorage.getItem('favorites')).toEqual(JSON.stringify([mockPokemons[0]]))
  })

  it('renders pagination controls with correct state', () => {
    render(<PokemonsList />)
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Anterior')).toBeDisabled()
    expect(screen.getByText('Siguiente')).not.toBeDisabled()
  })

  it('changes page when Siguiente button is clicked', () => {
    vi.mocked(useGetPokemonDetails).mockReturnValue({
      data: { pokemons: [{ id: 31, name: 'Nidoran', imageUrl: 'https://example.com/nidoran.png' }], totalCount: 60 },
      isLoading: false,
    })
    render(<PokemonsList />)
    const nextButton = screen.getByText('Siguiente')
    fireEvent.click(nextButton)
    expect(screen.getByText('Nidoran - Favorite: No')).toBeInTheDocument()
  })

  it('has correct section container classes', () => {
    render(<PokemonsList />)
    const section = screen.getByText('Pokemon List').closest('section')
    expect(section).toHaveClass('h-full flex flex-col justify-start px-10 overflow-y-auto')
  })
})
