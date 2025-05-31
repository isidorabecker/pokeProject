import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ApplicationRouter } from './routes/router'
import { ToastContainer } from 'react-toastify'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="h-screen w-screen flex-col items-center">
        <ApplicationRouter />
      </div>
      <ToastContainer />
    </HelmetProvider>
  </React.StrictMode>
)
