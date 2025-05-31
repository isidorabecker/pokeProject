import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './HomePage'

export const ApplicationRouter: any = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    }
  ])

  return <RouterProvider router={router} />
}
