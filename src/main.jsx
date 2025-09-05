import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './styles/base.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EbooksList from './pages/EbooksList'
import EbookDetail from './pages/EbookDetail'
import EbookCreate from './pages/EbookCreate'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'ebooks', element: <EbooksList /> },
      { path: 'ebooks/new', element: <EbookCreate /> },
      { path: 'ebooks/:id', element: <EbookDetail /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
