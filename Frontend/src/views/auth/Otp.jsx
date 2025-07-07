import React, { useState } from 'react';
import {
  BlueBtn,
  Input,
  Logo,
  useVerifyOtp,
  setErrorMessage,
  useResendOtp,
  DotLoader,
} from '../../global';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const Otp = () => {
  const navigate = useNavigate();

  const [canResend, setCanResend] = useState(true);

  const [otp, setOtp] = useState('');

  const { user, authLoading, errorMessage } = useSelector(state => state.auth);

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  const dispatch = useDispatch();

  const handleVerifyOtp = async e => {
    e.preventDefault();
    const success = await verifyOtp(otp, user?.userEmail);
    if (success) {
      navigate(`/profile/${success}`);
      dispatch(setErrorMessage(null));
    }
  };

  const ResendOtp = () => {
    resendOtp(user.userEmail);
    setCanResend(false);
    setTimeout(() => {
      setCanResend(true);
    }, 10000);
  };

  return (
    <div className='inter w-full h-screen flex items-center justify-center'>
      <div className='p-6 w-[330px] bg-white border dark:bg-zinc-950 flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
        <div className='flex items-center justify-center'>
          <Logo className='text-lg tracking-tight' />
        </div>
        <div className='flex flex-col items-center text-center gap-1'>
          <span className='text-xl font-semibold'>Verify OTP</span>
          <span className='text-sm text-zinc-500'>
            Verify your Gmail by OTP that we sent to your Gmail account{' '}
            <span className='text-blue-600'>{user?.userEmail}</span>
          </span>
        </div>
        <form onSubmit={handleVerifyOtp} className='flex flex-col gap-3 mt-2'>
          <div className='flex flex-col gap-1 items-center'>
            <label className='text-xs'>OTP</label>
            <InputOTP
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
            {errorMessage && (
              <span className='text-red-500 text-xs m-1'>{errorMessage}</span>
            )}
          </div>
          <div className='flex items-center justify-center mt-5'>
            <BlueBtn
              onClick={() => dispatch(setErrorMessage(null))}
              isLoading={authLoading}
              className='apple'
              text='Verify OTP'
            />
          </div>
          <div className='text-xs flex gap-1.5 justify-end mt-4 items-center'>
            <span>Don't recived OTP ?</span>
            {canResend ? (
              <span
                onClick={ResendOtp}
                className='text-blue-500 hover:text-blue-700 underline font-medium cursor-pointer'
              >
                Resend OTP
              </span>
            ) : (
              <DotLoader gap='2px' />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
