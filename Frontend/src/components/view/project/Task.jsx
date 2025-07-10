import React, { useRef, useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { CgMenuRightAlt } from 'react-icons/cg';
import {
  AvatarGroup,
  Comments,
  Conform,
  formatDate,
  GetPriorityColor,
  IconBtn,
  useUIState,
  useClickOutside,
  useTask,
  TaskForm,
  Input,
  BlueBtn,
  FileInput,
  setTaskErrorMessage,
  ResetPass,
} from '@/global';
import { BiTask } from 'react-icons/bi';
import { Link, Paperclip } from 'lucide-react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { TiAttachment } from 'react-icons/ti';
import { PiChatTeardropFill } from 'react-icons/pi';
import { RiEdit2Fill, RiDeleteBin6Line } from 'react-icons/ri';
import ReactDOM from 'react-dom';
import { IoAdd } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

const Task = ({}) => {
  const { task, taskLoading, taskErrorMessage } = useSelector(state => state.task);

  const { setShowTaskPage, showTaskComments, setShowTaskComments, showTaskPage } = useUIState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const taskRef = useRef();
  const taskMenuRef = useRef();
  const subTaskFormRef = useRef();
  const [showLinkForm, setShowLinkForm] = useState(false);
  const linkFormRef = useRef();
  const [showAttachmentForm, setShowAttachmentForm] = useState(false);
  const attachmentFormRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  useClickOutside(attachmentFormRef, () => (setShowAttachmentForm(false), dispatch(setTaskErrorMessage(''))));

  useClickOutside(linkFormRef, () => (setShowLinkForm(false), dispatch(setTaskErrorMessage(''))));

  useClickOutside(subTaskFormRef, () => (setShowSubTaskForm(false), dispatch(setTaskErrorMessage(''))));

  useClickOutside(taskRef, () => {
    if (showTaskComments) {
      setShowTaskComments(false);
    } else {
      setShowTaskPage(false);
    }
  });

  useClickOutside(taskMenuRef, () => setShowTaskMenu(false));

  const { deleteTask, addSubTask, deleteSubTask, updateSubTask, addLink, addAttachment, deleteLink, deleteAttachment } =
    useTask();

  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    const success = await deleteTask(task._id);
    if (success) {
      setShowTaskPage(false);
      setShowTaskComments(false);
      setShowTaskMenu(false);
      setShowDeleteTask(false);
      dispatch(setTaskErrorMessage(''));
    }
  };

  // sub task hadlers
  const handleAddSubTask = async data => {
    const success = await addSubTask(task._id, data);
    if (success) {
      setShowSubTaskForm(false);
      dispatch(setTaskErrorMessage(''));
      reset();
    }
  };

  const handleDeleteSubTask = async subTaskId => {
    const success = await deleteSubTask(task._id, subTaskId);
    if (success) {
      dispatch(setTaskErrorMessage(''));
    }
  };

  const handleUpdateSubTask = async (subTaskId, isCompleted) => {
    const success = await updateSubTask(task._id, subTaskId, isCompleted);
    if (success) {
      dispatch(setTaskErrorMessage(''));
    }
  };

  const handleAddLink = async data => {
    const success = await addLink(task._id, data);
    if (success) {
      setShowLinkForm(false);
      dispatch(setTaskErrorMessage(''));
      reset();
    }
  };

  const handleAddAttachment = async () => {
    const success = await addAttachment(task._id, selectedFile);
    if (success) {
      setShowAttachmentForm(false);
      setSelectedFile(null);
      dispatch(setTaskErrorMessage(''));
      reset();
    }
  };

  const handleDeleteLink = async linkId => {
    const success = await deleteLink(task._id, linkId);
    if (success) {
      dispatch(setTaskErrorMessage(''));
    }
  };

  const handleDeleteAttachment = async attachmentId => {
    const success = await deleteAttachment(task._id, attachmentId);
    if (success) {
      dispatch(setTaskErrorMessage(''));
    }
  };

  return task ? (
    <>
      <div
        ref={taskRef}
        className={`fixed z-90 top-0 right-0 ${showTaskPage ? 'translate-x-0' : 'translate-x-full'} transition-all duration-400 ease-in`}
      >
        <div className='relative w-screen md:w-[500px] h-screen bg-white shadow-lg dark:bg-zinc-900 overflow-auto flex flex-col gap-5 font-medium dark:font-normal hide-scrollbar'>
          <div className='flex justify-between items-center p-2.5  sticky top-0 bg-white dark:bg-zinc-900 z-10 shadow'>
            <i
              onClick={() => setShowTaskPage(false)}
              className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'
            >
              <MdClose size={20} />
            </i>
            <i
              onClick={() => setShowTaskMenu(!showTaskMenu)}
              className='p-1.5 hover:shadow-md rounded-full hover:text-blue-500 cursor-pointer smooth text-gary-500'
            >
              <CgMenuRightAlt size={20} />
            </i>
            <div
              ref={taskMenuRef}
              className={`p-1 rounded bg-white dark:bg-black border border-zinc-500/30 shadow-md absolute top-12 right-6 flex flex-col gap-1 ${showTaskMenu ? 'block' : 'hidden'}`}
            >
              <IconBtn
                onClick={() => setShowEditTask(true)}
                icon={<RiEdit2Fill size={16} />}
                text='Edit'
                className='text-xs rounded hover:text-blue-500 p-1.5 hover:bg-blue-500/20 smooth'
              />
              <IconBtn
                onClick={() => setShowDeleteTask(true)}
                icon={<RiDeleteBin6Line size={16} />}
                text='Delete'
                className='text-xs rounded hover:text-red-500 p-1.5 hover:bg-red-500/20 smooth'
              />
            </div>
          </div>
          <div className='px-6'>
            <p className='text-lg font-medium'>{task?.title || 'No Task Title !'}</p>
            <p className='text-zinc-500'>{task?.description || 'No Task description'}</p>
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
            <AvatarGroup tooltip={false} size='sm' users={task.assignedToMember?.map(m => m)} />
          </div>
          <div className='px-6 flex items-center'>
            <span className=' w-35 text-gray-500'>Assignee-Team</span>
            <>
              {task.assignedToTeam?.map(t => (
                <div key={t?._id} className='flex items-center -space-x-2.5'>
                  <div
                    key={t?._id}
                    className='h-6 w-6 rounded-full bg-zinc-500 text-white flex items-center justify-center'
                  >
                    <p className='text-xs'>{t?.teamName?.slice(0, 1).toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </>
          </div>
          <div className='px-6 flex items-center border-b-2 border-gray-500/10 pb-6'>
            <span className=' w-35 text-gray-500'>Priority</span>
            <p className={`text-sm ${GetPriorityColor(task?.priority)}`}>{task?.priority}</p>
          </div>

          <span className='px-6 text-sm flex gap-2 items-center'>
            <BiTask size={18} />
            SubTask
            <i
              onClick={() => setShowSubTaskForm(true)}
              className='text-zinc-500 cursor-pointer p-1 hover:text-blue-500 smooth rounded-full hover:shadow'
            >
              <IoAdd size={18} />
            </i>
          </span>
          {showSubTaskForm && (
            <form
              ref={subTaskFormRef}
              onSubmit={handleSubmit(handleAddSubTask)}
              className='flex flex-col gap-2 w-full items-center px-6'
            >
              <Input
                label='Add SubTask'
                labelClassName='text-xs font-semibold ml-0.5'
                placeholder='SubTask title . . . .'
                inputClassName='w-full text-sm bg-zinc-500/5 placeholder:text-xs placeholder:font-medium focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-1.5 rounded border border-zinc-300 dark:border-zinc-800'
                id='subTask'
                required={true}
                {...register('title', { required: true })}
              />
              {taskErrorMessage && <p className='text-red-500 text-xs'>{taskErrorMessage}</p>}
              <BlueBtn text='Add' isLoading={taskLoading} textSize='12px' />
            </form>
          )}
          <div className='flex text-gray-500 flex-col gap-4 pl-10 pr-3 border-b-2 border-gray-500/10 pb-6'>
            {task?.subTasks?.map(sub => (
              <div key={sub?._id} className='flex gap-6 items-center justify-between'>
                <div className='flex flex-col items-start'>
                  <div className='flex items-center gap-2'>
                    <button
                      disabled={taskLoading}
                      onClick={() => handleUpdateSubTask(sub?._id, sub.isCompleted ? false : true)}
                      className={`${taskLoading ? 'opacity-20 cursor-not-allowed' : ''} p-0.5 h-4 w-4 shrink-0 hover:border-gray-500 cursor-pointer mt-0.5 rounded-full border border-gray-500/50 flex items-center justify-center ${
                        sub.isCompleted ? 'border-green-500' : 'border-gray-500'
                      }`}
                    >
                      {sub.isCompleted && <MdCheck size={14} className='text-green-500' />}
                    </button>
                    <p className='text-sm break-all'>{sub?.title}</p>
                  </div>
                  <div className='flex items-center gap-2 text-[10px] ml-5 mt-1'>
                    Add By -<span>{sub?.addedBy?.userName}</span>
                    <img className='h-4 w-4 rounded-full' src={sub?.addedBy?.profilePhoto} alt='' />
                  </div>
                </div>
                <button
                  disabled={taskLoading}
                  onClick={() => handleDeleteSubTask(sub?._id)}
                  className={`${taskLoading ? 'opacity-50 cursor-not-allowed' : ''} p-1 text-zinc-500 hover:text-red-500 smooth rounded-full hover:shadow cursor-pointer`}
                >
                  <RiDeleteBin6Line size={14} />
                </button>
              </div>
            ))}
          </div>
          <span className='px-6 text-sm flex gap-2 items-center'>
            <Link size={16} className='mt-1' />
            Links
            <i
              onClick={() => setShowLinkForm(true)}
              className='text-zinc-500 cursor-pointer p-1 hover:text-blue-500 smooth rounded-full hover:shadow'
            >
              <IoAdd size={18} />
            </i>
          </span>
          {showLinkForm && (
            <form
              ref={linkFormRef}
              onSubmit={handleSubmit(handleAddLink)}
              className='flex flex-col gap-2 w-full items-center px-6'
            >
              <Input
                label='Add Link Label'
                labelClassName='text-xs font-semibold ml-0.5'
                placeholder='Label here  . . . .'
                inputClassName='w-full text-sm bg-zinc-500/5 placeholder:text-xs placeholder:font-medium focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-1.5 rounded border border-zinc-300 dark:border-zinc-800'
                id='link'
                required={true}
                {...register('label', { required: true })}
              />
              <Input
                label='Add Link Url'
                labelClassName='text-xs font-semibold ml-0.5'
                placeholder='Url here . . . .'
                inputClassName='w-full text-sm bg-zinc-500/5 placeholder:text-xs placeholder:font-medium focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-1.5 rounded border border-zinc-300 dark:border-zinc-800'
                id='link'
                required={true}
                {...register('url', { required: true })}
              />
              {taskErrorMessage && <p className='text-red-500 text-xs'>{taskErrorMessage}</p>}
              <BlueBtn text='Add' isLoading={taskLoading} textSize='12px' />
            </form>
          )}
          <div className='flex flex-col text-gray-500 gap-4 pl-10 pr-3 border-b-2 border-gray-500/10 pb-6'>
            {task?.links?.map(link => (
              <div key={link?._id} className='flex gap-6 items-center justify-between'>
                <div className='flex flex-col items-start gap-1'>
                  <a
                    href={link?.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex gap-2 items-center hover:underline hover:text-blue-500 smooth'
                  >
                    <LuSquareArrowOutUpRight size={14} className='mt-0.5' />
                    <span className='text-sm break-all'>{link?.label}</span>
                  </a>
                  <div className='flex items-center gap-2 text-[10px] ml-6'>
                    Add By -<span>{link?.addedBy?.userName}</span>
                    <img className='h-4 w-4 rounded-full' src={link?.addedBy?.profilePhoto} alt='' />
                  </div>
                </div>
                <button
                  disabled={taskLoading}
                  onClick={() => handleDeleteLink(link?._id)}
                  className={`${taskLoading ? 'opacity-50 cursor-not-allowed' : ''} p-1 text-zinc-500 hover:text-red-500 smooth rounded-full hover:shadow cursor-pointer`}
                  title='Delete Link'
                >
                  <RiDeleteBin6Line size={14} />
                </button>
              </div>
            ))}
          </div>
          <span className='px-6 text-sm flex gap-2 items-center'>
            <Paperclip size={16} className='mt-1' />
            Attachment
            <i
              onClick={() => setShowAttachmentForm(true)}
              className='text-zinc-500 cursor-pointer p-1 hover:text-blue-500 smooth rounded-full hover:shadow'
            >
              <IoAdd size={18} />
            </i>
          </span>
          {showAttachmentForm && (
            <form
              ref={attachmentFormRef}
              onSubmit={handleSubmit(handleAddAttachment)}
              className='flex flex-col gap-2 w-full items-center px-6'
            >
              <FileInput
                id='attachment'
                label='Attachment'
                labelClassName='text-xs font-semibold ml-0.5'
                divClassName='w-full'
                className='flex items-center gap-2 cursor-pointer w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'
                label2={
                  <span className='flex items-center gap-2'>
                    <TiAttachment size={18} className='text-blue-500' />
                    <span className='truncate max-w-[180px]'>{selectedFile?.name || 'Choose file...'}</span>
                  </span>
                }
                accept='files/*'
                required={true}
                onChange={e => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
              {taskErrorMessage && <p className='text-red-500 text-xs'>{taskErrorMessage}</p>}
              <BlueBtn text='Add' isLoading={taskLoading} textSize='12px' />
            </form>
          )}
          <div className='flex flex-col text-gray-500 gap-4 pl-10 pr-3 border-b-2 border-gray-500/10 pb-6'>
            {task?.attachments?.map(a => (
              <div key={a?._id} className='flex gap-6 items-center justify-between'>
                <div className='flex flex-col items-start gap-1'>
                  <a
                    href={a?.fileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex gap-2 items-center hover:underline hover:text-blue-500 smooth'
                  >
                    <TiAttachment size={18} className='mt-0.5' />
                    <span className='text-sm break-all'>{a?.fileName}</span>
                  </a>
                  <div className='flex items-center gap-2 text-[10px] ml-6'>
                    Add By -<span>{a?.addedBy?.userName}</span>
                    <img className='h-4 w-4 rounded-full' src={a?.addedBy?.profilePhoto} alt='' />
                  </div>
                </div>
                <button
                  disabled={taskLoading}
                  onClick={() => handleDeleteAttachment(a?._id)}
                  className={`${taskLoading ? 'opacity-50 cursor-not-allowed' : ''} p-1 text-zinc-500 hover:text-red-500 smooth rounded-full hover:shadow cursor-pointer`}
                  title='Delete Attachment'
                >
                  <RiDeleteBin6Line size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className='px-6 flex gap-3 items-center pb-6'>
            <span className='text-gray-500 text-xs'>Task Created By_</span>
            <div className='flex items-center gap-2'>
              <p className={`text-sm`}>{task?.createdBy?.userName}</p>
              <img className='h-6 w-6 rounded-full border-2' src={task?.createdBy?.profilePhoto} alt='' />
            </div>
          </div>
          <IconBtn
            onClick={() => setShowTaskComments(true)}
            icon={<PiChatTeardropFill size={20} />}
            text=''
            className='fixed right-5 bottom-5 p-2 rounded-full shadow-lg bg-blue-500 text-white text-sm hover:bg-blue-700'
          />
          <div
            onClick={() => dispatch(setTaskErrorMessage(''))}
            className={`fixed z-100 top-0 right-0 ${showTaskComments ? 'translate-x-0' : 'translate-x-full'} transition-all duration-400 ease-in`}
          >
            <Comments />
          </div>
        </div>

        {showDeleteTask &&
          ReactDOM.createPortal(
            <Conform
              title='Delete Task'
              p1='Are you sure you want to delete this task?'
              p2='This action cannot be undone.'
              cancelText='Cancel'
              conformText='Delete'
              onCancel={() => setShowDeleteTask(false)}
              onConform={handleDeleteTask}
              danger={true}
              loding={taskLoading}
              error={taskErrorMessage}
            />,
            document.getElementById('modal-root')
          )}
        {showEditTask &&
          ReactDOM.createPortal(
            <TaskForm setShowEditTask={setShowEditTask} forEditeTask={task} />,
            document.getElementById('modal-root')
          )}
      </div>
    </>
  ) : null;
};

export default Task;
