import { Outlet, useLocation } from 'react-router-dom'

//Componentes
import Navbar from './components/Navbar'

import {ToastContainer} from 'react-toastify'

//Styles


import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { use } from 'react';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  

  return (
    <div className='App'>
      <ToastContainer />
      {!isAdmin && <Navbar />}
      <Outlet />
    </div>
  )
}

export default App
