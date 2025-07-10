import React, { useEffect, useRef, useState } from 'react';
import { Btn, Input } from '@/components';
import { useClickOutside } from '@/global';

const Conform = ({
  title,
  p1,
  p2,
  cancelText = 'Cancel',
  conformText,
  onCancel,
  onConform,
  danger,
  loding,
  error,
  input,
  label,
  setInput,
}) => {
  const conformRef = useRef();

  useClickOutside(conformRef, onCancel);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div
        ref={conformRef}
        className='flex flex-col justify-between max-w-80 min-h-80 rounded bg-zinc-50 dark:bg-zinc-800 p-4 border border-zinc-400 shadow-md dark:border-zinc-700/60'
      >
        <div className='flex flex-col gap-2'>
          <h1 className=' text-[20px] font-semibold text-zinc-700 dark:text-zinc-300 line-clamp-3 overflow-hidden'>
            {title}
          </h1>
          <div className='text-sm text-gray-500 '>{p1}</div>
          <div className='text-sm text-gray-500'>{p2}</div>
        </div>
        {input && (
          <Input
            className='flex flex-col gap-0.5'
            label={`${label}`}
            labelClassName='text-xs font-medium ml-1'
            inputClassName='text-sm border border-zinc-500/20 bg-zinc-500/5 rounded-md p-2 placeholder:text-zinc-500/50 placeholder:text-sm focus:bg-blue-500/5 focus:border-blue-500/20'
            placeholder={'Type here . . . '}
            type='text'
            id='orgName'
            onChange={e => setInput(e.target.value)}
            required={true}
          />
        )}
        {error && <span className='text-sm text-red-500 items-start mt-3'> {error} </span>}
        <div className='flex gap-2 self-end mt-3'>
          <>
            <Btn onClick={onCancel} text={cancelText} />
            <Btn
              onClick={onConform}
              text={conformText}
              isloading={loding}
              className={`text-sm px-3 py-2 ${danger ? 'text-red-500 bg-red-500/10 hover:bg-red-500' : 'text-green-500 bg-green-500/10 hover:bg-green-500'} hover:text-white rounded-md`}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default Conform;
