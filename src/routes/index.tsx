import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home/index'))
const Rank = lazy(() => import('@/pages/Rank/index'))
const Recommend = lazy(() => import('@/pages/Recommend/index'))
const Singers = lazy(() => import('@/pages/Singers/index'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Navigate to='/recommend' />
      },
      {
        path: '/recommend',
        element: <Recommend />
      },
      {
        path: '/singers',
        element: <Singers />
      },
      {
        path: '/rank',
        element: <Rank />
      }
    ]
  }
])

export default routes