
import { PlayerProvider } from './context/playerContext'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './game'
import { RouterProvider, createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Game />
  }
])
createRoot(document.getElementById('root')!).render(
  <PlayerProvider>
    <RouterProvider router={router} />
  </PlayerProvider>,
)
