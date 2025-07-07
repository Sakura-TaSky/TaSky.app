import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import {
  BlueBtn,
  Conform,
  Input,
  setSection,
  setSectionErrorMessage,
  TextArea,
  useClickOutside,
  useSection,
} from '@/global';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AddUpdatePSection = ({
  setShowSectionAddForm,
  forSectionCreate,
  setShowUpdateSectionForm,
}) => {
  const { register, handleSubmit } = useForm();

  const { section, sectionErrorMessage, sectionLoading } = useSelector(
    state => state.section
  );

  const projectSectionFromRef = useRef();

  const [showDeleteProjectSectionPopup, setShowDeleteProjectSectionPopup] =
    useState(false);

  const dispatch = useDispatch();

  const { createSection, updateSection, deleteSection } = useSection();

  useClickOutside(projectSectionFromRef, () => {
    if (forSectionCreate) {
      setShowSectionAddForm(false);
      dispatch(setSectionErrorMessage(''));
    } else {
      if (!showDeleteProjectSectionPopup) {
        setShowUpdateSectionForm(false);
        dispatch(setSectionErrorMessage(''));
      }
    }
  });

  const handleUpdateProjectSection = async data => {
    if (forSectionCreate) {
      const success = await createSection(data);
      if (success) {
        dispatch(setSectionErrorMessage(''));
        setShowSectionAddForm(false);
      }
    } else {
      const success = await updateSection(data, section?._id);
      if (success) {
        dispatch(setSectionErrorMessage(''));
        setShowUpdateSectionForm(false);
      }
    }
  };

  const handleSectionDelete = async () => {
    const success = await deleteSection(section?._id);
    if (success) {
      dispatch(setSectionErrorMessage(''));
      dispatch(setSection(null));
      setShowUpdateSectionForm(false);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center z-100 inter backdrop-blur-[3px]'>
      <div ref={projectSectionFromRef} className='flex flex-col gap-1'>
        <div className='flex justify-between items-center gap-3'>
          <div
            onClick={() => {
              if (forSectionCreate) {
                setShowSectionAddForm(false);
                dispatch(setSectionErrorMessage(''));
              } else {
                setShowUpdateSectionForm(false);
                dispatch(setSectionErrorMessage(''));
              }
            }}
            className='text-white flex gap-2 items-center hover:gap-0 hover:-ml-2 p-2 font-medium w-[max-content] smooth cursor-pointer'
          >
            <GoArrowLeft size={18} />
            Back
          </div>
          {!forSectionCreate && (
            <i
              onClick={() => setShowDeleteProjectSectionPopup(true)}
              title='Delete Project'
              className='cursor-pointer p-1 bg-red-500/20 rounded  text-red-500 hover:border-red-500/60 hover:bg- border border-red-500/20'
            >
              <RiDeleteBin6Line />
            </i>
          )}
        </div>
        <div className='p-6 w-[330px] bg-white dark:bg-zinc-950 border flex flex-col gap-3 border-zinc-500/30 rounded-lg shadow-md'>
          <div className='flex flex-col items-cente gap-2'>
            <span className='text-xl break-all'>
              {forSectionCreate
                ? 'Create Project Section'
                : `Update Project Section  - ${section?.sectionName}`}
            </span>
            <span className='text-[15px] text-zinc-500'>
              {forSectionCreate
                ? 'create Project Section By filling this all Deatils .'
                : 'Enter your new Section Name and description .'}
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateProjectSection)}
            className='flex flex-col w-full items-start gap-4 text-sm'
          >
            <>
              <Input
                className={'flex flex-col w-full gap-0.5'}
                htmlFor={'sectionName'}
                labelClassName={'ml-0.5 text-[12px] font-medium'}
                label={forSectionCreate ? 'Section Name' : 'New Section Name'}
                type={'text'}
                id={'sectionName'}
                placeholder={'section Name here . . . .'}
                {...register('sectionName')}
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
            {sectionErrorMessage && (
              <span className='ml-0.5 text-sm text-red-500'>
                {sectionErrorMessage}
              </span>
            )}
            <div className='flex mt-4 w-full justify-center'>
              <BlueBtn
                isLoading={sectionLoading}
                text={forSectionCreate ? 'create' : 'Update'}
              />
            </div>
          </form>
        </div>
      </div>
      {showDeleteProjectSectionPopup && (
        <Conform
          title={`Delete Section - ${section?.sectionName}`}
          p1={`This will permanently delete the section "${section?.sectionName}" and all its data. Are you sure?`}
          error={sectionErrorMessage}
          loding={sectionLoading}
          conformText={'Delete'}
          onConform={handleSectionDelete}
          onCancel={() => setShowDeleteProjectSectionPopup(false)}
          danger={true}
        />
      )}
    </div>
  );
};

export default AddUpdatePSection;
