import { Btn, IconBtn } from '@/components';
import React, { useState } from 'react';
import { GoProjectSymlink } from 'react-icons/go';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogoProductHunt } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { ProjectUpdate, setProject } from '@/global';

const ProjectMenu = () => {
  const { org } = useSelector(state => state.org);

  const location = useLocation();

  const [showCreateProject, setShowCreateProject] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center cursor-pointer justify-between text-xs text-zinc-500 font-medium rounded p-1.5 hover:bg-zinc-500/20 group smooth'>
        <IconBtn
          text='Projects'
          icon={<GoProjectSymlink size={16} />}
          className='tracking-wider'
        />
        <i
          onClick={() => setShowCreateProject(true)}
          className='p-1 rounded hover:bg-zinc-500'
        >
          <IoMdAdd
            size={16}
            className='text-zinc-900 dark:text-zinc-200 opacity-40 group-hover:opacity-100 smooth'
          />
        </i>
      </div>
      {org?.projects?.length > 0 ? (
        org.projects.map(p => (
          <Link
            onClick={() => dispatch(setProject(p))}
            to={`/${org.orgName}/${p?.projectName}/${p?._id}/project`}
            className='flex'
            key={p._id}
          >
            <IconBtn
              className={`${location.pathname.includes(p?._id) ? 'bg-zinc-800 text-zinc-300 shadow-md dark:bg-zinc-200 dark:text-zinc-800' : 'hover:bg-zinc-500/20'} ml-4 rounded px-3 py-2 w-full smooth`}
              text={`${p.projectName}`}
              icon={<BiLogoProductHunt size={18} />}
            />
          </Link>
        ))
      ) : (
        <div className='flex w-full justify-center mt-1 text-zinc-500'>
          <Btn
            onClick={() => setShowCreateProject(true)}
            text='Create Project'
          />
        </div>
      )}
      {showCreateProject && (
        <ProjectUpdate
          setShowCreateProject={setShowCreateProject}
          forProjectCreate={true}
        />
      )}
    </div>
  );
};

export default ProjectMenu;
