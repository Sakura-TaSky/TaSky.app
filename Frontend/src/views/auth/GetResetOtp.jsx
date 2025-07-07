import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import {
  BlueBtn,
  Input,
  Logo,
  useGetResetPassOtp,
  setErrorMessage,
} from '../../global';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoArrowLeft } from 'react-icons/go';

const GetResetOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { user, authLoading, errorMessage } = useSelector(state => state.auth);

  const getResetPassOtp = useGetResetPassOtp();

  const navigator = useNavigate();

  const handleGetOtp = async data => {
    const success = await getResetPassOtp(data);
    if (success) {
      navigator('/auth/setNewPassword');
      dispatch(setErrorMessage(''));
    }
  };

  return (
    <div className='inter w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-1'>
        <Link
          to={`/profile/${user?.userName}`}
          className='flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
        >
          <GoArrowLeft size={18} />
          Back
        </Link>
        <div className='p-6 w-[330px] bg-white border dark:bg-zinc-950 flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
          <div className='flex items-center justify-center'>
            <Logo className='text-lg tracking-tight' />
          </div>
          <div className='flex flex-col items-center text-center gap-1'>
            <span className='text-xl font-semibold'>Forgot Password</span>
            <span className='text-sm text-zinc-500'>
              Enter your registered Gmail to receive a reset OTP .
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleGetOtp)}
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
            {errorMessage && (
              <span className='text-red-500 text-xs m-1'>{errorMessage}</span>
            )}
            <div className='flex items-center justify-center mt-5'>
              <BlueBtn
                isLoading={authLoading}
                className='apple'
                text='Get Otp'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetResetOtp;
