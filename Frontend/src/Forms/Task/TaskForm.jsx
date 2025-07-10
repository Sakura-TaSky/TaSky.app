import { BlueBtn, Input, TextArea, useClickOutside, useTask } from '@/global';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useSelector } from 'react-redux';

const TaskForm = ({ setShowAddTaskPopup, setShowEditTask, forEditeTask }) => {
  const { project } = useSelector(state => state.project);
  const { section } = useSelector(state => state.section);
  const { taskErrorMessage, taskLoading } = useSelector(state => state.task);

  const taskFormRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createTask, updateTask } = useTask();

  useClickOutside(taskFormRef, () => {
    if (setShowAddTaskPopup) {
      setShowAddTaskPopup(false);
    } else {
      setShowEditTask(false);
    }
  });

  const handleCreateTask = async data => {
    const filterEmptyFields = obj =>
      Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
          acc[key] = value;
        }
        return acc;
      }, {});

    if (forEditeTask) {
      const fieldsToCheck = [
        'title',
        'status',
        'priority',
        'deadline',
        'assignedToMember',
        'assignedToTeam',
        'description',
      ];

      const getComparableValue = (key, obj) => {
        if (key === 'assignedToMember' || key === 'assignedToTeam') {
          const val = obj[key];
          if (Array.isArray(val) && val.length > 0) {
            return val[0]?._id || val[0];
          }
          return val || '';
        }
        return obj[key] || '';
      };

      let hasChanged = false;
      for (const key of fieldsToCheck) {
        const oldValue = getComparableValue(key, forEditeTask);
        const newValue = data[key] || '';
        if (String(oldValue) !== String(newValue)) {
          hasChanged = true;
          break;
        }
      }

      if (!hasChanged) {
        setShowEditTask(false);
        return;
      }

      const filteredData = filterEmptyFields(data);
      const success = await updateTask(forEditeTask._id, filteredData);
      if (success) {
        setShowEditTask(false);
      }
    } else {
      if (data) {
        const filteredData = filterEmptyFields(data);
        const success = await createTask(filteredData, project._id, section._id);
        if (success) {
          setShowAddTaskPopup(false);
        }
      }
    }
  };

  const getFirstId = arr => (Array.isArray(arr) && arr.length > 0 ? arr[0]?._id || arr[0] : '');

  const defaultValues = forEditeTask
    ? {
        title: forEditeTask.title || '',
        status: forEditeTask.status || 'New Task',
        priority: forEditeTask.priority || 'Low',
        deadline: forEditeTask.deadline ? forEditeTask.deadline.slice(0, 10) : '',
        assignedToMember: getFirstId(forEditeTask.assignedToMember),
        assignedToTeam: getFirstId(forEditeTask.assignedToTeam),
        description: forEditeTask.description || '',
      }
    : {};

  useEffect(() => {
    if (forEditeTask) {
      reset(defaultValues);
    }
  }, [forEditeTask, reset]);

  return (
    <div className='inter fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div ref={taskFormRef} className='flex flex-col gap-1 w-[98vw] max-w-xs sm:w-full sm:max-w-md md:max-w-2xl'>
        <div className='flex justify-between items-center gap-4 px-2'>
          <div
            onClick={() => {
              if (setShowAddTaskPopup) setShowAddTaskPopup(false);
              else if (setShowEditTask) setShowEditTask(false);
            }}
            className='text-white flex gap-2 items-center self-start hover:gap-0 hover:-ml-2 p-2 font-medium smooth cursor-pointer'
          >
            <GoArrowLeft size={18} />
            Back
          </div>
        </div>
        <div
          className='flex flex-col items-center gap-6 w-full p-4 sm:p-6 rounded-lg border 
         border-zinc-300 dark:border-zinc-800 shadow-md
         bg-white dark:bg-zinc-950'
        >
          <div className='flex flex-col gap-2 w-full'>
            <h1 className='text-xl w-full text-center font-medium'>
              {forEditeTask ? 'Edit Task' : 'Add Task'}
              {forEditeTask && ` - ${forEditeTask.title}`}
            </h1>
            <p className='text-sm text-zinc-500 text-start'>
              {`${forEditeTask ? 'Edit of ' : 'Add a new task to'}  ${project?.projectName} section - ${section?.sectionName}`}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleCreateTask)} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1'>
                <Input
                  required={true}
                  label='Task Title'
                  placeholder='Enter Task Title . . . .'
                  type='text'
                  id='taskTitle'
                  className='flex flex-col gap-2'
                  labelClassName='ml-0.5 text-[12px] font-medium'
                  inputClassName='w-full text-sm bg-zinc-500/5 placeholder:text-xs  focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-1.5 rounded border border-zinc-300 dark:border-zinc-800'
                  {...register('title', { required: true })}
                  defaultValue={forEditeTask ? forEditeTask.title : ''}
                />
                {errors.title && <p className='text-red-500 text-sm'>Task Title is required</p>}
              </div>
              <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor='status' className='text-[12px] ml-0.5 font-medium'>
                  Status
                </label>
                <select
                  id='status'
                  className='bg-zinc-500/5 text-xs focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
                  {...register('status', { required: true })}
                  defaultValue={forEditeTask ? forEditeTask.status : 'New Task'}
                >
                  <option className='text-sm dark:text-zinc-800' value='New Task'>
                    New Task
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='In Progress'>
                    In Progress
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='Under Review'>
                    Under Review
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='Completed'>
                    Completed
                  </option>
                </select>
                {errors.status && <p className='text-red-500 text-sm'>Status is required</p>}
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor='priority' className='text-[12px] ml-0.5 font-medium'>
                  Priority
                </label>
                <select
                  id='priority'
                  className='bg-zinc-500/5 text-xs focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
                  {...register('priority', { required: true })}
                  defaultValue={forEditeTask ? forEditeTask.priority : 'Low'}
                >
                  <option className='text-sm dark:text-zinc-800' value='Low'>
                    Low
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='Medium'>
                    Medium
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='High'>
                    High
                  </option>
                  <option className='text-sm dark:text-zinc-800' value='Very High'>
                    Very High
                  </option>
                </select>
                {errors.priority && <p className='text-red-500 text-sm'>Priority is required</p>}
              </div>
              <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor='deadline' className='text-[12px] ml-0.5 font-medium'>
                  Deadline
                </label>
                <input
                  type='date'
                  id='deadline'
                  className='dark:text-zinc-200 bg-zinc-500/5 text-xs focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800 dark:[color-scheme:dark] dark:[&::-webkit-calendar-picker-indicator]:filter-none dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:text-zinc-200'
                  placeholder='Select deadline'
                  {...register('deadline')}
                  defaultValue={forEditeTask && forEditeTask.deadline ? forEditeTask.deadline.slice(0, 10) : ''}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor='assignedToMember' className='text-[12px] ml-0.5 font-medium'>
                  Assign to Member
                </label>
                <select
                  id='assignedToMember'
                  className='bg-zinc-500/5 text-xs focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
                  {...register('assignedToMember')}
                  defaultValue={
                    forEditeTask && forEditeTask.assignedToMember && forEditeTask.assignedToMember.length > 0
                      ? getFirstId(forEditeTask.assignedToMember)
                      : ''
                  }
                >
                  <option className='text-sm text-blue-500 hove:text-zinc-300' value=''>
                    Select a member
                  </option>
                  {project?.members?.length > 0 &&
                    project.members.map(member => (
                      <option
                        className='text-sm dark:text-zinc-800'
                        key={`member-${member.member._id}`}
                        value={member.member._id}
                      >
                        {member.member.userName} ({member.member.email})
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex-1 flex flex-col gap-2'>
                <label htmlFor='assignedToTeam' className='text-[12px] ml-0.5 font-medium'>
                  Assign to Team
                </label>
                <select
                  id='assignedToTeam'
                  className='bg-zinc-500/5 text-xs focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
                  {...register('assignedToTeam')}
                  defaultValue={
                    forEditeTask && forEditeTask.assignedToTeam && forEditeTask.assignedToTeam.length > 0
                      ? getFirstId(forEditeTask.assignedToTeam)
                      : ''
                  }
                >
                  <option className='text-sm text-blue-500 hover:text-zinc-300' value=''>
                    Select a team
                  </option>
                  {project?.teams?.length > 0 &&
                    project.teams.map(team => (
                      <option className='text-sm dark:text-zinc-800' key={`team-${team._id}`} value={team._id}>
                        {team.teamName}
                      </option>
                    ))}
                </select>
                {errors.assignedToTeam && <p className='text-red-500 text-sm'>Team assignee is required</p>}
              </div>
            </div>
            <div className='w-full'>
              <TextArea
                label='Description'
                placeholder='Enter Description . . . .'
                labelClassName='ml-0.5 text-[12px] font-medium'
                rows={2}
                id='description'
                className='flex flex-col w-full gap-2'
                inputClassName='text-sm bg-zinc-500/5 placeholder:text-xs  focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium px-2 py-1 rounded border border-zinc-300 dark:border-zinc-800'
                {...register('description')}
                defaultValue={forEditeTask ? forEditeTask.description : ''}
              />
            </div>
            {taskErrorMessage && <p className='text-red-500 text-sm'>{taskErrorMessage}</p>}
            <div className='w-full flex mt-2 justify-center items-center'>
              <BlueBtn text={forEditeTask ? 'Update Task' : 'Create Task'} textSize='12px' isLoading={taskLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
