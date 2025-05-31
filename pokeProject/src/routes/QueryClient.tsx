import React from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router-dom'
export const QueryClientProvider: React.FC = () => {
  const navigate = useNavigate()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    },
    queryCache: new QueryCache({
      onError: (err: unknown) => {
        const error = err
        console.error('Query error:', error)
        navigate('/')
      }
    })
  })
  return (
    <ReactQueryClientProvider client={queryClient}>
      <Outlet />
    </ReactQueryClientProvider>
  )
}
