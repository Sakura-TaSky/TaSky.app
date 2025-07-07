import { createContext, useState, useContext, useEffect } from 'react';
import { useOrg } from '@/global';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrgIdContext = createContext();

export const OrgIdProvider = ({ children }) => {
  const naviget = useNavigate();

  const { getOrg } = useOrg();

  const [orgId, setOrgId] = useState(localStorage.getItem('orgId') || null);

  useEffect(() => {
    const getOrgData = async () => {
      if (orgId) {
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
