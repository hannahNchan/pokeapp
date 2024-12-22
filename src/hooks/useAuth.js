import React from 'react';
import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async ({ username }) => {
    setUser(username);
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  return useContext(AuthContext);
};
