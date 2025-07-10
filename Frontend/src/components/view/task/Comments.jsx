import { BlueBtn, formatDate, IconBtn, Input, useUIState, useTask, setTaskErrorMessage } from '@/global';
import React, { useEffect } from 'react';
import { PiChatsCircle } from 'react-icons/pi';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBinLine, RiSendPlaneFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';

const Comments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { task, taskLoading, taskErrorMessage } = useSelector(state => state.task);

  const { user } = useSelector(state => state.auth);

  const { setShowTaskComments } = useUIState();

  const { addComment, deleteComment } = useTask();

  const dispatch = useDispatch();

  const handleAddComment = async data => {
    if (!data.text) {
      dispatch(setTaskErrorMessage('Text is required'));
      return;
    }
    const success = await addComment(task._id, data);
    if (success) {
      dispatch(setTaskErrorMessage(''));
      reset();
    }
  };

  const handleDeleteComment = async commentId => {
    const success = await deleteComment(task._id, commentId);
    if (success) {
      dispatch(setTaskErrorMessage(''));
    }
  };

  return (
    <div className='pb-24 relative w-screen md:w-[500px] h-screen bg-white shadow-lg dark:bg-zinc-900 overflow-auto flex flex-col gap-5 font-medium dark:font-normal hide-scrollbar'>
      <div className='flex justify-between items-center p-2.5 sticky top-0 bg-white dark:bg-zinc-900 z-10'>
        <i
          onClick={() => setShowTaskComments(false)}
          className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'
        >
          <MdClose size={20} />
        </i>
      </div>
      <div className='px-6'>
        <p className='text-lg font-medium'>{task?.title || 'No Task Title !'}</p>
        <p className='text-zinc-500'>{task?.description || 'No Task description'}</p>
      </div>
      <span className='px-6 text-sm flex gap-2 items-center text-gray-500'>
        <PiChatsCircle size={18} /> Comments
      </span>
      <div
        className='px-6 flex flex-col gap-3 text-sm w-full overflow-y-auto grow'
        style={{ flex: 1, minHeight: 0, maxHeight: 'calc(100vh - 220px)' }}
        ref={commentsContainerRef => {
          if (commentsContainerRef) {
            window._commentsContainerRef = commentsContainerRef;
          }
        }}
      >
        {task?.comments?.map(c => {
          const isUser = c?.addedBy?._id === user._id;
          return (
            <div key={c?._id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full hide-scrollbar`}>
              <div
                className={`
                  max-w-[70%] flex gap-3 items-center px-3 py-1.5 rounded-md
                  ${
                    isUser
                      ? 'bg-blue-900 text-white self-end'
                      : 'border border-gray-500/50 bg-gray-100 dark:bg-zinc-800 self-start'
                  }
                `}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!isUser && <img className='h-6 w-6 rounded-full' src={c?.addedBy?.profilePhoto} alt='' />}
                <div className='flex flex-col items-start'>
                  <p>{c?.text}</p>
                  <span className='text-[9px] opacity-50 font-normal'>{formatDate(c?.addedAt)}</span>
                </div>
                {isUser && <img className='h-6 w-6 rounded-full' src={c?.addedBy?.profilePhoto} alt='' />}
              </div>
              {isUser && (
                <button
                  className={`mt-1 cursor-pointer text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1 px-1 py-0.5 rounded transition ${taskLoading ? 'opacity-20 cursor-not-allowed' : ''}`}
                  onClick={() => handleDeleteComment(c._id)}
                  title='Delete comment'
                  disabled={taskLoading}
                >
                  <RiDeleteBinLine size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit(handleAddComment)}
        className='flex gap-2 items-center fixed bottom-0 px-6 py-2 w-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm'
      >
        {taskErrorMessage && <p className='text-red-500 text-xs'>{taskErrorMessage}</p>}
        <Input
          className='px-3 py-1.5 border shadow border-zinc-500/20 w-full rounded'
          inputClassName='placeholder:text-xs w-full '
          placeholder='Type comment . . . . .'
          {...register('text', { required: true })}
        />
        <IconBtn
          className={`rounded-md p-2 text-white bg-blue-500 shadow-md hover:bg-blue-700 ${taskLoading ? 'opacity-20 cursor-not-allowed' : ''}`}
          text=''
          icon={<RiSendPlaneFill size={20} />}
          disabled={taskLoading}
        />
      </form>
      {(() => {
        useEffect(() => {
          if (window._commentsContainerRef) {
            window._commentsContainerRef.scrollTop = window._commentsContainerRef.scrollHeight;
          }
        }, [task?.comments?.length]);
        return null;
      })()}
    </div>
  );
};

export default Comments;
