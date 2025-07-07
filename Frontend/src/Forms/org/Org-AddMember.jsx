import {
  setOrgErrorMessage,
  useClickOutside,
  useOrg,
  BlueBtn,
  Input,
} from '@/global';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

const OrgAddMember = ({ setShowInviteForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formRef = useRef();

  const dispatch = useDispatch();

  const { inviteMemberToOrg } = useOrg();

  useClickOutside(formRef, () => setShowInviteForm(false));

  const { org, orgErrorMessage, orgLoading } = useSelector(state => state.org);

  const handleInviteMember = async data => {
    if (!data.email) {
      dispatch(setOrgErrorMessage('Valied email is required to Invite Member'));
      return;
    }
    if (!data.asRoleOf) {
      dispatch(setOrgErrorMessage('select the role for this user'));
      return;
    }
    const success = await inviteMemberToOrg(data);
    if (success) {
      setShowInviteForm(false);
    }
  };

  return org ? (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div ref={formRef} className='flex flex-col gap-1'>
        <div
          onClick={() => setShowInviteForm(false)}
          className='text-white flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
        >
          <GoArrowLeft size={18} />
          Back
        </div>
        <div className='p-6 w-[330px] bg-white dark:bg-zinc-950 border flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
          <div className='flex flex-col gap-2 items-center justify-center'>
            <span className='text-xl font-semibold'>
              Invite Member to {org?.orgName}
            </span>
            <span className='text-sm text-zinc-500'>
              Send an invitation by entering the email address of the person
              you'd like to add to your organization.
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleInviteMember)}
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
            <div className='flex flex-col gap-0.5'>
              <label htmlFor='role' className='text-xs font-medium ml-1'>
                Invite as
              </label>
              <select
                id='role'
                className='outline-0 text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 focus:bg-blue-500/5 focus:border-blue-500/20 text-zinc-700 dark:text-zinc-200'
                {...register('asRoleOf', { required: 'Role is required' })}
              >
                <option className='dark:text-zinc-800' value='member'>
                  Member
                </option>
                <option className='dark:text-zinc-800' value='admin'>
                  Admin
                </option>
                <option className='dark:text-zinc-800' value='moderator'>
                  Moderator
                </option>
                <option className='dark:text-zinc-800' value='leader'>
                  Leader
                </option>
                <option className='dark:text-zinc-800' value='viewer'>
                  Viewer
                </option>
              </select>
            </div>
            {errors.email && (
              <span className='text-red-500 text-xs m-1'>
                {errors.email.message}
              </span>
            )}
            {orgErrorMessage && (
              <span className='text-sm text-red-500'>{orgErrorMessage}</span>
            )}
            <div className='flex items-center justify-center mt-5'>
              <BlueBtn isLoading={orgLoading} text='Send Invite' />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div ref={formRef} className=' flex items-center justify-center z-100'>
      <span className='text-red-500 text-lg'>Organization Not selected !</span>
    </div>
  );
};

export default OrgAddMember;
