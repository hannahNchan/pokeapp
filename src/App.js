import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';

import Login from './components/Login';
// import constants from './utils/constants';
// import getRandomElement from './utils';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
// import { useDynamicBackground } from './hooks/useDynamicBackground';

export default function App() {
  // const [applyBackground, setApplyBackground] = React.useState(true);
  // const getImage = () => {
  //   const getNumber = getRandomElement(isMobile ? constants.imagesMobiles : constants.images);
  //   return constants.urlImages + getNumber;
  // };

  // setApplyBackground(!applyBackground);
  // useDynamicBackground(applyBackground, getImage);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Esta es la homepage</h1>
              <hr />
              <a href="/login">Iniciar Sesion</a>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
