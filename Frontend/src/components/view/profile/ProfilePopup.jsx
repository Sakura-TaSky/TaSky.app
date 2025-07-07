import React, { useRef, useState } from 'react';
import {
  Btn,
  IconBtn,
  useClickOutside,
  useLogout,
  useTheme,
} from '../../../global';
import { useSelector } from 'react-redux';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { Settings, Palette, LogOut } from 'lucide-react';

const ProfilePopup = ({ setShowProfilePopup }) => {
  const { user, authLoading } = useSelector(state => state.auth);

  const logout = useLogout();

  const { lightTheme, darkTheme } = useTheme();

  const profileRef = useRef();
  const [showThemeBtn, setShowThemeBtn] = useState(false);

  useClickOutside(profileRef, () => setShowProfilePopup(false));

  return (
    <div
      ref={profileRef}
      className='z-100 text-sm flex flex-col gap-1 rounded-md fixed bottom-17 left-15 shadow-md border border-zinc-500/30 bg-white dark:bg-zinc-950 smooth'
    >
      <div className='cursor-auto px-2 py-1 border-b-2 border-zinc-500/10'>
        <div className='flex gap-2.5 items-center p-1.5'>
          <div className='flex items-center justify-center overflow-hidden w-8 h-8 bg-slate-200 dark:bg-zinc-950 rounded-md'>
            {user?.profilePhoto ? (
              <img
                className='h-full w-full object-cover'
                src={user?.profilePhoto}
                alt=''
              />
            ) : (
              <CiUser size={24} />
            )}
          </div>
          <div className='flex flex-col'>
            <p className=''>{user?.userName}</p>
            <span className='text-xs text-zinc-500'>{user?.email}</span>
          </div>
        </div>
      </div>
      <div className='px-2 py-1 flex flex-col gap-1'>
        <Link to={`/profile/${user.userName}`}>
          <IconBtn
            icon={
              <Settings className='text-zinc-500' strokeWidth={1.5} size={18} />
            }
            text='Profile Settings'
            className='p-2 w-full rounded-md hover:bg-zinc-500/20'
          />
        </Link>
        <IconBtn
          onClick={() => setShowThemeBtn(!showThemeBtn)}
          icon={
            <Palette className='text-zinc-500' strokeWidth={1.5} size={18} />
          }
          text='Theme'
          className={`${showThemeBtn ? 'bg-zinc-500/20' : 'hover:bg-zinc-500/20'} p-2 w-full rounded-md `}
        />
      </div>
      <div className='p-2 border-t-2 border-zinc-500/10'>
        <IconBtn
          onClick={() => logout()}
          isLoading={authLoading}
          icon={
            <LogOut
              className='rotate-180 text-zinc-500 group-hover:text-red-500 mt-0.5'
              strokeWidth={1.5}
              size={18}
            />
          }
          text='Log-Out'
          className='p-2 w-full rounded-md hover:bg-red-500/10 hover:text-red-500 group'
        />
      </div>
      {showThemeBtn && (
        <div className='absolute -right-40 top-25 p-2 flex gap-2 bg-white dark:bg-zinc-950 border rounded-md border-zinc-500/30 shadow-md smooth'>
          <Btn
            onClick={() => lightTheme()}
            className='bg-white px-4 py-2 rounded-md text-black border border-black shadow-md'
            text='Light'
          />
          <Btn
            onClick={() => darkTheme()}
            className='bg-black px-4 py-2 rounded-md text-white border border-white shadow-md'
            text='Dark'
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
