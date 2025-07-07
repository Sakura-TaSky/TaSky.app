import {
  Btn,
  formatDate,
  setInvite,
  setInviteErrorMessage,
  useOrg,
  useTeam,
} from '@/global';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AcceptInvite = () => {
  const { invite, inviteErrorMessage, inviteLoading } = useSelector(
    state => state.invite
  );

  const naviget = useNavigate();

  const { acceptInviteForOrg, declineInviteForOrg } = useOrg();

  const { acceptInviteForTeam, declineInviteForTeam } = useTeam();

  const dispatch = useDispatch();

  const org = invite?.forOrg;
  const team = invite?.forTeam;
  const invitedBy = invite?.invitedBy;
  const inviteType = team ? 'Team' : 'Organization';

  useEffect(() => {
    if (!invite) {
      naviget('/invite');
    }
  }, []);

  const handleAcceptInvitation = async () => {
    if (!team) {
      const success = await acceptInviteForOrg(invite._id);
      if (success) {
        naviget('/invite');
        dispatch(setInviteErrorMessage(''));
      }
    } else {
      const success = await acceptInviteForTeam(invite._id);
      if (success) {
        naviget('/invite');
        dispatch(setInviteErrorMessage(''));
      }
    }
  };

  const handleDeclinInvitation = async () => {
    if (!team) {
      const success = await declineInviteForOrg(invite._id);
      if (success) {
        naviget('/invite');
        dispatch(setInviteErrorMessage(''));
      }
    } else {
      const success = await declineInviteForTeam(invite._id);
      if (success) {
        naviget('/invite');
        dispatch(setInviteErrorMessage(''));
      }
    }
  };

  return (
    <div className='p-4 flex items-center justify-center'>
      <div className='p-6 flex flex-col gap-4 '>
        <div className='flex items-center gap-4'>
          {team ? (
            team.teamProfilePhoto ? (
              <img
                src={team.teamProfilePhoto}
                alt='Team Logo'
                className='w-12 h-12 rounded-full object-cover'
              />
            ) : (
              <div className='w-12 h-12 rounded-full bg-zinc-500 flex items-center justify-center text-lg font-semibold text-white uppercase'>
                {team.teamName?.charAt(0) || 'T'}
              </div>
            )
          ) : (
            <img
              src={org?.orgProfilePhoto || '/default.png'}
              alt='Org Logo'
              className='w-12 h-12 rounded-full object-cover'
            />
          )}
        </div>
        <div className='font-semibold text-lg text-zinc-800 dark:text-zinc-100'>
          {team?.teamName || org?.orgName}
        </div>
        <div className='text-sm'>
          For : <span className='font-medium'>{inviteType}</span>
        </div>
        <div className='text-sm'>
          Role : <span className='font-medium'>{invite?.asRoleOf}</span>
        </div>
        <div className='text-xs text-gray-500'>
          Invited At : <span>{formatDate(invite?.createdAt)}</span>
        </div>
        <div className='flex gap-4'>
          <span className='text-sm font-medium'>Invited By :</span>
          <div className='flex flex-col gap-2 text-sm'>
            <img
              className='h-7 w-7 rounded-full'
              src={invitedBy?.profilePhoto}
            />
            <span>Name : {invitedBy?.userName}</span>
            <span>Email : {invitedBy?.email}</span>
          </div>
        </div>
        {inviteErrorMessage && (
          <span className='text-sm text-red-500'>{inviteErrorMessage}</span>
        )}
        <div className='flex gap-5 mt-4'>
          <Btn
            isloading={inviteLoading}
            onClick={handleDeclinInvitation}
            text='Decline'
          />
          <Btn
            isloading={inviteLoading}
            onClick={handleAcceptInvitation}
            className='text-sm px-4 py-2 rounded-lg text-green-500 hover:bg-green-500/20 bg-zinc-500/10'
            text='Aceept'
          />
        </div>
      </div>
    </div>
  );
};

export default AcceptInvite;
