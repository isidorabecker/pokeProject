import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './HomePage'
import { PokemonsList } from './PokemonList'
import { QueryClientProvider } from './QueryClient'
import { Pokedex } from './Pokedex'

export const ApplicationRouter: any = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <QueryClientProvider />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/pokemons-list',
          element: <PokemonsList />
        },
        {
          path: '/pokemons/:id',
          element: <Pokedex />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
