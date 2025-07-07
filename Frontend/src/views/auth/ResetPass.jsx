import React, { useState } from 'react';
import {
  BlueBtn,
  Input,
  Logo,
  setErrorMessage,
  useResetPassword,
} from '../../global';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const { user, errorMessage, authLoading } = useSelector(state => state.auth);

  const resetPassword = useResetPassword();

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await resetPassword(otp, password, user?.userEmail);
    if (success) {
      navigator('/auth/login');
      dispatch(setErrorMessage(''));
    }
  };

  return (
    <div className='inter w-full h-screen flex items-center justify-center'>
      <div className='p-6 w-[330px] bg-white border dark:bg-zinc-950 flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
        <div className='flex items-center justify-center'>
          <Logo className='text-lg tracking-tight' />
        </div>
        <div className='flex flex-col items-center text-center gap-1'>
          <span className='text-xl font-semibold'>Reset Password</span>
          <span className='text-sm text-zinc-500'>
            Enter OTP and new Password to reset Password .
          </span>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-2'>
          <div>
            <label htmlFor='otp' className='text-xs'>
              OTP
            </label>
            <InputOTP
              id='otp'
              maxLength={6}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot className={'border-l'} index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot className={'border-l'} index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Input
            className='flex flex-col gap-0.5'
            label='New password'
            labelClassName='text-xs font-medium ml-1'
            inputClassName='text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 placeholder:text-zinc-500/50 placeholder:text-sm focus:bg-blue-500/5 focus:border-blue-500/20'
            placeholder='Enter email here . . . '
            type='text'
            id='password'
            required={true}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage && (
            <span className='text-red-500 text-xs'>{errorMessage}</span>
          )}
          <div className='flex items-center justify-center mt-5'>
            <BlueBtn
              isLoading={authLoading}
              className='apple'
              text='Change Password '
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
