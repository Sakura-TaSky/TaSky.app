import {
  BlueBtn,
  setProjectErrorMessage,
  useClickOutside,
  useProject,
} from '@/global';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

const ProjectAddTeam = ({ setShowProjectAddTeamPopup }) => {
  const { project, projectLoading, projectErrorMessage } = useSelector(
    state => state.project
  );

  const { org } = useSelector(state => state.org);

  const { register, handleSubmit } = useForm();

  const projectAddMemberRef = useRef();

  const dispatch = useDispatch();

  const { addTeamInProject } = useProject();

  useClickOutside(projectAddMemberRef, () => {
    setShowProjectAddTeamPopup(false);
    dispatch(setProjectErrorMessage(''));
  });

  const handleAddTeamToProject = async data => {
    if (project) {
      const success = await addTeamInProject(data);
      if (success) {
        setShowProjectAddTeamPopup(false);
        dispatch(setProjectErrorMessage(''));
      }
    }
  };

  return (
    project && (
      <div className='inter fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-100 backdrop-blur-[3px]'>
        <div ref={projectAddMemberRef} className='flex flex-col gap-1'>
          <div
            onClick={() => (
              setShowProjectAddTeamPopup(false),
              dispatch(setProjectErrorMessage(''))
            )}
            className='text-white flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
          >
            <GoArrowLeft size={18} />
            Back
          </div>
          <div className='p-6 w-[330px] bg-white dark:bg-zinc-950 border flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
            <div className='flex flex-col gap-2 items-center justify-center'>
              <span className='text-xl font-semibold'>
                Add Team to {project?.projectName}
              </span>
              <span className='text-sm text-zinc-500'>
                Add a Team to this project from the organization's Team list.
              </span>
            </div>
            <form
              onSubmit={handleSubmit(handleAddTeamToProject)}
              className='flex flex-col gap-3 mt-2'
            >
              <div className='flex flex-col gap-0.5'>
                <label htmlFor='member' className='text-xs font-medium ml-1'>
                  Select member
                </label>
                <select
                  id='member'
                  className='outline-0 text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 focus:bg-blue-500/5 focus:border-blue-500/20 text-zinc-700 dark:text-zinc-200'
                  {...register('teamId', { required: 'Member is required' })}
                >
                  {org?.teams.map(t => (
                    <option
                      key={t?._id}
                      value={t?._id}
                      className='dark:text-zinc-800'
                    >
                      {t?.teamName}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-0.5'>
                <label htmlFor='role' className='text-xs font-medium ml-1'>
                  Team Role
                </label>
                <select
                  id='role'
                  className='outline-0 text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 focus:bg-blue-500/5 focus:border-blue-500/20 text-zinc-700 dark:text-zinc-200'
                  {...register('asRoleOf', { required: 'Role is required' })}
                >
                  <option className='dark:text-zinc-800' value='member'>
                    Member
                  </option>
                  <option className='dark:text-zinc-800' value='admin'>
                    Admin
                  </option>
                  <option className='dark:text-zinc-800' value='moderator'>
                    Moderator
                  </option>
                  <option className='dark:text-zinc-800' value='leader'>
                    Leader
                  </option>
                  <option className='dark:text-zinc-800' value='viewer'>
                    Viewer
                  </option>
                </select>
              </div>
              {projectErrorMessage && (
                <span className='text-sm text-red-500'>
                  {projectErrorMessage}
                </span>
              )}
              <div className='flex items-center justify-center mt-5'>
                <BlueBtn isLoading={projectLoading} text='Add Team' />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ProjectAddTeam;
