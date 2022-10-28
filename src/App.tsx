import React, { useState } from 'react'
import { RouterProvider } from 'react-router'
import routes from '@/routes/index'

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App


