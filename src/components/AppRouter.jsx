import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
 
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    if (isLoading){
        return <Loader/>
    }

  return (
      isAuth
        ?   <Routes>
        {privateRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
          <Route path="*" element={<Navigate to="/posts" replace />} /> 
         
      </Routes>
        :  <Routes>
        {publicRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
            exact={route.exact}
            
          />
        ))}
        <Route path="*" element={<Navigate to="/login" replace />} /> 
      </Routes>
  
  );
};

export default AppRouter;
