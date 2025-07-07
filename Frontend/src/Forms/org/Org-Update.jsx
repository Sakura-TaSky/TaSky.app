import { BlueBtn, Btn, FileInput, Input, TextArea } from '@/components';
import {
  useClickOutside,
  useOrg,
  useOrgId,
  setOrgErrorMessage,
} from '@/global';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiImageAdd } from 'react-icons/bi';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

const OrgUpdate = ({ setShowUpdateOrgPopup, forCreation, setForCreation }) => {
  const { register, handleSubmit, setValue, trigger } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const updatePppupRef = useRef();
  const fileInputRef = useRef(null);

  const { orgId, setOrgId } = useOrgId();

  const dispatch = useDispatch();

  const { UpdateOrg, createOrg } = useOrg();

  const { orgErrorMessage, orgLoading } = useSelector(state => state.org);

  const handleCancelImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValue('orgProfilePhoto', null);
    trigger('orgProfilePhoto');
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setValue('orgProfilePhoto', file);
    }
  };

  useClickOutside(updatePppupRef, () => {
    if (forCreation) {
      setForCreation(false);
    } else {
      setShowUpdateOrgPopup(false);
    }
  });

  const handleUpdateOrg = async data => {
    if (forCreation) {
      if (!data.orgName) {
        dispatch(setOrgErrorMessage('Organization name is required !'));
        return;
      }
      const success = await createOrg(data);
      if (success) {
        setForCreation(false);
        dispatch(setOrgErrorMessage(''));
        setOrgId(success);
      }
    } else {
      if (!data.orgName && !data.orgProfilePhoto && !data.description) {
        dispatch(setOrgErrorMessage('One field is required to update'));
        return;
      }
      const success = await UpdateOrg(data, orgId);
      if (success) {
        setShowUpdateOrgPopup(false);
        dispatch(setOrgErrorMessage(''));
      }
    }
  };

  return (
    <div className='inter fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div ref={updatePppupRef} className='flex flex-col gap-1'>
        <div
          onClick={() => {
            if (forCreation) {
              setForCreation(false);
            } else {
              setShowUpdateOrgPopup(false);
            }
          }}
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
          <div className='flex flex-col items-cente gap-2'>
            <span className='text-xl'>
              {forCreation ? 'Create Organization' : 'Update Organization'}
            </span>
            <span className='text-[15px] text-zinc-500'>
              {forCreation
                ? 'create Organization By filling this all Deatils'
                : "Enter your new Organization Name. If you'd like to update your profile picture, you can upload a new one as well."}
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateOrg)}
            className='flex flex-col w-full items-start gap-4 text-sm'
          >
            <>
              <Input
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'orgName'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={forCreation ? 'Organization Name' : 'New Org Name'}
                type={'text'}
                id={'orgName'}
                placeholder={'Org Name here . . . .'}
                {...register('orgName')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
              <TextArea
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'description'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={'description'}
                type={'text'}
                id={'description'}
                placeholder={'description . . . .'}
                {...register('description')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
              <FileInput
                divClassName='flex flex-col gap-1'
                label={forCreation ? 'Uplode Picture' : 'Uplode New picture'}
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
                {...register('orgProfilePhoto')}
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
            {orgErrorMessage && (
              <span className='ml-0.5 text-sm text-red-500'>
                {orgErrorMessage}
              </span>
            )}
            <div className='flex mt-4 w-full justify-center'>
              <BlueBtn
                isLoading={orgLoading}
                text={forCreation ? 'create' : 'Update'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgUpdate;
