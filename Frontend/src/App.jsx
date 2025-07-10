import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout, AppLoader, Auth, AuthLayout, NotifierList, useGetUser } from './global';
import { useSelector } from 'react-redux';

const App = () => {
  const getUser = useGetUser();

  const navigate = useNavigate();

  const location = useLocation();

  const { appLoading } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      const success = await getUser();
      if (!success) {
        <div className='flex items-center justify-center w-full h-screen bg-zinc-50 dark:bg-zinc-900'>
          <AppLoader className='text-xl' />
        </div>;
      } else {
        if (location.pathname.includes('/auth')) {
          navigate('/');
        } else {
          navigate(location);
        }
      }
    };
    fetchUser();
  }, []);

  if (appLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-zinc-50 dark:bg-zinc-900'>
        <AppLoader className='text-xl' />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/auth/*' element={<AuthLayout />} />
        <Route
          path='*'
          element={
            <Auth>
              <AppLayout />
            </Auth>
          }
        />
      </Routes>
      <NotifierList className='left-5 bottom-5' />
    </>
  );
};

export default App;
