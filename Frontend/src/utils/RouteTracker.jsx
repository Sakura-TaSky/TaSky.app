import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const excludedRoutes = [
      '/auth/login',
      '/auth/singUp',
      '/auth/verifyOTP',
      '/auth/getResetOtp',
      '/auth/setNewPassword',
    ];
    if (!excludedRoutes.includes(location.pathname)) {
      localStorage.setItem('lastVisitedRoute', location.pathname);
    }
  }, [location]);

  return null;
};
