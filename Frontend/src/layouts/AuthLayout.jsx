import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  SingUp,
  Login,
  Otp,
  GetResetOtp,
  ResetPass,
  ThemeToggle,
} from '../global';

const AuthLayout = () => {
  return (
    <>
      <main
        className='w-full min-h-scree bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 smooth
        bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]'
      >
        <Routes>
          <Route path='singUp' element={<SingUp />} />
          <Route path='login' element={<Login />} />
          <Route path='verifyOTP' element={<Otp />} />
          <Route path='getResetOtp' element={<GetResetOtp />} />
          <Route path='setNewPassword' element={<ResetPass />} />
        </Routes>
        <ThemeToggle />
      </main>
    </>
  );
};

export default AuthLayout;
