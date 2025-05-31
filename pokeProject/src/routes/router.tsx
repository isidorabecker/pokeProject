import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './HomePage'
import { PokemonsList } from './PokemonList'
import { QueryClientProvider } from './QueryClient'

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
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
