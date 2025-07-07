import { BlueBtn, formatDate, IconBtn, Input, useUIState } from '@/global';
import React from 'react';
import { PiChatsCircle } from 'react-icons/pi';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RiSendPlaneFill } from 'react-icons/ri';

const Comments = () => {
  const { task } = useSelector(state => state.task);

  const { user } = useSelector(state => state.auth);

  const { setShowTaskComments } = useUIState();

  return (
    <div className='relative max-w-[500px] h-screen bg-white shadow-lg dark:bg-zinc-900 overflow-auto flex flex-col gap-5 font-medium dark:font-normal hide-scrollbar'>
      <div className='flex justify-between items-center p-2.5'>
        <i
          onClick={() => setShowTaskComments(false)}
          className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'
        >
          <MdClose size={20} />
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
      <span className='px-6 text-sm flex gap-2 items-center text-gray-500'>
        <PiChatsCircle size={18} /> Comments
      </span>
      <div className='px-6 flex flex-col gap-3 text-sm w-full'>
        {task?.comments?.map(c => (
          <div
            key={c?._id}
            className={`${c?.addedBy?._id == user._id ? 'justify-end' : 'justify-start '} flex `}
          >
            <div
              className={`${c?.addedBy?._id == user._id ? 'bg-blue-900 text-white' : 'border border-gray-500/50'} max-w-[70%] flex gap-3 items-center px-3 py-1.5 rounded-md `}
            >
              <div className='flex flex-col items-start'>
                <p>{c?.text}</p>
                <span className='text-[9px] opacity-50 font-normal'>
                  {formatDate(c?.addedAt)}
                </span>
              </div>
              <img
                className='h-6 w-6 rounded-full'
                src={c?.addedBy?.profilePhoto}
                alt=''
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-2 items-center absolute bottom-2 px-6 w-full'>
        <Input
          className='px-3 py-1.5 border shadow border-zinc-500/20 w-full rounded'
          inputClassName='placeholder:text-xs w-full'
          placeholder='Type comment . . . . .'
        />
        <IconBtn
          className='rounded-md p-2 text-white bg-blue-500 shadow-md hover:bg-blue-700'
          text=''
          icon={<RiSendPlaneFill size={20} />}
        />
      </div>
    </div>
  );
};

export default Comments;
