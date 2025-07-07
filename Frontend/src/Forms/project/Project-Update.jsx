import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import {
  BlueBtn,
  Conform,
  Input,
  setProjectErrorMessage,
  TextArea,
  useClickOutside,
  useProject,
} from '@/global';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ProjectUpdate = ({
  setShowCreateProject,
  forProjectCreate,
  setShowProjectUpdatedPopup,
}) => {
  const { register, handleSubmit } = useForm();

  const projectFromRef = useRef();

  const dispatch = useDispatch();

  const { createProject, deleteProject, updateProject } = useProject();
  const [showDeleteProjectPopup, setShowDeleteProjectPopup] = useState(false);

  const { project, projectLoading, projectErrorMessage } = useSelector(
    state => state.project
  );

  useClickOutside(projectFromRef, () => {
    if (forProjectCreate) {
      setShowCreateProject(false);
      dispatch(setProjectErrorMessage(''));
    } else {
      if (!showDeleteProjectPopup) {
        setShowProjectUpdatedPopup(false);
        dispatch(setProjectErrorMessage(''));
      }
    }
  });

  const handleUpdateProject = async data => {
    if (forProjectCreate) {
      if (!data.projectName) {
        dispatch(setProjectErrorMessage('project name is required'));
        return;
      }
      const success = await createProject(data);
      if (success) {
        dispatch(setProjectErrorMessage(''));
        setShowCreateProject(false);
      }
    } else {
      if (!data.projectName && !data.description) {
        dispatch(setProjectErrorMessage('One field is required to update'));
        return;
      }
      const success = await updateProject(data, project._id);
      if (success) {
        dispatch(setProjectErrorMessage(''));
        setShowProjectUpdatedPopup(false);
      }
    }
  };

  const handleProjectDelete = async () => {
    if (project) {
      const success = await deleteProject(project._id);
      if (success) {
        setShowDeleteProjectPopup(false);
        setShowProjectUpdatedPopup(false);
      }
    }
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 inter backdrop-blur-[3px]'>
      <div ref={projectFromRef} className='flex flex-col gap-1'>
        <div className='flex justify-between items-center gap-3'>
          <div
            onClick={() => {
              if (!forProjectCreate) {
                setShowProjectUpdatedPopup(false);
                dispatch(setProjectErrorMessage(''));
              } else {
                setShowCreateProject(false);
                dispatch(setProjectErrorMessage(''));
              }
            }}
            className='text-white flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
          >
            <GoArrowLeft size={18} />
            Back
          </div>
          {!forProjectCreate && (
            <i
              onClick={() => setShowDeleteProjectPopup(true)}
              title='Delete Project'
              className='cursor-pointer p-1 bg-red-500/20 rounded  text-red-500 hover:border-red-500/60 hover:bg- border border-red-500/20'
            >
              <RiDeleteBin6Line />
            </i>
          )}
        </div>
        <div className='p-6 w-[330px] bg-white dark:bg-zinc-950 border flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
          <div className='flex flex-col items-cente gap-2'>
            <span className='text-xl break-all'>
              {forProjectCreate
                ? 'Create Project'
                : `Update Project - ${project?.projectName}`}
            </span>
            <span className='text-[15px] text-zinc-500'>
              {forProjectCreate
                ? 'create Project By filling this all Deatils .'
                : 'Enter your new Project Name and description .'}
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateProject)}
            className='flex flex-col w-full items-start gap-4 text-sm'
          >
            <>
              <Input
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'projectName'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={forProjectCreate ? 'Project Name' : 'New Project Name'}
                type={'text'}
                id={'projectName'}
                placeholder={'Project Name here . . . .'}
                {...register('projectName')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
              <TextArea
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'description'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={'description'}
                type={'text'}
                id={'description'}
                placeholder={'description . . . .'}
                {...register('description')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
            </>
            {projectErrorMessage && (
              <span className='ml-0.5 text-sm text-red-500'>
                {projectErrorMessage}
              </span>
            )}
            <div className='flex mt-4 w-full justify-center'>
              <BlueBtn
                isLoading={projectLoading}
                text={forProjectCreate ? 'create' : 'Update'}
              />
            </div>
          </form>
        </div>
      </div>
      {showDeleteProjectPopup && (
        <Conform
          title={`Delete Project - ${project?.projectName}`}
          p1={`This will permanently delete the project "${project?.projectName}" and all its data. Are you sure?`}
          error={projectErrorMessage}
          loding={projectLoading}
          conformText={'Delete'}
          onConform={handleProjectDelete}
          onCancel={() => setShowDeleteProjectPopup(false)}
          danger={true}
        />
      )}
    </div>
  );
};

export default ProjectUpdate;
