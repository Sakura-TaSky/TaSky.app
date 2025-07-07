import React, { useEffect, useRef } from 'react';
import {
  useHotkey,
  useUIState,
  InfoIcon,
  OrgSelect,
  IconBtn,
  ProfileIcon,
  TeamMenu,
  ProjectMenu,
  useClickOutside,
} from '../../global';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { PiUsersFour } from 'react-icons/pi';
import { IoPersonAdd } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { FiInbox } from 'react-icons/fi';

const SideBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useUIState();
  const sidebarRef = useRef();

  const { user } = useSelector(state => state.auth);

  const { org } = useSelector(state => state.org);

  const location = useLocation();

  useHotkey('shift+s', () => setIsSidebarOpen(prev => !prev));

  useClickOutside(sidebarRef, () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className='h-[56px] border-b-2 border-zinc-500/10 bg-zinc-50 dark:bg-[#1c1c1c] flex items-center smooth'>
        <InfoIcon
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          icon={
            isSidebarOpen ? (
              <PanelLeftClose strokeWidth={1.5} size={22} />
            ) : (
              <PanelLeftOpen strokeWidth={1.5} size={22} />
            )
          }
          className={`z-100 absolute p-1.5 ${isSidebarOpen ? 'ml-52' : 'ml-1.5'} opacity-50 rounded h-[max-content] hover:bg-zinc-500/20 hover:opacity-100 smooth`}
          position=' top-9'
          info='shift + s'
        />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-62 bg-zinc-50 dark:bg-[#1c1c1c] border-r-2 border-zinc-500/10
       ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full opacity-0'} 
       smooth`}
      >
        <div className='flex flex-col h-full justify-between'>
          {user && <OrgSelect />}
          <div className='flex-1 overflow-y-auto hide-scrollbar p-2'>
            <div className='flex flex-col gap-1 w-full text-[14px] font-medium tracking-tight dark:font-normal'>
              <Link
                className={`${location.pathname.includes('invite') ? 'bg-zinc-800 text-zinc-300 shadow-md dark:bg-zinc-200 dark:text-zinc-800' : 'hover:bg-zinc-500/20 '} relative text-zinc-500 rounded text-xs p-2 tracking-wider`}
                to={'/invite'}
              >
                <IconBtn
                  text='Invitation'
                  icon={<FiInbox size={16} className='mt-0.5' />}
                />
                {user?.invites?.length > 0 && (
                  <span className='absolute top-0.5 right-1 text-[9.5px] font-bold tracking-tight text-red-500'>
                    {user?.invites?.length}
                  </span>
                )}
              </Link>
              <IconBtn
                className='text-xs text-zinc-500 font-medium p-2 tracking-wider'
                text='WorkForce'
                icon={<PiUsersFour size={16} />}
              />
              <Link
                to={`/${org?.orgName}/Members`}
                className={`${location.pathname.includes('Members') ? 'bg-zinc-800 text-zinc-300 shadow-md dark:bg-zinc-200 dark:text-zinc-800' : 'hover:bg-zinc-500/20 '}
                   ml-4 px-3 py-2 rounded smooth`}
              >
                <IconBtn text='Members' icon={<IoPersonAdd size={16} />} />
              </Link>
              <TeamMenu />
              <ProjectMenu />
            </div>
          </div>
          {user && <ProfileIcon />}
        </div>
      </div>
    </>
  );
};

export default SideBar;
