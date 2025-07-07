import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlOrganization } from 'react-icons/sl';
import { RiEdit2Fill } from 'react-icons/ri';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { AvatarGroup, Conform, IconBtn } from '@/components';
import { GoProjectSymlink } from 'react-icons/go';
import {
  CornerDownRight,
  FolderKanban,
  LogOut,
  TriangleAlert,
} from 'lucide-react';
import { HiUsers } from 'react-icons/hi';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import {
  OrgUpdate,
  setOrg,
  setOrgErrorMessage,
  useOrg,
  useOrgId,
  useUIState,
} from '@/global';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const OrgPage = () => {
  const { org, orgErrorMessage, orgLoading } = useSelector(state => state.org);

  const { user } = useSelector(state => state.auth);

  const { showConformation, setShowConformation } = useUIState();

  const dispatch = useDispatch();

  const [showUpdateOrgPopup, setShowUpdateOrgPopup] = useState(false);
  const [deleteOrgName, setDeleteOrgName] = useState('');
  const [showLeaveOrgPopup, setShowLeaveOrgPopup] = useState(false);

  const { DeleteOrg, leaveOrg } = useOrg();

  const navigate = useNavigate();

  const handleDeleteOrg = async () => {
    if (deleteOrgName != org?.orgName) {
      dispatch(setOrgErrorMessage('Organization is not matching !'));
      return;
    }
    const success = await DeleteOrg(org?._id, deleteOrgName);
    if (success) {
      dispatch(setOrg(null));
      navigate(`/profile/${user?.userName}`);
      setShowConformation(false);
      localStorage.removeItem('orgId');
    }
  };

  const handleLeaveOrg = async () => {
    const success = await leaveOrg(org?._id);
    if (success) {
      dispatch(setOrg(null));
      navigate(`/profile/${user?.userName}`);
      localStorage.removeItem('orgId');
    }
  };

  return (
    <main className='p-6 '>
      <div className='flex flex-col gap-8'>
        {/* org Info  */}
        <div className='flex flex-col gap-3'>
          <div className='flex gap-10'>
            <div className='flex items-center justify-center overflow-hidden w-20 h-20 bg-zinc-500 rounded-full -ml-1'>
              {org?.orgProfilePhoto ? (
                <img
                  className='h-full w-full object-cover'
                  src={org?.orgProfilePhoto}
                  alt={org?.orgName}
                />
              ) : (
                <SlOrganization className='text-yellow-500' size={40} />
              )}
            </div>
            <i
              onClick={() => setShowUpdateOrgPopup(true)}
              className='self-end p-1 mb-1 bg-zinc-500/10 rounded hover:text-blue-500 text-zinc-500 hover:border-blue-500/40 border border-zinc-500/15'
            >
              <RiEdit2Fill />
            </i>
          </div>
          <div className='flex flex-col'>
            <span className='text-zinc-500 text-xs'>Organization</span>
            <span className='text-sm tracking-wide'>{org?.orgName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-zinc-500 text-xs'>Created By</span>
            <div className='text-sm tracking-wide flex gap-3 items-center'>
              {org?.createdBy?.userName}
              <span className='text-zinc-500'>{org?.createdBy?.email}</span>
              <img
                className='h-7 w-7 rounded-full'
                src={org?.createdBy?.profilePhoto}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='text-zinc-500 text-xs'>Description</span>
            <span className='max-w-[350px] break-all text-sm tracking-wide'>
              {org?.description}
            </span>
          </div>
          <span className='text-xs text-zinc-500 italic'>
            Created-At • {org?.createdAt}
          </span>
        </div>
        {/* memebers info  */}
        <div className='flex flex-col gap-4'>
          <span className='flex items-center gap-2 '>
            <AiOutlineUsergroupAdd
              size={20}
              className='text-amber-500 cursor-pointer hover:text-amber-700'
            />
            WorkForce
          </span>
          <AvatarGroup
            maxVisible={org?.members?.length}
            className='ml-6 flex-wrap max-w-[330px]'
            users={org?.members?.map(m => m.member)}
          />
        </div>
        {/* project info */}
        <div className='flex flex-col gap-4'>
          <span className='flex items-center gap-3 '>
            <GoProjectSymlink size={18} className='text-red-500' />
            Projects
          </span>
          {org?.projects?.length > 0 ? (
            org?.projects?.map(p => (
              <div
                key={p?._id}
                className='flex gap-2 text-sm items-center ml-4 text-zinc-600 dark:text-zinc-400'
              >
                <FolderKanban size={14.5} className='text-slate-500' />
                <span>{p?.projectName}</span>
              </div>
            ))
          ) : (
            <span className='text-sm ml-4 text-zinc-500'>No Project !</span>
          )}
        </div>
        {/* team info */}
        <div className='flex flex-col gap-4'>
          <span className='flex items-center gap-3 '>
            <BsMicrosoftTeams size={18} className='text-purple-500' />
            Teams
          </span>
          {org?.teams?.length > 0 ? (
            org?.teams?.map(t => (
              <div
                key={t?._id}
                className='flex gap-2 text-sm items-center ml-4 text-zinc-600 dark:text-zinc-400'
              >
                <HiUsers size={14.5} className='text-slate-500' />
                <span>{t?.teamName}</span>
              </div>
            ))
          ) : (
            <span className='text-sm ml-4 text-zinc-500'>No Project !</span>
          )}
        </div>
        {/* leave org action */}
        <div className='flex flex-col gap-2'>
          <span className='flex items-center gap-2'>
            <i>
              <CgDanger size={18} className='text-red-500 mt-0.5' />
            </i>
            Leave Organization
          </span>
          <p className='max-w-[350px] text-sm ml-5'>
            Leaving this organization will revoke your access to all it's teams,
            projects, and associated data. You will no longer be able to
            collaborate with it's members unless re-invited. Are you sure you
            want to proceed ?
          </p>
          <div className='flex ml-6'>
            <CornerDownRight className='text-zinc-500' strokeWidth={1} />
            <IconBtn
              onClick={() => (
                setShowLeaveOrgPopup(true),
                dispatch(setOrgErrorMessage(''))
              )}
              icon={<LogOut size={18} className='rotate-180' />}
              text='Leave'
              className='text-sm px-3 py-2 hover:bg-red-500/15 rounded-md text-red-500 max-w-[max-content]'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='flex items-center gap-2'>
            <i>
              <TriangleAlert size={18} className='text-red-500 mt-0.5' />
            </i>
            Delete organization
          </span>
          <div className='max-w-[350px] text-sm ml-5 '>
            Deleting this organization is a permanent action and{' '}
            <span className='font-semibold text-red-500'>cannot be undone</span>
            . This will:
            <ul className='ml-6 mt-1 space-y-0.5'>
              <li> ~ Remove all teams and projects under this organization</li>
              <li> ~ Revoke access for all members</li>
              <li>
                {' '}
                ~ Delete all pending invites related to this organization
              </li>
            </ul>
            You must enter the correct organization name to confirm deletion.
            Only the organization owner can perform this action.
          </div>
          <div className='flex ml-6'>
            <CornerDownRight className='text-zinc-500' strokeWidth={1} />
            <IconBtn
              onClick={() => setShowConformation(true)}
              icon={<RiDeleteBin6Line size={18} />}
              text='Delete'
              className='text-sm px-3 py-2 hover:bg-red-500/15 rounded-md text-red-500 max-w-[max-content]'
            />
          </div>
        </div>
      </div>
      {showUpdateOrgPopup && (
        <OrgUpdate setShowUpdateOrgPopup={setShowUpdateOrgPopup} />
      )}
      {showConformation && (
        <Conform
          title={`Delete Organization - ${org?.orgName}`}
          p1={`Deleting this organization is a permanent action and cannot be undone.`}
          p2={
            'You must enter the correct organization name to confirm deletion. Only the organization owner can perform this action.'
          }
          cancelText={'Cancle'}
          conformText={'Delete'}
          onCancel={() => (
            setShowConformation(false),
            dispatch(setOrgErrorMessage(''))
          )}
          onConform={handleDeleteOrg}
          danger={true}
          loding={orgLoading}
          error={orgErrorMessage}
          input={true}
          label={`Organization name : '${org?.orgName}'`}
          setInput={setDeleteOrgName}
        />
      )}
      {showLeaveOrgPopup && (
        <Conform
          title={`Leave Organization - ${org?.orgName}`}
          p1={`Are you sure you want to leave this organization?`}
          p2={`You will lose access to all teams, projects, and resources within "${org?.orgName}".`}
          cancelText={'Cancel'}
          conformText={'Leave'}
          onCancel={() => (
            setShowLeaveOrgPopup(false),
            dispatch(setOrgErrorMessage(''))
          )}
          onConform={handleLeaveOrg}
          danger={true}
          loding={orgLoading}
          error={orgErrorMessage}
          input={false}
        />
      )}
    </main>
  );
};

export default OrgPage;
