import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./pages/login/Login.js"
import Error from "./pages/error/Error.js"
import Signup from "./pages/signup/Signup.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home.js';
import RequireUser from './components/RequireUser.js';
import Feed from './components/feed/Feed'
import Profile from './components/profile/Profile.js';
import UpdateProfile from './components/updateProfile/UpdateProfile.js';
import {Provider} from 'react-redux'
import store from './redux/store.js';
import App from './App.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireUser />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Feed />
          },
          {
            path: "/profile/:userId",
            element: <Profile />
          },
          {
            path: "/updateProfile",
            element: <UpdateProfile />
          },
        ]
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
    <Provider store={store}>
      <App/>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


