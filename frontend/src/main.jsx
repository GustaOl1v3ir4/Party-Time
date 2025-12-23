import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

//Context
import { AuthProvider } from './context/authContext.jsx';



//Pages
import Home from './routes/Home.jsx';
import CreateParty from './routes/CreateParty.jsx';
import Party from './routes/Party.jsx';
import EditParty from './routes/EditParty.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        ),   
      },
      {
        path: "/party/new",
        element: (
          <PrivateRoute>
            <CreateParty />
          </PrivateRoute>
        ),
      },
      {
        path: "/party/:id",
        element: (
          <PrivateRoute>
            <Party />
          </PrivateRoute>
        ),
      },
      {
        path: "/party/edit/:id",
        element: (
          <PrivateRoute>
            <EditParty />
          </PrivateRoute>
        ),
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
