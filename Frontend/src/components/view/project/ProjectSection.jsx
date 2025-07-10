import {
  AvatarGroup,
  useUIState,
  GetPriorityColor,
  setTask,
  useClickOutside,
  Task,
  AddTaskBtn,
  setTaskErrorMessage,
  BlueBtn,
} from '@/global';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp, CircleCheckBig, Plus } from 'lucide-react';
import { BsCircleFill } from 'react-icons/bs';
import { RiProgress5Line, RiAccountPinCircleLine } from 'react-icons/ri';
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdDoneAll } from 'react-icons/md';
import { CgAttachment } from 'react-icons/cg';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { MdPriorityHigh } from 'react-icons/md';

const statusOrder = ['New Task', 'In Progress', 'Under Review', 'Completed'];

const statusIcon = {
  'New Task': <BsCircleFill size={16} className='text-blue-500' />,
  'In Progress': <RiProgress5Line size={18} className='text-yellow-500' />,
  'Under Review': <BsEmojiHeartEyesFill size={16} className='text-purple-500' />,
  Completed: <MdDoneAll size={18} className='text-green-500' />,
};

const statusColor = {
  'New Task': 'bg-blue-500/5',
  'In Progress': 'bg-yellow-500/5',
  'Under Review': 'bg-purple-500/5',
  Completed: 'bg-green-500/5',
};

const ProjectSection = () => {
  const { section } = useSelector(state => state.section);

  const { taskShowInBoard, setShowTaskPage, setTaskShowInBoard } = useUIState();

  const [expandedSections, setExpandedSections] = useState(
    statusOrder.reduce((acc, status) => {
      acc[status] = true;
      return acc;
    }, {})
  );

  const dispatch = useDispatch();

  const toggleSection = status => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  if (!section)
    return (
      <div className='w-full h-50 flex items-center justify-center text-zinc-500 text-sm italic'>
        <p>Create a section to start working on your tasks !</p>
      </div>
    );

  const groupedTasks = statusOrder.map(status => ({
    status,
    tasks: section.tasks.filter(task => task.status === status),
  }));

  return (
    <>
      {taskShowInBoard ? (
        <>
          <div className=' h-50 w-full flex items-center justify-center flex-col gap-2'>
            <p className='text-zinc-500 italic'>Board view is not available for now !</p>
            <BlueBtn text='Continue With Table View' onClick={() => setTaskShowInBoard(false)} />
          </div>
        </>
      ) : (
        <div className='overflow-x-auto pb-10'>
          {groupedTasks.map(({ status, tasks }) => (
            <div key={status} className='pb-6'>
              <div className='overflow-x-auto'>
                <table className='min-w-[800px] w-full text-sm text-left'>
                  <thead
                    className={`text-zinc-600 dark:text-zinc-400 capitalize border-y-2 border-zinc-500/6 inter 
                  ${statusColor[status]}
                `}
                  >
                    <tr>
                      <th
                        onClick={() => toggleSection(status)}
                        className='font-medium text-gray-500/70 hover:text-blue-500 pl-3 w-[35px] cursor-pointer'
                      >
                        <ChevronDown size={18} className={`${expandedSections[status] ? '-rotate-180 ' : ''} smooth`} />
                      </th>

                      <th className={`font-medium p-4 w-[300px]`}>{status}</th>
                      {expandedSections[status] && (
                        <>
                          <th className='font-medium p-4 w-[100px]'>
                            <div className='flex gap-2 items-center'>
                              <MdPriorityHigh size={16} />
                              Priority
                            </div>
                          </th>
                          <th className='font-medium p-4 w-[100px]'>
                            <div className='flex gap-2 items-center'>
                              <CircleCheckBig size={16} />
                              SubTasks
                            </div>
                          </th>
                          <th className='font-medium p-4 w-[100px]'>
                            <div className='flex gap-2 items-center'>
                              <GoCommentDiscussion size={18} />
                              Comments
                            </div>
                          </th>
                          <th className='font-medium p-4 w-[100px]'>
                            <div className='flex gap-2 items-center'>
                              <CgAttachment size={16} />
                              Attachments
                            </div>
                          </th>
                          <th className='font-medium p-4 w-[100px]'>
                            <div className='flex gap-2 items-center'>
                              <PiLinkSimpleBold size={18} />
                              Links
                            </div>
                          </th>
                          <th className='font-medium p-4 w-[150px]'>
                            <div className='flex gap-2 items-center'>
                              <RiAccountPinCircleLine size={18} />
                              Assignee
                            </div>
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {expandedSections[status] && (
                    <tbody>
                      {tasks.length > 0 ? (
                        tasks.map(task => (
                          <tr
                            onClick={() => (
                              dispatch(setTask(task)),
                              dispatch(setTaskErrorMessage('')),
                              setShowTaskPage(true)
                            )}
                            key={task._id}
                            className='hover:bg-zinc-500/5 border-b cursor-pointer border-gray-500/10'
                          >
                            <td className='border-r p-4 border-gray-500/10'>{statusIcon[status]}</td>
                            <td className='p-4 border-r border-gray-500/10 font-medium'>
                              {task.title}
                              <span className='text-xs text-zinc-500 font-normal line-clamp-1'>{task.description}</span>
                            </td>
                            <td
                              className={`${GetPriorityColor(task.priority)} text-xs font-medium dark:font-normal p-4 border-r border-gray-500/10`}
                            >
                              {task.priority || '—'}
                            </td>
                            <td className='p-4 border-r border-gray-500/10'>
                              <span>
                                {`${task.subTasks?.filter(st => st.isCompleted).length || 0}/${task.subTasks?.length || 0}`}
                              </span>
                            </td>
                            <td className='p-4 border-r border-gray-500/10'>{task.comments?.length || 0}</td>
                            <td className='p-4 border-r border-gray-500/10'>{task.attachments?.length || 0}</td>
                            <td className='p-4 border-r border-gray-500/10'>{task.links?.length || 0}</td>
                            <td className='p-4 border-r border-gray-500/10 flex items-center gap-4'>
                              {task.assignedToMember?.length > 0 ? (
                                <AvatarGroup tooltip={false} size='sm' users={task.assignedToMember?.map(m => m)} />
                              ) : (
                                '—'
                              )}
                              {task.assignedToTeam?.length > 0 ? (
                                <div className='flex items-center justify-center h-6.5 w-6.5 rounded-full bg-gray-500 border text-white'>
                                  <span>{task.assignedToTeam[0]?.teamName?.slice(0, 1).toUpperCase()}</span>
                                </div>
                              ) : (
                                '—'
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className=' p-4 text-zinc-400 italic'>
                            No tasks in this {status}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddTaskBtn />
      <Task />
    </>
  );
};

export default ProjectSection;
