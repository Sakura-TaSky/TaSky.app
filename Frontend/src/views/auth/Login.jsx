import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  BlueBtn,
  Input,
  Logo,
  setErrorMessage,
  useResendOtp,
} from '../../global';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../global';

const Login = () => {
  const { user, authLoading, errorMessage } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Login = useLogin();

  const resendOtp = useResendOtp();

  const handleLogin = async data => {
    const result = await Login(data);
    if (result.success) {
      navigate(`/profile/${result.success}`);
      dispatch(setErrorMessage(null));
    } else if (result.redirectToVerify) {
      const email = result.userEmail;
      const success = await resendOtp(email);
      if (success) {
        navigate('/auth/verifyOTP');
        dispatch(setErrorMessage(null));
      }
    }
  };

  return (
    <div className='inter w-full h-screen flex items-center justify-center'>
      <div className='p-6 w-[330px] bg-white border dark:bg-zinc-950 flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
        <div className='flex items-center justify-center'>
          <Logo className='text-lg tracking-tight' />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-xl font-semibold'>Welcome Back !</span>
          <span className='text-sm text-zinc-500'>
            Login with your Gmail and password !{' '}
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className='flex flex-col gap-3 mt-2'
        >
          <Input
            className='flex flex-col gap-0.5'
            label='Email'
            labelClassName='text-xs font-medium ml-1'
            inputClassName='text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 placeholder:text-zinc-500/50 placeholder:text-sm focus:bg-blue-500/5 focus:border-blue-500/20'
            placeholder='Enter email here . . . '
            type='email'
            id='email'
            required={true}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email',
              },
            })}
          />
          {errors.email && (
            <span className='text-red-500 text-xs m-1'>
              {errors.email.message}
            </span>
          )}
          <Input
            className='flex flex-col gap-0.5'
            label='Password'
            labelClassName='text-xs font-medium ml-1'
            inputClassName='text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 placeholder:text-zinc-500/50 placeholder:text-sm focus:bg-blue-500/5 focus:border-blue-500/20'
            placeholder='Password here . . . . .'
            type='password'
            id='password'
            required={true}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters',
              },
            })}
          />
          {errors.password && (
            <span className='text-red-500 text-xs m-1'>
              {errors.password.message}
            </span>
          )}
          <Link
            to={'/auth/getResetOtp'}
            className='text-xs font-medium ml-0.5 text-blue-500 hover:underline hover:text-blue-600'
          >
            Forgot Password
          </Link>
          {errorMessage && (
            <span className='text-red-500 text-xs'>{errorMessage}</span>
          )}
          <div className='flex items-center justify-center mt-5'>
            <BlueBtn isLoading={authLoading} className='apple' text='Login' />
          </div>
          <div className='text-xs flex gap-1.5 justify-end mt-4 items-center'>
            <span className='text-zinc-500 text-xs'>Create new account !</span>
            <Link
              to={'/auth/singUp'}
              onClick={() => dispatch(setErrorMessage(null))}
              className='text-blue-500 mb-0.5 hover:text-blue-600 hover:underline font-medium apple'
            >
              SingUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
