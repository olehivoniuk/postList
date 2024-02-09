import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context'
import AppRouter from './components/AppRouter'
import Navbar from './components/UI/Navbar/Navbar'
import './styles/App.css'

const App = () => {
  const [isAuth, setIsAuth] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false)
  })
    
  return (
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth: setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
