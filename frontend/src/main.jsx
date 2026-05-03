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
import AdminRoute from './components/adminRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminDashboard from './routes/admin/Dashboard.jsx';
import AdminUsers from './routes/admin/Users.jsx';
import AdminParties from './routes/admin/Parties.jsx';

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
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/parties",
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminParties />
            </AdminLayout>
          </AdminRoute>
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