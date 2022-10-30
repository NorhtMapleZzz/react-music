import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import store from './store/index'
import routes from '@/routes/index'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App


