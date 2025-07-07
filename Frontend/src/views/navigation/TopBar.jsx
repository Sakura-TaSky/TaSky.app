import { IconBtn, OrgTimeline } from '@/components';
import { useHotkey, useTheme, useUIState } from '@/global';
import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { Columns3, AlignJustify } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const TopBar = () => {
  const {
    membersShowInList,
    setMembersShowInList,
    taskShowInBoard,
    setTaskShowInBoard,
  } = useUIState();

  const { theme, lightTheme, darkTheme } = useTheme();

  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { org } = useSelector(state => state.org);
  const { team } = useSelector(state => state.team);
  const { project } = useSelector(state => state.project);

  useHotkey('shift+t', () => {
    if (theme == 'light') {
      darkTheme();
    } else {
      lightTheme();
    }
  });
  useHotkey('shift+p', () => navigate(`/profile/${user?.userName}`));

  const location = useLocation();

  return (
    <div className='flex items-center justify-between w-full max-h-[56px] border-b-2 border-zinc-500/10 p-2 px-4 bg-zinc-50 dark:bg-[#1c1c1c] smooth'>
      {(location.pathname.includes('Members') ||
        location.pathname.includes('team-members') ||
        location.pathname.includes('-P-Member')) && (
        <div className='flex gap-2 items-center justify-center'>
          <IconBtn
            onClick={() => setMembersShowInList(true)}
            className={`${membersShowInList ? 'bg-zinc-500/20 shadow' : 'hover:bg-zinc-500/20'} text-sm p-2 pr-3 rounded `}
            text='List'
            icon={<FaListAlt className='mt-1' />}
          />
          <IconBtn
            onClick={() => setMembersShowInList(false)}
            className={`${!membersShowInList ? 'bg-zinc-500/20 shadow' : ' hover:bg-zinc-500/20'} text-sm p-2 pr-3 rounded `}
            text='Grid'
            icon={<IoGrid className='mt-1' />}
          />
        </div>
      )}
      {location.pathname.includes('project') &&
        !location.pathname.includes('-P-Member') && (
          <div className='flex gap-2 items-center justify-center'>
            <div className='relative group'>
              <IconBtn
                onClick={() => setTaskShowInBoard(true)}
                className={`${taskShowInBoard ? 'bg-zinc-500/20 shadow' : 'hover:bg-zinc-500/20'} text-sm p-2 pr-3 rounded`}
                text='Board'
                icon={<Columns3 strokeWidth={2.5} size={18} className='mt-1' />}
              />
              <FaCrown
                className='group-hover:scale-120 group-hover:-rotate-30 smooth border rounded-full p-[1px]  absolute -top-1 -left-1 text-yellow-500 shadow bg-yellow-50 shadow-yellow-500'
                size={12}
              />
            </div>
            <IconBtn
              onClick={() => setTaskShowInBoard(false)}
              className={`${!taskShowInBoard ? 'bg-zinc-500/20 shadow' : ' hover:bg-zinc-500/20'} text-sm p-2 pr-3 rounded `}
              text='Table'
              icon={<AlignJustify strokeWidth={3} size={18} className='mt-1' />}
            />
          </div>
        )}
      <i></i>
      <div className='flex items-center gap-2'>
        <OrgTimeline />
        <div
          onClick={() => (
            console.log(user),
            console.log(org),
            console.log(project)
          )}
          className='cursor-pointer h-8 w-8 rounded border bg-zinc-800 dark:bg-zinc-200'
        >
          Log
        </div>
      </div>
    </div>
  );
};

export default TopBar;
