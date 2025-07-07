import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AvatarGroup,
  Conform,
  setProjectErrorMessage,
  setTeam,
  useProject,
  useUIState,
} from '@/global';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ProjectTeam = () => {
  const { project, projectErrorMessage, projectLoading } = useSelector(
    state => state.project
  );
  const { org } = useSelector(state => state.org);

  const { membersShowInList } = useUIState();

  const dispatch = useDispatch();

  const [showDeleteTeamFromProjectPopup, setShowDeleteTeamFromProjectPopup] =
    useState(null);

  const { removeTeamFromProject } = useProject();

  const handleRemoveTeamFromProject = async () => {
    if (showDeleteTeamFromProjectPopup) {
      const success = await removeTeamFromProject(
        showDeleteTeamFromProjectPopup._id
      );
      if (success) {
        setShowDeleteTeamFromProjectPopup(null);
        dispatch(setProjectErrorMessage(''));
      }
    }
  };

  return (
    <>
      <div className='p-2 border-t-2 border-zinc-500/10'>
        {membersShowInList ? (
          project?.teams.length > 0 ? (
            <table className='min-w-full text-sm text-left border border-zinc-500/10'>
              <thead className='bg-zinc-100  dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase text-xs font-medium smooth'>
                <tr>
                  <th className='px-4 py-3'>Team</th>
                  <th className='px-4 py-3'>Members</th>
                  <th className='px-4 py-3'>CreatedBy</th>
                  <th className='px-4 py-3'>Remove</th>
                </tr>
              </thead>
              <tbody>
                {project?.teams.map(t => (
                  <tr
                    key={t?._id}
                    className='border-t hover:bg-zinc-500/5 border-zinc-500/10 smooth'
                  >
                    <td
                      onClick={() => dispatch(setTeam(t))}
                      className='cursor-pointer px-4 py-2 align-middle gap-3 hover:bg-zinc-500/10 text-blue-500'
                    >
                      <Link
                        className=' hover:underline'
                        to={`/${org?.orgName}/${t?.teamName}/${t?._id}/team-members`}
                      >
                        {t?.teamName}
                      </Link>
                    </td>
                    <td className='px-4 py-2 align-middle gap-3'>
                      <AvatarGroup
                        size='sm'
                        users={t?.members?.map(m => m?.member)}
                      />
                    </td>
                    <td className='px-4 py-2 align-middle gap-3'>
                      <div className='flex items-center gap-1'>
                        <img
                          className='w-6.5 h-6.5 rounded-full'
                          src={t?.createdBy?.profilePhoto}
                          alt=''
                        />
                        <span>{t?.createdBy?.userName}</span>
                      </div>
                    </td>
                    <td
                      onClick={() => setShowDeleteTeamFromProjectPopup(t)}
                      className='px-4 py-2 align-middle gap-3 hover:text-red-500 cursor-pointer hover:bg-zinc-500/20'
                    >
                      <RiDeleteBin6Line size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-sm text-zinc-400 italic mt-10 text-center'>
              No Teams found.
            </div>
          )
        ) : project?.teams.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 md:p-4'>
            {project?.teams.map(t => (
              <div
                key={t?._id}
                className='w-full rounded-md border shadow-md flex flex-col gap-3 items-start p-2 bg-zinc-500/5 '
              >
                <div className='w-full flex justify-between'>
                  <span className='flex items-center justify-center h-6 w-6 rounded bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800 font-semibold italic'>
                    {t?.teamName?.charAt(0).toUpperCase()}
                  </span>
                  <i
                    onClick={() => setShowDeleteTeamFromProjectPopup(t)}
                    className='p-1.5 rounded hover:text-red-500 cursor-pointer hover:bg-red-500/20'
                  >
                    <RiDeleteBin6Line size={16} />
                  </i>
                </div>
                <div
                  onClick={() => dispatch(setTeam(t))}
                  className='line-clamp-1 w-full flex overflow-hidden'
                >
                  <Link
                    to={`/${org?.orgName}/${t?.teamName}/${t?._id}/team-members`}
                    className='font-semibold inter px-2 text-blue-500 hover:underline'
                  >
                    {t?.teamName}
                  </Link>
                </div>
                <div className='flex items-center gap-2 text-xs px-2'>
                  Members -
                  <AvatarGroup
                    maxVisible={5}
                    size='sm'
                    users={t?.members.map(m => m.member)}
                  />
                </div>
                <div className='flex items-center gap-2 text-xs px-2 pb-2'>
                  createdBy -
                  <img
                    className='w-6 h-6 rounded-full'
                    src={t?.createdBy?.profilePhoto}
                    alt=''
                  />
                  <span>{t?.createdBy?.userName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-sm text-zinc-400 italic mt-10 text-center'>
            No Teams found.
          </div>
        )}
        {showDeleteTeamFromProjectPopup && (
          <Conform
            title={`Remove Team - ${showDeleteTeamFromProjectPopup?.teamName} from the Project`}
            p1={`Removing this team will revoke its access to the project and remove all its members from this project. You can add the team back later if needed.`}
            conformText={'Remove Team'}
            error={projectErrorMessage}
            loding={projectLoading}
            danger={true}
            onCancel={() => (
              setShowDeleteTeamFromProjectPopup(null),
              dispatch(setProjectErrorMessage(''))
            )}
            onConform={handleRemoveTeamFromProject}
          />
        )}
      </div>
    </>
  );
};

export default ProjectTeam;
