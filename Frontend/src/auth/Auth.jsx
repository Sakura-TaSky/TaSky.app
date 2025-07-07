import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppLoader } from '../components';

const Auth = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <Navigate to='/auth/singUp' replace />;
  }

  return children;
};

export default Auth;
