import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, Plus } from 'lucide-react';
import {
  DotLoader,
  Loader,
  OrgUpdate,
  setOrg,
  setOrgErrorMessage,
  useClickOutside,
  useOrgId,
} from '../../../global';
import { LuSquareArrowOutDownRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const OrgSelect = () => {
  const { user } = useSelector(state => state.auth);

  const { org, orgLoading } = useSelector(state => state.org);

  const [forCreation, setForCreation] = useState(false);
  const [showOrgList, setShowOrgList] = useState(false);

  const orgListRef = useRef();

  const { setOrgId } = useOrgId();

  const naviget = useNavigate();

  const dispatch = useDispatch();

  const handleOrgSelect = async id => {
    if (id == org?._id) {
      naviget(`/${org.orgName}`);
    }
    setOrgId(id);
  };

  useClickOutside(orgListRef, () => setShowOrgList(false));

  return (
    <div
      onClick={() => dispatch(setOrgErrorMessage(''))}
      className='w-full p-1.5 border-b-2 border-zinc-500/10 h-[56px]'
    >
      <div
        onClick={() => setShowOrgList(true)}
        className={`flex items-center justify-between gap-2 p-2 ${showOrgList ? 'bg-zinc-500/20' : 'hover:bg-zinc-500/20'} rounded-md w-[84%] overflow-hidden group smooth cursor-pointer`}
      >
        <div className='flex items-center gap-3 w-full overflow-hidden'>
          {user?.inOrg?.length > 0 ? (
            orgLoading ? (
              <Loader />
            ) : !org ? (
              <span className='text-[13px] text-blue-500 font-medium flex gap-2 items-center'>
                <LuSquareArrowOutDownRight size={18} /> Select organizationg
              </span>
            ) : (
              <>
                <div className='h-6.5 w-6.5 overflow-hidden rounded-md'>
                  <img
                    className='h-full w-full object-cover'
                    src={org?.orgProfilePhoto}
                    alt=''
                  />
                </div>
                <span className='font-semibold truncate overflow-hidden whitespace-nowrap'>
                  {org?.orgName}
                </span>
              </>
            )
          ) : (
            <>
              <Plus className='mt-0.5 group-hover:text-blue-500' size={18} />
              <span className='text-sm truncate'>Create Organization</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`opacity-0 ${showOrgList ? 'opacity-100' : 'group-hover:opacity-100'} smooth`}
          size={20}
        />
      </div>
      {showOrgList && (
        <div
          ref={orgListRef}
          className='text-sm p-3 absolute border left-2 mt-1 bg-white dark:bg-zinc-950 shadow-md border-zinc-500/30 rounded-md z-100'
        >
          <p className='text-xs font-medium text-zinc-500 mb-2'>
            select organization
          </p>
          {orgLoading && (
            <div className='px-4 py-2'>
              <DotLoader />
            </div>
          )}
          {user?.inOrg?.length > 0 &&
            user.inOrg.map(o => (
              <div
                onClick={() => handleOrgSelect(o.org._id)}
                key={o.org._id}
                className={`${org?._id == o.org._id ? 'bg-zinc-500/20 text-black dark:text-white' : ''} cursor-pointer p-2 w-[250px] rounded-md hover:bg-zinc-500/20 mt-1 flex items-center gap-3`}
              >
                <img
                  src={o.org.orgProfilePhoto}
                  alt={o.org.orgName}
                  className='h-6 w-6 rounded-md '
                />
                <span className='truncate overflow-hidden whitespace-nowrap max-w-[200px]'>
                  {o.org.orgName}
                </span>
              </div>
            ))}
          <div
            onClick={() => (
              dispatch(setOrgErrorMessage('')),
              setForCreation(true)
            )}
            className='group p-2 w-[250px] rounded-md hover:bg-blue-500/20 hover:shadow opacity-50 hover:opacity-100 mt-1 flex gap-3 items-center '
          >
            <Plus className='ml-1 group-hover:text-blue-500' size={19} />
            <span>Create New Organization</span>
          </div>
        </div>
      )}
      {forCreation && (
        <OrgUpdate forCreation={forCreation} setForCreation={setForCreation} />
      )}
    </div>
  );
};

export default OrgSelect;
