import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  BlueBtn,
  Btn,
  FileInput,
  Input,
  Logo,
  setErrorMessage,
  useSingUp,
} from '../../global';
import { BiImageAdd } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const SingUp = () => {
  const { authLoading, errorMessage } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const singUp = useSingUp();

  const handleCancelImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValue('profilePhoto', null);
    trigger('profilePhoto');
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setValue('profilePhoto', file);
    }
  };

  const handleRegister = async data => {
    const success = await singUp(data);
    if (success) {
      dispatch(setErrorMessage(null));
      navigate('/auth/verifyOTP');
    }
  };

  return (
    <div className='inter w-full h-screen flex items-center justify-center'>
      <div className='p-6 w-[330px] bg-white dark:bg-zinc-950 border flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
        <div className='flex items-center justify-center'>
          <Logo className='text-lg tracking-tight' />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-xl font-semibold'>Create Account</span>
          <span className='text-sm text-zinc-500'>
            Create your new Account with Gmail !{' '}
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className='flex flex-col gap-3 mt-2'
        >
          <Input
            className='flex flex-col gap-0.5'
            label='UserName'
            labelClassName='text-xs font-medium ml-1'
            inputClassName='text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 placeholder:text-zinc-500/50 placeholder:text-sm focus:bg-blue-500/5 focus:border-blue-500/20'
            placeholder='user name here . . . '
            type='text'
            id='userName'
            required={true}
            {...register('userName', {
              required: 'user name is required !',
            })}
          />
          {errors.userName && (
            <span className='text-red-500 text-xs m-1'>
              {errors.userName.message}
            </span>
          )}
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
          <FileInput
            divClassName='flex flex-col gap-1'
            label='Uplod profile picture'
            labelClassName='text-xs font-medium ml-1'
            id='profile-Picture'
            accept='image/*'
            label2={
              previewUrl ? (
                <img className='h-full w-full object-cover' src={previewUrl} />
              ) : (
                <BiImageAdd
                  size={30}
                  className='group-hover:scale-105 smooth'
                />
              )
            }
            className='cursor-pointer hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500 group border text-zinc-500/50 smooth bg-zinc-500/5 border-zinc-500/20 rounded-md w-28 h-28 flex items-center justify-center overflow-hidden'
            {...register('profilePhoto')}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {previewUrl && (
            <Btn
              onClick={handleCancelImage}
              type='button'
              text='Cancle'
              className='px-4 py-2 bg-zinc-500/5 hover:bg-red-500/20 text-sm rounded-lg hover:text-red-500'
            />
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
          {errorMessage && (
            <span className='text-red-500 text-xs'>{errorMessage}</span>
          )}
          <div className='flex items-center justify-center mt-5'>
            <BlueBtn isLoading={authLoading} className='apple' text='Sing-Up' />
          </div>
          <div className='text-xs flex gap-1.5 justify-end mt-4 items-center'>
            <span className='text-zinc-500 text-xs'>
              Already have account ?
            </span>
            <Link
              to={'/auth/login'}
              onClick={() => dispatch(setErrorMessage(null))}
              className='text-blue-500 mb-0.5 hover:text-blue-600 hover:underline font-medium apple'
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
