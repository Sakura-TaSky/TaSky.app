import React, { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ProfilePopup } from '../../../global';

const ProfileIcon = () => {
  const location = useLocation();

  const { user } = useSelector(state => state.auth);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  function sliceEmail(Email) {
    if (!Email) return;
    return Email.length > 20 ? Email.slice(0, 20) + '.....' : Email;
  }

  return (
    <>
      <div className='p-1.5 border-t-2 border-zinc-500/10 cursor-pointer'>
        {user && (
          <div
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            className={`${location.pathname.includes('profile') ? 'bg-zinc-800 text-zinc-300 shadow-md dark:bg-zinc-200 dark:text-zinc-800' : 'hover:bg-zinc-500/15'} p-1.5 rounded  flex gap-6 justify-between items-center`}
          >
            <div className='flex gap-2.5 items-center'>
              <div className='flex items-center justify-center overflow-hidden w-7.5 h-7.5 bg-slate-200 dark:bg-zinc-950 rounded'>
                {user.profilePhoto ? (
                  <img
                    className='h-full w-full object-cover'
                    src={user.profilePhoto}
                    alt=''
                  />
                ) : (
                  <CiUser size={22} />
                )}
              </div>
              <div className='flex flex-col text-xs'>
                <p className=''>{user.userName}</p>
                <span className='text-zinc-500 text-[11px]'>
                  {sliceEmail(user.email)}
                </span>
              </div>
            </div>
          </div>
        )}
        {showProfilePopup && (
          <ProfilePopup setShowProfilePopup={setShowProfilePopup} />
        )}
      </div>
    </>
  );
};

export default ProfileIcon;
