import {
  formatDate,
  GetRoleColor,
  MemberProfilePopup,
  setMember,
  useUIState,
} from '@/global';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { TbUserPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

const roles = ['all', 'admin', 'moderator', 'leader', 'member', 'viewer'];

const ProjectMemberPage = () => {
  const { project } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);

  const [activeRole, setActiveRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { membersShowInList } = useUIState();

  const [showMemberProfile, setShowMemberProfile] = useState(false);

  const dispatch = useDispatch();

  const filteredMembers =
    project?.members?.filter(({ member, role }) => {
      const matchesRole = activeRole === 'all' || role === activeRole;
      const matchesSearch = member.userName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesRole && matchesSearch;
    }) || [];

  return (
    <>
      <div className='flex flex-wrap justify-between items-center border-y-2 border-zinc-500/10 px-4 py-1.5 gap-2'>
        <div className='flex overflow-x-auto gap-1'>
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`capitalize px-3 py-1.5 rounded text-sm cursor-pointer ${
                activeRole === role
                  ? 'bg-zinc-500/20 shadow'
                  : 'hover:bg-zinc-500/20'
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
      {membersShowInList ? (
        <div className='overflow-x-auto p-2 hide-scrollbar md:p-4'>
          {filteredMembers.length > 0 ? (
            <table className='min-w-full text-sm text-left border border-zinc-500/10'>
              <thead className='bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase text-xs font-medium smooth'>
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
                  <tr
                    key={_id}
                    className='border-t hover:bg-zinc-500/5 border-zinc-500/10 smooth'
                  >
                    <td className='px-4 py-2 flex items-center gap-3'>
                      <img
                        src={member.profilePhoto}
                        alt={member.userName}
                        className='w-8 h-8 rounded-full object-cover border border-zinc-300'
                      />
                      <span
                        className={`font-medium ${user._id === member._id ? 'text-blue-500' : ''}`}
                      >
                        {user._id === member._id ? 'YOU' : member.userName}
                      </span>
                    </td>
                    <td className='px-4 py-2 text-zinc-500 dark:text-zinc-300 break-all'>
                      {member.email}
                    </td>
                    <td className='px-4 py-2'>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${GetRoleColor(role)}`}
                      >
                        {role}
                      </span>
                    </td>
                    <td className='px-4 py-2 text-zinc-500 text-xs italic'>
                      {formatDate(joinedAt)}
                    </td>
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
            <div className='text-sm text-zinc-400 italic mt-10 text-center'>
              No members found.
            </div>
          )}
        </div>
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
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${GetRoleColor(role)}`}
                  >
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
                  <span
                    className={`${
                      user._id === member._id ? 'text-blue-500' : ''
                    } font-semibold text-sm`}
                  >
                    {user._id === member._id ? 'YOU' : member?.userName}
                  </span>
                  <span className='text-xs text-zinc-600 dark:text-zinc-400 break-all'>
                    {member?.email}
                  </span>
                </div>
                <span className='mt-3 text-[9px] text-zinc-500 italic self-end font-medium'>
                  Joined • {formatDate(joinedAt)}
                </span>
              </div>
            ))
          ) : (
            <div className='text-sm text-zinc-400 italic mt-10'>
              No members found.
            </div>
          )}
        </div>
      )}
      {showMemberProfile && (
        <MemberProfilePopup
          setShowMemberProfile={setShowMemberProfile}
          forProject={true}
          forTeam={false}
        />
      )}
    </>
  );
};

export default ProjectMemberPage;
