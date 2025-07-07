import React, { useRef, useState } from 'react';
import { MdOutlineTimeline } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useClickOutside } from '@/global';

const OrgTimeline = () => {
  const { org } = useSelector(state => state.org);

  const [showTimeLines, setShowTimeLines] = useState(false);
  const TimelineRef = useRef();

  useClickOutside(TimelineRef, () => setShowTimeLines(false));

  return (
    <>
      <div className='relative inter'>
        <div
          onClick={() => setShowTimeLines(!showTimeLines)}
          className={`${showTimeLines ? 'border-zinc-500' : 'hover:border-zinc-500 border-zinc-500/50'} p-1.5 cursor-pointer flex items-center group justify-center shadow-md rounded-full border z-100`}
        >
          <MdOutlineTimeline size={18} />
          <span className='w-[max-content] absolute group-hover:flex hidden top-9 right-0 text-xs px-2 py-1 bg-zinc-500/20 border border-zinc-500/50 backdrop-blur-2xl rounded-md'>
            Time Line
          </span>
        </div>
        {showTimeLines && (
          <div
            ref={TimelineRef}
            className='hide-scrollbar absolute top-9 right-0 w-[310px] sm:w-[350px] h-[90vh] bg-zinc-50 dark:bg-zinc-900 border border-zinc-500/50 rounded-md shadow-md overflow-y-auto z-100'
          >
            <div className='flex justify-between items-center px-4 py-2.5 sticky top-0 border-b border-zinc-500/50 text-sm bg-zinc-200 dark:bg-zinc-950  font-semibold dark:font-normal '>
              {`${org?.orgName}'s  Time-Line`}
              <i
                onClick={() => setShowTimeLines(false)}
                className='p-1 rounded-full hover:bg-zinc-500/30 cursor-pointer'
              >
                <IoMdClose size={20} />
              </i>
            </div>
            {[...(org?.timeline || [])].reverse().map(item => (
              <div
                key={item._id}
                className='text-[13px] border-b pb-2 border-zinc-500/15 p-4'
              >
                <div
                  className='text-zinc-700 dark:text-zinc-300 dark:font-light'
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                <div className='text-[10px] text-zinc-500 mt-1'>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrgTimeline;
