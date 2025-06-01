import React from 'react'
import { render, screen } from '@testing-library/react'
import { PokedexCard } from './PokedexCard'

describe('PokedexCard', () => {
  const mockProps = {
    id: 1,
    name: 'Bulbasaur',
    types: ['Grass', 'Poison'],
    height: 0.7,
    weight: 6.9,
    imageUrl: 'https://example.com/bulbasaur.png',
    description: 'A strange seed was planted on its back at birth.'
  }

  it('renders pokemon name and id correctly', () => {
    render(<PokedexCard {...mockProps} />)
    expect(screen.getByText('#1 Bulbasaur')).toBeInTheDocument()
  })

  it('renders pokemon types correctly', () => {
    render(<PokedexCard {...mockProps} />)
    expect(screen.getByText('GRASS')).toBeInTheDocument()
    expect(screen.getByText('POISON')).toBeInTheDocument()
  })

  it('renders pokemon height and weight correctly', () => {
    render(<PokedexCard {...mockProps} />)
    expect(screen.getByText('Altura:')).toBeInTheDocument()
    expect(screen.getByText('0.7')).toBeInTheDocument()
    expect(screen.getByText('Peso:')).toBeInTheDocument()
    expect(screen.getByText('6.9')).toBeInTheDocument()
  })

  it('renders pokemon image with correct src and alt', () => {
    render(<PokedexCard {...mockProps} />)
    const image = screen.getByAltText('Bulbasaur')
    expect(image).toHaveAttribute('src', 'https://example.com/bulbasaur.png')
  })

  it('renders pokemon description correctly', () => {
    render(<PokedexCard {...mockProps} />)
    expect(screen.getByText('A strange seed was planted on its back at birth.')).toBeInTheDocument()
  })

  it('handles undefined description', () => {
    render(<PokedexCard {...mockProps} description={undefined} />)
    expect(screen.getByText('#1 Bulbasaur')).toBeInTheDocument()
    expect(screen.queryByText('A strange seed was planted on its back at birth.')).not.toBeInTheDocument()
  })
})
