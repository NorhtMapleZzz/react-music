import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import store from './store/index'
import routes from '@/routes/index'
import { Data } from './pages/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <Data>
        <RouterProvider router={routes} />
      </Data> 
    </Provider>
  )
}

export default App


