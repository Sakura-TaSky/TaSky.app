import { AvatarGroup, BlueBtn, Btn, IconBtn } from '@/components';
import React, { useState } from 'react';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { HiMiniUsers } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import { setTeam, TeamUpdate } from '@/global';

const TeamMenu = () => {
  const { org } = useSelector(state => state.org);

  const dispatch = useDispatch();

  const [showTeams, setShowTeams] = useState(false);
  const [showTeamCreateForm, setShowTeamCreateForm] = useState(false);
  const location = useLocation();

  return (
    <div className='ml-4 '>
      <div
        onClick={() => setShowTeams(!showTeams)}
        className={` ${showTeams ? 'bg-zinc-500/20' : ''} cursor-pointer hover:bg-zinc-500/20 flex justify-between items-center px-3 py-2 rounded  group smooth`}
      >
        <IconBtn text='Teams' icon={<BiLogoMicrosoftTeams size={19} />} />
        <ChevronRight
          size={18}
          className={`${showTeams ? '-rotate-90 opacity-100' : 'rotate-90 group-hover:opacity-100'} opacity-30  smooth`}
        />
      </div>
      {showTeams && (
        <>
          {org?.teams?.length > 0 &&
            org.teams.map(t => (
              <Link
                key={t?._id}
                onClick={() => dispatch(setTeam(t))}
                to={`/${org?.orgName}/${t?.teamName}/${t?._id}/team-members`}
                className={`relative ml-6 mt-1.5 border border-zinc-500/10 rounded px-3 py-2 ${
                  location.pathname.includes(t?._id)
                    ? 'bg-zinc-800 text-zinc-300 shadow-md dark:bg-zinc-200 dark:text-zinc-800'
                    : 'hover:bg-zinc-500/10'
                } flex smooth items-center line-clamp-1`}
              >
                <span className='w-[60%] overflow-hidden line-clamp-1'>
                  {t?.teamName}
                </span>
                <AvatarGroup
                  key={t?._id}
                  groupKey={t?._id}
                  size='sm'
                  maxVisible={3}
                  className='absolute right-0 mt-1 mr-3'
                  users={t?.members.map(m => m.member)}
                />
              </Link>
            ))}
          <div
            onClick={() => setShowTeamCreateForm(true)}
            className='flex w-full justify-center m-2 text-zinc-500'
          >
            <Btn text='Create Team' />
          </div>
        </>
      )}
      {showTeamCreateForm && (
        <TeamUpdate
          setShowTeamCreateForm={setShowTeamCreateForm}
          forTeamCreation={showTeamCreateForm}
        />
      )}
    </div>
  );
};

export default TeamMenu;
