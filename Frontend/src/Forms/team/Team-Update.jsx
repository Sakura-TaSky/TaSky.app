import { BlueBtn, Conform, Input, TextArea } from '@/components';
import { setTeamErrorMessage, useClickOutside, useTeam } from '@/global';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';

const TeamUpdate = ({
  setShowUpdateTeamPopup,
  setShowTeamCreateForm,
  forTeamCreation,
}) => {
  const { register, handleSubmit } = useForm();

  const updateTeamPopupRef = useRef();
  const [showDeleteTeamPopup, setShowDeleteTeamPopup] = useState(false);
  const [deleteTeamName, setDeleteTeamName] = useState('');

  const { team, teamErrorMessage, teamLoading } = useSelector(
    state => state.team
  );

  const dispatch = useDispatch();

  const { createTeam, UpdateTeam, deleteTeam } = useTeam();

  useClickOutside(updateTeamPopupRef, () => {
    if (forTeamCreation) {
      setShowTeamCreateForm(false);
      dispatch(setTeamErrorMessage(''));
    } else {
      if (!showDeleteTeamPopup) {
        setShowUpdateTeamPopup(false);
        dispatch(setTeamErrorMessage(''));
      }
    }
  });

  const handleUpdateTeam = async data => {
    if (forTeamCreation) {
      if (!data.teamName) {
        dispatch(setTeamErrorMessage('team name is required !'));
        return;
      }
      const success = await createTeam(data);
      if (success) {
        setShowTeamCreateForm(false);
        dispatch(setTeamErrorMessage(''));
      }
    } else {
      if (!data.teamName && !data.description) {
        dispatch(setTeamErrorMessage('One field is required to update'));
        return;
      }
      const success = await UpdateTeam(data, team._id);
      if (success) {
        setShowUpdateTeamPopup(false);
        dispatch(setTeamErrorMessage(''));
      }
    }
  };

  const handleDeleteTeam = async () => {
    if (!deleteTeamName) {
      dispatch(setTeamErrorMessage('Team Name is required'));
      return;
    }
    const success = await deleteTeam(team._id, deleteTeamName);
    if (success) {
      setShowDeleteTeamPopup(false);
      setShowUpdateTeamPopup(false);
      dispatch(setTeamErrorMessage(''));
    }
  };

  return (
    <div className='inter fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 backdrop-blur-[3px]'>
      <div ref={updateTeamPopupRef} className='flex flex-col gap-1'>
        <div className='flex justify-between items-center gap-4 px-2'>
          <div
            onClick={() => {
              if (forTeamCreation) {
                setShowTeamCreateForm(false);
                dispatch(setTeamErrorMessage(''));
              } else {
                setShowUpdateTeamPopup(false);
                dispatch(setTeamErrorMessage(''));
              }
            }}
            className='text-white flex gap-2 items-center self-start hover:gap-0 hover:-ml-2 p-2 font-medium smooth cursor-pointer'
          >
            <GoArrowLeft size={18} />
            Back
          </div>
          {!forTeamCreation && (
            <i
              title='Delete Team'
              onClick={() => (
                setShowDeleteTeamPopup(true),
                dispatch(setTeamErrorMessage(''))
              )}
              className='cursor-pointer p-1 bg-red-500/10 rounded  text-red-500 hover:border-red-500/40 border border-zinc-50/0'
            >
              <RiDeleteBin6Line />
            </i>
          )}
        </div>
        <div
          className='flex flex-col items-center gap-6 w-80 p-6 rounded-lg border 
         border-zinc-300 dark:border-zinc-800 shadow-md
         bg-white dark:bg-zinc-950'
        >
          <div className='flex flex-col items-cente gap-2'>
            <span className='text-xl break-all'>
              {forTeamCreation
                ? 'Create Team'
                : `Update Team - ${team?.teamName}`}
            </span>
            <span className='text-[15px] text-zinc-500'>
              {forTeamCreation
                ? 'create Team By filling this all Deatils .'
                : 'Enter your new Team Name and description .'}
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateTeam)}
            className='flex flex-col w-full items-start gap-4 text-sm'
          >
            <>
              <Input
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'teamName'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={forTeamCreation ? 'Team Name' : 'New team Name'}
                type={'text'}
                id={'teamName'}
                placeholder={'team Name here . . . .'}
                {...register('teamName')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
              <TextArea
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'description'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={'description'}
                type={'text'}
                id={'description'}
                placeholder={'description . . . .'}
                {...register('description')}
                inputClassName='bg-zinc-500/5 focus:border-blue-500/30 focus:bg-blue-500/10 outline-0 placeholder:text-zinc-500 placeholder:font-light font-medium p-2 rounded border border-zinc-300 dark:border-zinc-800'
              />
            </>
            {teamErrorMessage && (
              <span className='ml-0.5 text-sm text-red-500'>
                {teamErrorMessage}
              </span>
            )}
            <div className='flex mt-4 w-full justify-center'>
              <BlueBtn
                isLoading={teamLoading}
                text={forTeamCreation ? 'create' : 'Update'}
              />
            </div>
          </form>
        </div>
      </div>
      {showDeleteTeamPopup && (
        <Conform
          title={`Delete Team - ${team?.teamName}`}
          p1={`Deleting this Team is a permanent action and cannot be undone.`}
          p2={
            'You must enter the correct Team name to confirm deletion. Only the Team owner can perform this action.'
          }
          cancelText={'Cancle'}
          conformText={'Delete'}
          onCancel={() => (
            setShowDeleteTeamPopup(false),
            dispatch(setTeamErrorMessage(''))
          )}
          onConform={handleDeleteTeam}
          danger={true}
          loding={teamLoading}
          error={teamErrorMessage}
          input={true}
          label={`Team name : '${team?.teamName}'`}
          setInput={setDeleteTeamName}
        />
      )}
    </div>
  );
};

export default TeamUpdate;
