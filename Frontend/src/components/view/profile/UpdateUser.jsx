import React, { useEffect, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { GoArrowLeft } from 'react-icons/go';
import {
  BlueBtn,
  Btn,
  FileInput,
  Input,
  Logo,
  setErrorMessage,
  useUpadteUser,
} from '../../../global';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const UpdateUser = ({ setShowUpdateUserPopup }) => {
  const { register, handleSubmit, setValue, trigger } = useForm();
  const { authLoading, errorMessage } = useSelector(state => state.auth);

  const [previewUrl, setPreviewUrl] = useState(null);
  const updatePppupRef = useRef();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        updatePppupRef.current &&
        !updatePppupRef.current.contains(e.target)
      ) {
        setShowUpdateUserPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateUser = useUpadteUser();

  const handleUpdateUser = async data => {
    if (!data.userName && !data.profilePhoto) {
      dispatch(setErrorMessage('One field is required to update profile'));
      return;
    }
    const success = await updateUser(data);
    if (success) {
      dispatch(setErrorMessage(null));
      setShowUpdateUserPopup(false);
    }
  };

  return (
    <div className='inter fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div ref={updatePppupRef} className='flex flex-col gap-1'>
        <div
          onClick={() => setShowUpdateUserPopup(false)}
          className='text-white flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
        >
          <GoArrowLeft size={18} />
          Back
        </div>
        <div
          className='flex flex-col items-center gap-6 w-80 p-6 rounded-lg border 
       border-zinc-300 dark:border-zinc-800 shadow-md
       bg-white dark:bg-zinc-950'
        >
          <Logo />
          <div className='flex flex-col items-center'>
            <span className='text-xl'>Update Profile</span>
            <span className='text-[15px] text-zinc-500'>
              Enter your new user Name. If you'd like to update your profile
              picture, you can upload a new one as well.
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className='flex flex-col w-full items-start gap-4 text-sm'
          >
            <>
              <Input
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'userName'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={'New User Name'}
                type={'text'}
                id={'userName'}
                placeholder={'User Name here . . . .'}
                {...register('userName')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
              <FileInput
                divClassName='flex flex-col gap-1'
                label='Uplod New profile picture'
                labelClassName='text-xs font-medium ml-1'
                id='profile-Picture'
                accept='image/*'
                label2={
                  previewUrl ? (
                    <img
                      className='h-full w-full object-cover'
                      src={previewUrl}
                    />
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
            </>
            {errorMessage && (
              <span className='ml-0.5 text-sm text-red-500'>
                {errorMessage}
              </span>
            )}
            <div className='flex mt-4 w-full justify-center'>
              <BlueBtn text='Update' isLoading={authLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
