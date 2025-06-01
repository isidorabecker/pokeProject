import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { HomePage } from './HomePage'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

describe('HomePage', () => {
  it('renders the PokeWeb title correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('PokeWeb')).toBeInTheDocument()
  })

  it('renders the START button correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const button = screen.getByText('START')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-red-600 border-radious items-center rounded-lg w-96 h-10 text-white font-semibold')
  })

  it('has correct section container classes', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const section = screen.getByText('PokeWeb').closest('section')
    expect(section).toHaveClass('h-full flex flex-col justify-start px-10 overflow-y-auto')
  })

  it('navigates to /pokemons-list when START button is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const button = screen.getByText('START')
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith('/pokemons-list')
  })
})
