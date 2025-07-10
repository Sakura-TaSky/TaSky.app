import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AvatarGroup,
  Btn,
  IconBtn,
  ProjectAddMember,
  ProjectTeam,
  ProjectSection,
  ProjectUpdate,
  setSection,
  ProjectMemberPage,
  ProjectAddTeam,
  setProjectErrorMessage,
  useProject,
  Conform,
  AddUpdatePSection,
} from '@/global';
import { TbUserPlus } from 'react-icons/tb';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { ChevronDown, LogOut } from 'lucide-react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';

const ProjectPage = () => {
  const { project, projectLoading, projectErrorMessage } = useSelector(state => state.project);

  const { section } = useSelector(state => state.section);

  const { org } = useSelector(state => state.org);

  const dispatch = useDispatch();

  const { leaveProject } = useProject();

  const [showProInfo, setShowProInfo] = useState(true);
  const [showProjectUpdatePopup, setShowProjectUpdatedPopup] = useState(false);
  const [showProjectAddMemberPopup, setShowProjectAddMemberPopup] = useState(false);
  const [showMemberOfProject, setShowMemberOfProject] = useState(false);
  const [showTeamOfProject, setShowTeamOfProject] = useState(false);
  const [showProjectAddTeamPopup, setShowProjectAddTeamPopup] = useState(false);
  const [showLeaveProjectPopup, setShowLeaveProjectPopup] = useState(false);
  const [showSectionAddForm, setShowSectionAddForm] = useState(false);
  const [showUpdateSectionForm, setShowUpdateSectionForm] = useState(false);

  useEffect(() => {
    dispatch(setSection(project?.projectSections[0]));
  }, [project]);

  const handleLeaveProject = async () => {
    const success = await leaveProject();
    if (success) {
      dispatch(setProjectErrorMessage(''));
      setShowLeaveProjectPopup(false);
    }
  };

  return project ? (
    <main className='relative h-full w-full'>
      {/* project info */}
      <div className='flex justify-between items-start px-2 pr-4 py-3 gap-2'>
        <div className='flex flex-col gap-1 items-start w-[60%]'>
          <h1 className='flex gap-4 items-center text-lg inter font-medium'>
            <i onClick={() => setShowProInfo(!showProInfo)} className='p-1 cursor-pointer hover:text-blue-500'>
              <ChevronDown size={18} className={`${showProInfo ? '-rotate-180 ' : ''} smooth`} />
            </i>
            <p
              onClick={() => (setShowMemberOfProject(false), setShowTeamOfProject(false))}
              className={`line-clamp-1 ${showTeamOfProject || (showMemberOfProject && 'cursor-pointer')}`}
            >
              {project?.projectName || 'Project not selected'}
            </p>
            <i
              onClick={() => setShowProjectUpdatedPopup(true)}
              className='cursor-pointer self-end p-0.5 mb-1 bg-zinc-500/10 rounded hover:text-blue-500 text-zinc-500 hover:border-blue-500/40 border border-zinc-500/15'
            >
              <RiEdit2Fill size={14} />
            </i>
          </h1>
          {showProInfo && (
            <>
              <p className='text-sm text-zinc-500 line-clamp-2 pl-2'>{project?.description || 'No description !'}</p>
              <div title='Leave Project' className='ml-2 mt-2'>
                <IconBtn
                  onClick={() => {
                    if (!project) return;
                    setShowLeaveProjectPopup(true);
                  }}
                  text=''
                  icon={<LogOut size={16} className='rotate-180' />}
                  className='rounded-md p-1.5 border text-red-500 border-red-500/30 bg-red-500/5 hover:border-red-500/60 hover:bg-red-500/20'
                />
              </div>
            </>
          )}
        </div>
        <div className='flex gap-2 flex-wrap justify-end'>
          <div className='flex flex-col gap-1 items-end'>
            <div className='flex gap-1 items-center'>
              <Link
                to={
                  !showMemberOfProject
                    ? `/${org.orgName}/${project?.projectName}-P-Member/${project?._id}/project`
                    : `/${org.orgName}/${project?.projectName}/${project?._id}/project`
                }
                onClick={() => (setShowMemberOfProject(!showMemberOfProject), setShowTeamOfProject(false))}
                className={`${showMemberOfProject && '  border-zinc-500'} border border-zinc-50/0 cursor-pointer flex gap-2 items-center p-1 rounded smooth`}
              >
                {showMemberOfProject && <IoArrowBackSharp size={18} />}
                <AvatarGroup maxVisible={3} size='sm' users={project?.members.map(m => m.member)} />
              </Link>
              <Btn
                onClick={() => {
                  if (project) {
                    setShowProjectAddMemberPopup(true);
                  }
                }}
                text='Member'
                icon={<TbUserPlus size={16} />}
                className='p-2 rounded-md bg-zinc-500/10 hover:text-blue-500 hover:bg-blue-500/20 text-xs font-medium smooth'
              />
            </div>
            <div className='flex gap-1 items-center'>
              <Link
                to={
                  !showTeamOfProject
                    ? `/${org.orgName}/${project?.projectName}-P-Member-Team/${project?._id}/project`
                    : `/${org.orgName}/${project?.projectName}/${project?._id}/project`
                }
                onClick={() => (setShowTeamOfProject(!showTeamOfProject), setShowMemberOfProject(false))}
                className={`${showTeamOfProject && ' border-zinc-500'} border border-zinc-50/0 cursor-pointer flex gap-2 items-center p-1 rounded smooth`}
              >
                {showTeamOfProject && <IoArrowBackSharp size={18} />}
                <div className='flex items-center -space-x-2.5'>
                  {project.teams.length > 0 ? (
                    project.teams.slice(0, 5).map(t => (
                      <div key={t?._id} className='relative group hover:z-20'>
                        <div
                          className={`w-6.5 h-6.5 flex items-center justify-center  rounded-full border-2 border-white/50 shadow-sm overflow-hidden bg-zinc-500`}
                        >
                          <span className='text-xs'>{t.teamName?.charAt(0).toUpperCase() || '?'}</span>
                        </div>
                        <div className='shadow-md absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-zinc-900 text-zinc-200 dark:font-medium dark:bg-zinc-50 dark:text-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
                          {t?.teamName}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-xs w-6.5 h-6.5 flex items-center justify-center rounded-full border-2 border-white/50 bg-zinc-500 shadow-sm overflow-hidden '>
                      0
                    </div>
                  )}
                </div>
              </Link>
              <Btn
                onClick={() => {
                  if (project) {
                    setShowProjectAddTeamPopup(true);
                  }
                }}
                text='Team'
                icon={<IoMdAdd size={16} />}
                className='p-2 rounded-md bg-zinc-500/10 hover:text-blue-500 hover:bg-blue-500/20 text-xs font-medium smooth'
              />
            </div>
          </div>
        </div>
      </div>
      {!showMemberOfProject && !showTeamOfProject && (
        <div className='flex md:px-4 px-2 border-b-2 border-zinc-500/10 gap-2 overflow-auto justify-between items-end mb-4'>
          <div className='flex gap-2 '>
            {project?.projectSections?.map(s => (
              <div
                key={s._id}
                className={`${section?.sectionName == s?.sectionName ? 'border-b-3 border-purple-600 text-purple-600' : 'opacity-60 hover:opacity-100'} flex gap-2 font-medium px-2 py-2 text-sm`}
              >
                <div className='flex items-center gap-2'>
                  <Btn onClick={() => dispatch(setSection(s))} className='' text={`${s?.sectionName}`} />
                  {section?._id == s._id && (
                    <i
                      onClick={() => setShowUpdateSectionForm(true)}
                      className='p-1 hover:text-blue-500 hover:bg-blue-500/20 rounded mt-1 cursor-pointer'
                    >
                      <HiDotsVertical size={15} />
                    </i>
                  )}
                </div>
              </div>
            ))}
          </div>
          <IconBtn
            onClick={() => setShowSectionAddForm(true)}
            icon={<IoMdAdd size={17} className='mt-0.5' />}
            text='Section'
            gap='8px'
            className='h-[max-content] text-zinc-500 text-[13.5px] font-medium px-2 py-2 hover:text-blue-500 border-b-3 border-zinc-50/0 hover:border-blue-500'
          />
        </div>
      )}
      {!showTeamOfProject && !showMemberOfProject && section && (
        <div className='w-full flex justify-between items-center md:px-4 pb-4 px-2'>
          <p className='text-sm text-zinc-500 max-w-[50%] line-clamp-1'>{section?.description}</p>
          <div className='flex gap-2 items-center'>
            <span className='text-xs font-medium text-zinc-500'>CreatedBy - </span>
            <div className='flex gap-2 text-xs font-medium items-center'>
              <span>{section?.createdBy?.userName}</span>
              <img className='h-5 w-5 rounded-full' src={section?.createdBy?.profilePhoto} alt='' />
            </div>
          </div>
        </div>
      )}

      {!showMemberOfProject && !showTeamOfProject && <ProjectSection />}
      {showMemberOfProject && <ProjectMemberPage />}
      {showTeamOfProject && <ProjectTeam />}
      {showProjectUpdatePopup && <ProjectUpdate setShowProjectUpdatedPopup={setShowProjectUpdatedPopup} />}
      {showProjectAddMemberPopup && <ProjectAddMember setShowProjectAddMemberPopup={setShowProjectAddMemberPopup} />}
      {showProjectAddTeamPopup && <ProjectAddTeam setShowProjectAddTeamPopup={setShowProjectAddTeamPopup} />}
      {showLeaveProjectPopup && (
        <Conform
          title={`Leave Project - ${project?.projectName}`}
          p1={
            'Leaving this project means you will no longer have access to its all section, tasks and activities. Are you sure you want to proceed   ?'
          }
          conformText={'Leave Project'}
          onCancel={() => (setShowLeaveProjectPopup(false), dispatch(setProjectErrorMessage('')))}
          onConform={handleLeaveProject}
          danger={true}
          loding={projectLoading}
          error={projectErrorMessage}
        />
      )}
      {showSectionAddForm && (
        <AddUpdatePSection setShowSectionAddForm={setShowSectionAddForm} forSectionCreate={true} />
      )}
      {showUpdateSectionForm && (
        <AddUpdatePSection setShowUpdateSectionForm={setShowUpdateSectionForm} forSectionCreate={false} />
      )}
    </main>
  ) : (
    <div className='h-screen w-full flex items-center justify-center text-sm italic'>
      <p>select the project !</p>
    </div>
  );
};

export default ProjectPage;
