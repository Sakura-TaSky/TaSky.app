import {
  Conform,
  IconBtn,
  setMemberErrorMessage,
  setProjectErrorMessage,
  useClickOutside,
  useOrg,
  useProject,
  useTeam,
} from '@/global';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdTransform } from 'react-icons/md';

const MemberProfilePopup = ({ setShowMemberProfile, forTeam, forProject }) => {
  const { register, handleSubmit } = useForm();

  const { member, memberLoading, memberErrorMessage } = useSelector(
    state => state.member
  );

  const [showConformDeleteUserPopup, setShowConformDeleteUserPopup] =
    useState(false);

  const [
    showConformTransferOwnershipPopup,
    setShowConformTransferOwnershipPopup,
  ] = useState(false);

  const memberProfileRef = useRef();

  const { changeOrgMemberRole, removeMemberFromOrg, transferOwnershipOfOrg } =
    useOrg();

  const {
    removeMemberFromTeam,
    changeTeamMemberRole,
    transferOwnershipOfTeam,
  } = useTeam();

  const {
    changeProjectMemberRole,
    removeMemberFromProject,
    transferOwnershipOfProject,
  } = useProject();

  const dispatch = useDispatch();

  useClickOutside(memberProfileRef, () => {
    if (!showConformDeleteUserPopup && !showConformTransferOwnershipPopup) {
      (setShowMemberProfile(false), dispatch(setMemberErrorMessage('')));
    }
  });

  const hadleUpadteRole = async data => {
    if (data.asRoleOf !== member?.role) {
      if (forTeam) {
        const success = await changeTeamMemberRole(data, member?.member?._id);
        if (success) dispatch(setMemberErrorMessage(''));
      } else if (forProject) {
        const success = await changeProjectMemberRole(
          data,
          member?.member?._id
        );
        if (success) dispatch(setProjectErrorMessage(''));
      } else {
        const success = await changeOrgMemberRole(data, member?.member?._id);
        if (success) dispatch(setMemberErrorMessage(''));
      }
    }
  };

  const handleDeleteMember = async () => {
    if (forTeam) {
      const success = await removeMemberFromTeam(member?.member?._id);
      if (success) {
        setShowConformDeleteUserPopup(false);
        setShowMemberProfile(false);
        dispatch(setMemberErrorMessage(''));
      }
    } else if (forProject) {
      const success = await removeMemberFromProject(member?.member?._id);
      if (success) {
        setShowConformDeleteUserPopup(false);
        setShowMemberProfile(false);
        dispatch(setProjectErrorMessage(''));
      }
    } else {
      const success = await removeMemberFromOrg(member?.member?._id);
      if (success) {
        setShowConformDeleteUserPopup(false);
        setShowMemberProfile(false);
        dispatch(setMemberErrorMessage(''));
      }
    }
  };

  const handleTransferOwnership = async () => {
    if (forTeam) {
      const success = await transferOwnershipOfTeam(member?.member?._id);
      if (success) {
        setShowConformTransferOwnershipPopup(false);
        setShowMemberProfile(false);
        dispatch(setMemberErrorMessage(''));
      }
    } else if (forProject) {
      const success = await transferOwnershipOfProject(member?.member?._id);
      if (success) {
        setShowConformTransferOwnershipPopup(false);
        setShowMemberProfile(false);
        dispatch(setProjectErrorMessage(''));
      }
    } else {
      const success = await transferOwnershipOfOrg(member?.member?._id);
      if (success) {
        setShowConformTransferOwnershipPopup(false);
        setShowMemberProfile(false);
        dispatch(setMemberErrorMessage(''));
      }
    }
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div
        ref={memberProfileRef}
        className='relative bg-white dark:bg-zinc-800 p-6 flex flex-col gap-4 rounded-md shadow-md border border-zinc-500/20 max-w-[300px]'
      >
        <div className='absolute w-full pl-3.5 flex justify-between items-center top-2 right-2'>
          <IconBtn
            onClick={() => (
              setShowConformTransferOwnershipPopup(true),
              dispatch(setMemberErrorMessage(''))
            )}
            text=''
            icon={<MdTransform />}
            className='p-1.5 hover:bg-blue-500/20 text-blue-500/50 hover:text-blue-500 rounded smooth'
          />
          <IconBtn
            onClick={() => (
              setShowConformDeleteUserPopup(true),
              dispatch(setMemberErrorMessage(''))
            )}
            text=''
            icon={<RiDeleteBin6Line />}
            className='p-1.5 hover:bg-red-500/20 text-red-500/50 hover:text-red-500 rounded smooth'
          />
        </div>
        <div className='w-full items-center justify-center flex'>
          <img
            className='h-14 w-14 rounded-full border'
            src={member?.member?.profilePhoto}
          />
        </div>
        <div className='flex flex-col gap-4 items-start text-sm'>
          <div className='flex gap-2 items-center'>
            <span className='text-gray-500'>Name</span>
            <span>{member?.member?.userName}</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-gray-500'>Email</span>
            <span>{member?.member?.email}</span>
          </div>
          <form className='flex flex-col gap-3'>
            <div className='flex gap-4'>
              <label htmlFor='role' className='text-gray-500'>
                Role
              </label>
              <select
                id='role'
                className='outline-0 text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 focus:bg-blue-500/5 focus:border-blue-500/20 '
                {...register('asRoleOf', {
                  required: 'Role is required',
                  onChange: handleSubmit(hadleUpadteRole),
                })}
                defaultValue={member?.role}
              >
                <option className='dark:text-zinc-800' value='admin'>
                  Admin
                </option>
                <option className='dark:text-zinc-800' value='moderator'>
                  Moderator
                </option>
                <option className='dark:text-zinc-800' value='leader'>
                  Leader
                </option>
                <option className='dark:text-zinc-800' value='member'>
                  Member
                </option>
                <option className='dark:text-zinc-800' value='viewer'>
                  Viewer
                </option>
              </select>
            </div>
            {memberErrorMessage && (
              <span className='text-sm text-red-500'>{memberErrorMessage}</span>
            )}
          </form>
        </div>
      </div>
      {showConformDeleteUserPopup && (
        <Conform
          title={
            forTeam
              ? `Delete ${member?.member?.userName} from Team`
              : !forProject
                ? `Delete ${member?.member?.userName} from Organization`
                : `Delete ${member?.member?.userName} from Project`
          }
          p1={
            forTeam
              ? 'Removing this member will revoke their access to  teams and projects within this team. You can invite them again later if needed.'
              : 'Removing this member will revoke their access to all teams and projects within this organization. You can invite them again later if needed.'
          }
          conformText={'Delete'}
          cancelText={'Cancel'}
          onCancel={() => (
            setShowConformDeleteUserPopup(false),
            dispatch(setMemberErrorMessage(''))
          )}
          onConform={handleDeleteMember}
          danger={true}
          error={memberErrorMessage}
          loding={memberLoading}
        />
      )}
      {showConformTransferOwnershipPopup && (
        <Conform
          title={`Transfer Ownership to ${member?.member?.userName}?`}
          p1={
            'Transferring ownership will give full administrative control to this member.'
          }
          p2={
            'This action is irreversible. Make sure you trust the selected member before proceeding.'
          }
          conformText={'Transfer Ownership'}
          cancelText={'Cancel'}
          onCancel={() => (
            setShowConformTransferOwnershipPopup(false),
            dispatch(setMemberErrorMessage(''))
          )}
          onConform={handleTransferOwnership}
          danger={true}
          error={memberErrorMessage}
          loding={memberLoading}
        />
      )}
    </div>
  );
};

export default MemberProfilePopup;
