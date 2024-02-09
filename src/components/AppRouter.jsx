import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../router';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
          exact={route.exact}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
