import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Loader } from './Loader'
import { vi } from 'vitest'

vi.mock('../assets/loader-circle.svg', () => ({
  default: 'mocked-loader-circle.svg'
}))

describe('Loader', () => {
  it('renders the loader container with correct classes', () => {
    render(<Loader />)
    const container = screen.getByAltText('Loader Icon').parentElement
    expect(container).toHaveClass('grid h-full w-full place-items-center')
  })

  it('renders the loader image with correct attributes', () => {
    render(<Loader />)
    const image = screen.getByAltText('Loader Icon')
    expect(image).toHaveAttribute('src', 'mocked-loader-circle.svg')
    expect(image).toHaveAttribute('alt', 'Loader Icon')
    expect(image).toHaveClass('w-24 h-24')
  })
})
