import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./pages/login/Login.js"
import Error from "./pages/error/Error.js"
import Signup from "./pages/signup/Signup.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home.js';
import RequireUser from './components/RequireUser.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireUser />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      }

    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


