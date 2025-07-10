import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignedTasksToTeam, setProject, setSection, setTask, useUIState } from '@/global';
import { useParams, useNavigate } from 'react-router-dom';
import { SquareCheckBig } from 'lucide-react';

const TeamAssignedTask = () => {
  const { org } = useSelector(state => state.org);

  const { teamId } = useParams();

  const { setShowTaskPage } = useUIState();

  const assignedTasks = getAssignedTasksToTeam(teamId, org);

  const dispatch = useDispatch();

  const navigator = useNavigate();

  return (
    <div className='flex flex-col gap-2 md:p-6 p-4'>
      {assignedTasks.length > 0 ? (
        assignedTasks.map(task => {
          const orgName = task.org?.orgName || 'org';
          const project = task.project || 'project';
          const projectId = task.project?._id || 'id';
          const section = task.section || 'section';
          const taskShow = task.task || 'task';
          const projectUrl = `/${orgName}/${project?.projectName}/${projectId}/project`;
          return (
            <div
              onClick={() => {
                dispatch(setProject(project));
                dispatch(setSection(section));
                dispatch(setTask(taskShow));
                setShowTaskPage(true);
                navigator(projectUrl);
              }}
              key={task.task._id}
              className='flex gap-3 text-sm items-start text-zinc-600 dark:text-zinc-400 cursor-pointer group '
            >
              <SquareCheckBig size={14} className='text-green-500 mt-[4.5px] shrink-0' />
              <div className='flex flex-col'>
                <span className='group-hover:text-blue-500 group-hover:underline font-medium'>{task.task.title}</span>
                <span className='text-xs text-zinc-500'>{task.task.description}</span>
              </div>
            </div>
          );
        })
      ) : (
        <span className='text-sm ml-4 text-zinc-500'>No Task !</span>
      )}
    </div>
  );
};

export default TeamAssignedTask;
