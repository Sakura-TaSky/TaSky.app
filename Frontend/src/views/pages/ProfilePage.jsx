import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SlOrganization } from 'react-icons/sl';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import {
  SquareCheckBig,
  Palette,
  Sun,
  Moon,
  LogOut,
  FolderKanban,
  CornerDownRight,
} from 'lucide-react';
import { HiUsers } from 'react-icons/hi2';
import { PiMicrosoftTeamsLogoFill } from 'react-icons/pi';
import { useTheme } from '../../styles/Themes/Theme';
import { IconBtn, UpdateUser, useLogout } from '@/global';
import { BsFillUnlockFill } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import { CiUser } from 'react-icons/ci';
import { RiEdit2Fill } from 'react-icons/ri';
import { GoProjectSymlink } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);

  const [showUpdateUserPopup, setShowUpdateUserPopup] = useState(null);

  const { lightTheme, darkTheme } = useTheme();

  const navigator = useNavigate();

  const logout = useLogout();

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-8'>
        {/* profile info */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-10'>
            <div className='flex items-center justify-center overflow-hidden w-20 h-20 bg-slate-200 dark:bg-zinc-950 rounded-full -ml-1'>
              {user.profilePhoto ? (
                <img
                  className='h-full w-full object-cover'
                  src={user.profilePhoto}
                  alt={user.userName}
                />
              ) : (
                <CiUser size={30} />
              )}
            </div>
            <i
              onClick={() => setShowUpdateUserPopup(true)}
              className='self-end p-1 mb-1 bg-zinc-500/10 rounded hover:text-blue-500 text-zinc-500 hover:border-blue-500/40 border border-zinc-500/15'
            >
              <RiEdit2Fill />
            </i>
          </div>
          <div className='flex flex-col'>
            <span className='text-zinc-500 text-sm'>User Name</span>
            <span>{user?.userName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-zinc-500 text-sm'>Email</span>
            <span>{user?.email}</span>
          </div>
        </div>
        {/* task Info */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2'>
            <SquareCheckBig size={16} className='text-green-500' />
            <span>Tasks</span>
          </div>
          <span className='text-sm ml-4 text-zinc-500'>No Task !</span>
        </div>
        {/* orgInfo */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2'>
            <SlOrganization className='text-amber-500' />
            <span>In organizations</span>
          </div>
          {user?.inOrg?.length > 0 ? (
            user?.inOrg?.map(o => (
              <div
                key={o.org._id}
                className='flex gap-2 text-sm items-center ml-4 text-zinc-600 dark:text-zinc-400'
              >
                <TbBuildingSkyscraper className='text-slate-500' />
                <span>{o.org.orgName}</span>
              </div>
            ))
          ) : (
            <span className='text-sm ml-4 text-zinc-500'>
              No Organization !
            </span>
          )}
        </div>
        {/* project info */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2'>
            <GoProjectSymlink className='text-[#E91E63]' />
            <span>In Projects</span>
          </div>
          {user?.inProject?.length > 0 ? (
            user?.inProject?.map(p => (
              <div
                key={p.project?._id}
                className='flex gap-2 text-sm items-center ml-4 text-zinc-600 dark:text-zinc-400'
              >
                <FolderKanban size={14.5} className='text-slate-500' />
                <span>{p.project?.projectName}</span>
              </div>
            ))
          ) : (
            <span className='text-sm ml-4 text-zinc-500'>No Project !</span>
          )}
        </div>
        {/* teams info */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2'>
            <PiMicrosoftTeamsLogoFill size={20} className='text-purple-500' />
            <span>In Teams</span>
          </div>
          {user?.inTeams?.length > 0 ? (
            user?.inTeams?.map(t => (
              <div
                key={t?.team?._id}
                className='flex gap-2 text-sm items-center ml-4 text-zinc-600 dark:text-zinc-400'
              >
                <HiUsers className='text-slate-500' />
                <span>{t?.team?.teamName}</span>
              </div>
            ))
          ) : (
            <span className='text-sm ml-4 text-zinc-500'>No Teams !</span>
          )}
        </div>
        {/* theme swiitch */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2'>
            <Palette size={18} />
            <span>Theme Switch</span>
          </div>
          <div className='flex gap-4 ml-4 text-sm'>
            <IconBtn
              onClick={() => lightTheme()}
              text='Light'
              icon={<Sun size={18} />}
              className='p-4 rounded-md text-black bg-white border border-black '
            />
            <IconBtn
              onClick={() => darkTheme()}
              text='Dark'
              icon={<Moon size={18} />}
              className='p-4 rounded-md text-white bg-black border border-white '
            />
          </div>
        </div>
        {/* Forgot Password */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2 text-blue-500'>
            <BsFillUnlockFill size={18} />
            <span>Forgot Password</span>
          </div>
          <div className='flex flex-col gap-2 ml-4 text-sm max-w-[350px]'>
            <span>
              {' '}
              If you forgot your password, don't worry. You can reset it
              securely using an OTP sent to your registered email. Click the
              button below to start the reset process .
            </span>
            <div className='flex'>
              <CornerDownRight className='text-zinc-500' strokeWidth={1} />
              <IconBtn
                onClick={() => navigator('/auth/getResetOtp')}
                icon={<BsArrowCounterclockwise size={19} />}
                text='Reset password'
                className='text-sm px-3 py-2 hover:bg-blue-500/15 rounded-md text-blue-500 max-w-[max-content]'
              />
            </div>
          </div>
        </div>
        {/* Logout */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center mb-2 text-red-500'>
            <CgDanger size={18} />
            <span>Log out from this Account</span>
          </div>
          <div className='flex flex-col gap-2 ml-4 text-sm max-w-[350px]'>
            <span>
              {' '}
              You are about to log out of your account. If you continue, you'll
              need to sign-In again to access your DoFlow account.
            </span>
            <div className='flex '>
              <CornerDownRight className='text-zinc-500' strokeWidth={1} />
              <IconBtn
                onClick={logout}
                icon={<LogOut size={18} className='rotate-180' />}
                text='Logout'
                className='text-sm px-3 py-2 hover:bg-red-500/15 rounded-md text-red-500 max-w-[max-content]'
              />
            </div>
          </div>
        </div>
      </div>
      {showUpdateUserPopup && (
        <UpdateUser setShowUpdateUserPopup={setShowUpdateUserPopup} />
      )}
    </div>
  );
};

export default ProfilePage;
