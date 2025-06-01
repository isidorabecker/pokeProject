import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { ClassicCard } from './ClassicCard'
import { vi } from 'vitest'

describe('ClassicCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'Bulbasaur',
    imageUrl: 'https://example.com/bulbasaur.png'
  }

  const mockHandleFavorite = vi.fn()

  const pokeProps = {
    pokemon: mockPokemon,
    favorites: [],
    handleFavorite: mockHandleFavorite,
  }

  it('renders pokemon name and id correctly', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    expect(screen.getByText('#1 Bulbasaur')).toBeInTheDocument()
  })

  it('renders pokemon image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    const image = screen.getByAltText('Bulbasaur')
    expect(image).toHaveAttribute('src', 'https://example.com/bulbasaur.png')
  })

  it('renders "Agregar a Favoritos" button when pokemon is not in favorites', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    expect(screen.getByText('Agregar a Favoritos')).toBeInTheDocument()
  })

  it('renders "Remover de Favoritos" button when pokemon is in favorites', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} favorites={[mockPokemon]} />
      </MemoryRouter>
    )
    expect(screen.getByText('Remover de Favoritos')).toBeInTheDocument()
  })

  it('calls handleFavorite when the favorite button is clicked', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    const button = screen.getByText('Agregar a Favoritos')
    fireEvent.click(button)
    expect(mockHandleFavorite).toHaveBeenCalledWith(mockPokemon)
  })

  it('has correct link to pokemon details', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemons/1')
  })

  it('has correct styling classes', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    const container = screen.getByText('#1 Bulbasaur').parentElement
    expect(container).toHaveClass('flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow')

    const image = screen.getByAltText('Bulbasaur')
    expect(image).toHaveClass('w-24 h-24 object-contain')

    const button = screen.getByText('Agregar a Favoritos')
    expect(button).toHaveClass('flex mt-2 px-4 py-2 bg-red-600 text-white font-semibold w-full rounded-lg hover:bg-red-700')
  })

  it('prevents link navigation when clicking the favorite button', () => {
    render(
      <MemoryRouter>
        <ClassicCard {...pokeProps} />
      </MemoryRouter>
    )
    const button = screen.getByText('Agregar a Favoritos')
    fireEvent.click(button)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemons/1')
    expect(mockHandleFavorite).toHaveBeenCalled()
  })
})
