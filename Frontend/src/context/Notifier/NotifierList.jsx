import React from 'react';
import { useNotifier } from './context/NotifierContext';
import { FcOk } from 'react-icons/fc';
import { FcHighPriority } from 'react-icons/fc';
import { FcAbout } from 'react-icons/fc';
import { IoWarning } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';

const toastColors = {
  success: 'bg-green-100 text-green-600 border-green-500/30',
  error: 'bg-red-100 text-red-600 border-red-500/30',
  info: 'bg-blue-100 text-blue-600 border-blue-500/30',
  warning: 'bg-yellow-100 text-yellow-600 border-yellow-500/30',
};

const NotifierList = ({ className = '' }) => {
  const { messages, removeMessage, pauseTimer, resumeTimer } = useNotifier();

  return (
    <div
      className={`fixed ${className} flex flex-col space-y-2 z-200 w-[250px] `}
    >
      {messages.map(({ id, text, type }) => (
        <div
          key={id}
          className={`text-sm flex items-center group justify-between p-2 rounded inter shadow-md border ${toastColors[type] || toastColors.info} slideIn`}
          role='alert'
          onMouseEnter={() => pauseTimer(id)}
          onMouseLeave={() => resumeTimer(id)}
        >
          <div className='flex items-center space-x-3 '>
            <div className='flex shrink-0'>
              {type === 'success' && <FcOk size={20} />}
              {type === 'error' && <FcHighPriority size={20} />}
              {type === 'info' && <FcAbout size={20} />}
              {type === 'warning' && <IoWarning size={20} />}
            </div>
            <span>{text}</span>
          </div>
          <button
            onClick={() => removeMessage(id)}
            className='absolute -top-1.5 -right-1.5 opacity-0 group-hover:opacity-100 '
          >
            <IoIosCloseCircle size={24} className='cursor-pointer' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotifierList;
