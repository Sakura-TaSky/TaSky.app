import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Btn,
  Conform,
  formatDate,
  GetRoleColor,
  IconBtn,
  MemberProfilePopup,
  setMember,
  setTeamErrorMessage,
  TeamAddMember,
  TeamAssignedTask,
  TeamTimeline,
  TeamUpdate,
  useTeam,
  useUIState,
} from '@/global';
import { TbUserPlus } from 'react-icons/tb';
import { LogOut, Search } from 'lucide-react';
import { RiEdit2Fill, RiTaskLine } from 'react-icons/ri';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';

const roles = ['all', 'admin', 'moderator', 'leader', 'member', 'viewer'];

const TeamMemberPage = () => {
  const { team, teamLoading, teamErrorMessage } = useSelector(state => state.team);
  const { user } = useSelector(state => state.auth);

  const { membersShowInList } = useUIState();

  const { leaveTeam } = useTeam();

  const dispatch = useDispatch();

  const [activeRole, setActiveRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateTeamPopup, setShowUpdateTeamPopup] = useState(false);
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showLeaveTeamPopup, setShowLeaveTeamPopup] = useState(false);
  const [showTeamAssignedTask, setShowTeamAssignedTask] = useState(false);
  const filteredMembers =
    team?.members?.filter(({ member, role }) => {
      const matchesRole = activeRole === 'all' || role === activeRole;
      const matchesSearch = member?.userName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesSearch;
    }) || [];

  const handleLeaveTeam = async () => {
    if (team) {
      const success = await leaveTeam(team._id);
      if (success) {
        setShowLeaveTeamPopup(false);
        dispatch(setTeamErrorMessage(''));
      }
    }
  };

  useEffect(() => {
    if (team) {
      setShowTeamAssignedTask(false);
    }
  }, [team]);

  return team ? (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between md:px-4 px-2 py-3 items-center'>
          <div className='font-medium flex flex-wrap gap-2 items-center max-w-[70%]'>
            <div className='flex gap-2 items-center'>
              <TeamTimeline />
              <p className='line-clamp-1'>{team ? `Team - ${team?.teamName}'s Members` : 'Not any Team selected'}</p>
            </div>
            <i
              onClick={() => {
                if (!team) {
                  return;
                }
                setShowUpdateTeamPopup(true);
              }}
              className='p-1 cursor-pointer bg-zinc-500/10 rounded hover:text-blue-500 text-zinc-500 hover:border-blue-500/40 border border-zinc-500/15'
            >
              <RiEdit2Fill />
            </i>
          </div>
          <div className='flex gap-1 flex-col items-end'>
            <Btn
              onClick={() => {
                if (!team) return;
                setShowInviteForm(true);
              }}
              text='Member'
              icon={<TbUserPlus size={16} />}
              className='px-3 py-2 rounded-md bg-zinc-500/10 hover:text-blue-500 hover:bg-blue-500/20 text-xs font-medium smooth'
            />
            <Btn
              text='Team Task'
              icon={showTeamAssignedTask ? <MdOutlineClose size={16} /> : <RiTaskLine size={16} />}
              onClick={() => {
                if (!team) return;
                setShowTeamAssignedTask(!showTeamAssignedTask);
              }}
              className={`${showTeamAssignedTask ? 'text-green-500 bg-green-500/20' : 'hover:text-green-500 hover:bg-green-500/20 bg-zinc-500/10'} px-3 py-2 rounded-md text-xs font-medium smooth`}
            />
          </div>
        </div>
        <div className='flex justify-between flex-wrap items-center border-y-2 border-zinc-500/10 px-4 py-1.5 gap-2 '>
          <div className='flex overflow-x-auto gap-1'>
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`capitalize px-3 py-1.5 rounded text-sm ${
                  activeRole === role ? 'bg-zinc-500/20 shadow' : 'hover:bg-zinc-500/20'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className='flex items-center gap-2 text-sm px-2 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'>
            <Search size={14} />
            <input
              type='text'
              placeholder={`Search ${activeRole} . . . `}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='outline-0'
            />
          </div>
        </div>
        {!showTeamAssignedTask && membersShowInList ? (
          <div className='overflow-x-auto md:p-4 p-2 hide-scrollbar'>
            {filteredMembers.length > 0 ? (
              <table className='min-w-full text-sm text-left border border-zinc-500/10'>
                <thead className='bg-zinc-100  dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase text-xs font-medium smooth'>
                  <tr>
                    <th className='px-4 py-3'>User</th>
                    <th className='px-4 py-3'>Email</th>
                    <th className='px-4 py-3'>Role</th>
                    <th className='px-4 py-3'>Joined At</th>
                    <th className='px-2 py-3'>Edite</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(({ member, role, joinedAt, _id }) => (
                    <tr key={_id} className='border-t hover:bg-zinc-500/5 border-zinc-500/10 smooth'>
                      <td className='px-4 py-2 flex items-center gap-3'>
                        <img
                          src={member.profilePhoto}
                          alt={member.userName}
                          className='w-8 h-8 rounded-full object-cover border border-zinc-300'
                        />
                        <span className={`font-medium ${user._id === member._id ? 'text-blue-500' : ''}`}>
                          {user._id === member._id ? 'YOU' : member.userName}
                        </span>
                      </td>
                      <td className='px-4 py-2 text-zinc-500 dark:text-zinc-300 break-all'>{member.email}</td>
                      <td className='px-4 py-2'>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${GetRoleColor(role)}`}>
                          {role}
                        </span>
                      </td>
                      <td className='px-4 py-2 text-zinc-500 text-xs italic'>{formatDate(joinedAt)}</td>
                      <td
                        onClick={() => (
                          dispatch(
                            setMember({
                              member,
                              role,
                            })
                          ),
                          setShowMemberProfile(true)
                        )}
                        className='p-2 hover:text-blue-500 cursor-pointer'
                      >
                        <HiDotsHorizontal />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='text-sm text-zinc-400 italic mt-10 text-center'>No members found.</div>
            )}
          </div>
        ) : showTeamAssignedTask ? (
          <TeamAssignedTask />
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 md:p-4'>
            {filteredMembers.length > 0 ? (
              filteredMembers.map(({ member, role, joinedAt, _id }) => (
                <div
                  key={_id}
                  className={`w-full rounded-md border shadow-md flex flex-col items-center px-2 pt-2 pb-1 ${GetRoleColor(
                    role
                  )}`}
                >
                  <div className='w-full flex justify-between items-center mb-2'>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${GetRoleColor(role)}`}>
                      {role}
                    </span>
                    <i
                      onClick={() => (
                        dispatch(
                          setMember({
                            member,
                            role,
                          })
                        ),
                        setShowMemberProfile(true)
                      )}
                      className='p-1 hover:text-blue-500 cursor-pointer'
                    >
                      <HiDotsHorizontal />
                    </i>
                  </div>
                  <img
                    src={member?.profilePhoto}
                    alt={member?.userName}
                    className='h-14 w-14 rounded-full object-cover border border-zinc-500'
                  />
                  <div className='mt-2 text-center flex flex-col'>
                    <span className={`${user._id === member._id ? 'text-blue-500' : ''} font-semibold text-sm`}>
                      {user._id === member._id ? 'YOU' : member?.userName}
                    </span>
                    <span className='text-xs text-zinc-600 dark:text-zinc-400 break-all'>{member?.email}</span>
                  </div>
                  <span className='mt-3 text-[9px] text-zinc-500 italic self-end font-medium'>
                    Joined • {formatDate(joinedAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className='text-sm text-zinc-400 italic mt-10'>No members found.</div>
            )}
            <div title='Leave Team' className='fixed bottom-5 right-5'>
              <IconBtn
                onClick={() => {
                  if (!team) return;
                  setShowLeaveTeamPopup(true);
                }}
                text=''
                icon={<LogOut size={18} className='rotate-180' />}
                className='rounded-md p-1.5 border text-red-500 border-red-500/30 bg-red-500/5 hover:border-red-500/60 hover:bg-red-500/20'
              />
            </div>
          </div>
        )}
        {showUpdateTeamPopup && <TeamUpdate forTeamCreation={false} setShowUpdateTeamPopup={setShowUpdateTeamPopup} />}
        {showMemberProfile && (
          <MemberProfilePopup setShowMemberProfile={setShowMemberProfile} forTeam={true} forProject={false} />
        )}
        {showInviteForm && <TeamAddMember setShowInviteForm={setShowInviteForm} />}
        {showLeaveTeamPopup && (
          <Conform
            title={`Leave Team - ${team?.teamName}`}
            p1={
              'Leaving this team means you will no longer have access to its projects, members, and activities. Are you sure you want to proceed   ?'
            }
            conformText={'Leave Team'}
            onCancel={() => (setShowLeaveTeamPopup(false), dispatch(setTeamErrorMessage('')))}
            onConform={handleLeaveTeam}
            danger={true}
            loding={teamLoading}
            error={teamErrorMessage}
          />
        )}
      </div>
    </>
  ) : (
    <div className='flex items-center justify-center w-full h-screen text-sm italic'>
      <p>Select the Team !</p>
    </div>
  );
};

export default TeamMemberPage;
