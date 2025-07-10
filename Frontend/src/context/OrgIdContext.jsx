import { createContext, useState, useContext, useEffect } from 'react';
import {
  setOrg,
  setProject,
  setSection,
  setTask,
  setTeam,
  useOrg,
} from '@/global';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrgIdContext = createContext();

export const OrgIdProvider = ({ children }) => {
  const naviget = useNavigate();

  const { getOrg } = useOrg();

  const dispatch = useDispatch();

  const [orgId, setOrgId] = useState(localStorage.getItem('orgId') || null);

  useEffect(() => {
    const getOrgData = async () => {
      if (orgId) {
        dispatch(setOrg(null));
        dispatch(setProject(null));
        dispatch(setTeam(null));
        dispatch(setTask(null));
        dispatch(setSection(null));
        const success = await getOrg(orgId);
        localStorage.setItem('orgId', success);
      }
    };
    getOrgData();
  }, [orgId]);

  const value = {
    orgId,
    setOrgId,
  };

  return (
    <OrgIdContext.Provider value={value}>{children}</OrgIdContext.Provider>
  );
};

export function useOrgId() {
  return useContext(OrgIdContext);
}
