import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CgMenuRightAlt } from 'react-icons/cg';
import {
  AvatarGroup,
  Comments,
  formatDate,
  GetPriorityColor,
  IconBtn,
  useUIState,
} from '@/global';
import { BiTask } from 'react-icons/bi';
import { Link, Paperclip } from 'lucide-react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { TiAttachment } from 'react-icons/ti';
import { PiChatTeardropFill } from 'react-icons/pi';

const Task = ({}) => {
  const { task } = useSelector(state => state.task);

  const { setShowTaskPage, showTaskComments, setShowTaskComments } =
    useUIState();

  if (!task) return;

  return (
    <div className='relative max-w-[500px] h-screen bg-white shadow-lg dark:bg-zinc-900 overflow-auto flex flex-col gap-5 font-medium dark:font-normal hide-scrollbar'>
      <div className='flex justify-between items-center p-2.5'>
        <i
          onClick={() => setShowTaskPage(false)}
          className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'
        >
          <MdClose size={20} />
        </i>
        <i className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'>
          <CgMenuRightAlt size={20} />
        </i>
      </div>
      <div className='px-6'>
        <p className='text-lg font-medium'>
          {task?.title || 'No Task Title !'}
        </p>
        <p className='text-zinc-500'>
          {task?.description || 'No Task description'}
        </p>
      </div>
      <div className='px-6 flex items-center'>
        <span className='w-35 text-gray-500'>Status</span>
        <p>{task?.status}</p>
      </div>
      <div className='px-6 flex items-center'>
        <span className=' w-35 text-gray-500'>Due date</span>
        <p>{formatDate(task?.deadline)}</p>
      </div>
      <div className='px-6 flex items-center'>
        <span className=' w-35 text-gray-500'>Assignee</span>
        <AvatarGroup
          tooltip={false}
          size='sm'
          users={task.assignedToMember?.map(m => m)}
        />
      </div>
      <div className='px-6 flex items-center border-b-2 border-gray-500/10 pb-6'>
        <span className=' w-35 text-gray-500'>Priority</span>
        <p className={`text-sm ${GetPriorityColor(task?.priority)}`}>
          {task?.priority}
        </p>
      </div>
      <span className='px-6 text-sm flex gap-2 items-center'>
        <BiTask size={18} /> SubTask
      </span>
      <div className='flex text-gray-500  flex-col gap-2 pl-10 pr-3 border-b-2 border-gray-500/10 pb-6'>
        {task?.subTasks?.map(sub => (
          <div
            key={sub?._id}
            className='flex gap-6 items-center justify-between'
          >
            <div className='flex gap-3 items-center'>
              <div className='h-4 w-4 hover:border-gray-500 cursor-pointer mt-0.5 rounded-full border border-gray-500/50'></div>
              <p className='text-sm'>{sub?.title}</p>
            </div>
            <div className='flex items-center gap-2 text-xs '>
              Add By
              <img
                className='h-5 w-5 rounded-full'
                src={sub?.addedBy?.profilePhoto}
                alt=''
              />
            </div>
          </div>
        ))}
      </div>
      <span className='px-6 text-sm flex gap-2 items-center'>
        <Link size={16} className='mt-1' />
        Links
      </span>
      <div className='flex flex-col text-gray-500  gap-2 pl-10 pr-3 border-b-2 border-gray-500/10 pb-6'>
        {task?.links?.map(link => (
          <div
            key={link?._id}
            className='flex gap-6 items-center justify-between '
          >
            <a
              href={link?.url}
              target='_blank'
              className='flex gap-3 items-center hover:underline hover:text-blue-500 smooth'
            >
              <LuSquareArrowOutUpRight size={14} className=' mt-0.5' />
              <span className='text-sm'>{link?.label}</span>
            </a>
            <div className='flex items-center gap-2 text-xs '>
              Add By
              <img
                className='h-5 w-5 rounded-full'
                src={link?.addedBy?.profilePhoto}
                alt=''
              />
            </div>
          </div>
        ))}
      </div>
      <span className='px-6  text-sm flex gap-2 items-center'>
        <Paperclip size={16} className='mt-1' />
        Attachment
      </span>
      <div className='pl-10 text-gray-500 pr-3 flex flex-col gap-2 border-b-2 border-gray-500/10 pb-6'>
        {task?.attachments?.map(a => (
          <div
            key={a?._id}
            className='flex gap-6 items-center justify-between '
          >
            <a
              href={a?.fileUrl}
              target='_blank'
              className='flex gap-3 items-center hover:underline hover:text-blue-500  smooth'
            >
              <TiAttachment size={18} className='mt-0.5' />
              <span className='text-sm line-clamp-1'>{a?.fileName}</span>
            </a>
            <div className='flex items-center gap-2 text-xs text-gray-500'>
              Add By
              <img
                className='h-5 w-5 rounded-full'
                src={a?.addedBy?.profilePhoto}
                alt=''
              />
            </div>
          </div>
        ))}
      </div>
      <IconBtn
        onClick={() => setShowTaskComments(true)}
        icon={<PiChatTeardropFill size={20} />}
        text=''
        className='fixed right-5 bottom-5 p-2 rounded-full shadow-lg bg-blue-500 text-white text-sm hover:bg-blue-700'
      />
      <div
        className={`fixed z-100 top-0 right-0 ${showTaskComments ? 'translate-x-0' : 'translate-x-full'} transition-all duration-400 ease-in`}
      >
        <Comments />
      </div>
    </div>
  );
};

export default Task;
